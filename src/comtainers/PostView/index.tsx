import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import moment from 'moment'
import { BackTop, Comment, Avatar, Form, Button, List, Input } from 'antd'
import Axios from 'axios'
import './index.less'

const { TextArea } = Input

const CommentList = ({ comments }:any) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props:any) => <Comment {...props} />}
  />
)

const Editor = ({ onChange, onSubmit, submitting, value }:any) => (
  <div>
    <Form.Item>
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        发表
      </Button>
    </Form.Item>
  </div>
)

export default function PostView(props:any) {
  const d = {
    _id: '',
    title: '',
    url: '',
    content: '',
    type: [],
    viewCount: 0,
    commentCount: 0,
    likeCount: 0,
    date: null,
  }
  const id = props.location.pathname.substring(14)
  const [data, setData] = useState(d)
  const [comments, setComments] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    Axios.get(`/postView:${id}`)
      .then(res => {
        console.log(res)
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  useEffect(() => {
    Axios.get('/commentsList')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [comments.length])

  function handleSubmit() {
    if (!value) {
      return
    }
    setSubmitting(true)
    const comment = {postId: id, content: value}

    setTimeout(() => {
      setSubmitting(false)
      setValue('')
      setComments([])
    }, 1000)
  }

  function handleChange(e:any) {
    setValue(e.target.value)
  }

  return (
    <div className="post_view">
      <BackTop />
      <div className="title">
        <h1>{data.title}</h1>
      </div>
      <div className="body">
        <div className="image">
          {data.url ? <img src={data.url} alt="logo"/> : null}
        </div>
        <div className="artical">
          <ReactMarkdown className="view" source={data.content} />
        </div>
      </div>
      <div className="comment">
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Commentator"
            />
          }
          content={
            <Editor
              onChange={(e:any) => handleChange(e)}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
      {comments.length > 0 && <CommentList comments={comments} />}
    </div>
  )
}