import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddHouse from './components/AddHouse';
import SellerHouses from './components/SellerHouses';
import { UserProvider } from './UserContext';
import MyHouses from './components/MyHouses';
function App() {
  return (
    <div>
      <BrowserRouter>
      <UserProvider>
      <Navbar/>

<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/home' element={<Home/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path ='/signup' element={<SignUp/>}></Route>
<Route path ='/addhouse' element={<AddHouse/>}></Route>
<Route path ='/houses' element={<SellerHouses/>}></Route>
<Route path ='/myhouses' element={<MyHouses/>}></Route>

  

</Routes>
</UserProvider>

</BrowserRouter>


    </div>
  );
}

export default App;
