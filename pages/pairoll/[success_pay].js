import { useEffect } from 'react';
import { DataPricing } from '../../data/pricing';
import {
  setFreemiumPlan,
  setStandardPlan,
  updatePlanById
} from '../../util/api/user';
import PaymentConfirmed from '../../components/payment/PaymentConfirmed';
import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css';
import Link from 'next/link';

export default function Success_Pay() {
  const router = useRouter();

  const { success_pay, q, id } = router.query;

  // console.log('success_pay', success_pay, 'q', q, 'id', id);

  useEffect(() => {
    const fetchData = async () => {
      if (success_pay) {
        if (q === DataPricing.priceid1) {
          try {
            const studentsPlanResponse = await setFreemiumPlan();
            const stundentPlanId = studentsPlanResponse.data.data.id;
            // console.log('id del plan creado', stundentPlanId);
            await updatePlanById({
              userId: id,
              planId: stundentPlanId
            });
          } catch (error) {
            console.error('Error al obtener el plan:', error);
          }
        } else if (q === DataPricing.priceid2) {
          try {
            const standardPlanResponse = await setStandardPlan();
            const standardPlanId = standardPlanResponse.data.data.id;
            // console.log('id del plan creado', standardPlanId);
            await updatePlanById({
              userId: id,
              planId: standardPlanId
            });
          } catch (error) {
            console.error('Error al obtener el plan:', error);
          }
        }
      }
    };

    fetchData();
  }, [success_pay]);

  return (
    <div className={styles.container}>
      <Link href={'/dashboard'}>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Go back to dashboard
        </button>
      </Link>
      <PaymentConfirmed paymentIntent={success_pay} redirect="/dashboard" />
    </div>
  );
}
