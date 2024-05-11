import React, { useState } from 'react';
import './App.css';
import Nav from './nav';
import Diary from './diary';
function App() {
  const [menu, setMenu] = useState('diary');
  return (
    <div className="App">
      <div className="App-Content">
        {menu === 'home' && <h4>Home</h4>}
        {menu === 'diary' && <Diary />}
        {menu === 'account' && <h4>Account</h4>}
        {menu === 'settings' && <h4>Settings</h4>}
      </div>
      <Nav onChange={(menu) => {
        setMenu(menu);
      }} defaultMenu={menu} />
    </div>
  );
}

export default App;
