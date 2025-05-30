
import './App.css'
import { BrowserRouter } from "react-router-dom";
import 'react-toastify/ReactToastify.css';
import {Provider} from "react-redux";
import Routers from './routes/Routers';
// import store from './components/redux/store';
import store from './redux/store';



function App() {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Routers/>
   </BrowserRouter>
   </Provider>
  </>
)
}


export default App


