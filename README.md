# node-proxy

Simple http/https-proxy build using [http-proxy](https://github.com/nodejitsu/node-http-proxy) and node.js.

IMPORTANT: when redirecting https traffic, dont forget to generate the SSL certificates and place them inside the project.

## Configuration

### Setup https

In order to setup the https, 

### Port

The port in which the service runs can be modified in the start script. Defaults to `8011`.

### Proxy routes

Modify the `proxyRoutes` object like the following;

```javascript
const proxyRoutes = [{ sourceUrlRegex: /^.*\/test-endpoint$/g, targetUrl: 'http://localhost:8080' }];
```

This configurations will route all the requests to `*/test-endpoint` to `http://localhost:8080/test-endpoint`.

## Running

```javascript
npm run start
```

## License
MIT © [Alain Perkaz](https://aperkaz.github.io)