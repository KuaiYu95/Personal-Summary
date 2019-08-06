import axios from 'axios'

export default function ajax(url:string = '', data:any = {}, type:string = 'GET'):any {
  
  console.log({url, data, type})
  if (type === 'GET') {
    let urlStr = ''
    Object.keys(data).forEach((key) => {
      urlStr += key + '=' + data[key] + '&'
    })
    if(urlStr) {
      urlStr = urlStr.substring(0, urlStr.length - 1)
      url = url + '?' + urlStr
    }
    console.log('GET', url)
    return axios.get(url)
  } else if (type === 'POST') {
    console.log({url, data})
    return axios.post(url, data)
  }
}