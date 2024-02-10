import {
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

function ShareModal({ summaryText }) {
  return (
    <div>
      <FacebookShareButton
        title="Eco2traduct"
        url={"https://next-mattech.vercel.app"}
        quote={summaryText}
        hashtag={"#Eco2Traduct"}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <WhatsappShareButton
        url={"https://next-mattech.vercel.app"}
        title={summaryText}
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      <EmailShareButton
        subject={"Eco2Traduct Translation"}
        url={"https://next-mattech.vercel.app"}
        body={summaryText}
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
}

export default ShareModal;
