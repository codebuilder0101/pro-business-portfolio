const CONVERSION_SEND_TO = 'AW-648852323/xiFwCOHkjtQBEOPmsrUC';

export function trackConversion(transactionId = '') {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'conversion', {
    send_to: CONVERSION_SEND_TO,
    transaction_id: transactionId,
  });
}
