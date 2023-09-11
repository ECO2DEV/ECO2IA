import {
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

function ShareModal({ generateTrainingPlanContent }) {
  return (
    <div className="relative flex flex-col gap-2 bottom-[9rem] left-[4rem] w-14 items-center bg-gray-100 rounded-lg shadow p-4">
      <FacebookShareButton
        title={generateTrainingPlanContent()}
        url={"https://next-mattech.vercel.app"}
        quote={generateTrainingPlanContent}
        hashtag={"#SportCoach"}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <WhatsappShareButton
        url={"https://next-mattech.vercel.app"}
        title={generateTrainingPlanContent()}
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      <EmailShareButton
        subject={"Plan de formation"}
        url={"https://next-mattech.vercel.app"}
        body={generateTrainingPlanContent()}
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
}

export default ShareModal;
