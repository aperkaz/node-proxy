# node-proxy

Simple http/https-proxy build using [http-proxy](https://github.com/nodejitsu/node-http-proxy) and node.js.

## Configuration

### Setup https

In order to setup the https, 

### Port

The port in which the service runs can be modified in the start script.

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

## Responsible team

Softwerk Team.
