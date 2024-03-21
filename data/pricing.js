const STANDARD_PLAN = process.env.NEXT_PUBLIC_STANDARD_PLAN;
const FREEMIUM_PLAN = process.env.NEXT_PUBLIC_FREEMIUM_PLAN;
const PREMIUM_PLAN = process.env.NEXT_PUBLIC_PREMIUM_PLAN;

export const DataPricing = {
  pricingmaintitle: 'Tarifas',
  pricingmaindescription: 'Planes tarifarios para todo tipo de necesidades.',
  pricingFreemiumTitle: 'FREEMIUM',
  pricingdescription: 'El paquete incluye:',
  pricingfeatures1: '- Acceso limitado a Eco2Chat y Eco2Dalle.',
  pricingfeatures1_2: '- Hasta 5 solicitudes mensuales permitidas.',
  pricingfeatures1_3: '- Comunicación básica y organización de tareas.',
  pricingfeatures1_4:
    '- Funcionalidades esenciales para mantenerse productivo.',
  pricingfeatures1_5:
    '- Suscripción freemium para usuarios que desean probar nuestras herramientas.',
  pricingbutton1: '0 $',
  monthPrice1: 0,
  anuallyPrice1: 0,
  priceid1: `${FREEMIUM_PLAN}`,
  pricingStandardTitle: 'STANDARD',
  pricingfeatures2:
    '- Acceso completo e ilimitado a Eco2Dalle, Eco2Chat, Eco2CV y Eco2Quiz.',
  pricingfeatures2_2:
    '- Herramientas potentes para comunicación, organización, generación de contenido y evaluación.',
  pricingfeatures2_3:
    '- Todas las funcionalidades disponibles para llevar tus proyectos al siguiente nivel.',
  pricingfeatures2_4:
    '- Suscripción estándar para usuarios que buscan un acceso sin restricciones a nuestras inteligencias artificiales.',
  pricingbutton2: '15.000 $',
  monthPrice2: 15000,
  anuallyPrice2: 180000,
  priceid2: `${STANDARD_PLAN}`,
  pricingPremiumTitle: 'PREMIUM',
  pricingprice3: 'Personalizado',
  pricingfeatures3:
    '- Acceso ilimitado a todas nuestras inteligencias artificiales seleccionadas por el usuario.',
  pricingfeatures3_2:
    '- Funciones avanzadas como sin publicidad y respuestas en tiempo real para una experiencia sin interrupciones.',
  pricingfeatures3_3:
    '- Uso sin limitaciones de varios modelos para abordar diversas necesidades y proyectos.',
  pricingfeatures3_4:
    '- Maximiza tus ingresos y alcanza tus objetivos más ambiciosos con todas las herramientas que necesitas a tu disposición.',
  pricingbutton3: '20.000 $',
  monthPrice3: 20000,
  anuallyPrice3: 200000,
  priceid3: `${PREMIUM_PLAN}`,
  pricingEnterpriseTitle: 'ENTERPRISE',
  pricingfeatures4: '- Productos ilimitados.',
  pricingfeatures4_2: '- 108000 palabras al mes.',
  pricingfeatures4_3: '- SAV.',
  pricingfeatures4_4: '- Acceso a actualizaciones regulares de la IA.',
  pricingfeatures4_5: '- Precio asequible para empresas de todos los tamaños.',
  pricingbutton4: 'Contactanos',
  monthPrice4: 'none',
  anuallyPrice4: 'none',
  PaymentFrequency: 'Frecuencia de pago.',
  priceid4: 'Personalizado'
};

// export const DataPricing = {
//   pricingmaintitle: 'Tarifas',
//   pricingmaindescription: 'Planes tarifarios para todo tipo de necesidades.',
//   pricingtitle1: 'FREEMIUM',
//   pricingdescription: 'El paquete incluye:',
//   pricingfeatures1: '30 imágenes al mes.',
//   pricingfeatures1_2: '54,000 palabras al mes.',
//   pricingfeatures1_3: 'SAV',
//   pricingfeatures1_4: 'Acceso a actualizaciones regulares de la IA.',
//   pricingfeatures1_5: 'Precio asequible para Freemiums.',
//   pricingbutton1: '1$',
//   amount1: 5,
//   priceid1: `${FREEMIUM_PLAN}`,
//   pricingtitle2: 'STANDARD',
//   pricingfeatures2: '75 imágenes al mes',
//   pricingfeatures2_2: '108000 palabras al mes',
//   pricingfeatures2_3: 'SAV',
//   pricingfeatures2_4: 'Acceso a actualizaciones regulares de la IA.',
//   pricingfeatures2_5:
//     'Precio asequible para Freemiums, profesionales independientes y pequeñas empresas',
//   pricingbutton2: '50000$',
//   amount2: 10,
//   priceid2: `${STANDARD_PLAN}`,
//   pricingtitle3: 'PREMIUM',
//   pricingprice3: 'Personalizado',
//   pricingfeatures3: 'Productos ilimitados.',
//   pricingfeatutes3_2: 'Suscriptores ilimitados',
//   pricingfeatures3_3: 'Analisis avanzados',
//   pricingfeatures3_4: 'Soporte postventa dedicado.',
//   pricingbutton3: '75000',
//   priceid3: `${PREMIUM_PLAN}`,
//   pricingtitle4: 'ENTERPRISE',
//   pricingfeatures4: 'Productos ilimitados.',
//   pricingfeatures4_2: '108000 palabras al mes',
//   pricingfeatures4_3: 'SAV',
//   pricingfeatures4_4: 'Acceso a actualizaciones regulares de la IA.',
//   pricingfeatures4_5:
//     'Precio asequible para Freemiums, profesionales independientes y pequeñas empresas',
//   pricingbutton4: 'none',
//   PaymentFrequency: 'Frecuencia de pago.',
//   priceid4: 'Personalizado'
// };
