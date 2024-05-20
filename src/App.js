import React, { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import './App.css';
import Nav from './nav';
import Diary from './diary';
import Beancount from './beancount';
import request from './utils/request';
import 'antd-mobile/es/global'

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const refresh = () => {
    console.log('Refresh');
    request.post('/userinfo').then(res => {
      if (res.code !== 0) {
        console.log('需要登录');
        setIsLogin(false);
      } else {
        console.log('已登录');
        setIsLogin(true);
      }
    });
  }
  useEffect(() => {
    refresh();
  }, []);

  const [menu, setMenu] = useState('home');
  return (
    <div className="App">
      <div className="App-Content">
        {menu === 'home' && <h4>
          {isLogin ? '欢迎回来' : <><a href='https://api.aiman.jackyqi.cn/auth/github'>登录github</a><Button onClick={refresh}>刷新</Button></>}
          Home</h4>}
        {menu === 'diary' && <Diary />}
        {menu === 'account' && <Beancount />}
        {menu === 'settings' && <h4>Settings</h4>}
      </div>
      <Nav onChange={(menu) => {
        setMenu(menu);
      }} defaultMenu={menu} />
    </div>
  );
}

export default App;
