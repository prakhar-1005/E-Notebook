import { useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar'
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';

function App() {
  const [alert,setAlert] = useState(null);
  
  const showAlert = (message,type)=>{
    setAlert({msg:message, type: type})

    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <div  style={{ height:'200vh',background:'#F0EEED'}}>
      <NoteState >
        <Navbar/>
        <Alert alert={alert}/>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home showAlert={showAlert}/>} />
            <Route path='/About' element={<About/>} />
            <Route path='/Login' element={<Login showAlert={showAlert}/>} />
            <Route path='/Signup' element={<Signup showAlert={showAlert}/>} />

          </Routes>
        </div>
      </NoteState>
    </div>
  );
}

export default App;
