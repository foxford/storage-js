# StorageJS
JavaScript API-client for Storage service

## Installation

```sh
npm install --save @netology-group/storage
```

## Example

```js
import {
  AxiosHttpClient,
  SimpleTokenProvider,
  HttpStorageResource
} from '@netology-group/storage'

const TOKEN = 'jwt-token'
const bucket = 'example-bucket'
const set = '123'
const object = 'file.json'
const headers = {
  'cache-control': 'max-age=31536000',
  'content-type': 'application/json'
}
const data = {foo: 'bar'}

const storage = new HttpStorageResource(
  'https://example.com',
  'api/v1',
  new AxiosHttpClient(),
  new SimpleTokenProvider(TOKEN)
)

// signing request params
storage.sign('PUT', bucket, set, object, headers)
  .then((response) => {
    console.log('[response]', response)
  })
  .catch((error) => {
    console.log('[error]', error)
  })
  
// uploading data
storage.upload(bucket, set, object, headers, data, {})
  .then((response) => {
    console.log('[response]', response)
  })
  .catch((error) => {
    console.log('[error]', error)
  })
```
