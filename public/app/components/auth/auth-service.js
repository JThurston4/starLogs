let _auth = axios.create({
  baseURL: '/account',
  withCredentials: true,
  timeout: 3000
})

let _user = {}

export default class AuthService {
  constructor() {
    console.log('auth service')
  }

  login(creds, draw) {
    _auth.post('login', creds)
      .then(res => {
        _user = res.data
        draw()
      }).catch(err => {
        console.error(err)
      })
  }

  register(creds, draw) {
    _auth.post('register', creds)
      .then(res => {
        _user = res.data
        draw()
      }).catch(err => {
        console.error(err)
      })
  }

  authenticate(drawOnSuccess, drawOnFail) {
    _auth.get('authenticate')
      .then(res => {
        _user = res.data
      }).catch(err => {
        console.error(err)
      })
  }
}

