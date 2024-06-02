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
import UserAuth1 from './UserAuth1';
import EditHouse from './components/EditHouse';
import { Toaster } from 'react-hot-toast';
import Error404 from './components/Error404';
function App() {
  return (
    <div>
       <Toaster position='top-center'/>
      <BrowserRouter>
      <UserProvider>
      <Navbar/>

<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/home' element={<Home/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path ='/signup' element={<SignUp/>}></Route>
<Route path ='/addhouse' element={<UserAuth1><AddHouse/></UserAuth1>}></Route>
<Route path ='/houses' element={<SellerHouses/>}></Route>
<Route path ='/myhouses' element={<UserAuth1><MyHouses/></UserAuth1>}></Route>
<Route path ='/edit/:id' element={<UserAuth1><EditHouse/></UserAuth1>}></Route>
<Route path="*" element={<Error404/>}></Route>
  

</Routes>
</UserProvider>

</BrowserRouter>



    </div>
  );
}

export default App;
