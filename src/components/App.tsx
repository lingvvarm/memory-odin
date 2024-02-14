import { useState, useEffect } from 'react'
import '../styles/App.scss';
import Card from './Card';
import getImg from "../apiInteract";
import { shuffle } from 'lodash';


function App() {
  const [items, setItems] = useState<Array<any>>([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res:any = await getImg(5);
      setItems(res.items);
    };

    fetchData();
  }, []);

  return (
    <>
      {items.length > 0 ? (
        <div className='container'>
          {shuffle(items).map((elem) => (
              <Card imgUrl={elem.image_url} score={score} setScore={setScore} setMaxScore={setMaxScore} key={elem.id}/>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}

export default App;
