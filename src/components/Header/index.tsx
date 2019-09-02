import React, {useState} from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../../images/logos/logo800.png'
import './index.less'

const {Item} = Menu

function Header() {
  const [current, setCurrent] = useState<string>('')
  let tabURL = localStorage.getItem('tabURL')
  if (typeof tabURL === 'string') {
    if (current !== tabURL) {
      setCurrent(tabURL)
    }
  } else {
    localStorage.setItem('tabURL', 'home')
    setCurrent('home')
  }

  function handleClick(e:any):void {
    localStorage.setItem('tabURL', e.key)
    setCurrent(e.key)
  }

  return (
    <div className="header_container">
      <div className="header_swap">
        <div className="logo">
          <img src={logo} alt="logo"/>
        </div>
        <div className="tagbar">
          <Menu selectedKeys={[current]} onClick={(e) => handleClick(e)} className="menu" mode="horizontal">
            <Item key="home">
              <Link to="/"><Icon type="home" />Home</Link>
            </Item>
            <Item key="issue">
              <Link to="/post"><Icon type="form" />Issue</Link>
            </Item>
            <Item key="todos">
              <Link to="/todos"><Icon type="ordered-list" />Todos</Link>
            </Item>
            <Item key="self">
              <Link to="/self"><Icon type="user" />About me</Link>
            </Item>
          </Menu>
        </div>
      </div>
    </div>
  )
}


export default Header