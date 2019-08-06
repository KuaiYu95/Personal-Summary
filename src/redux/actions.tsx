import { RECEIVE_ISSUE } from './actionTypes'
import { reqIssue } from '../api'


const receiveIssue = (data:object) => ({type: RECEIVE_ISSUE, data})

interface issueData {
  title: string,
  content: string,
  date: number,
  type: string|string[],
  url?: string,
}

export const issue:any = (data:issueData) => {
  console.log('issue', data)
  return async (dispatch:any) => {
    console.log('dispatch')
    const response = await reqIssue(data)
    const result = response.data
    console.log(result)
    dispatch(receiveIssue(result))
  }
}
