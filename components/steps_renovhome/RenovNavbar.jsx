import { steps,classNames } from "../../constants/constans"
import { CheckIcon } from '@heroicons/react/20/solid';
import { motion } from 'framer-motion';


export const RenovNavbar = ({setCurrentStep}) => {
  return (
    <nav className="mb-10">
        <ol
          role="list"
          className="flex items-center mt-8 py-4 min-h-full justify-center pt-10"
        >
          {steps.map((step, stepIdx) => (
            <li
              key={step.id}
              className={classNames(
                stepIdx !== steps.length - 1 ? 'pr-20 sm:pr-40' : '',
                'relative'
              )}
            >
              {step.status === 'complete' ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-1.5 w-full bg-neutral-600" />
                  </div>
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-500"
                  >
                    <CheckIcon
                      className="h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              ) : step.status === 'current' ? (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-1.5 w-full bg-gray-200" />
                  </div>
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-800 bg-white"
                    aria-current="step"
                  >
                    <motion.span
                      layoutId="underline"
                      className=" underline h-2.5 w-2.5 rounded-full bg-neutral-800"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400"
                  >
                    <span
                      className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                      aria-hidden="true"
                    />
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
  )
}
