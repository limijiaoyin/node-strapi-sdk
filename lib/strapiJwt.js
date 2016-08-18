const cache = require('./cache');
const denodeify = require('denodeify');
const fetch = require('node-fetch');
const urljoin = require('url-join');

cache.get = denodeify(cache.get);
cache.set = denodeify(cache.set);
cache.keys = denodeify(cache.keys);

function freshStrapiJwt() {
    cache.keys().then(res => {
        console.log(res) 
    })
    return cache.get('strapi-jwt').then(res => {
        if (res) {
            console.log('fetch in cache');
            return res;
        } else {
            console.log('fetch in remote');
            return fetch(urljoin(process.env.STRAPI_HOST, '/auth/local'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    identifier: process.env.STRAPI_USERNAME,
                    password: process.env.STRAPI_PASSWORD
                })
            }).then(res => {
                if (!res.ok) throw new Error('StrapiIdentifierError');

                return res.json()
            }).then(json => {
                return cache.set('strapi-jwt', json.jwt, 86400).then(res => {
                    if (!res) throw new Error('cacheError') 
                    return json.jwt;
                })
            })
        }
    })
}

module.exports = freshStrapiJwt;
