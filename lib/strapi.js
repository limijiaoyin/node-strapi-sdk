const jwt = require('./strapiJwt');
const urljoin = require('url-join');
const fetch = require('node-fetch');

const host = process.env.STRAPI_HOST;

class Strapi {
    get(url) {
        return fetch(urljoin(host, url)).then(res => {
            if (!res.ok) {
                console.log(res);
                throw new Error('strapiPostAPIError');
            }  
            return res.json()
        })
    }
    post(url, options) {
        console.log(JSON.stringify(options))
        return jwt().then(token => {
            return fetch(urljoin(host, url), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(options)
            }).then(res => {
                if (!res.ok) {
                    console.log(res);
                    throw new Error('strapiPostAPIError');
                }  
                return res.json()
            })
        })
         
    }
    
    put(url, options) {
        return jwt().then(token => {
            return fetch(urljoin(host, url), {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(options)
            }).then(res => {
                if (!res.ok) {
                    console.log(JSON.stringify(options));
                    console.log(res);
                    throw new Error('strapiPutAPIError');
                }  
                return res.json()
            })
        })
    }
    
    del (url) {
        return jwt().then(token => {
            return fetch(urljoin(host, url), {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }).then(res => {
                if (!res.ok) {
                    throw new Error('strapiDelAPIError');
                }  
                return res.json()
            })
        })
    
    }

}

module.exports = new Strapi();
