/**
 * Medição de interesse (sem coleta de dados pessoais).
 * Configuração em src/config/tracking.ts — leia o cabeçalho daquele arquivo.
 */

type TrackingConfig = {
  gtmId: string;
  ga4Id: string;
  adsId: string;
  adsWhatsappLabel: string;
};

declare global {
  interface Window {
    __TRACKING__?: TrackingConfig;
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'ac_consent_v1';
const UTM_KEY = 'ac_utm_v1';
const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;

const config: TrackingConfig = window.__TRACKING__ ?? { gtmId: '', ga4Id: '', adsId: '', adsWhatsappLabel: '' };
const hasTracking = Boolean(config.gtmId || config.ga4Id || config.adsId);
window.dataLayer = window.dataLayer || [];

/* ---------------------------- Parâmetros UTM ---------------------------- */
function readUtm(): Record<string, string> {
  const fromUrl: Record<string, string> = {};
  const params = new URLSearchParams(window.location.search);
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    // Limita o tamanho e remove caracteres incomuns para não carregar dados indevidos.
    if (value) fromUrl[key] = value.slice(0, 100).replace(/[^\w\-. ]/g, '');
  }
  try {
    if (Object.keys(fromUrl).length) {
      sessionStorage.setItem(UTM_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    return JSON.parse(sessionStorage.getItem(UTM_KEY) || '{}');
  } catch {
    return fromUrl;
  }
}
const utm = readUtm();

/* ------------------------------- Eventos -------------------------------- */
function track(event: string, params: Record<string, string> = {}): void {
  const payload = { ...params, ...utm };
  window.dataLayer.push({ event, ...payload });
  // Uso direto do gtag (sem GTM): só existe após consentimento.
  if (window.gtag && !config.gtmId) {
    window.gtag('event', event, payload);
  }
}

function trackWhatsapp(service: string, placement: string): void {
  track('whatsapp_click', { service, placement });
  if (service !== 'geral') track('service_interest', { service, placement });
  if (window.gtag && !config.gtmId && config.adsId && config.adsWhatsappLabel) {
    window.gtag('event', 'conversion', { send_to: `${config.adsId}/${config.adsWhatsappLabel}` });
  }
}

document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-track]');
  if (!target) return;
  const kind = target.dataset.track;
  const placement = target.dataset.placement || 'desconhecido';
  if (kind === 'whatsapp') trackWhatsapp(target.dataset.service || 'geral', placement);
  if (kind === 'map') track('map_click', { placement });
});

track('page_view', { page_path: window.location.pathname });

/* ---------------------- Consentimento e tags externas -------------------- */
function loadScript(src: string): void {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadThirdParty(): void {
  if (config.gtmId) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${config.gtmId}`);
    return;
  }
  const primary = config.ga4Id || config.adsId;
  if (!primary) return;
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag('consent', 'default', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  if (config.ga4Id) window.gtag('config', config.ga4Id);
  if (config.adsId) window.gtag('config', config.adsId);
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${primary}`);
}

function getConsent(): string | null {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function setConsent(value: 'granted' | 'denied'): void {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* navegação privada: segue sem persistir */
  }
}

if (hasTracking) {
  const banner = document.getElementById('consent-banner');
  const consent = getConsent();
  if (consent === 'granted') loadThirdParty();
  else if (consent === null && banner) banner.hidden = false;

  banner?.querySelector('[data-consent="accept"]')?.addEventListener('click', () => {
    setConsent('granted');
    banner.hidden = true;
    loadThirdParty();
  });
  banner?.querySelector('[data-consent="reject"]')?.addEventListener('click', () => {
    const wasGranted = getConsent() === 'granted';
    setConsent('denied');
    banner.hidden = true;
    // Tags já carregadas só deixam de atuar após recarregar a página.
    if (wasGranted) window.location.reload();
  });
  document.querySelectorAll('[data-open-consent]').forEach((el) =>
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (banner) banner.hidden = false;
    }),
  );
}

export {};
