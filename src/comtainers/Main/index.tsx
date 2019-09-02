import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/Header'
import PostsList from '../../comtainers/PostsList'
import Post from '../../comtainers/Post'
import PostView from '../../comtainers/PostView'
import Todos from '../Todos'
import Self from '../../components/Self'
import './index.less'


export default function Main() {

  return (
		<div>
      <Header />
      <div className="page">
        <Switch>
          <Route path='/post' component={Post} />
          <Route path='/postView' component={PostView} />
          <Route path='/todos' component={Todos} />
          <Route path='/self' component={Self} />
          <Route component={PostsList} />
          {/* <Route component={Todos} /> */}
        </Switch>
      </div>
    </div>
  )
}