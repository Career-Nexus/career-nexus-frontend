  
import './App.css'
import Router from './routers/Router'
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <>
     <Router/>
     <ToastContainer />
    </>
  )
}

export default App
