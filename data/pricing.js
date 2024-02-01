const STANDARD_PLAN = process.env.NEXT_PUBLIC_STANDARD_PLAN;
const STUDENT_PLAN = process.env.NEXT_PUBLIC_STUDENT_PLAN;
export const DataPricing = {
  pricingmaintitle: 'Tarifas',
  pricingmaindescription: 'Planes tarifarios para todo tipo de necesidades.',
  pricingtitle1: 'ESTUDIANTE',
  pricingdescription: 'El paquete incluye:',
  pricingfeatures1: '30 imágenes al mes.',
  pricingfeatures1_2: '54,000 palabras al mes.',
  pricingfeatures1_3: 'SAV',
  pricingfeatures1_4: 'Acceso a actualizaciones regulares de la IA.',
  pricingfeatures1_5: 'Precio asequible para estudiantes.',
  pricingbutton1: '5€',
  amount1: 5,
  priceid1: `${STUDENT_PLAN}`,
  pricingtitle2: 'STANDARD',
  pricingfeatures2: '75 imágenes al mes',
  pricingfeatures2_2: '108000 palabras al mes',
  pricingfeatures2_3: 'SAV',
  pricingfeatures2_4: 'Acceso a actualizaciones regulares de la IA.',
  pricingfeatures2_5:
    'Precio asequible para estudiantes, profesionales independientes y pequeñas empresas',
  pricingbutton2: '10€',
  amount2: 10,
  priceid2: `${STANDARD_PLAN}`,
  pricingtitle3: 'Empresarial',
  pricingprice3: 'Personalizado',
  pricingfeatures3: 'Productos ilimitados.',
  pricingfeatutes3_2: 'Suscriptores ilimitados',
  pricingfeatures3_3: 'Analisis avanzados',
  pricingfeatures3_4: 'Soporte postventa dedicado.',
  pricingbutton3: 'Por favor, contacte con el servicio comercial.',
  PaymentFrequency: 'Frecuencia de pago.'
};
