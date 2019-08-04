import React, {useState} from 'react'
import { Menu, Icon } from 'antd';
import Upload from './Upload/index'
import logo from '../../images/logos/logo800.png'
import './index.less'

const {Item} = Menu

function Header() {
  const [current, setCurrent] = useState<string>('home')
  const [isShowUpload, setIsShowUpload] = useState<boolean | undefined>(false)

  function handleChange(e:any):void {
    setCurrent(e.key)
    if (e.key === 'upload') {
      setIsShowUpload(true)
    } else {
      setIsShowUpload(false)
    }
  }

  function handleOk():void {
    console.log('上传成功')
  }

  function handleCancel():void {
    setIsShowUpload(false)
    setCurrent('home')
  }

  return (
    <div className="header_container">
      <div className="header_swap">
        <div className="logo">
          <img src={logo} alt="logo"/>
        </div>
        <div className="tagbar">
          <Menu selectedKeys={[current]} onClick={(e) => handleChange(e)} className="menu" mode="horizontal">
            <Item key="home">
              <Icon type="home" />
              首页
            </Item>
            <Item key="issue">
              <Icon type="form" />
              发布
            </Item>
            <Item key="upload">
              <Icon type="cloud-upload" />
              上传
            </Item>
          </Menu>
        </div>
        {isShowUpload ? 
          <Upload 
            isShowUpload={isShowUpload} 
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
          : null
        }
      </div>
    </div>
  )
}

export default Header