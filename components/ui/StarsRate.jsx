
import { Star, StarFill } from "../icons/icons";


export const StarsRate = ({filledStars, setFilledStars, score}) => {

  const handleStarClick = (index) => {
    setFilledStars(index + 1);
  };
 

  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <button
        key={i}
        onClick={() => handleStarClick(i)}
        className="w-6 h-6"
      >
        {i < filledStars ? <StarFill /> : <Star />}
      </button>
    );
  }

  return (
    <article className="relative bg-slate-900 p-2 rounded-lg grid grid-cols-3 m-auto">
      <div className="absolute -top-2 left-2 bg-amber-500 p-4 rounded-lg flex justify-center items-center text-black font-extrabold">{score? score?.length: 0}</div>
      <div className="col-start-2 col-span-2 flex gap-1 cursor-pointer ">{stars}</div>
    </article>
  )
}
