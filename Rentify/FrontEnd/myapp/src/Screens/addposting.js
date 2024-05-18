import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function AddPosting() {
    const [det, setDet] = useState({ place: "", bedrooms: "", bathrooms: "", price: "", description: "", address: "", sellerName: localStorage.getItem('name'), sellerEmail: localStorage.getItem('email')});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Input Validation
        if (parseInt(det.bedrooms) > 20 || parseInt(det.bathrooms) > 20 || parseInt(det.price) > 50000) {
          alert("Bedrooms, bathrooms, and price should not exceed 20, 20, and 50000 respectively.")
          return; // Stop submission if validation fails
        }
    
        axios.post(`http://localhost:3001/addposting/`, det)
          .then((response) => {
            alert("Posting added successfully");
            navigate("/sellerview");
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
    const name = localStorage.getItem('name');
    return (
        <div>
            
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ marginBottom: '20px' }}>hello! {name}</h1>
                <h2 style={{ marginBottom: '20px' }}>Add a new posting</h2>
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
                    <label htmlFor="place" style={{color: 'gray', fontSize: '14px'}}>Place:</label>
                    <input type="text" id="place" name="place" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, place: e.target.value })} />

                    <label htmlFor="bedrooms" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Bedrooms:</label>
                    <input type="text" id="bedrooms" name="bedrooms" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, bedrooms: e.target.value })} />

                    <label htmlFor="bathrooms" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Bathrooms:</label>
                    <input type="number" id="bathrooms" name="bathrooms" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, bathrooms: e.target.value })} />

                    <label htmlFor="price" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Price in $:</label>
                    <input type="number" id="price" name="price" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, price: e.target.value })} />

                    <label htmlFor="description" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Description:</label>
                    <input type="textbox" id="description" name="description" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px', height:'50px' }} onChange={(e) => setDet({ ...det, description: e.target.value })} />

                    <label htmlFor="address" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Address:</label>
                    <input type="textbox" id="address" name="address" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px', height:'50px' }} onChange={(e) => setDet({ ...det, address: e.target.value })} />

                    <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Add Posting</button>

                </form> 
                <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',height:'35px', marginTop : '20px', marginBottom:'40px'}} onClick={() => navigate('/sellerview')}>Back</button>
            </div>
        </div>
    );

}