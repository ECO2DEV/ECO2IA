import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
export const DataFeatures = {
  title: 'ECO² Bienvenidos al ecosistema: conoce nuestros beneficios',
  title1: '',
  maintext_features: ''
};
export const features = [
  {
    name: 'Confiabilidad',
    description:
      'Nuestras IA han pasado por exhaustivas pruebas y controles para ofrecerle resultados precisos y fiables.',
    icon: FingerPrintIcon
  },
  {
    name: 'Seguridad',
    description:
      'Empleamos la última tecnología en servidores y software para garantizar una seguridad óptima en nuestras soluciones de IA.',
    icon: LockClosedIcon
  },
  {
    name: 'Calidad',
    description:
      'Comprometidos con la excelencia, nuestras IA están probadas y verificadas para entregar un rendimiento de vanguardia.',
    icon: ArrowPathIcon
  },
  {
    name: 'SAV (Servicio de Atención al Cliente)',
    description:
      'Nuestro equipo está listo para brindar asistencia rápida y resolver sus dudas o problemas con eficacia.',
    icon: CloudArrowUpIcon
  }
];
