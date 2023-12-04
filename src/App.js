
import './App.css';
import { Author } from './pages/Author/Author';
import { Create } from './pages/Create/Create';
import { Header } from './components/Header/Header.jsx'
import { Main } from './pages/Main/Main';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Order } from './pages/Order/Order';
import { Settings } from './pages/Settings/Settings.jsx';
import { setIsLogged } from '@userSlice'
import { auth } from './feature/firebase/fire.js'
import { Feedorders } from './pages/Feedorders/Feedorders.jsx';
import { createPerson, getPerson } from './feature/sliceAssets/personSlice.js';
import { useEffect } from 'react';

function App() {

  const userUuid = useSelector((state) => state.userStates.uuid) // переключатель header (true/false)
  const person = useSelector((state) => state.personState.currentPerson)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(setIsLogged(user.uid))
        dispatch(getPerson(user.uid))
      } else {
        dispatch(setIsLogged(''))
      }
    });
  }, [dispatch])

  useEffect(() => {
    if(person.length === 0  && auth.currentUser) {
      dispatch(createPerson({
        uuid: auth.currentUser.uid,
        email: auth.currentUser.email,
        username: '',
        balance: 0,
        favourites: [],
        activeOrders: [],
        myOrdedrs: [],
      }))
    }
  }, [dispatch, person])



  /*
  dispatch(createPerson({
        uuid: auth.currentUser.uid,
        email: auth.currentUser.email,
        username: '',
        balance: 0,
        favourites: [],
        activeOrders: [],
        myOrdedrs: [],
      }))
  */
  return (
    
    <div className="App">

      
      <Router>
        {
          !userUuid ? <Navigate to='/'/> : <Header/>
        }

        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/author' element={<Author />}  />
          <Route path='/author/create' element={<Create />} /> 
          <Route path='/author/order/:id' element={<Order />} />
          <Route path='/author/settings' element={<Settings />} />
          <Route path='/author/feeds' element={<Feedorders />} />

          
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
