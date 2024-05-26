import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>

<Routes>
<Route path='/' element={<Home/>}></Route>
<Route path='/login' element={<Login/>}></Route>
  

</Routes>

</BrowserRouter>


    </div>
  );
}

export default App;
