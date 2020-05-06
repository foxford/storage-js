export class HttpStorageResource {
  constructor (
    host,
    endpoint,
    httpClient,
    tokenProvider
  ) {
    this.baseUrl = `${host}/${endpoint}`
    this.httpClient = httpClient
    this.tokenProvider = tokenProvider
  }
  sign (params) {
    return this.tokenProvider.getToken()
      .then((token) =>
        this.httpClient.post(
          `${this.baseUrl}/sign`,
          params,
          {
            headers: {
              authorization: `Bearer ${token}`,
              'content-type': 'application/json'
            }
          }
        )
      )
      .then((response) => response.data.uri)
  }
  upload (params, data, config) {
    return this.sign({
      ...params,
      method: 'PUT'
    })
      .then((uri) =>
        this.httpClient.put(
          uri,
          data,
          {
            ...config,
            ...{ headers: params.headers }
          }
        )
      )
  }
}
