const STANDARD_PLAN = process.env.NEXT_PUBLIC_STANDARD_PLAN;
const STUDENT_PLAN = process.env.NEXT_PUBLIC_STUDENT_PLAN;
export const DataPricing = {
  pricingmaintitle: 'Tarification',
  pricingmaindescription: 'Plans tarifaires pour tous les types de besoins',
  pricingtitle1: 'ETUDIANT',
  pricingdescription: 'Le pack comprend:',
  pricingfeatures1: '30 images par mois',
  pricingfeatures1_2: '54000 mots par mois',
  pricingfeatures1_3: 'SAV',
  pricingfeatures1_4: 'Accès à des mises à jour régulières de l’IA',
  pricingfeatures1_5: 'Prix abordable pour les etudiants',
  pricingbutton1: '5€',
  amount1: 5,
  priceid1: `${STUDENT_PLAN}`,
  pricingtitle2: 'STANDARD',
  pricingfeatures2: '75 images par mois',
  pricingfeatures2_2: '108000 mots par mois',
  pricingfeatures2_3: 'SAV',
  pricingfeatures2_4: 'Accès à des mises à jour régulières de l’IA',
  pricingfeatures2_5:
    'Prix compétitif pour les particuliers et les petites enterprises',
  pricingbutton2: '10€',
  amount2: 10,
  priceid2: `${STANDARD_PLAN}`,
  pricingtitle3: 'ENTREPRISE',
  pricingprice3: 'Sur mesure',
  pricingfeatures3: 'Produits illimités',
  pricingfeatutes3_2: 'Abonnés illimités',
  pricingfeatures3_3: 'Analyses avancées',
  pricingfeatures3_4: 'SAV dédié',
  pricingbutton3: 'Veuillez contacter le service commercial',
  PaymentFrequency: 'Fréquence de paiement'
};