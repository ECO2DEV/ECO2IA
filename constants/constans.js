import { loadStripe } from '@stripe/stripe-js';
import { DataPricing } from '../data/pricing';
import { HomeIcon } from '@heroicons/react/24/outline';
import { DataAbout } from '../data/about';
import { DataDashboard } from '../data/dashboard';
import eco2chat from '../public/eco2chat.webp';
import eco2resume from '../public/eco2resume.webp';
import eco2image from '../public/eco2image.webp';
import eco2rad from '../public/eco2rad.webp';
import eco2sport from '../public/eco2sport.webp';
import eco2quiz from '../public/eco2quiz.webp';
import eco2desc from '../public/eco2desc.webp';
import eco2cv from '../public/eco2cv.webp';

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

// const PUBLICABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
// console.log(PUBLICABLE_KEY)
// const stripePromise = loadStripe(PUBLICABLE_KEY);

// export { stripePromise };

export const strapiToken = process.env.API_TOKEN;
export const strapiUrl = process.env.STRAPI_URL;
export const nextAuthUrl = process.env.NEXTAUTH_URL;

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  { name: 'ECO2CHAT', href: '/eco2chat', icon: HomeIcon, current: true },
  { name: 'ECO2IMAGE', href: '/eco2image', icon: HomeIcon, current: true },
  { name: 'ECO2RAD', href: '/eco2traduct', icon: HomeIcon, current: true },
  { name: 'ECO2SPORT', href: '/eco2sport', icon: HomeIcon, current: true },
  { name: 'ECO2QCM', href: '/eco2quiz', icon: HomeIcon, current: true },
  { name: 'ECO2DESC', href: '/eco2description', icon: HomeIcon, current: true },
  { name: 'ECO2RESUME', href: '/eco2resum', icon: HomeIcon, current: true },
  { name: 'ECO2CV', href: '/eco2cv', icon: HomeIcon, current: true }
  // { name: 'Team', href: '#', icon: UsersIcon, current: false },
];

export const modelOptions = [
  { value: 'gpt-3.5-turbo', label: 'ECO2 1.0' },
  { value: 'gpt-4', label: 'ECO2 2.0' }
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
    href: '/eco2chat',
    description:
      'Chatbot especializado en interacción con usuarios, resolver dudas y preguntas frecuentes sobre cualquier tema',
    icon: eco2chat,
    screenShot: '/screenshot/chat_eco2.webp',
    demoLink: '/eco2chat',
    classNames: true,
    index: 1,
    keywords: ['Chat', 'bot', 'ia', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2IMAGE',
    href: '/eco2image',
    description:
      'Creación de imágenes y edición de fotos con inteligencia artificial',
    icon: eco2image,
    screenShot: '/screenshot/dalle_eco2.webp',
    demoLink: '/eco2image',
    classNames: false,
    index: 2,
    keywords: ['Imagen', 'edición', 'dalle', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2TRAD',
    href: '/eco2traduct',
    description: 'Traductor de idiomas con inteligencia artificial',
    icon: eco2rad,
    screenShot: '/screenshot/trad_eco2.webp',
    demoLink: '/eco2traduct',
    classNames: false,
    index: 3,
    keywords: ['Traductor', 'idiomas', 'lenguas', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2SPORT',
    href: '/eco2sport',
    description: 'entrenador personal con inteligencia artificial',
    icon: eco2sport,
    screenShot: '/screenshot/sport_eco2.webp',
    demoLink: '/eco2sport',
    classNames: true,
    index: 4,
    keywords: ['Deporte', 'entrenador', 'personal', 'GYM']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2QUIZ',
    href: '/eco2quiz',
    description:
      'Creador de cuestionarios, quizzes con inteligencia artificial',
    icon: eco2quiz,
    screenShot: '/screenshot/quiz_eco2.webp',
    demoLink: '/eco2quiz',
    classNames: true,
    index: 5,
    keywords: ['Quiz', 'cuestionario', 'preguntas', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2DESC',
    href: '/eco2description',
    description:
      'Creación de copys, descripciones para productos y servicio | marketing digital con inteligencia artificial',
    icon: eco2desc,
    screenShot: '/screenshot/desc_eco2.webp',
    demoLink: '/eco2description',
    classNames: false,
    index: 6,
    keywords: ['Descripcion', 'copys', 'marketing', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2RESUME',
    href: '/eco2resum',
    description:
      'Genarador de resumenes, resumenes de texto con inteligencia artificial',
    icon: eco2resume,
    screenShot: '/screenshot/resum_eco2.webp',
    demoLink: '/eco2resum',
    classNames: false,
    index: 7,
    keywords: ['Resumen', 'Acotar', 'Extracto', 'inteligencia artificia']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'ECO2CV',
    href: '/eco2cv',
    description:
      'Creación de curriculum vitae, hojas de vida con inteligencia artificial',
    icon: eco2cv,
    screenShot: '/screenshot/cv_eco2.webp',
    demoLink: '/eco2cv',
    classNames: false,
    index: 8,
    keywords: ['Curriculum', 'hoja de vida', 'inteligencia artificial']
  }
];

export const actions = [
  {
    title: DataDashboard.Eco2ChatTitle,
    href: 'eco2chat',
    description: DataDashboard.Eco2ChatDescription,
    icon: eco2chat,
    iconForeground: 'text-teal-700',
    iconBackground: 'bg-teal-50'
  },
  {
    title: DataDashboard.Eco2ImageTitle,
    href: 'eco2image',
    description: DataDashboard.Eco2ImageDescription,
    icon: eco2image,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.Eco2TranslateTitle,
    href: 'eco2traduct',
    description: DataDashboard.Eco2TranslateDescription,
    icon: eco2rad,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.Eco2SportTitle,
    href: 'eco2sport',
    description: DataDashboard.Eco2SportDescription,
    icon: eco2sport,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.Eco2QuizTitle,
    href: 'eco2quiz',
    description: DataDashboard.Eco2QuizDescription,
    icon: eco2quiz,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.Eco2DescriptionTitle,
    href: 'eco2description',
    description: DataDashboard.Eco2Description,
    icon: eco2desc,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.Eco2ResumeTitle,
    href: 'eco2resum',
    description: DataDashboard.Eco2Resume,
    icon: eco2resume,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50'
  },
  {
    title: DataDashboard.Eco2CVTitle,
    href: 'eco2cv',
    description: DataDashboard.Eco2CVDescription,
    icon: eco2cv,
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
