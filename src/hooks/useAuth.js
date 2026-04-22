import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const STORAGE_KEY = 'ebrack_admin_session';

function readSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [session, setSession] = useState(readSession);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setSession(readSession());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.rpc('admin_login', {
      p_email: email,
      p_password: password
    });
    setLoading(false);
    if (error) return { error };
    const row = Array.isArray(data) ? data[0] : data;
    if (!row || !row.email) return { error: { message: 'E-mail ou senha inválidos.' } };
    const s = { id: row.id, email: row.email, loggedInAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    setSession(s);
    return { session: s };
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    if (!session?.email) return { error: { message: 'Sessão expirada.' } };
    const { data, error } = await supabase.rpc('admin_change_password', {
      p_email: session.email,
      p_old_password: oldPassword,
      p_new_password: newPassword
    });
    if (error) return { error };
    if (data === true) return { ok: true };
    return { error: { message: 'Senha atual incorreta.' } };
  }, [session]);

  return { session, loading, signIn, signOut, changePassword };
}
