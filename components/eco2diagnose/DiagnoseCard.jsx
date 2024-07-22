import Image from 'next/image';
import ReactMarkdown from 'react-markdown';


export default function DiagnoseCard({ formData }) {
  const today = new Date();
  const date = today.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className=" space-y-16 border-t border-gray-200 pt-4 sm:mt-4 sm:pt-4 mx-2 sm:mx-0">
      <article className="flex max-w-2xl lg:max-w-4xl flex-col items-start justify-between">
        <div className="flex items-center gap-x-4 text-xs">
          <time className="text-gray-500">{date}</time>
          <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            Este es tu diagnóstico
          </p>
        </div>
        <div className="group relative">
          <div className=" mt-8 flex items-center gap-x-4">
            <Image
              width={50}
              height={50}
              src="/LogoECO2Verde.png"
              alt="Maria eco2"
              className="bg-contain bg-center bg-no-repeat rounded-full bg-gray-50"
            />
            <div className="text-sm leading-6">
              <p className="font-semibold dark:text-gray-100 text-gray-900">
                <span className="absolute inset-0" />
                MarIA ✨
              </p>
              <p className="text-gray-800 dark:text-gray-200">Eco2 Diagnose </p>
            </div>
          </div>

          {formData.result ? (
            <div className="mt-1  text-sm leading-6  text-gray-600 dark:text-gray-100 h-72 ">
             <ReactMarkdown
              
              >
                {formData.result}
              </ReactMarkdown>
            </div>
          ) : (
            <p className="mt-5 line-clamp-3 text-sm leading-6  text-gray-600 dark:text-gray-100">
              Por favor, completa los pasos para obtener tu diagnóstico
            </p>
          )}
        </div>
      </article>
    </div>
  );
}
