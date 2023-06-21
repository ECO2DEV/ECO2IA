export const strapiToken = process.env.API_TOKEN;
export const strapiUrl = process.env.STRAPI_URL;
export const nextAuthUrl = process.env.NEXTAUTH_URL;
export const header = {
  headers: {
    Authorization: `Bearer ${strapiToken}`,
    'Content-Type': 'application/json'
  }
};

export const SUPPORTED_LENGUAGES = {

  En: 'Anglais',
  Es: 'Espagnol',
  De: 'Allemand',
  Fr: 'Français',
  It: 'Italien',
  Pt: 'Portugais'
};

export const VOICE_FOR_LANGUAGE = {
  En: 'en-GB',
  Es: 'es-MX',
  De: 'de-DE'
};

export const AUTO_LANGUAGE = 'Auto';
