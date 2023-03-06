import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { About } from "./components/About";
import Alert from "./components/Alert";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import Navbar from "./components/Navbar";
import { Signup } from "./components/Signup";
import NoteState from "./context/notes/noteState";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
          <Routes>
            <Route path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
