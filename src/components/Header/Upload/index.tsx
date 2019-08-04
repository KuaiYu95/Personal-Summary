import React from 'react'
import { Modal } from 'antd'

interface IProps {
  isShowUpload: boolean | undefined,
  handleOk: (e:any) => void,
  handleCancel: (e:any) => void,
}

function Upload(props:IProps) {

  const {isShowUpload, handleOk, handleCancel} = props
  
  return (
    <Modal 
      title="上传 markdown 文档"
      visible={isShowUpload}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <div>sl</div>
    </Modal>
  )
}

export default Upload