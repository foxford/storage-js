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
  sign (method, bucket, set, object, headers) {
    return this.tokenProvider.getToken()
      .then((token) =>
        this.httpClient.post(
          `${this.baseUrl}/sign`,
          {
            method,
            bucket,
            set,
            object,
            headers
          },
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
  upload (bucket, set, object, headers, data, config) {
    return this.sign('PUT', bucket, set, object, headers)
      .then((uri) =>
        this.httpClient.put(
          uri,
          data,
          {
            ...config,
            ...{ headers }
          }
        )
      )
  }
}
