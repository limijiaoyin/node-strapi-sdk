# node-strapi-sdk
![](https://img.shields.io/badge/node-6.4.0-yellowgreen.svg)

strapi 的 RESTful API 封装，使用 ES6 promise

## Usage

```shell
npm install node-strapi-sdk --save
export STRAPI_HOST='your strapi host'
export STRAPI_USERNAME='username'
export STRAPI_PASSWORD='password'
```

```javascript
var strapi = require('node-strapi-sdk');

strapi.get('/resources').then();
strapi.get('/resources/:id').then();

strapi.post('/resources', {}).then();

strapi.put('/resources/:id', {}).then();

strapi.del('/resources/:id').then();
```
