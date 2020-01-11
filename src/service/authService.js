import axios from 'axios'

const API_URL = 'https://end-8y.herokuapp.com/users/authenticate'

class AuthService {
  login(user) {
    return axios
      .post(API_URL, {
        username: user.username,
        password: user.password
      })
      .then(this.handleResponse)
      .then(res => {
        // console.log(res)
        if (res.data.token) {
          localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  handleResponse(response) {
    if (response.status === 401) {
      this.logout()
      location.reload(true)

      const error = response.data && response.data.message
      return Promise.reject(error)
    }
    return Promise.resolve(response)
  }
}

export default new AuthService()
