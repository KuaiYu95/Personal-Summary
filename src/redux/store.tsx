// redux 最核心的管理对象模块
// 应用中间件
import { createStore, applyMiddleware } from 'redux'
// 引入异步
import thunk from 'redux-thunk' 
// 引入工具函数
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from './reducers'

// 向外暴露store对象
export default createStore(reducers, 
  composeWithDevTools(applyMiddleware(thunk))
)