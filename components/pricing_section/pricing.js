import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import CheckoutForm from '../payment/CheckoutForm';
import { useRouter } from 'next/router';
import { plan_pricing, classNames } from '../../constants/constans';
import { ContacUs } from '../contact_us/contacUs';
import { PopUpModal } from '../modal/popUpModal';
import axios from 'axios';
import { DataPricing } from '../../data/pricing';
import { stripePromise } from '../../constants/constans';
import PricingPlans from './PricingPlans';
import { createStripeUser } from '../../util/api/user';

const frequencies = [
  { value: 'monthly', label: 'Mensuel', priceSuffix: '' }
  // { value: '', label: '', priceSuffix: '' },
];

export default function Pricing({ user }) {
  const router = useRouter();
  // console.log('User in pricing is:' + user);
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnterpriseOpen, setIsEnterpriseOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('cop');

  const handleCheckout = async ({ price }) => {
    // console.log(price);
    if (user == null) {
      router.push('/auth/signin');
      // Set the state to open the modal
    } else {
      try {
        const stripe = await stripePromise;

        const stripeUserResponse = await createStripeUser({email: user.email, name: user.name})
        const customerid = stripeUserResponse.data.id;
        // const customerid = user.customer_id;
        const userId = user.id;

        const checkoutSession = await axios.post('/api/create-subscription', {
          price,
          customerid,
          userId
        });
        // console.log(checkoutSession);

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

  return (
    <div id="pricing" className="bg-lightColor dark:bg-darkColor py-10 sm:py-16">
      {/* Render the modal if isModalOpen is true */}
      {/* {isModalOpen && (
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
      )} */}
      {/* <section className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
        
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
          {plan_pricing.tiers.map((tier, index) => (
            <article
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

                onClick={
                  tier.name === DataPricing.pricingtitle3
                    ? () => {
                        handleButtonEnterprise();
                        // console.log(DataPricing);
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
            </article>
          ))}
        </div>
      </section>  */}
      <PricingPlans user={user} />
    </div>
  );
}
