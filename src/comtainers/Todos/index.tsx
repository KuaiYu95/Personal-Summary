import React, {useState,useEffect} from 'react'
import {Input, Button, Icon, Checkbox, message} from 'antd';
import moment from 'moment';
import './index.less'

interface ITodo {
	todo: string,
  isChecked: boolean,
  dbc: boolean,
  id: string
}

function Todos() {
  // 暂存输入框内容
  const [todo, setTodo] = useState('')  
  // 所有 Todos 组成的数组
  const [todos, setTodos] = useState<ITodo[]>([ 
    {todo: 'test测试', isChecked: false, dbc: false, id: '1567323296933'},
    {todo: 'blog 添加上次markdown文件功能', isChecked: false, dbc: false, id: '1567323261044'},
    {todo: '替换markdown展示库', isChecked: true, dbc: false, id: '1567323264039'},
  ])  
  // 全选按钮判断
  const [isAllChecked, setIsAllChecked] = useState<boolean>()
  // 判断是否显示清除所有已完成任务按钮
  const [isHave, setIsHave] = useState<boolean>()
  // 剩余未完成任务
  const [left, setLeft] = useState<number>()
  // 3选1
  const [select, setSelect] = useState('All')

  useEffect(() => {
    const flag = todos.every((it:ITodo) => {
      return it.isChecked === true ? true : false
    })
    flag ? setIsAllChecked(true) : setIsAllChecked(false)

    share(todos)
  }, [todos])

  const share = function(todos:any) {
    const flag2 = todos.some((it:ITodo) => {
      return it.isChecked === true ? true : false
    })
    flag2 ? setIsHave(true) : setIsHave(false)

    let left = todos.reduce((count:number, it:ITodo) => {
      if (!it.isChecked) {
        return count = count + 1
      } else {
        return count
      }
    }, 0)
    setLeft(left)
  }

  // 实时更新输入框内容到暂存区
  const handleChangeTodo = function(e:any) {
    setTodo(e.target.value)
  }
  // 添加todo按钮点击操作
  const handleClickAdd = function() {
    if (todo.trim() === '') {
      message.warn('请输入代办任务')
    } else {
      let id = Date.now().toString()
      setTodo('')
      setTodos([...todos, {todo: todo.trim(), isChecked: false, dbc: false, id}])
    }
  }
  // todo任务是否完成按钮点击
  const handleClickCheck = function(e:any) {
    const id = e.target.id
    const check = e.target.checked
    let datas = [...todos].map((it:ITodo) => {
      if (it.id === id) {
        return {id, isChecked: check, dbc: it.dbc, todo: it.todo}
      } else {
        return it
      }
    })
    setTodos(datas)
  }
  // 全选按钮点击
  const handleClickAllCheck = function() {
    if (isAllChecked) {
      let datas = [...todos].map((it:ITodo) => {
        return {id: it.id, isChecked: !it.isChecked, dbc: it.dbc, todo: it.todo}
      })
      setTodos(datas)
      setIsAllChecked(false)
    } else {
      let datas = [...todos].map((it:ITodo) => {
        if (!it.isChecked) {
          return {id: it.id, isChecked: !it.isChecked, dbc: it.dbc, todo: it.todo}
        } else {
          return it
        }
      })
      setTodos(datas)
      setIsAllChecked(true)
    }
  }
  // todo任务删除按钮
  const handleClickDel = function(e:any) {
    const id = e.target.dataset.id
    let datas = todos.filter((it:ITodo) => {
      if (it.id === id) {
        return false
      } else {
        return true
      }
    })
    setTodos(datas)
  }
  // 清除所有已完成任务按钮点击
  const handleClickCle = function() {
    let datas = todos.filter((it:ITodo) => {
      return it.isChecked ? false : true
    })
    setTodos(datas)
  }
  // 三选一
  const handleClickSelect = function(type:string):void {
    switch(type) {
      case 'All': 
        setSelect('All')
        break
      case 'Active': 
        setSelect('Active')
        break
      case 'Completed':
        setSelect('Completed')
    }
  }
  
  const TodosRender = function(props:any) {
    const {value} = props
    let datas = []
    switch(select) {
      case 'Active': 
        datas = value.filter((it:ITodo) => {
          return it.isChecked ? false : true
        })
        break
      case 'Completed':
        datas = value.filter((it:ITodo) => {
          return it.isChecked ? true : false
        })
        break
      default:
        datas = value
    }
    share(datas)
    return (
      <div className="list">
          {datas.map((it:ITodo) => {
            return (
              <div className="item" key={it.id}>
                <Checkbox id={it.id} checked={it.isChecked} onClick={handleClickCheck} />
                <div className="block">
                  {it.dbc ? 
                    <Input value={it.todo} /> 
                  : 
                    <div className="todo" style={it.isChecked ? {textDecoration: 'line-through'} : {}}>{it.todo}</div>
                  }
                  <div className="time">{moment(+it.id).format('L')}</div>
                </div>
                <div data-id={it.id} onClick={handleClickDel}>
                  <span style={{pointerEvents: "none"}}>
                    <Icon type="delete" />
                  </span>
                </div>
              </div>
            )
          })}
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <Checkbox checked={isAllChecked ? true : false} 
            onClick={handleClickAllCheck} /> 
        <Input value={todo} onChange={handleChangeTodo} placeholder="What needs to be done?" />
        <Button onClick={handleClickAdd}><Icon type="plus"/></Button>
      </div>
      <div className="center">
        <span className="left">{left} items left</span>
        <div className="select">
          <div style={select === 'All' ? {color:'#bcd4e0', boxSizing:'border-box', border: '1px solid #bcd4e0', } : {}} 
            onClick={() => handleClickSelect('All')}>All</div>
          <div style={select === 'Active' ? {color:'#bcd4e0', boxSizing:'border-box', border: '1px solid #bcd4e0', } : {}} 
            onClick={() => handleClickSelect('Active')}>Active</div>
          <div style={select === 'Completed' ? {color:'#bcd4e0', boxSizing:'border-box', border: '1px solid #bcd4e0', } : {}} 
            onClick={() => handleClickSelect('Completed')}>Completed</div>
        </div>
        {isHave ? <span className="clear" onClick={handleClickCle}>Clear Completed</span> : null}
      </div>
      <TodosRender value={todos} />
    </div>
  )
}

export default Todos