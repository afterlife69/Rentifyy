import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function EditPosting() {
    // get the id of the posting from the state
    const id = useLocation().state.id;
    console.log(id);
    const [post , setPost] = useState({place: '', bedrooms: '', bathrooms: '', price: '', description: '', address: '', sellerName: '', sellerEmail: ''});
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://localhost:3001/getPost/${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:3001/editPost/${id}`, post)
            .then(response => {
                alert('Posting edited successfully');
                navigate('/sellerview');
            })
            .catch(error => {
                console.log(error);
            });
    }
    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ marginBottom: '20px'}}>Edit Posting</h1>
                {post && (
                    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={handleSubmit}>
                        <label htmlFor="place" style={{ color: 'gray', fontSize: '14px' }}>Place:</label>
                        <input type="text" id="place" name="place" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} defaultValue={post.place} onChange={(e) => setPost({ ...post, place: e.target.value })} />
                        <label htmlFor="bedrooms" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Bedrooms:</label>
                        <input type="text" id="bedrooms" name="bedrooms" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} defaultValue={post.bedrooms} onChange={(e) => setPost({ ...post, bedrooms: e.target.value })} />
                        <label htmlFor="bathrooms" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Bathrooms:</label>
                        <input type="number" id="bathrooms" name="bathrooms" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} defaultValue={post.bathrooms} onChange={(e) => setPost({ ...post, bathrooms: e.target.value })} />
                        <label htmlFor="price" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Price in $:</label>
                        <input type="number" id="price" name="price" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px' }} defaultValue={post.price} onChange={(e) => setPost({ ...post, price: e.target.value })} />
                        <label htmlFor="description" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Description:</label>
                        <input type="textbox" id="description" name="description" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px', height: '50px' }} defaultValue={post.description} onChange={(e) => setPost({ ...post, description: e.target.value })} />
                        <label htmlFor="address" style={{ marginBottom: '10px', color: 'gray', fontSize: '14px' }}>Address:</label>
                        <input type="textbox" id="address" name="address" style={{ marginBottom: '10px', padding: '5px', border: '1px solid gray', borderRadius: '5px', height: '50px' }} defaultValue={post.address} onChange={(e) => setPost({ ...post, address: e.target.value })} />
                        <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Edit Posting</button>
                        
                    </form>
                )}
                <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',height:'35px', marginTop : '20px', marginBottom:'40px'}} onClick={() => navigate('/sellerview')}>Back</button>
            </div>
        </div>
    );

}