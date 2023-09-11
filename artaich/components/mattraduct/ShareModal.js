import {
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

function ShareModal({ translationResponse }) {
  return (
    <div>
      <FacebookShareButton
        title="Mattraduct"
        url={"https://next-mattech.vercel.app"}
        quote={translationResponse}
        hashtag={"#MatTraduct"}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <WhatsappShareButton
        url={"https://next-mattech.vercel.app"}
        title={translationResponse}
      >
        <WhatsappIcon size={32} round={true} />
      </WhatsappShareButton>

      <EmailShareButton
        subject={"MatTraduct Translation"}
        url={"https://next-mattech.vercel.app"}
        body={translationResponse}
      >
        <EmailIcon size={32} round={true} />
      </EmailShareButton>
    </div>
  );
}

export default ShareModal;
