import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' },
]
const tiers = [
  {
    name: 'Freemium',
    id: 'tier-Freemium',
    href: '#',
    price: { monthly: 'free', annually: '' },
    description: 'The essentials to provide your best work for clients.',
    features: [
      'Acceso gratuito a 3 asistentes de IA básicos',
      'Uso ilimitado pero con anuncios/publicidad',
      'Experiencia limitada (ej. tiempos de respuesta más lentos)'
    ],
    mostPopular: false,
  },
  {
    name: 'Estándar IA',
    id: 'tier-estándar-IA',
    href: '#',
    price: { monthly: '$9.99', annually: '$' },
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      'Acceso a 1 asistente de IA especializado',
      'Pago mensual de $9.99',
      'Advanced analytics',
      'Sin publicidad, respuestas más rápidas',
      'Ideal para usuarios con necesidades específicas',
    ],
    mostPopular: true,
  },
  {
    name: 'Premium',
    id: 'tier-Premium',
    href: '#',
    price: { monthly: '$60', annually: '$576' },
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Acceso completo a toda la cartera de asistentes (actuales y futuros)',
      'Pago anual de $99',
      'Mayor prioridad, sin publicidad, respuestas en tiempo real',
      'Incluye funciones avanzadas como memoria a largo plazo, personalización',
    ],
    mostPopular: false,
  },
  {
    name: 'Empresa/Corporativo',
    id: 'tier-Empresa/Corporativo',
    href: '#',
    price: { monthly: '$60', annually: '$576' },
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Cartera personalizada de asistentes según necesidades de la empresa',
      'Precios basados en número de empleados/Usuarias',
      'Integración con sistemas corporativos',
      'Capacidades de auditoría y cumplimiento regulatorio',
      'Contratos anuales, soporte empresarial',
    ],
    mostPopular: false,
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PricingPlans() {
  const [frequency, setFrequency] = useState(frequencies[0])

  return (
    <div className="bg-lightColor dark:bg-darkColor">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-eco2MainColor">Suscripciones</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Escoge el plan que mejor se adapte a tus necesidades.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 dark:text-white">
          Elige la suscripción más adecuada para ti. Puedes cambiar de plan o cancelar en cualquier momento.
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Frecuencia de suscripción </RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-eco2MainColor' : 'text-gray-500 dark:text-white',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {tiers.map((tier) => (
            <article
              key={tier.id}
              className={classNames(
                tier.mostPopular ? 'ring-2 ring-eco2HoverColor' : 'ring-1 ring-gray-200',
                'rounded-3xl p-8 xl:p-10 shadow-xl '
              )}
            >
              <div className="flex items-center flex-col">
                <h3
                  id={tier.id}
                  className={classNames(
                    tier.mostPopular ? 'text-eco2MainColor' : 'text-gray-900 dark:text-white',
                    'text-lg font-semibold leading-8'
                  )}
                >
                  {tier.name}
                </h3>
                {tier.mostPopular ? (
                  <p className="rounded-full bg-eco2MainColor px-2.5 py-1 text-xs font-semibold leading-5 text-white">
                    Most popular
                  </p>
                ) : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-white">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-eco2MainColor">{tier.price[frequency.value]}</span>
                <span className="text-sm font-semibold leading-6 text-eco2HoverColor">{frequency.priceSuffix}</span>
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? 'bg-eco2MainColor text-white shadow-sm hover:bg-eco2HoverColor'
                    : 'text-eco2MainColor ring-1 ring-inset ring-eco2MainColor hover:ring-eco2HoverColor',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                )}
              >
                Buy plan
              </a>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="h-6 w-5 flex-none text-eco2MainColor" aria-hidden="true" />
                    <p className='dark:text-white'>{feature}</p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
