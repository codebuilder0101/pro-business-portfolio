const PIXEL_ID = '2643202879410501';

export { PIXEL_ID };

export function trackPageView() {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', 'PageView');
}

export function trackLead(eventId = '') {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return;
  window.fbq('track', 'Lead', {}, eventId ? { eventID: eventId } : undefined);
}
