import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import Posting from './schemas/postings.js';
import Seller from './schemas/seller.js';
import Buyer from './schemas/buyer.js';
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://afterlife:mypass@cluster0.jnyqyp8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>app.listen(3001))
.then(()=>console.log('connected'))
.catch((err)=>console.log(err))
// Create a new posting
app.post('/posting', (req, res) => {
  const newPosting = new Posting({
    place: req.body.place,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    price: req.body.price,
    description: req.body.description,
    link: req.body.link,
  });
  //newPosting.save().then(posting => res.status(200).json(posting)).catch(err => res.status(500).json(err));
  try{
    const posting = newPosting.save();
    res.status(200).json(posting);
  }
    catch(err){
        res.status(500).json(err);
    }
});
app.post('/slogin', (req, res) => {
    const emails = req.body.email;
    const passwords = req.body.password
    // search based on email and verify the password
    Seller.findOne({ email : emails})
    .then(response => {
        if (response) {
            if(response.password === passwords){
                res.status(200).json(response);
            }
            else{
                res.status(404).json({ message: 'Invalid password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    })
    .catch(err => res.status(500).json(err));
});
// Create a new seller
app.post('/seller', (req, res) => {
    const newSeller = new Seller({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phoneNumber,
        postings: req.body.postings,
    });
    newSeller.save().then(seller => res.status(200).json(seller)).catch(err => res.status(500).json(err));
});
// login buyer
app.post('/blogin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    // search based on email and verify the password
    Buyer.findOne({ email: email})
        .then(response => {
            if (response) {
                if(response.password === password){
                    res.status(200).json(response);
                }
                else{
                    res.status(404).json({ message: 'Invalid password' });
                }
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch(err => res.status(500).json(err));
});
// Create a new buyer
app.post('/buyer', (req, res) => {
    const newBuyer = new Buyer({
        firstname: req.body.firstName,
        lastname: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phonenumber: req.body.phoneNumber,
        interested: req.body.interested,
    });
    newBuyer.save().then(buyer => res.status(200).json(buyer)).catch(err => res.status(500).json(err));
});
// Get the postings array of a seller based on email
app.get('/ret/:email', (req, res) => {
    Posting.find({ sellerEmail: req.params.email }).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});

app.post('/addposting', (req, res) => {
    const posts = req.body;
    // Find the seller based on email and add the posting to the postings array
    const postt = new Posting({
        place: posts.place,
        bedrooms: posts.bedrooms,
        bathrooms: posts.bathrooms,
        price: posts.price,
        description: posts.description,
        address: posts.address,
        sellerName: posts.sellerName,
        sellerEmail: posts.sellerEmail
    });
    postt.save().then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
app.get('/getPost/:id', (req, res) => {
    Posting.findById(req.params.id).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
app.post('/editPost/:id', (req, res) => {
    Posting.findByIdAndUpdate(req.params.id, req.body).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
}
);
app.delete('/deletePost/:id', (req, res) => {
    Posting.findByIdAndDelete(req.params.id).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
}); 
app.get('/allPost', (req, res) => {
    Posting.find().then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
app.get('/getSeller/:email', (req, res) => {
    Seller.find({ email: req.params.email }).then(response => res.status(200).json(response)).catch(err => res.status(500).json(err));
});
app.put('/toggleLike/:id', async (req, res) => {
    try {
      const postingId = req.params.id;
      const email = req.body.email;
  
      // Find the posting by id
      const posting = await Posting.findById(postingId);
  
      if (!posting) {
        return res.status(404).json({ message: 'Posting not found' });
      }
  
      // Check if the email is already in the likes array
      const isLiked = posting.likes.includes(email);
  
      if (isLiked) {
        // Remove the email from the likes array
        posting.likes = posting.likes.filter((like) => like !== email);
      } else {
        // Add the email to the likes array
        posting.likes.push(email);
      }
  
      // Save the updated posting
      const updatedPosting = await posting.save();
  
      res.json(updatedPosting);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });