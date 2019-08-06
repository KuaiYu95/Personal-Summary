import React, {useState} from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import logo from '../../images/logos/logo800.png'
import './index.less'

const {Item} = Menu
interface IProps {

}

function Header(props:any) {
  const [current, setCurrent] = useState<string>('home')
  // useEffect(() => {
  //   if (current === 'home') {
  //     console.log('home',props)
  //     // props.history.replace('/home')
  //   } else if (current === 'issue') {
  //     console.log('issue')
  //     // props.history.replace('/issue')
  //   }
  // })

  function handleClick(e:any):void {
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
              <Link to="/"><Icon type="home" />首页</Link>
            </Item>
            <Item key="issue">
              <Link to="/post"><Icon type="form" />发布</Link>
            </Item>
          </Menu>
        </div>
      </div>
    </div>
  )
}


export default Header