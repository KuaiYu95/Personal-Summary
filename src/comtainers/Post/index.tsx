import React, { useState } from 'react'
import {Upload, message, Input, Button, Icon, TreeSelect, Result} from 'antd'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import './index.less'

const { TextArea } = Input
const { SHOW_PARENT } = TreeSelect;
const treeData = [
  {
    value: '前端',
    key: '前端',
    title: '前端'
  }, 
  {
    value: '后端',
    key: '后端',
    title: '后端'
  }, 
  {
    value: '数据库',
    key: '数据库',
    title: '数据库'
  }, 
  {
    value: '工具',
    key: '工具',
    title: '工具'
  }, 
  {
    value: '刷题',
    key: '刷题',
    title: '刷题'
  },
  {
    value: '日志',
    key: '日志',
    title: '日志'
  }, 
]

function getBase64(img:any, callback:any):any {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file:any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default function Post() {
  const [title, setTitle] = useState('')
  const [md, setMd] = useState('')
  const [type, setType] = useState(undefined)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const uploadButton = (
    <div style={{color: '#d9d9d9'}}>
      <Icon type={loading ? 'loading' : 'upload'} />
      <span>上传文章图片</span>
    </div>
  );

  function handleTitleChange(e:any) {
    setTitle(e.target.value)
  }

  function handleMdChange(e:any) {
    setMd(e.target.value)
  }

  function handleSubmit() {
    const date = Date.now()
    const data = {title, content: md, date, type, url: imageUrl}
    axios.post('/issue', data)
      .then(res => {
        console.log(res)
        setSuccess(true)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setTitle('')
        setMd('')
        setType(undefined)
        setImageUrl('')
      })
  }

  function handleTypeChange(value:any) {
    console.log(value)
    setType(value)
  }

  function handleUrlChange(info:any) {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (imageUrl:any) => {
        setLoading(false)
        setImageUrl(imageUrl)
      });
    }
  };

  return (
    <div className="edit">
      {success ? 
        <Result
          status="success"
          title="文章发布成功!"
          subTitle="恭喜你在成功的道路上又迈进了一步"
          extra={[
            <Button key="postid">
              前往文章页面
            </Button>,
            <Button type="primary" key="issue" onClick={() => setSuccess(false)}>
              继续发布
            </Button>,
          ]}
        /> : 
        <div>
          <div className="header">
            <Input className="title" value={title} placeholder="请填写文章标题" onChange={(e) => handleTitleChange(e)} />
            <TreeSelect 
              maxTagCount={3}
              className="type"
              treeData={treeData}
              value={type}
              onChange={handleTypeChange} 
              searchPlaceholder="请选择文章类型"
              treeCheckable={true}
              showCheckedStrategy={SHOW_PARENT}
            />
            <div className="image">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleUrlChange}
              >
                {imageUrl ? <div style={{color: '#d9d9d9'}}><Icon type="file-image" /><span>图片已上传</span></div> : uploadButton}
              </Upload>
            </div>
            <Button className="submit" type="primary" onClick={handleSubmit}
              disabled={!loading && title && md && type ? false : true}>发布</Button>
          </div>
          <div className="contain">
          <div className="left">
            <TextArea className="text" autosize={{ minRows: 29, maxRows: 29 }} name="md"
              value={md} onChange={(e) => handleMdChange(e)} />
          </div>
          <div className="right">
            <div>
              <ReactMarkdown className="view" source={md} />
            </div>
          </div>
        </div>
        </div>
      }
    </div>
  )
}