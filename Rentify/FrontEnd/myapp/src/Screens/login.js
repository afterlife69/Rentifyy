import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export function Login() {
    const [det, setDet] = useState({ email: "", password: "", userType: ""});
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(det.userType == 'seller'){
            axios.post('http://localhost:3001/slogin', det)
                .then((response) => {
                    alert('Login successful');
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('name', response.data.firstname);
                    navigate('/sellerview');
                }).catch((error) => {
                    alert('Please enter valid details');
                    console.log(error);
                    
            });
        }
        else{
            axios.post('http://localhost:3001/blogin', det)
                .then((response) => {
                    alert('Login successful');
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('name', response.data.firstname);
                    navigate('/buyerview');
                }).catch((error) => {
                    alert('Please enter valid details');
                    console.log(error);
            });
        }
    };
    //user type
    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ marginBottom: '20px'}}>Rentify</h1>
            <form style={{ display: "flex", flexDirection: "column", alignItems: "center"}} onSubmit={handleSubmit}>
                <label htmlFor="email" style={{ marginBottom: "10px", display: "block" }}>Email:</label>
                <input type="text" id="email" name="email" style={{ marginBottom: "10px", padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }} onChange={(e) => setDet({ ...det, email: e.target.value })} />
                <label htmlFor="password" style={{ marginBottom: "10px", display: "block" }}>Password:</label>
                <input type="password" id="password" name="password" style={{ marginBottom: "10px", padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }} onChange={(e) => setDet({ ...det, password: e.target.value })} />
                <label htmlFor="userType" style={{ marginBottom: "10px", display: "block" }}>User Type:</label>
                <select id="userType" name="userType" style={{ marginBottom: "10px", padding: "5px", border: "1px solid #ccc", borderRadius: "5px" }} onChange={(e) => setDet({ ...det, userType: e.target.value })}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                <button type="submit" style={{ padding: "10px 20px", backgroundColor: "blue", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }} >Login</button>
                <button style={{ padding: "10px 20px", backgroundColor: "blue", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" }} onClick={() => navigate('/signup')}>Sign Up</button>
            </form>
        </div>
    );
}