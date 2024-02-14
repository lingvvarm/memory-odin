import { useState, useEffect } from 'react'
import '../styles/App.scss';
import Card from './Card';
import getImg from "../apiInteract";
import { max, shuffle } from 'lodash';


function App() {
  const [items, setItems] = useState<Array<any>>([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res:any = await getImg(8);
      setItems(res.items);
    };

    fetchData();
  }, []);

  return (
    <>
    <header>
      <div className="header-text">AniMemory</div>
      <div className="scores">
        <div className="score-text">Score: {score}</div>
        <div className="max-score-text">Best score: {maxScore}</div>
      </div>
    </header>
    <div className='main-container'>
      {items.length > 0 ? (
        <div className='cards-container'>
          {shuffle(items).map((elem) => (
              <Card imgUrl={elem.image_url} score={score} setScore={setScore} setMaxScore={setMaxScore} key={elem.id}/>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </>
  );
}

export default App;
