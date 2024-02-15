import { useState } from "react";

function Card({ imgUrl, score, setScore, setMaxScore, setInfoText } : { imgUrl: string, score: number, setScore: any, setMaxScore: any, setInfoText: any }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (clicked) {
      setInfoText('You lost. Try again!')
      setMaxScore((maxScore: number) => Math.max(score, maxScore));
      setScore(0);
      setClicked(false);
    }
    else {
      setInfoText('To refresh, choose difficulty and press Go');
      setClicked(true);
      setScore((score: number) => score + 1);
    }
  }

  return (
      <img src={imgUrl} alt="card-image" onClick={() => handleClick()}/>
  );
}

export default Card;
