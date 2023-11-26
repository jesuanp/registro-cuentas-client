import './App.css';
import React from 'react';
import Home from './components/home/Home';
import Signin from './components/auth/signin/Signin';
import Singup from './components/auth/singup/Singup';
import Header from './components/hearder/Header';
import Account from './components/account/Account';
import Accounts from './components/accounts/Accounts';
import AddAccount from './components/account/AddAccount';

import { Routes, Route } from 'react-router-dom';

function App() {

  const [login, setLogin] = React.useState(true);

  if(!login) {
    return (
      <Routes>

        <Route path='/' element={<Signin />} />

        <Route path='/singup' element={<Singup />} />

      </Routes>
    )
  }

  return (
    <>

      <Header />

      <Routes>

        <Route path='/' element={<Home />} />

        <Route path='/account/:id' element={<Account />} />

        <Route path='/accounts' element={<Accounts />} />
        
        <Route path='/add-account' element={<AddAccount />} />

      </Routes>
    </>
  );
}

export default App;
