import Link from "next/link"
import { IA_CARDS } from "../../../constants/constans"

const Footer = () => {
  return (
  < AIIconsDirectFooter />
  )
}

export default Footer


function AIIconsDirectFooter() {
  return (
    <footer className="grid grid-cols-4 md:grid-cols-6 gap-2 md:gap-3 rounded-xl">
      {IA_CARDS.map((card) => {
        return (
          <Link key={card.id} href={card.href} >
            <img
            title={card.title}
              className="hover:scale-110 mx-auto hover:scale-125 hover:opacity-70 transition cursor-pointer rounded-lg border border-darkColor"
              width={40}
              height={40}
              src={card.icon}
              alt={card.title}
            />
          </Link>
        );
      })}
    </footer>
  );
}
