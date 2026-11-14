/**
 * ============================================================================
 *  CONFIGURAÇÃO DE MEDIÇÃO (Google Tag Manager, GA4, Google Ads)
 * ============================================================================
 *  Todos os IDs começam VAZIOS. Com tudo vazio:
 *   - nenhum script de terceiros é carregado;
 *   - nenhum cookie é gravado;
 *   - o banner de consentimento não aparece.
 *
 *  Os eventos da página são sempre enviados para `window.dataLayer` (uma
 *  variável local do navegador, sem transmissão externa) para que o GTM, quando
 *  instalado, possa usá-los:
 *
 *    whatsapp_click    → clique em qualquer botão de WhatsApp
 *                        { service, placement }
 *    service_interest  → clique no botão de um serviço específico
 *                        { service, placement }
 *    map_click         → clique em "Como chegar" ou "Ver mapa"
 *                        { placement }
 *    page_view         → carregamento da página
 *
 *  Os eventos carregam também, se existirem, os parâmetros de campanha
 *  (utm_source, utm_medium, utm_campaign, utm_term, utm_content). O
 *  identificador gclid é tratado pelas próprias tags do Google.
 *  Nenhum dado pessoal ou clínico é coletado.
 *
 *  IMPORTANTE: um clique no WhatsApp é um sinal de INTERESSE, não um
 *  agendamento confirmado. Nomeie a conversão no Google Ads como
 *  "Clique no WhatsApp" (ou similar).
 *
 *  Os IDs também podem ser definidos por variáveis de ambiente no Netlify
 *  (recomendado), sem editar este arquivo:
 *    PUBLIC_GTM_ID, PUBLIC_GA4_ID, PUBLIC_ADS_ID, PUBLIC_ADS_WHATSAPP_LABEL
 * ============================================================================
 */

const env = import.meta.env;

export const tracking = {
  /** Ex.: 'GTM-XXXXXXX'. Se usar GTM, configure GA4/Ads DENTRO do GTM e deixe os campos abaixo vazios. */
  gtmId: (env.PUBLIC_GTM_ID as string | undefined) ?? '',
  /** Ex.: 'G-XXXXXXXXXX' (uso direto via gtag, sem GTM). */
  ga4Id: (env.PUBLIC_GA4_ID as string | undefined) ?? '',
  /** Ex.: 'AW-XXXXXXXXX' (uso direto via gtag, sem GTM). */
  adsId: (env.PUBLIC_ADS_ID as string | undefined) ?? '',
  /** Rótulo da conversão "Clique no WhatsApp" no Google Ads. */
  adsWhatsappLabel: (env.PUBLIC_ADS_WHATSAPP_LABEL as string | undefined) ?? '',
};

/** Validação simples para evitar IDs malformados quebrando a página. */
const valid = {
  gtm: /^GTM-[A-Z0-9]+$/,
  ga4: /^G-[A-Z0-9]+$/,
  ads: /^AW-\d+$/,
};

export const activeTracking = {
  gtmId: valid.gtm.test(tracking.gtmId) ? tracking.gtmId : '',
  ga4Id: valid.ga4.test(tracking.ga4Id) ? tracking.ga4Id : '',
  adsId: valid.ads.test(tracking.adsId) ? tracking.adsId : '',
  adsWhatsappLabel: tracking.adsWhatsappLabel,
};

export const hasThirdPartyTracking = Boolean(
  activeTracking.gtmId || activeTracking.ga4Id || activeTracking.adsId,
);
