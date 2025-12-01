// Facebook Pixel tracking utilities

export const trackFBEvent = (eventName: string, parameters?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

export const trackPurchase = (value: number, currency: string = 'USD') => {
  trackFBEvent('Purchase', { value, currency });
};

export const trackAddToCart = (contentId: string, value: number, currency: string = 'USD') => {
  trackFBEvent('AddToCart', { content_ids: [contentId], value, currency });
};

export const trackViewContent = (contentId: string, contentType: string = 'product') => {
  trackFBEvent('ViewContent', { content_ids: [contentId], content_type: contentType });
};

export const trackInitiateCheckout = (value: number, currency: string = 'USD') => {
  trackFBEvent('InitiateCheckout', { value, currency });
};