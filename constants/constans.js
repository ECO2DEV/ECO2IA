import { loadStripe } from '@stripe/stripe-js';
import { DataPricing } from '../data/pricing';
import { HomeIcon } from '@heroicons/react/24/outline';
import { DataAbout } from '../data/about';
import { DataDashboard } from '../data/dashboard';
import eco2chat from '../public/iconografia/eco2chat.webp';
import eco2resume from '../public/iconografia/eco2resume.webp';
import eco2image from '../public/iconografia/eco2image.webp';
import eco2rad from '../public/iconografia/eco2rad.webp';
import eco2sport from '../public/iconografia/eco2sport.webp';
import eco2quiz from '../public/iconografia/eco2quiz.webp';
import eco2desc from '../public/iconografia/eco2desc.webp';
import eco2cv from '../public/iconografia/eco2cv.webp';

import IA1 from '../public/screenshot/chat_eco2.webp';
import IA2 from '../public/screenshot/sport_eco2.webp';
import IA3 from '../public/screenshot/quiz_eco2.webp';
import IA4 from '../public/screenshot/desc_eco2.webp';
import IA5 from '../public/screenshot/resum_eco2.webp';
import IA6 from '../public/screenshot/cv_eco2.webp';
import IA7 from '../public/screenshot/home.webp';
import IA8 from '../public/screenshot/diagnose.webp';

import metaIcon from '../public/ias/meta-icon.webp';
import gpt3 from '../public/ias/chatgpt3-icon.svg';
import gpt4 from '../public/ias/GPT-4_Logo.svg';
import gemini from '../public/ias/google-gemini-icon.svg';

import { domain, sport, nationality } from './profilecollection';

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
import {
  Consult,
  FileComponent,
  ResultComponent
} from '../components/eco2diagnose/steps';
import {
  Age,
  Days,
  Goal,
  Height,
  Weight
} from '../components/eco2sportcoach/steps';

const PUBLICABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_KEY;
// console.log(PUBLICABLE_KEY);
const stripePromise = loadStripe(PUBLICABLE_KEY);

export { stripePromise };

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
  { value: 'gpt-3.5-turbo', label: 'gpt-3', icon: gpt3 },
  { value: 'gpt-4-turbo', label: 'gpt-4', icon: gpt4 },
  { value: 'gemini-pro', label: 'Gemini', icon: gemini },
  { value: 'llama-v2-70b-chat', label: 'Llama', icon: metaIcon }
  // { value: 'llama-v2-13b-code', label: 'Code', icon: metaIcon }
  // { value: 'claude-1', label: 'Claude' }

  // Add more AI models as needed
];

export const features = [
  {
    name: 'Eco2-chat',
    description:
      'Tu acceso instantáneo a respuestas perfectas.Disfruta de respuestas rápidas y precisas, siempre. Cada pregunta es recibida y contestada con maestría, combinando simplicidad y excelencia para ofrecer soluciones rápidas y exactas. Bienvenido a nuestro santuario de conocimiento, donde la claridad y la eficacia son la norma.',
    imageSrc: IA1,
    imageAlt:
      'Acceso instantáneo a respuestas perfectas con un diseño elegante y preciso.'
  },
  {
    name: 'Eco2-SportCoach',
    description:
      'Comienza tu viaje fitness con planes de entrenamiento personalizados, diseñados específicamente para ti. Nuestra IA fusiona tecnología y bienestar, guiándote hacia tus metas con precisión y eficacia. ¡Inicia hoy con la excelencia en el cuidado de tu cuerpo!',
    imageSrc: IA2,
    imageAlt:
      'Tu entrenador personal de IA para un viaje fitness eficiente y personalizado.'
  },
  {
    name: 'Eco2-Quiz',
    description:
      'Enfrenta tus exámenes con confianza. Nuestra IA genera preguntas y respuestas adaptadas a tus necesidades, haciendo tu preparación más efectiva y enfocada. Deja que la tecnología te guíe hacia el éxito académico con una herramienta personalizada y eficiente.',
    imageSrc: IA3,
    imageAlt:
      'Simplifica tu estudio con IA para una preparación de exámenes efectiva y personalizada.'
  },
  {
    name: 'Eco2-Description',
    description:
      'Supera bloqueos creativos y promociona tus productos con copys cautivadores y efectivos. Nuestra IA genera mensajes persuasivos y personalizados que destacan las características únicas de tus productos. Simplifica tu marketing y despierta el interés de tu audiencia con creatividad impulsada por inteligencia artificial.',
    imageSrc: IA4,
    imageAlt:
      'Potencia tu marketing con IA para copys cautivadores y personalizados.'
  },
  {
    name: 'Eco2-Resum',
    description:
      'Transforma tus textos y documentos en resúmenes concisos y poderosos. Ingresa tu contenido y en segundos, nuestra IA desentraña y destila la esencia de tus palabras. Descubre la magia de la simplicidad informativa y maximiza tu comprensión. Libera tu tiempo con la herramienta definitiva para resumir.',
    imageSrc: IA5,
    imageAlt: 'Simplifica y brilla con IA para resúmenes concisos y poderosos.'
  },
  {
    name: 'Eco2-CV',
    description:
      'Transforma tu información en un currículum impactante con la ayuda de nuestra IA. Simplifica el proceso y destaca tus habilidades y experiencia con un toque creativo e innovador. ¡Destaca en el mercado laboral con un currículum que refleja tu brillantez y deja que la inteligencia artificial impulse tu éxito profesional!',
    imageSrc: IA6,
    imageAlt:
      'Potencia tu carrera con IA para currículums impactantes y creativos.'
  },
  {
    name: 'Renovhome',
    description:
      'Transforma tu espacio con el poder de la inteligencia artificial. RenovHome te ofrece un diseño de interiores innovador y personalizado, adaptado a tus gustos y necesidades. Desde la renovación de espacios hasta la selección de detalles decorativos, nuestra IA simplifica el proceso y da vida a tus ideas. Redefine tu hogar con estilo y precisión, y disfruta de un ambiente único y perfectamente diseñado.',
    imageSrc: IA7,
    imageAlt:
      'Transforma tu espacio con el poder de la inteligencia artificial.'
  },
  {
    name: 'Eco2-Diagnose',
    description:
      'Transforma la lectura de fórmulas médicas y el diagnóstico de enfermedades con nuestra avanzada IA. Analiza documentos y datos médicos con precisión y rapidez, obteniendo diagnósticos y recomendaciones informadas al instante. Simplifica el proceso médico y mejora la precisión en cada diagnóstico con la tecnología de inteligencia artificial de vanguardia.',
    imageSrc: IA8,
    imageAlt:
      'Transforma la lectura de fórmulas médicas y el diagnóstico de enfermedades con nuestra avanzada IA.'
  }
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
    title: 'Eco2Chat',
    href: '/eco2chat',
    description:
      'Chatbot especializado en interacción con usuarios, resolver dudas y preguntas frecuentes sobre cualquier tema',
    icon: '/iconografia/eco2chat.webp',
    screenShot: '/screenshot/chat_eco2.webp',

    classNames: true,
    index: 1,
    keywords: ['Chat', 'bot', 'ia', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'Eco2Dalle',
    href: '/eco2image',
    description:
      'Creación de imágenes y edición de fotos con inteligencia artificial',
    icon: '/iconografia/eco2image.webp',
    screenShot: '/screenshot/dalle_eco2.webp',

    classNames: false,
    index: 2,
    keywords: ['Imagen', 'edición', 'dalle', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'Eco2Traduct',
    href: '/eco2traduct',
    description: 'Traductor de idiomas con inteligencia artificial',
    icon: '/iconografia/eco2rad.webp',
    screenShot: '/screenshot/trad_eco2.webp',

    classNames: false,
    index: 3,
    keywords: ['Traductor', 'idiomas', 'lenguas', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'Eco2Sport',
    href: '/eco2sport',
    description: 'Entrenador personal con inteligencia artificial',
    icon: '/iconografia/eco2sport.webp',
    screenShot: '/screenshot/sport_eco2.webp',

    classNames: true,
    index: 4,
    keywords: ['Deporte', 'entrenador', 'personal', 'GYM']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'Eco2Quiz',
    href: '/eco2quiz',
    description:
      'Creador de cuestionarios, quizzes con inteligencia artificial',
    icon: '/iconografia/eco2quiz.webp',
    screenShot: '/screenshot/quiz_eco2.webp',

    classNames: true,
    index: 5,
    keywords: ['Quiz', 'cuestionario', 'preguntas', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'Eco2Desc',
    href: '/eco2description',
    description:
      'Creación de copys, descripciones para productos y servicio | marketing digital con inteligencia artificial',
    icon: '/iconografia/eco2desc.webp',
    screenShot: '/screenshot/desc_eco2.webp',

    classNames: false,
    index: 6,
    keywords: ['Descripcion', 'copys', 'marketing', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'Eco2Resume',
    href: '/eco2resum',
    description:
      'Genarador de resumenes, resumenes de texto con inteligencia artificial',
    icon: '/iconografia/eco2resume.webp',
    screenShot: '/screenshot/resum_eco2.webp',

    classNames: false,
    index: 7,
    keywords: ['Resumen', 'Acotar', 'Extracto', 'inteligencia artificia']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'Eco2CV',
    href: '/eco2cv',
    description:
      'Creación de curriculum vitae, hojas de vida con inteligencia artificial',
    icon: '/iconografia/eco2cv.webp',
    screenShot: '/screenshot/cv_eco2.webp',

    classNames: false,
    index: 8,
    keywords: ['Curriculum', 'hoja de vida', 'inteligencia artificial']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'Eco2Renov',
    href: '/renovhome',
    description:
      'Renovhome es una aplicación que utiliza inteligencia artificial para ayudar a los usuarios a rediseñar sus espacios',
    icon: '/iconografia/renovicon.webp',
    screenShot: '/screenshot/home.webp',

    classNames: false,
    index: 9,
    keywords: ['Renovhome', 'rediseñar', 'espacios', 'casa', 'hogar']
  },
  {
    id: crypto.randomBytes(16).toString('hex'),
    title: 'Eco2Diagnose',
    href: '/eco2diagnose',
    description:
      'Eco2Diagnose es una aplicación que utiliza inteligencia artificial para ayudar a los usuarios a diagnosticar enfermedades',
    icon: '/iconografia/diagnoseicon.webp'
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

export const stats = [
  { label: DataAbout.aboutfounded, value: '2023' },
  { label: DataAbout.aboutteam, value: '+10' },
  { label: DataAbout.aboutusers, value: DataAbout.aboutusersvalue },
  { label: DataAbout.aboutiaavaibles, value: DataAbout.aboutiaavaiblesvalue }
];

export const AUTO_LANGUAGE = 'Auto';

export const plan_pricing = {
  frequencies: [
    { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
    { value: 'annually', label: 'Annually', priceSuffix: '/year' }
  ],
  tiers: [
    {
      name: DataPricing.pricingFreemiumTitle,
      id: '1',
      href: '#',
      featured: false,
      description: '',
      price: {
        monthly: DataPricing.monthPrice1,
        annually: DataPricing.anuallyPrice1
      },
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
      name: DataPricing.pricingStandardTitle,
      id: '2',
      href: '#',
      featured: true,
      description: '',
      price: {
        monthly: DataPricing.monthPrice2,
        annually: DataPricing.anuallyPrice2
      },
      //no son distintos los id de los planes
      priceid: DataPricing.priceid2,
      mainFeatures: [
        DataPricing.pricingfeatures2,
        DataPricing.pricingfeatures2_2,
        DataPricing.pricingfeatures2_3,
        DataPricing.pricingfeatures2_4
      ],
      cta: DataPricing.pricingbutton2
    },
    {
      name: DataPricing.pricingPremiumTitle,
      id: '3',
      href: '#',
      featured: false,
      description: '',
      price: {
        monthly: DataPricing.monthPrice3,
        annually: DataPricing.anuallyPrice3
      },
      priceid: DataPricing.priceid3,
      mainFeatures: [
        DataPricing.pricingfeatures3,
        DataPricing.pricingfeatures3_2,
        DataPricing.pricingfeatures3_3,
        DataPricing.pricingfeatures3_4
      ],
      cta: DataPricing.pricingbutton3
    },
    {
      name: DataPricing.pricingEnterpriseTitle,
      id: '4',
      href: '#',
      featured: false,
      description: '',
      price: {
        monthly: DataPricing.monthPrice4,
        annually: DataPricing.anuallyPrice4
      },
      mainFeatures: [
        DataPricing.pricingfeatures4,
        DataPricing.pricingfeatures4_2,
        DataPricing.pricingfeatures4_3,
        DataPricing.pricingfeatures4_4,
        DataPricing.pricingfeatures4_5
      ],
      cta: DataPricing.pricingbutton4
    }
  ]
};

export const steps = [
  {
    id: 1,
    name: 'imageStep',
    title: 'Subir imagen',
    component: ImageStep,
    status: 'current'
  },
  {
    id: 2,
    name: 'maskImageStep',
    title: 'Máscara zona de interés',
    component: MaskImageStep,
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'formStep',
    title: 'Datos del nuevo diseño',
    component: FormStep,
    status: 'upcoming'
  },
  {
    id: 4,
    name: 'outputImgStep',
    title: 'Resultado final',
    component: OutputImgStep,
    status: 'upcoming'
  }
];

export const stepsGym = [
  {
    id: 1,
    step: 'Step 1',
    name: '¿Cuál es tu peso(kgs) ?',
    component: Weight,
    phare: `"No pain, no gain."`,
    status: 'current',
    image: '/gym/01.webp'
  },
  {
    id: 2,
    step: 'step 2',
    name: '¿Cuál es tu edad ?',
    component: Age,
    phare: `"Hazlo posible."`,
    image: '/gym/03.webp',
    status: 'upcoming'
  },
  {
    id: 3,
    step: 'Step 3',
    name: '¿Cuanto mides (mts) ?',
    component: Height,
    phare: `"El dolor es temporal, el orgullo es para siempre."`,
    status: 'upcoming',
    image: '/gym/04.webp'
  },
  {
    id: 4,
    step: 'Step 4',
    name: '¿Cuál es tu objetivo ?',
    component: Goal,
    phare: `"No cuentes los días, haz que los días cuenten."`,
    status: 'upcoming',
    image: '/gym/02.webp'
  },
  {
    id: 5,
    step: 'Step 5',
    name: '¿De cuantos días quieres la rutina ?',
    component: Days,
    phare: `"El único mal entrenamiento es el que no se hace."`,
    status: 'upcoming',
    image: '/gym/workout.webp'
  }
];

export const stepsDiagnose = [
  {
    id: 1,
    name: 'Consulta',
    title: 'Consulta médica',
    component: Consult,
    status: '1%'
  },
  {
    id: 2,
    name: 'Archivo',
    title: 'Cargar archivo',
    component: FileComponent,
    status: '50%'
  },
  {
    id: 3,
    name: 'Resultado',
    title: 'Resultado final',
    component: ResultComponent,
    status: '100%'
  }
];

export const roomOptions = [
  { value: 'Sala-de-estar', label: 'Sala de estar' },
  { value: 'Dormitorio', label: 'Dormitorio' },
  { value: 'Baño', label: 'Baño' },
  { value: 'Sala-de-estudio', label: 'Sala de estudio' },
  { value: 'Cocina', label: 'Cocina' },
  { value: 'Comedor', label: 'Comedor' },
  { value: 'Oficina', label: 'Oficina' },
  { value: 'Exterior', label: 'Exterior' }
];

export const aiInterventionOptions = [
  { value: 'Alta-Intervención-de-AI', label: 'Intervención Extrema de IA' },
  { value: 'Intervención-Media', label: 'Intervención Media' },
  { value: 'Baja-Intervención-de-AI', label: 'Intervención Baja de IA' },
  { value: 'Muy-Baja-Intervención-de-AI', label: 'Intervención Muy Baja de IA' }
];

export const aiModeOptions = [
  { value: 'Rediseño-bello', label: 'Rediseño Hermoso' },
  { value: 'Rediseño-creativo', label: 'Rediseño Creativo' },
  { value: 'Llenar-la-habitación', label: 'Llenar la Habitación' },
  { value: 'Ecléctico', label: 'Ecléctico' },
  { value: 'Minimalista', label: 'Minimalista' },
  { value: 'Oasis-vibrante', label: 'Oasis Vibrante' },
  { value: 'Chic-urbano', label: 'Chic Urbano' },
  { value: 'Refugio-acogedor', label: 'Refugio Acogedor' },
  { value: 'Elegancia-moderna', label: 'Elegancia Moderna' },
  { value: 'Encanto-rústico', label: 'Encanto Rústico' }
];

export const designStyleOptions = [
  { value: 'Contemporáneo', label: 'Contemporáneo' },
  { value: 'Tradicional', label: 'Tradicional' },
  {
    value: 'Moderno-de-mediados-de-siglo',
    label: 'Moderno de Mediados de Siglo'
  },
  { value: 'Industrial', label: 'Industrial' },
  { value: 'Bohemio', label: 'Bohemio' },
  { value: 'Escandinavo', label: 'Escandinavo' },
  { value: 'Rústico', label: 'Rústico' },
  { value: 'Vintage', label: 'Vintage' },
  { value: 'Costero', label: 'Costero' },
  { value: 'Transicional', label: 'Transicional' }
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

export const domainSelect = domain.map((opcion) => (
  <option key={opcion} value={opcion}>
    {opcion}
  </option>
));

export const sportSelect = sport.map((opcion) => (
  <option key={opcion} value={opcion}>
    {opcion}
  </option>
));

export const nacionalitySelect = nationality.map((opcion) => (
  <option key={opcion} value={opcion}>
    {opcion}
  </option>
));
