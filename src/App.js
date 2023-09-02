import './App.css';
import { Route , Routes } from 'react-router-dom';
import Login from './Pages/Login';
import { Provider } from 'react-redux';
import store from './Store/index';
import Welcome from './Pages/Welcome';



function App() {
  
    
  
  return (
    <>
    <Provider store={store}>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/welcome' element={<Welcome/>} />
    
    </Routes>
    </Provider>
    </>
  );
}

export default App;