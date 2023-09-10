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
        title="Mattraduct"
        url={"https://next-mattech.vercel.app"}
        quote={summaryText}
        hashtag={"#MatTraduct"}
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
        subject={"MatTraduct Translation"}
        url={"https://next-mattech.vercel.app"}
        body={summaryText}
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
}

export default ShareModal;
