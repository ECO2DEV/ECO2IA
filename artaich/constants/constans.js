export const strapiToken = process.env.API_TOKEN;
export const strapiUrl = process.env.STRAPI_URL;

export const header = {
  headers: {
    Authorization: `Bearer ${strapiToken}`,
    'Content-Type': 'application/json'
  }
};
