import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/Header'
import PostsList from '../../comtainers/PostsList'
import Post from '../../comtainers/Post'
import PostView from '../../comtainers/PostView'
import './index.less'


export default function Main() {

  return (
		<div>
      <Header />
      <div className="page">
        <Switch>
          <Route path='/post' component={Post} />
          <Route path='/postView' component={PostView} />
          <Route component={PostsList} />
        </Switch>
      </div>
    </div>
  )
}