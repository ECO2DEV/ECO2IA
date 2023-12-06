import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import CheckoutForm from '../payment/CheckoutForm';
import { useRouter } from 'next/router';
import { DataPricing } from '../../data/pricing';
import { ContacUs } from '../contact_us/contacUs';
import { PopUpModal } from '../modal/popUpModal';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

const frequencies = [
  { value: 'monthly', label: 'Mensuel', priceSuffix: '' }
  // { value: '', label: '', priceSuffix: '' },
];

const stripePromise = loadStripe(
  'pk_live_51MmF5HEZbX6Zpxv9jAViXayufKdtNHbR3B95kUFAFg424uNDazCpZ4SwRxuiv3Er2byJs6M0ATZWHYBBD7NIaOjo00E6LpUFqp'
);

const pricing = {
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

// const tiers = [
//   {
//     name: DataPricing.pricingtitle1,
//     id: 'tier-freelancer',
//     // href: 'https://buy.stripe.com/test_aEU6rG57i6bu3cIfYZ',
//     price: { monthly: 4, annually: '' },
//     description: '',
//     features: [
//       DataPricing.pricingfeatures1,
//       DataPricing.pricingfeatures1_2,
//       DataPricing.pricingfeatures1_3,
//       DataPricing.pricingfeatures1_4,
//       DataPricing.pricingfeatures1_5
//     ],
//     featured: false,
//     cta: DataPricing.pricingbutton1
//   },
//   {
//     name: DataPricing.pricingtitle2,
//     id: 'tier-startup',
//     href: '#',
//     price: { monthly: 10, annually: '' },
//     description: '',
//     features: [
//       DataPricing.pricingfeatures2,
//       DataPricing.pricingfeatures2_2,
//       DataPricing.pricingfeatures2_3,
//       DataPricing.pricingfeatures2_4,
//       DataPricing.pricingfeatures2_5
//     ],
//     featured: false,
//     cta: DataPricing.pricingbutton2
//   },
//   {
//     name: DataPricing.pricingtitle3,
//     id: 'tier-enterprise',
//     href: '#',
//     price: { monthly: DataPricing.pricingbutton3, annually: '' },
//     description: '',
//     features: [
//       DataPricing.pricingfeatures3,
//       DataPricing.pricingfeatutes3_2,
//       DataPricing.pricingfeatures3_3,
//       DataPricing.pricingfeatures3_4
//     ],
//     featured: true,
//     cta: DataPricing.pricingbutton3
//   }
// ];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Pricing({ user }) {
  const router = useRouter();
  // console.log('User in pricing is:' + user);
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnterpriseOpen, setIsEnterpriseOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('eur');

  const handleCheckout = async ({ price }) => {
    console.log(price)
    if (user == null) {
      router.push('/auth/signin');
      // Set the state to open the modal
    } else {
      try {
        const stripe = await stripePromise;
        const customerid = user.customer_id;
        const userId = user.id;

        const checkoutSession = await axios.post('/api/create-subscription', {
          price,
          customerid,
          userId
        });
        console.log(checkoutSession);

        const result = await stripe.redirectToCheckout({
          sessionId: checkoutSession.data.sessionId
        });

        if (result.error) {
          alert(result.error.message);
        }
      } catch (error) {
        // console.log(error);
      }
    }
  };

  const handleButtonClick = ({ amount }) => {
    if (user == null) {
      router.push('/auth/signin');
      // Set the state to open the modal
    } else {
      setAmount(amount);
      setIsModalOpen(!isModalOpen);
    }
  };
  const handleButtonEnterprise = () => {
    setIsEnterpriseOpen(!isEnterpriseOpen);
  };

  //   const checkOut = async (e) => {
  //     const header = {
  //       headers: {
  //           Authorization: `Bearer ${strapiToken}`,
  //       }
  //   }
  //  console.log("Entre aqui ")
  //   const res = await axios.post(`${strapiUrl}/api/payment/create-checkout-session`,{"lookup_key":'plan_NeeieGD7qqOAm9'},header);
  //   console.lop(res);
  //   };

  return (
    <div id="pricing" className="bg-white py-10 sm:py-16">
      {/* Render the modal if isModalOpen is true */}
      {isModalOpen && (
        <CheckoutForm
          onClose={handleButtonClick}
          amount={amount}
          currency={currency}
          user={user}
        />
      )}
      {isEnterpriseOpen && (
        <PopUpModal isModalNeedIt={true}>
          <ContacUs onClose={handleButtonEnterprise} />
        </PopUpModal>
      )}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* <h2 className="text-base font-semibold leading-7 text-indigo-600">Pix</h2> */}
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {DataPricing.pricingmaintitle}
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          {DataPricing.pricingmaindescription}
        </p>
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">
              {DataPricing.PaymentFrequency}
            </RadioGroup.Label>
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
          {pricing.tiers.map((tier, index) => (
            <div
              key={index}
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
              <p
                className={classNames(
                  tier.featured ? 'text-gray-300' : 'text-gray-600',
                  'mt-4 text-sm leading-6'
                )}
              >
                {tier.description}
              </p>
              {/* <p className="mt-6 flex items-baseline gap-x-1">
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
            */}
              <ul
                role="list"
                className={classNames(
                  tier.featured ? 'text-gray-300' : 'text-gray-600',
                  'mt-4 space-y-3 text-sm leading-6 xl:mt-6'
                )}
              >
                {tier.mainFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon
                      className={classNames(
                        tier.featured ? 'text-white' : 'text-indigo-600',
                        'h-6 w-5 flex-none'
                      )}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                // href={tier.href}
                onClick={
                  tier.name === DataPricing.pricingtitle3
                    ? () => {
                        handleButtonEnterprise();
                        console.log(DataPricing)
                      }
                    : () => {
                      handleCheckout({
                          price: tier.priceid
                        });
                      }
                }
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
  );
}
