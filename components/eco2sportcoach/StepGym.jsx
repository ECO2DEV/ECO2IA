import { stepsGym } from "../../constants/constans"

export default function StepGym({setCurrentStep}) {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="space-y-4 md:flex md:space-x-8 md:space-y-0 mx-8 sm:mx-14"
      >
        {stepsGym.map((step) => (
          <li key={step.name} className="md:flex-1">
            {step.status === 'complete' ? (
              <button
              onClick={()=> setCurrentStep(step.id)}
                className="group flex flex-col py-2 pl-4 border-l-4 border-darkHoverColor hover:border-darkColor dark:border-eco2HoverColor dark:hover:border-eco2HoverColor md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              >
                <span className="text-sm font-medium text-black dark:text-white group-hover:text-eco2HoverColor">
                  {step.id}
                </span>
                <span className="text-sm font-medium ">{step.name}</span>
              </button>
            ) : step.status === 'current' ? (
              <button
              onClick={()=> setCurrentStep(step.id)}
                className="flex flex-col border-l-4 border-eco2MainColor py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-sm font-medium text-eco2MainColor">
                  {step.id}
                </span>
                <span className="text-sm font-medium text-pretty ">{step.name}</span>
              </button>
            ) : (
              <button
              onClick={()=> setCurrentStep(step.id)}
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              >
                <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium hover:scale-110 transition-all duration-300">{step.name}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
