import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { pricingtitle3, pricingbutton3, pricingfeatures3, pricingfeatures3_3, pricingfeatures3_4, pricingfeatutes3_2, pricingprice3, pricingtitle2, pricingbutton2, pricingdescription2, pricingfeatures2, pricingfeatures2_2, pricingfeatures2_3, pricingfeatures2_4, pricingfeatures2_5, pricingdescription1, pricingfeatures1, pricingtitle1, pricingfeatures1_2,pricingfeatures1_3,pricingfeatures1_4,pricingfeatures1_5, pricingbutton1, pricingmaintitle, pricingmaindescription } from '../../data/pricing'
import CheckoutForm from '../payment/CheckoutForm'
const frequencies = [
  { value: 'monthly', label: 'Mensuel', priceSuffix: '' },
  // { value: '', label: '', priceSuffix: '' },
]


const tiers = [
  {
    name: (pricingtitle1),
    id: 'tier-freelancer',
    // href: 'https://buy.stripe.com/test_aEU6rG57i6bu3cIfYZ',
    price: { monthly: '', annually: '' },
    description: (pricingdescription1),
    features: [(pricingfeatures1),(pricingfeatures1_2),(pricingfeatures1_3),(pricingfeatures1_4),(pricingfeatures1_5)],
    featured: false,
    cta: (pricingbutton1),
  },
  {
    name: (pricingtitle2),
    id: 'tier-startup',
    href: '#',
    price: { monthly: '', annually: '' },
    description: (pricingdescription2),
    features: [
      (pricingfeatures2),
      (pricingfeatures2_2),
      (pricingfeatures2_3),
      (pricingfeatures2_4),
      (pricingfeatures2_5),
    ],
    featured: false,
    cta: (pricingbutton2),
  },
  {
    name: (pricingtitle3),
    id: 'tier-enterprise',
    href: '#',
    price: (pricingprice3),
    description: '',
    features: [
      (pricingfeatures3),
      (pricingfeatutes3_2),
      (pricingfeatures3_3),
      (pricingfeatures3_4),
    ],
    featured: true,
    cta: (pricingbutton3),
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
  const [frequency, setFrequency] = useState(frequencies[0])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount]= useState(0);
  const [currency, setCurrency] = useState('eur');
  const handleButtonClick = (amount) => {
    // Handle button click logic here
    
    setAmount(amount);
    setIsModalOpen(!isModalOpen); // Set the state to open the modal
  };
  


  return (
    <div id="pricing" className="bg-white py-24 sm:py-32">
      {/* Render the modal if isModalOpen is true */}
      {isModalOpen && <CheckoutForm onClose={handleButtonClick} amount={amount} currency={currency} /> }
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Pix</h2> */}
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {pricingmaintitle}
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          {pricingmaindescription}
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-indigo-600 text-white' : 'text-gray-500',
                    'cursor-pointer rounded-full py-1 px-2.5'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={classNames(
                tier.featured ? 'bg-gray-900 ring-gray-900' : 'ring-gray-200',
                'rounded-3xl p-8 ring-1 xl:p-10'
              )}
            >
              <h3
                id={tier.id}
                className={classNames(
                  tier.featured ? 'text-white' : 'text-gray-900',
                  'text-lg font-semibold leading-8'
                )}
              >
                {tier.name}
              </h3>
              <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-4 text-sm leading-6')}>
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span
                  className={classNames(
                    tier.featured ? 'text-white' : 'text-gray-900',
                    'text-4xl font-bold tracking-tight'
                  )}
                >
                  {typeof tier.price === 'string' ? tier.price : tier.price[frequency.value]}
                </span>
                {typeof tier.price !== 'string' ? (
                  <span
                    className={classNames(
                      tier.featured ? 'text-gray-300' : 'text-gray-600',
                      'text-sm font-semibold leading-6'
                    )}
                  >
                    {frequency.priceSuffix}
                  </span>
                ) : null}
              </p>
           
              <ul
                role="list"
                className={classNames(
                  tier.featured ? 'text-gray-300' : 'text-gray-600',
                  'mt-4 space-y-3 text-sm leading-6 xl:mt-6'
                )}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={classNames(tier.featured ? 'text-white' : 'text-indigo-600', 'h-6 w-5 flex-none')}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                // href={tier.href}
                onClick={() => handleButtonClick(400)}
                aria-describedby={tier.id}
                className={classNames(
                  tier.featured
                    ? 'bg-white/10 text-white hover:bg-white/20 focus-visible:outline-white'
                    : 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600',
                  'mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                )}
              >
                {tier.cta}
              </a>
           
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}