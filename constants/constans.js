import { loadStripe } from '@stripe/stripe-js';
import { DataPricing } from '../data/pricing';
import { HomeIcon } from '@heroicons/react/24/outline';
import { DataAbout } from '../data/about';
import { DataDashboard } from '../data/dashboard';
import mattchat from '../public/mattchat.webp';
import mattresume from '../public/mattresume.webp';
import mattimage from '../public/mattimage.webp';
import mattrad from '../public/mattrad.webp';
import mattsport from '../public/mattsport.webp';
import mattquiz from '../public/mattquiz.webp';
import mattdesc from '../public/mattdesc.webp';
import mattcv from '../public/mattcv.webp';

import Photo1 from '../public/Photo1.webp';
import Photo2 from '../public/Photo2.webp';
import Photo3 from '../public/Photo3.webp';
import Photo4 from '../public/Photo4.webp';

import {
  AcademicCapIcon,
  HandRaisedIcon,
  RocketLaunchIcon,
  SparklesIcon,
  SunIcon,
  UserGroupIcon
} from '@heroicons/react/20/solid';

import crypto from 'crypto';
import ImageStep from '../components/steps_renovhome/ImageStep';
import MaskImageStep from '../components/steps_renovhome/MaskImageStep';
import FormStep from '../components/steps_renovhome/FormStep';
import { OutputImgStep } from '../components/steps_renovhome/OutputImgStep';

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
  { name: 'ECO2TRAD', href: '/mattraduct', icon: HomeIcon, current: true },
  { name: 'ECO2TSPORT', href: '/mattsport', icon: HomeIcon, current: true },
  { name: 'ECO2QUIZ', href: '/matquiz', icon: HomeIcon, current: true },
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
  De: 'Aleman',
  En: 'Ingles',
  Es: 'Español',
  Fr: 'Frances',
  It: 'Italiano',
  Pt: 'Portugues'
};

export const VOICE_FOR_LANGUAGE = {
  En: 'en-GB',
  Es: 'es-MX',
  De: 'de-DE',
  Fr: 'fr-FR'
};

export const IA_CARDS = [
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2CHAT',
    href: '/mattchat',
    description:
      'Chatbot especializado en interacción con usuarios, resolver dudas y preguntas frecuentes sobre cualquier tema',
    icon: mattchat,
    screenShot: '/screenshot/chat_eco2.webp',
    demoLink: '/mattchat',
    classNames: true,
    index: 1,
    keywords: ['Chat', 'bot', 'ia', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2IMAGE',
    href: '/mattimage',
    description:
      'Creación de imágenes y edición de fotos con inteligencia artificial',
    icon: mattimage,
    screenShot: '/screenshot/dalle_eco2.webp',
    demoLink: '/matimage',
    classNames: false,
    index: 2,
    keywords: ['Imagen', 'edición', 'dalle', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2TRAD',
    href: '/mattraduct',
    description: 'Traductor de idiomas con inteligencia artificial',
    icon: mattrad,
    screenShot: '/screenshot/trad_eco2.webp',
    demoLink: '/mattraduct',
    classNames: false,
    index: 3,
    keywords: ['Traductor', 'idiomas', 'lenguas', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2SPORT',
    href: '/mattsport',
    description: 'entrenador personal con inteligencia artificial',
    icon: mattsport,
    screenShot: '/screenshot/sport_eco2.webp',
    demoLink: '/mattsport',
    classNames: true,
    index: 4,
    keywords: ['Deporte', 'entrenador', 'personal', 'GYM']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2QUIZ',
    href: '/matquiz',
    description:
      'Creador de cuestionarios, quizzes con inteligencia artificial',
    icon: mattquiz,
    screenShot: '/screenshot/quiz_eco2.webp',
    demoLink: '/matquiz',
    classNames: true,
    index: 5,
    keywords: ['Quiz', 'cuestionario', 'preguntas', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2DESC',
    href: '/matdescription',
    description:
      'Creación de copys, descripciones para productos y servicio | marketing digital con inteligencia artificial',
    icon: mattdesc,
    screenShot: '/screenshot/desc_eco2.webp',
    demoLink: '/matdescription',
    classNames: false,
    index: 6,
    keywords: ['Descripcion', 'copys', 'marketing', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2RESUME',
    href: '/mattresum',
    description:
      'Genarador de resumenes, resumenes de texto con inteligencia artificial',
    icon: mattresume,
    screenShot: '/screenshot/resum_eco2.webp',
    demoLink: '/mattresum',
    classNames: false,
    index: 7,
    keywords: ['Resumen', 'Acotar', 'Extracto', 'inteligencia artificia']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2CV',
    href: '/matcv',
    description:
      'Creación de curriculum vitae, hojas de vida con inteligencia artificial',
    icon: mattcv,
    screenShot: '/screenshot/cv_eco2.webp',
    demoLink: '/matcv',
    classNames: false,
    index: 8,
    keywords: ['Curriculum', 'hoja de vida', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2RENOVHOME',
    href: '/renovhome',
    description:
      'Renovhome es una aplicación que utiliza inteligencia artificial para ayudar a los usuarios a rediseñar sus espacios',
    icon: mattcv,
    screenShot: '/screenshot/cv_eco2.webp',
    demoLink: '/renovhome',
    classNames: false,
    index: 9,
    keywords: ['Renovhome', 'rediseñar', 'espacios', 'casa', 'hogar']
  }
];

export const actions = [
  {
    title: DataDashboard.MattechChatTitle,
    href: 'mattchat',
    description: DataDashboard.MattechChatDescription,
    icon: mattchat,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50'
  },
  {
    title: DataDashboard.MattechImageTitle,
    href: 'mattimage',
    description: DataDashboard.MattechImageDescription,
    icon: mattimage,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MatTranslateTitle,
    href: 'mattraduct',
    description: DataDashboard.MatTranslateDescription,
    icon: mattrad,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattSportTitle,
    href: 'mattsport',
    description: DataDashboard.MattSportDescription,
    icon: mattsport,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattQuizTitle,
    href: 'matquiz',
    description: DataDashboard.MattQuizDescription,
    icon: mattquiz,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattDescriptionTitle,
    href: 'matdescription',
    description: DataDashboard.MattDescription,
    icon: mattdesc,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MattResumeTitle,
    href: 'mattresum',
    description: DataDashboard.MattResume,
    icon: mattresume,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.MatCVTitle,
    href: 'matcv',
    description: DataDashboard.MatCVDescription,
    icon: mattcv,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  }
  // {
  //   title: 'Schedule a one-on-one',
  //   href: '#',
  //   icon: UsersIcon,
  //   iconForeground: 'text-sky-700',
  //   iconBackground: 'bg-sky-50',
  // },
  // {
  //   title: 'Payroll',
  //   href: '#',
  //   icon: BanknotesIcon,
  //   iconForeground: 'text-yellow-700',
  //   iconBackground: 'bg-yellow-50',
  // },
  // {
  //   title: 'Submit an expense',
  //   href: '#',
  //   icon: ReceiptRefundIcon,
  //   iconForeground: 'text-rose-700',
  //   iconBackground: 'bg-rose-50',
  // },
  // {
  //   title: 'Training',
  //   href: '#',
  //   icon: AcademicCapIcon,
  //   iconForeground: 'text-indigo-700',
  //   iconBackground: 'bg-indigo-50',
  // },
];

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
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

export const steps = [
  {
    id: 1,
    name: 'imageStep',
    title: 'Upload Image',
    component: ImageStep,
    status: 'current'
  },
  {
    id: 2,
    name: 'maskImageStep',
    title: 'Mask Image',
    component: MaskImageStep,
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'formStep',
    title: 'Provide Details',
    component: FormStep,
    status: 'upcoming'
  },
  {
    id: 4,
    name: 'outputImgStep',
    title: 'Output Image',
    component: OutputImgStep,
    status: 'upcoming'
  }
];

export const roomOptions = [
  { value: 'Living-room', label: 'Living room' },
  { value: 'Bedroom', label: 'Bedroom' },
  { value: 'Bathroom', label: 'Bathroom' },
  { value: 'Study-Room', label: 'Study Room' },
  { value: 'Kitchen', label: 'Kitchen' },
  { value: 'Dining-Room', label: 'Dining Room' },
  { value: 'Office', label: 'Office' },
  { value: 'Outdoor', label: 'Outdoor' }
];

export const aiInterventionOptions = [
  { value: 'high-AI-Intervention', label: 'Extrema AI Intervention' },
  { value: 'Medium-Intervention', label: 'Medium Intervention' },
  { value: 'Low-AI-Intervention', label: 'Low AI Intervention' },
  { value: 'Very-Low-AI-Intervention', label: 'Very Low AI Intervention' }
];
export const aiModeOptions = [
  { value: 'beautiful-redesign', label: 'Beautiful Redesign' },
  { value: 'creative-redesign', label: 'Creative Redesign' },
  { value: 'fill-the-room', label: 'Fill The Room' },
  { value: 'eclectic', label: 'Eclectic' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'vibrant-oasis', label: 'Vibrant Oasis' },
  { value: 'urban-chic', label: 'Urban Chic' },
  { value: 'cozy-retreat', label: 'Cozy Retreat' },
  { value: 'modern-elegance', label: 'Modern Elegance' },
  { value: 'rustic-charm', label: 'Rustic Charm' }
];

export const designStyleOptions = [
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'mid-century-modern', label: 'Mid-Century Modern' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'scandinavian', label: 'Scandinavian' },
  { value: 'farmhouse', label: 'Farmhouse' },
  { value: 'vintage', label: 'Vintage' },
  { value: 'coastal', label: 'Coastal' },
  { value: 'transitional', label: 'Transitional' }
];

export const numberDesignsOptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' }
];
