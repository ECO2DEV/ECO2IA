import { twMerge } from "tailwind-merge";





export const ChatBotIcon = ({customClasses=""}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge("icon icon-tabler icons-tabler-outline icon-tabler-message-chatbot", customClasses)}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z" />
      <path d="M9.5 9h.01" />
      <path d="M14.5 9h.01" />
      <path d="M9.5 13a3.5 3.5 0 0 0 5 0" />
    </svg>
  );
}


export const TraductorIcon = ({customClasses=""}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge("icon icon-tabler icons-tabler-outline icon-tabler-language", customClasses)}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 5h7" />
      <path d="M9 3v2c0 4.418 -2.239 8 -5 8" />
      <path d="M5 9c0 2.144 2.952 3.908 6.7 4" />
      <path d="M12 20l4 -9l4 9" />
      <path d="M19.1 18h-6.2" />
    </svg>
  );
}

export const SportIcon = ({customClasses=""}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge(
        'icon icon-tabler icons-tabler-outline icon-tabler-stretching',
        customClasses
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M5 20l5 -.5l1 -2" />
      <path d="M18 20v-5h-5.5l2.5 -6.5l-5.5 1l1.5 2" />
    </svg>
  );
}

export const QuizIcon = ({customClasses=""}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge(
        'icon icon-tabler icons-tabler-outline icon-tabler-notes',
        customClasses
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
      <path d="M9 7l6 0" />
      <path d="M9 11l6 0" />
      <path d="M9 15l4 0" />
    </svg>
  );
}


export const MarketingIcon = ({customClasses=""}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"

      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    
      className={twMerge(
        'icon icon-tabler icons-tabler-filled icon-tabler-ad-circle',
        customClasses
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10c-5.43 0 -9.848 -4.327 -9.996 -9.72l-.004 -.28l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm-3.5 6a2.5 2.5 0 0 0 -2.495 2.336l-.005 .164v4.5l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-1h1v1l.007 .117a1 1 0 0 0 1.986 0l.007 -.117v-4.5l-.005 -.164a2.5 2.5 0 0 0 -2.495 -2.336zm6.5 0h-1a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h1a3 3 0 0 0 3 -3v-2a3 3 0 0 0 -3 -3zm0 2a1 1 0 0 1 1 1v2a1 1 0 0 1 -.883 .993l-.117 .007v-4zm-6.5 0a.5 .5 0 0 1 .492 .41l.008 .09v1.5h-1v-1.5l.008 -.09a.5 .5 0 0 1 .492 -.41z" />
    </svg>
  );
}

export const ResumeIcon = ({customClasses=""}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge(
        'icon icon-tabler icons-tabler-outline icon-tabler-report-analytics',
        customClasses
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
      <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
      <path d="M9 17v-5" />
      <path d="M12 17v-1" />
      <path d="M15 17v-3" />
    </svg>
  );
}

export const CVIcon = ({customClasses=""}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge(
        'icon icon-tabler icons-tabler-outline icon-tabler-notebook',
        customClasses
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 4h11a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-11a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1m3 0v18" />
      <path d="M13 8l2 0" />
      <path d="M13 12l2 0" />
    </svg>
  );
}

export const RenovIcon = ({customClasses=""}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge(
        'icon icon-tabler icons-tabler-outline icon-tabler-home-edit',
        customClasses
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 21v-6a2 2 0 0 1 2 -2h2c.645 0 1.218 .305 1.584 .78" />
      <path d="M20 11l-8 -8l-9 9h2v7a2 2 0 0 0 2 2h4" />
      <path d="M18.42 15.61a2.1 2.1 0 0 1 2.97 2.97l-3.39 3.42h-3v-3l3.42 -3.39z" />
    </svg>
  );
}

export const DalleIcon = ({ customClasses = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge(
        'icon icon-tabler icons-tabler-outline icon-tabler-photo-scan',
        customClasses
      )}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 8h.01" />
      <path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" />
      <path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" />
      <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
      <path d="M4 16v2a2 2 0 0 0 2 2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
    </svg>
  );
};

export const DiagnoseIcon = ({ customClasses = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={twMerge("icon icon-tabler icons-tabler-outline icon-tabler-heartbeat", customClasses)}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572" />
      <path d="M3 13h2l2 3l2 -6l1 3h3" />
    </svg>
  );
};
export const DashboardComponents = [
  {
    title: 'Eco2Chat',
    description: 'ChatBot',
    icon: ChatBotIcon
  },
  {
    title: 'Eco2Traduct',
    description: 'Traductor',
    icon: TraductorIcon
  },
  {
    title: 'Eco2Sport',
    description: 'Entrenador personal',
    icon: SportIcon
  },
  {
    title: 'Eco2Quiz',
    description: 'Quiz',
    icon: QuizIcon
  },
  {
    title: 'Eco2Desc',
    description: 'CopyRight',
    icon: MarketingIcon
  },
  {
    title: 'Eco2Resume',
    description: 'Resumen',
    icon: ResumeIcon
  },
  {
    title: 'Eco2CV',
    description: 'Curriculum',
    icon: CVIcon
  },
  {
    title: 'Eco2Renov',
    description: 'Casa Renovada',
    icon: RenovIcon
  },
  {
    title: 'Eco2Dalle',
    description: 'Dalle',
    icon: DalleIcon
  },
  {
    title: 'Eco2Diagnose',
    description: 'Diagnóstico',
    icon: DiagnoseIcon
  }
];
