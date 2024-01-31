import { PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid';
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon
} from '@heroicons/react/24/outline';

export const products = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of your traffic',
    href: '#',
    icon: ChartPieIcon
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers',
    href: '#',
    icon: CursorArrowRaysIcon
  },
  {
    name: 'Security',
    description: 'Your customers’ data will be safe and secure',
    href: '#',
    icon: FingerPrintIcon
  },
  {
    name: 'Integrations',
    description: 'Connect with third-party tools',
    href: '#',
    icon: SquaresPlusIcon
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will convert',
    href: '#',
    icon: ArrowPathIcon
  }
];
export const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon }
];

export const DataNavbar = {
  COMPANY_NAME: 'ECO²',
  menu_opt_1: 'Producto',
  menu_opt_2: 'Nuestros servicios',
  menu_opt_3: 'Suscripciones',
  menu_opt_4: 'Nuestra empresa',
  menu_opt_5: 'Contáctenos',
  login_option: 'Conectarse'
};
