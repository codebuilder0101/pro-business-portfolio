import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const SESSION_KEY = 'ebrack_analytics_session';
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 min
const READ_SCROLL_THRESHOLD = 60;
const READ_TIME_THRESHOLD_S = 20;

function getOrCreateSessionId() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    const now = Date.now();
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.id && parsed?.lastSeen && (now - parsed.lastSeen) < SESSION_TTL_MS) {
        parsed.lastSeen = now;
        localStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
        return parsed.id;
      }
    }
    const id = (crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`);
    localStorage.setItem(SESSION_KEY, JSON.stringify({ id, lastSeen: now }));
    return id;
  } catch {
    return `anon-${Date.now()}`;
  }
}

function maxScrollPct() {
  const doc = document.documentElement;
  const scrollTop = window.scrollY || doc.scrollTop;
  const viewport = window.innerHeight || doc.clientHeight;
  const total = Math.max(doc.scrollHeight, doc.offsetHeight);
  if (total <= viewport) return 100;
  return Math.min(100, Math.round(((scrollTop + viewport) / total) * 100));
}

export function useTrackPageview({ articleId = null } = {}) {
  const location = useLocation();
  const rowIdRef = useRef(null);
  const startRef = useRef(Date.now());
  const peakScrollRef = useRef(0);
  const flushedRef = useRef(false);
  const stopPollRef = useRef(null);

  useEffect(() => {
    // Skip tracking on admin routes to avoid polluting metrics.
    if (location.pathname.startsWith('/admin')) return;
    // When no articleId is passed, skip article detail routes — NewsDetail
    // will register its own tracked pageview with the article id.
    if (!articleId && /^\/mercado\/\d+/.test(location.pathname)) return;

    const sessionId = getOrCreateSessionId();
    const path = location.pathname + location.search;
    const started = Date.now();
    startRef.current = started;
    peakScrollRef.current = maxScrollPct();
    flushedRef.current = false;
    rowIdRef.current = null;

    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .insert({
          session_id: sessionId,
          event_type: articleId ? 'article_view' : 'pageview',
          path,
          article_id: articleId,
          user_agent: navigator.userAgent?.slice(0, 300) || null,
          referrer: document.referrer?.slice(0, 300) || null,
          scroll_depth: peakScrollRef.current
        })
        .select('id')
        .single();
      if (!cancelled && !error && data) rowIdRef.current = data.id;
    })();

    const onScroll = () => {
      const s = maxScrollPct();
      if (s > peakScrollRef.current) peakScrollRef.current = s;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const flush = async (final = false) => {
      if (flushedRef.current && !final) return;
      const id = rowIdRef.current;
      if (!id) return;
      const duration = Math.round((Date.now() - startRef.current) / 1000);
      const depth = peakScrollRef.current;
      const read =
        !!articleId && depth >= READ_SCROLL_THRESHOLD && duration >= READ_TIME_THRESHOLD_S;
      await supabase
        .from('analytics_events')
        .update({ duration_seconds: duration, scroll_depth: depth, read_flag: read })
        .eq('id', id);
      flushedRef.current = true;
    };

    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush(true);
    };
    const onPageHide = () => flush(true);

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    window.addEventListener('beforeunload', onPageHide);

    // Periodic flush so we have data even if unload events don't fire
    const poll = setInterval(() => {
      flushedRef.current = false;
      flush(false);
    }, 15000);
    stopPollRef.current = () => clearInterval(poll);

    return () => {
      cancelled = true;
      flush(true);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      window.removeEventListener('beforeunload', onPageHide);
      stopPollRef.current?.();
    };
  }, [location.pathname, location.search, articleId]);
}
