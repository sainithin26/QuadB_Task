import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./ShowDetails.css";
import Input from './Input';

const ShowDetails = ({ match }) => {
    const { id } = useParams();
    const [show, setShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingFormVisible, setBookingFormVisible] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userNum, setUserNum] = useState('');
    const [visible,setVisible] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
        try {

            const response = await fetch(`https://api.tvmaze.com/shows/${id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            console.log(data);

            setShow(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
        };

        fetchData();
    }, [id]);

    const handleBookingButtonClick = () => {
        setBookingFormVisible(true);
        setVisible(false);
    };

    const handleBookingFormSubmit = (event) => {

        event.preventDefault();
        if(userNum.length===10){
            localStorage.setItem('userName', userName);
            localStorage.setItem('userEmail', userEmail);
            alert("Show ticket Booked Successfully")
        }else{
            alert("Phone Number length should be equal to 10.")
        }
    };

    return (
        <div class="container">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div class="summary">
                    { visible && <div>
                        <div class="name">
                            <h3>{show ? show.name : 'No Name Available'}</h3>
                        </div>
                        <div class="image_container">
                            <img src={show.image.medium} alt={`Poster for ${show.name}`} />
                            <div>
                                <p>{show ? (show.summary && show.summary.replace(/<[^>]*>/g, '')) : 'No summary available'}</p>
                                <div class="rating">
                                    <h4>Rating :</h4>
                                    <h5>{show ? (show.rating.average) : 'No summary available' }</h5>
                                </div>
                                <div class="rating">
                                    <h4>Country :</h4>
                                    <h5>{show ? (show.network.country.name) : 'No summary available' }</h5>
                                </div>
                            </div>
                        </div>
                        <div class="btn">
                            <button onClick={handleBookingButtonClick}>Book Show</button>
                        </div>
                    </div>
                    }
                </div>
            )}

            {bookingFormVisible && (
                <div class="ticket_container">
                <div class="ticket">
                    <h2>Show Ticket</h2>
                    <form onSubmit={handleBookingFormSubmit}>
                        <div class="show_name">
                            <label>
                                Movie 
                            </label>
                            <p>{show ? show.name : 'N/A'}</p>
                        </div>
                        <Input label="Name" placeholder="Enter your name..." value={userName} onChange={(e) => setUserName(e.target.value)} required />
                        <Input label="Email" type="email" placeholder="Enter your email..."  value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required/>
                        <Input label="Phone Number" type="number" placeholder="Enter your number..."  value={userNum} onChange={(e) => setUserNum(e.target.value)} required/>
                        <button type="submit">Submit</button>
                    </form>
                </div></div>
            )}
        </div>
        
    );
};

export default ShowDetails;
