import { useState } from 'react';
import {
  CheckIcon,
  XMarkIcon as XMarkIconMini
} from '@heroicons/react/20/solid';
import { DataPricing } from '../../data/pricing';
import { useRouter } from 'next/router';
import CheckoutForm from '../payment/CheckoutForm';
import { PopUpModal } from './popUpModal';
import { ContacUs } from '../contact_us/contacUs';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Modal({ children, user }) {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnterpriseOpen, setIsEnterpriseOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('eur');

  // console.log('User is ' + user?.customer_id);

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
  const handleCheckout = async ({ price }) => {
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
        //console.log(checkoutSession);

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [frequency, setFrequency] = useState(pricing.frequencies[0]);
  return (
    <>
      {isOpen && (
        <div className="inset-0 z-50 overflow-auto bg-gray-900 rounded-lg shadow-xl">
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
          <div className="isolate overflow-hidden">
            <div className="bg-gray-900 py-16 sm:pt-32 min-h-screen flex items-center justify-center lg:pb-0">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="relative z-10">
                  <h3 className="mx-auto max-w-4xl text-center text-4xl font-light tracking-tight text-white">
                    {DataPricing.pricingmaindescription}
                  </h3>
                  {/* <div clas sName="mt-16 flex justify-center">
               <RadioGroup
                 value={frequency}
                 onChange={setFrequency}
                 className="grid grid-cols-2 gap-x-1 rounded-full bg-white/5 p-1 text-center text-xs font-semibold leading-5 text-white"
               >
                 <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
                 {pricing.frequencies.map((option) => (
                   <RadioGroup.Option
                     key={option.value}
                     value={option}
                     className={({ checked }) =>
                       classNames(checked ? 'bg-indigo-500' : '', 'cursor-pointer rounded-full px-2.5 py-1')
                     }
                   >
                     <span>{option.label}</span>
                   </RadioGroup.Option>
                 ))}
               </RadioGroup>
             </div> */}
                </div>
                <div className="relative mx-auto mt-10 grid max-w-md grid-cols-1 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  <svg
                    viewBox="0 0 1208 1024"
                    aria-hidden="true"
                    className="absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
                  >
                    <ellipse
                      cx={604}
                      cy={512}
                      fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)"
                      rx={604}
                      ry={512}
                    />
                    <defs>
                      <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                        <stop stopColor="#7775D6" />
                        <stop offset={1} stopColor="#E935C1" />
                      </radialGradient>
                    </defs>
                  </svg>
                  <div
                    className="hidden lg:absolute lg:inset-x-px lg:bottom-0 lg:top-4 lg:block lg:rounded-t-2xl lg:bg-gray-800/80 lg:ring-1 lg:ring-white/10"
                    aria-hidden="true"
                  />
                  {pricing.tiers.map((tier, index) => (
                    <div
                      key={index}
                      className={classNames(
                        tier.featured
                          ? 'z-10 bg-white shadow-xl ring-1 ring-gray-900/10'
                          : 'bg-gray-800/80 ring-1 ring-white/10 lg:bg-transparent lg:pb-14 lg:ring-0',
                        'relative rounded-2xl'
                      )}
                    >
                      <div className="p-8 lg:pt-12 xl:p-10 xl:pt-14">
                        <h2
                          id={tier.id}
                          className={classNames(
                            tier.featured ? 'text-gray-900' : 'text-white',
                            'text-sm font-semibold leading-6'
                          )}
                        >
                          {tier.name}
                        </h2>
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between lg:flex-col lg:items-stretch">
                          <div className="mt-2 flex items-center gap-x-4">
                            <p
                              className={classNames(
                                tier.featured ? 'text-gray-900' : 'text-white',
                                'text-4xl font-bold tracking-tight'
                              )}
                            >
                              {tier.price[frequency.value]}
                            </p>
                            <div className="text-sm leading-5">
                              <p
                                className={
                                  tier.featured ? 'text-gray-900' : 'text-white'
                                }
                              ></p>
                            </div>
                          </div>
                          <a
                            //href={tier.href}
                            onClick={
                              tier.name === DataPricing.pricingtitle3
                                ? () => {
                                    handleButtonEnterprise();
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
                                ? 'bg-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600'
                                : 'bg-white/10 hover:bg-white/20 focus-visible:outline-white',
                              'rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
                            )}
                          >
                            {tier.cta}
                          </a>
                        </div>
                        <div className="mt-8 flow-root sm:mt-10">
                          <ul
                            role="list"
                            className={classNames(
                              tier.featured
                                ? 'divide-gray-900/5 border-gray-900/5 text-gray-600'
                                : 'divide-white/5 border-white/5 text-white',
                              '-my-2 divide-y border-t text-sm leading-6 lg:border-t-0'
                            )}
                          >
                            {tier.mainFeatures.map((mainFeature) => (
                              <li
                                key={mainFeature}
                                className="flex gap-x-3 py-2"
                              >
                                <CheckIcon
                                  className={classNames(
                                    tier.featured
                                      ? 'text-indigo-600'
                                      : 'text-gray-500',
                                    'h-6 w-5 flex-none'
                                  )}
                                  aria-hidden="true"
                                />
                                {mainFeature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
