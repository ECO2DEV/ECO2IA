export const strapiToken = process.env.API_TOKEN;
export const strapiUrl = process.env.STRAPI_URL;

export const header = {
  headers: {
    Authorization: `Bearer ${strapiToken}`,
    'Content-Type': 'application/json'
  }
};

export const SUPPORTED_LENGUAGES = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch'
};

export const VOICE_FOR_LANGUAGE = {
  en: 'en-GB',
  es: 'es-MX',
  de: 'de-DE'
};

export const AUTO_LANGUAGE = 'auto';
