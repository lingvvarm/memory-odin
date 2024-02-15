import { useState } from "react";

function Card({ imgUrl, score, setScore, setMaxScore } : { imgUrl: string, score: number, setScore: any, setMaxScore: any }) {
  const [clicked, SetClicked] = useState(false);

  function handleClick() {
    if (clicked) {
      alert('I was already clicked!');
      setMaxScore((maxScore: number) => Math.max(score, maxScore));
      setScore(0);
      SetClicked(false);
    }
    else {
      SetClicked(true);
      setScore((score: number) => score + 1);
    }
  }

  return (
      <img src={imgUrl} alt="card-image" onClick={() => handleClick()}/>
  );
}

export default Card;
