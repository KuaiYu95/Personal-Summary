import ajax from './ajax'

export const reqIssue = (data:object) => ajax('/issue', data, 'POST')