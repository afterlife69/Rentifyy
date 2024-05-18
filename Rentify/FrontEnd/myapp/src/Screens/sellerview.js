import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function SellerView() {
    const [postings, setPostings] = useState([]);
    // postings are stored in an array which is a field in the user database
    useEffect(() => {
        // get the postings from the database
        const email = localStorage.getItem('email');
        console.log(email)
        axios.get(`http://localhost:3001/ret/${email}`)
            .then(response => {
                setPostings(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const name = localStorage.getItem('name');
    console.log(name)
    // function to handle the view details button
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }
    const handleAdd = () => {
        navigate('/addposting');
    }
    const handleEdit = (id) => {
        navigate(`/editposting`, { state: { id } });
    }
    const handleDel = (id) => {
        axios.delete(`http://localhost:3001/deletePost/${id}`)
            .then(response => {
                alert('Posting deleted successfully');
                window.location.reload();
            }) 
            .catch(error => {
                console.log(error);
            });
    }

    console.log(postings)
    return (
        <div style={{  }}>
            <div style={{textAlign: 'center'}}>
                <h1 >Hi {name}!, welcome to your Seller Portal</h1>
                <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',height:'35px' }} onClick={handleAdd}>Add New Posting</button>
                <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft:'20px',height:'35px'}} onClick={handleLogout}>Log Out</button>
                <h2 style={{textDecoration:'underline'}}>My Postings</h2>
            </div>
            <div style={{ justifyContent: 'center', flexWrap: 'wrap', display:'flex', flexDirection: 'row'}}>
                    {postings.map(posting => (
                        // posting contains the place, number of bedrooms, number of bathrooms, price and description, and also a link which will open another component with the details of the posting
                        <div key={posting.id} style={{ border: '1px solid gray', borderRadius: '5px', padding: '10px', margin: '10px', width: '300px'}}>
                            <div style={{textAlign:'center'}}>
                            <h1 style={{textDecoration:'underline'}}>{posting.place}</h1>
                            </div>
                            <ul>
                                <li>{posting.bedrooms} bedrooms</li>
                                <li>{posting.bathrooms} bathrooms</li>
                                <li>${posting.price} per month</li>
                                <li>{posting.description}</li>
                                <li>{posting.address}</li>
                            </ul>
                            <div style={{textAlign:'center'}}>
                            <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => handleEdit(posting._id)}>Edit</button>
                            <button style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft:'20px' }} onClick={() => handleDel(posting._id)}>Delete</button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}