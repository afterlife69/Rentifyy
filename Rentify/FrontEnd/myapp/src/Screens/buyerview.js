import React, { useState, useEffect } from 'react';
import axios from 'axios';
// font awesome
import '../../node_modules/font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function BuyerView() {
    const [postings, setPostings] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(50000);
    const [showFilters, setShowFilters] = useState(false);
    const [place, setPlace] = useState('');
    const [bedrooms, setBedrooms] = useState([0, 100]);
    const [bathrooms, setBathrooms] = useState([0, 100]);

    useEffect(() => {
        axios.get('http://localhost:3001/allPost')
            .then(response => {
                setPostings(response.data);
                
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    const loggedIn = localStorage.getItem('name') !== null;
    const name = localStorage.getItem('name');

    const navigate = useNavigate();
    const handleView = link => () => {
        navigate(link);
    };
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

    const filterPostings = () => {
        return postings.filter(posting => {
            const priceMatch = parseInt(posting.price) >= minPrice && parseInt(posting.price) <= maxPrice;
            const placeMatch = posting.place.toLowerCase().includes(place.toLowerCase());
            const bedroomsMatch = parseInt(posting.bedrooms) >= bedrooms[0] && parseInt(posting.bedrooms) <= bedrooms[1];
            const bathroomsMatch = parseInt(posting.bathrooms) >= bathrooms[0] && parseInt(posting.bathrooms) <= bathrooms[1];
            return priceMatch && placeMatch && bedroomsMatch && bathroomsMatch;
            // return 1;
        });
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };
    const handleInterest = (sellerEmail) => {
        axios.get(`http://localhost:3001/getSeller/${sellerEmail}`)
            .then(seller => {
                alert("Seller's FirstName : " + seller.data[0].firstname + "\n" + "Seller's LastName : " + seller.data[0].lastname + "\n" + "Seller's Email : " + seller.data[0].email + "\n" + "Seller's Phone : " + seller.data[0].phonenumber)
            }
            )
            .catch(error => {
                console.log(error);
            }
            );
    }
    const likedPost = (likes) => {
        console.log(likes);
        return likes.includes(localStorage.getItem('email'));
    }
    const handleLike = (id, likes) => {
        axios.put(`http://localhost:3001/toggleLike/${id}`, { email: localStorage.getItem('email') })
        .then(response => {
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
    }
    return (
        <div style={{}}>
            <div style={{textAlign: 'center'}}>
            {loggedIn ? (
                <div>
                    <h1>Hi {name}!, welcome to your Buyer Portal</h1>
                    <button 
                        style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',height:'35px' }} 
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <div>
                    <h1>Welcome to Rentify</h1>
                    <button 
                        style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',height:'35px', marginTop:'20px' }} 
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                    <button 
                        style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',height:'35px', marginTop:'20px', marginLeft:'20px' }} 
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </button>
                </div>
            )}
                
                <h2 style={{textDecoration:'underline'}}>Available Postings</h2>
                <button onClick={toggleFilters} style={{ padding: '5px 10px', backgroundColor: '#333', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>
                    Filters
                </button>
            </div>

            {showFilters && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>Place:</label>
                        <input
                            type="text"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>Price Range:</label>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <span style={{ marginRight: '5px' }}>${minPrice}</span>
                            <span>to</span>
                            <span style={{ marginLeft: '5px' }}>${maxPrice}</span>
                        </div>
                        <Slider
                            range
                            min={0}
                            max={50000}
                            value={[minPrice, maxPrice]}
                            onChange={(value) => {
                                setMinPrice(value[0]);
                                setMaxPrice(value[1]);
                            }}
                            style={{ width: '200px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>Bedrooms:</label>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <span style={{ marginRight: '5px' }}>{bedrooms[0]}</span>
                            <span>to</span>
                            <span style={{ marginLeft: '5px' }}>{bedrooms[1]}</span>
                        </div>
                        <Slider
                            range
                            min={0}
                            max={100}
                            value={bedrooms}
                            onChange={(value) => setBedrooms(value)}
                            style={{ width: '200px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <label style={{ marginRight: '10px' }}>Bathrooms:</label>
                        <div style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <span style={{ marginRight: '5px' }}>{bathrooms[0]}</span>
                            <span>to</span>
                            <span style={{ marginLeft: '5px' }}>{bathrooms[1]}</span>
                        </div>
                        <Slider
                            range
                            min={0}
                            max={100}
                            value={bathrooms}
                            onChange={(value) => setBathrooms(value)}
                            style={{ width: '200px' }}
                        />
                    </div>
                </div>
            )}

            <div style={{ justifyContent: 'center', flexWrap: 'wrap', display:'flex', flexDirection: 'row'}}>
                {filterPostings().map(posting => (
                    <div key={posting.id} style={{ border: '1px solid gray', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px'}}>
                        <div style={{textAlign:'center'}}>
                            <h1 style={{textDecoration:'underline'}}>{posting.place}</h1>
                        </div>
                        <ul>
                            <li>{posting.bedrooms} bedrooms</li>
                            <li>{posting.bathrooms} bathrooms</li>
                            <li>${posting.price}</li>
                            <li>{posting.description}</li>
                        </ul>
                        <div style={{textAlign:'center'}}>
                        <button 
                            style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',height:'35px' }} onClick={() => (loggedIn) ? handleInterest(posting.sellerEmail) : navigate('/login')}>
                            Interested
                        </button>
                        {loggedIn && // like button with logo from font awesome
                            <button 
                                style={{ padding: '10px 20px', backgroundColor: 'blue', color: likedPost(posting.likes) ? 'red' : 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft:'20px',height:'35px' }} 
                                onClick={() => handleLike(posting._id, posting.likes)}
                            >
                                <i className="fa fa-heart"></i>
                            </button>
                        }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}