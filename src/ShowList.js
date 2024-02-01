import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ShowList.css';

const ShowList = () => {
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.tvmaze.com/search/shows?q=all');
          const data = await response.json();
          setShows(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div class="container">
        <h1>TV SHOWS</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
            <div class="shows-container">
                {shows.map((show) => (
                    <div class="shows">
                        <h2>{show.show.name}</h2>
                        {show.show.image && show.show.image.medium && (
                            <img
                            src={show.show.image.medium}
                            alt={`Poster for ${show.show.name}`}
                            />
                        )}
                        <Link to={`/show/${show.show.id}`}>
                            <button>View Details</button>
                        </Link>
                    </div>
                ))}
            </div>
        )}
      </div>
    );
  };
  export default ShowList;