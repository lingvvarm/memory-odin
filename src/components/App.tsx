import { useState, useEffect, useRef } from 'react'
import '../styles/App.scss';
import Card from './Card';
import getImg from "../apiInteract";
import { shuffle } from 'lodash';


function App() {
  const [items, setItems] = useState<Array<any>>([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [reset, setReset] = useState(false);
  const [infoText, setInfoText] = useState('To refresh, choose difficulty and press Go');
  const cardsAmountRef = useRef<HTMLInputElement | null >(8);


  useEffect(() => {
    if (score === Number(cardsAmountRef?.current?.value)) {
      setInfoText('You won! Images were refreshed');
      setMaxScore((maxScore: number) => Math.max(score, maxScore));
      setScore(0);
      setReset(true);
    }
  }, [score])

  useEffect(() => {
    const fetchData = async () => {
      if (cardsAmountRef.current) {
        if (!cardsAmountRef.current.value) cardsAmountRef.current.value = 8;
        if (cardsAmountRef.current.value < 2) cardsAmountRef.current.value = 2;
        if (cardsAmountRef.current.value > 30) cardsAmountRef.current.value = 30;
      }
      const res:any = await getImg(parseInt(cardsAmountRef.current?.value || '8', 10));
      setItems(res.items);
    };

    fetchData();
    setReset(false);
  }, [reset]);

  return (
    <>
    <header>
      <div className="header-and-info">
        <div className="header-text">AniMemory</div>
        <div className="info-text">{infoText}</div>
      </div>
      <div className="options-and-score">
        <div className="options-block">
          <p className="difficulty-label">Difficulty</p>
          <div className="difficulty-and-reset">
            <input type="number" ref={cardsAmountRef} defaultValue={8}/>
            <button type='button' onClick={() => setReset(true)}>Go</button>
          </div>
            <div className="error-text">Difficulty must be between 2 and 30</div>
        </div>
        <div className="scores">
          <div className="score-text">Score: {score}</div>
          <div className="max-score-text">Best score: {maxScore}</div>
        </div>
      </div>
    </header>
    <div className='main-container'>
      {items.length > 0 ? (
        <div className='cards-container' style={{ '--cards-per-row': Math.ceil(Math.sqrt(items.length)), '--cards-per-column': Math.ceil(items.length / Math.ceil(Math.sqrt(items.length)))}}>
          {shuffle(items).map((elem) => (
              <Card imgUrl={elem.image_url} score={score} setScore={setScore} setMaxScore={setMaxScore} setInfoText={setInfoText} key={elem.id}/>
          ))}
        </div>
      ) : (
        <p className='loading-text'>Loading...</p>
      )}
    </div>
    </>
  );
}

export default App;
