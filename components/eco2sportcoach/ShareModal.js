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
    <div className="absolute right-0 translate-y-[-100%] mr-24 mt-[120px] flex flex-col items-center gap-2 bg-white rounded-lg shadow p-3">
      <FacebookShareButton
        title={generateTrainingPlanContent()}
        url={"https://next-mattech.vercel.app"}
        // quote={generateTrainingPlanContent}
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
