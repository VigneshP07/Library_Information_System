import React,{useEffect,useState} from 'react';// Import useLocation hook
import { Link } from 'react-router-dom';
import './SearchResultsList.css'
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export const ResultPage = () => {
  const {res} = useParams(); 
  const [isData, setData] = useState(null);
  const alert = useAlert();
  const fetchData = async (value) => {
    try {
        if (value?.length > 0) {
    const response = await fetch(`http://localhost:4000/api/v1/Books?keyword=${value}`)
    const data = await response.json();
    setData(data.books);
    }} catch (error) {
    alert.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(res);
  }, [res]);

  return (
    <div className="results-container">
      <div className='results-title'>Results for <span>"{res}"</span></div>
      <div className="results-list">
        {isData && isData.map((result,index) => (
          <div className='results-element' key={result._id}>
            <Link to={`/Books/${result._id}`}>
              <img
                className='results-poster'
                src={`${result.img}`}
                alt={result.title}
              />
            </Link>
            <div
              className="tooltip"
              // style={{ display: 'none'}}
            >
              osdnofe
              {/* <p>{result.title}</p>
              <p>{result.author}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
