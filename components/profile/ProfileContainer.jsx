import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ProfileForm } from "./ProfileForm";
import {ProfileFormAcademica} from "./ProfileFormAcademica"
import { EditAvatar } from "./editAvatar";
import { BillingAndPayment } from "./billingPayment";
export default function ProfileContainer({ user }) {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 dark:divide-gray-100">
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white ">
            Información personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">
            Actualiza tu información personal
          </p>
          <EditAvatar user={user} />
        </div>

        <ProfileForm user={user} />
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
        <div className="px-4 sm:px-0">
          <h2 className="text-base font-semibold leading-7 dark:text-white text-gray-900">
            Billing information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-100">
            Add a payment method
          </p>
        </div>
        <BillingAndPayment />
      </div>
      <ProfileFormAcademica user={user} />
    </div>
  );
}
