import PaymentConfirmed from "../../components/payment/PaymentConfirmed";
import { useRouter } from 'next/router'
import styles from '../../styles/Home.module.css';
import Link from "next/link";
export default function Success_Pay() {
  const router = useRouter()
 const { success_pay } = router.query;
  console.log(success_pay);
  
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
        <PaymentConfirmed paymentIntent={success_pay} redirect='/dashboard' />
      </div>
    )
  
 

};
