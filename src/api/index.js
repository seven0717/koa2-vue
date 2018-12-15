import axios from 'axios';
export default{
  // 登陆
  denglu: (data) => {
    return axios.post('/login', data)
  },
  // 验证token
  homes:() => {
    return axios.get('/login/test');
  },
  lists:() => {
    return axios.get('/lists')
  }
}
