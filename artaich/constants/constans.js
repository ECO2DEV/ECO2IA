import { loadStripe } from '@stripe/stripe-js';
import { DataPricing } from '../data/pricing';
import { HomeIcon } from '@heroicons/react/24/outline';
import { DataAbout } from '../data/about';

import Photo1 from '../public/Photo1.jpg';
import Photo2 from '../public/Photo2.jpg';
import Photo3 from '../public/Photo3.jpg';
import Photo4 from '../public/Photo4.jpg';

import {
  AcademicCapIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon
} from '@heroicons/react/20/solid';

const PUBLICABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = loadStripe(PUBLICABLE_KEY);

export { stripePromise };

export const strapiToken = process.env.API_TOKEN;
export const strapiUrl = process.env.STRAPI_URL;
export const nextAuthUrl = process.env.NEXTAUTH_URL;

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'ECO2CHAT', href: '/mattchat', icon: HomeIcon, current: true },
  { name: 'ECO2IMAGE', href: '/mattimage', icon: HomeIcon, current: true },
  { name: 'ECO2RAD', href: '/mattraduct', icon: HomeIcon, current: true },
  { name: 'ECO2SPORT', href: '/mattsport', icon: HomeIcon, current: true },
  { name: 'ECO2QCM', href: '/matquiz', icon: HomeIcon, current: true },
  { name: 'ECO2DESC', href: '/matdescription', icon: HomeIcon, current: true },
  { name: 'ECO2RESUME', href: '/mattresum', icon: HomeIcon, current: true },
  { name: 'ECO2CV', href: '/matcv', icon: HomeIcon, current: true }
  // { name: 'Team', href: '#', icon: UsersIcon, current: false },
];

export const modelOptions = [
  { value: 'gpt-3.5-turbo', label: 'MATTECH 1.0' },
  { value: 'gpt-4', label: 'MATTECH 2.0' }
  // { value: 'text-curie-001', label: 'Curie' }
  // { value: 'claude-1', label: 'Claude' }

  // Add more AI models as needed
];

export const header = {
  headers: {
    Authorization: `Bearer ${strapiToken}`,
    'Content-Type': 'application/json'
  }
};

export const SUPPORTED_LENGUAGES = {
  De: 'Allemand',
  En: 'Anglais',
  Es: 'Espagnol',
  Fr: 'Français',
  It: 'Italien',
  Pt: 'Portugais'
};

export const VOICE_FOR_LANGUAGE = {
  En: 'en-GB',
  Es: 'es-MX',
  De: 'de-DE',
  Fr: 'fr-FR'
};

export const AUTO_LANGUAGE = 'Auto';

export const plan_pricing = {
  frequencies: [
    { value: '', label: '' },
    { value: '', label: '' }
  ],
  tiers: [
    {
      name: DataPricing.pricingtitle1,
      id: '',
      href: '#',
      featured: false,
      description: '',
      price: { monthly: DataPricing.amount1, annually: '' },
      priceid: DataPricing.priceid1,
      mainFeatures: [
        DataPricing.pricingfeatures1,
        DataPricing.pricingfeatures1_2,
        DataPricing.pricingfeatures1_3,
        DataPricing.pricingfeatures1_4,
        DataPricing.pricingfeatures1_5
      ],
      cta: DataPricing.pricingbutton1
    },
    {
      name: DataPricing.pricingtitle2,
      id: '',
      href: '#',
      featured: true,
      description: '',
      price: { monthly: DataPricing.amount2, annually: '' },
      //no son distintos los id de los planes
      priceid: DataPricing.priceid2,
      mainFeatures: [
        DataPricing.pricingfeatures2,
        DataPricing.pricingfeatures2_2,
        DataPricing.pricingfeatures2_3,
        DataPricing.pricingfeatures2_4,
        DataPricing.pricingfeatures2_5
      ],
      cta: DataPricing.pricingbutton2
    },
    {
      name: DataPricing.pricingtitle3,
      id: '',
      href: '#',
      featured: false,
      description: '',
      price: { monthly: DataPricing.pricingbutton3, annually: '' },
      mainFeatures: [
        DataPricing.pricingfeatures3,
        DataPricing.pricingfeatutes3_2,
        DataPricing.pricingfeatures3_3,
        DataPricing.pricingfeatures3_4
      ],
      cta: DataPricing.pricingbutton3
    }
  ]
};

export const values = [
  {
    name: DataAbout.aboutworldclass,
    description: DataAbout.aboutworldclassdescription,
    icon: RocketLaunchIcon
  },
  {
    name: DataAbout.aboutresponsibility,
    description: DataAbout.aboutresponsibilitydescription,
    icon: HandRaisedIcon
  },
  {
    name: DataAbout.aboutsupportive,
    description: DataAbout.aboutsupportivedescription,
    icon: UserGroupIcon
  },
  {
    name: DataAbout.aboutlearnign,
    description: DataAbout.aboutlearnigndescription,
    icon: AcademicCapIcon
  },
  {
    name: DataAbout.aboutshareeverything,
    description: DataAbout.aboutshareeverythingdescription,
    icon: SparklesIcon
  },
  {
    name: DataAbout.aboutenjoy,
    description: DataAbout.aboutenjoydescription,
    icon: SunIcon
  }
];

export const team = [
  {
    name: DataAbout.aboutteam1,
    role: DataAbout.aboutteam1jobtitle,
    image: Photo1,
    imageClass: 'centered-image'
  },
  {
    name: DataAbout.aboutteam2,
    role: DataAbout.aboutteam2jobtitle,
    image: Photo2,
    imageClass: 'centered-image'
  },
  {
    name: DataAbout.aboutteam3,
    role: DataAbout.aboutteam3jobtitle,
    image: Photo3
  },
  {
    name: DataAbout.aboutteam4,
    role: DataAbout.aboutteam4jobtitle,
    image: Photo4,
    imageClass: 'centered-image'
  }
  // More people...
];

export const stats = [
  { label: DataAbout.aboutfounded, value: '2023' },
  { label: DataAbout.aboutteam, value: '+10' },
  { label: DataAbout.aboutusers, value: DataAbout.aboutusersvalue },
  { label: DataAbout.aboutiaavaibles, value: DataAbout.aboutiaavaiblesvalue }
];
