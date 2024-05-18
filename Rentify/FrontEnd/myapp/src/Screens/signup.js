import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Signup() {
    const [det, setDet] = useState({ firstName: "", lastName: "", email: "", password: "", phoneNumber: "", userType: "", postings: [], interested :[]});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(det.userType == 'seller'){
            axios.post('http://localhost:3001/seller', det)
                .then((response) => {
                    alert('Seller account created successfully');
                    navigate('/login');
                }).catch((error) => {
                    console.log(error);
            });
        }
        else{
            axios.post('http://localhost:3001/buyer', det)
                .then((response) => {
                    alert('Buyer account created successfully');
                    navigate('/');
                }).catch((error) => {
                    console.log(error);
            });
        }
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ marginBottom: '20px'}}>Rentify</h1>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
                <label htmlFor="firstName" style={{color: 'gray', fontSize: '14px'}}>First Name:</label>
                <input type="text" id="firstName" name="firstName" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, firstName: e.target.value })} />

                <label htmlFor="lastName" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Last Name:</label>
                <input type="text" id="lastName" name="lastName" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, lastName: e.target.value })} />

                <label htmlFor="email" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Email:</label>
                <input type="email" id="email" name="email" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, email: e.target.value })} />

                <label htmlFor="password" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Password:</label>
                <input type="password" id="password" name="password" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, password: e.target.value })} />

                <label htmlFor="phoneNumber" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Phone Number:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, phoneNumber: e.target.value })} />

                <label htmlFor="userType" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>User Type:</label>
                <select id="userType" name="userType" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e) => setDet({ ...det, userType: e.target.value })}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Sign Up</button>
                <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }} onClick={() => navigate('/')}>Login</button>
            </form>
        </div>
    );
}