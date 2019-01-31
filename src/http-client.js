import axios from 'axios'

export class AxiosHttpClient {
  post (url, data, config) {
    return axios.post(url, data, config)
  }
  put (url, data, config) {
    return axios.put(url, data, config)
  }
}
