import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './Screens/login';
import { Signup } from './Screens/signup';
import SellerView from './Screens/sellerview';
import AddPosting from './Screens/addposting';
import EditPosting from './Screens/editposting';
import BuyerView from './Screens/buyerview';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuyerView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sellerview" element={<SellerView />} />
        <Route path="/addposting" element={<AddPosting />} />
        <Route path="/editposting" element={<EditPosting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
