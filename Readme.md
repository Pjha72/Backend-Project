# Backend Series

Backend With JavaScript

- [Models Link](https://app.eraser.io/workspace/tn7lFbsRwFjsdtMsvp5a?origin=share)

- [gitignore generator](https://mrkandreev.name/snippets/gitignore-generator)

- [Nodemon](https://www.npmjs.com/package/nodemon)

- [prettier](https://www.npmjs.com/package/prettier)

- [dotenv](https://www.npmjs.com/package/dotenv)

- [mongoose](https://mongoosejs.com/docs/)

- [express](https://expressjs.com/)

Whenever you use database try to implement in try catch block or asyn/await.

- [cookie-parser](https://www.npmjs.com/package/cookie-parser)

- [cors](https://www.npmjs.com/package/cors)

- [Middleware Diagram](https://app.eraser.io/workspace/7vKlDwtvAVoyA95seHVJ?origin=share)

- [ApiError](https://nodejs.org/api/errors.html)

- [Server StatusCode](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

- [mongoose-aggregate-paginate](https://www.npmjs.com/package/mongoose-aggregate-paginate-v2)

- [bcrypt](https://www.npmjs.com/package/bcrypt)

- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

- [mongoose middleware](https://mongoosejs.com/docs/middleware.html)

For File Uploading Resources

- [Cloudinary](https://cloudinary.com/)

- [Express-Fileupload](https://www.npmjs.com/package/express-fileupload)

- [Multer](https://www.npmjs.com/package/multer)

- [nodejs-fs](https://nodejs.org/api/fs.html)

# HTTP Protocol
 Hyper Text Transfer Protocol

## What are HTTP Headers?
### metadata --> key-value sent along with request & response 
### Example --> caching, aythentication, manage state

## Types of Headers
1):Request Headers --> From Client
2):Response Headers --> From Server
3):Representation Headers --> encoding/compression
4):Payload Headers --> data

## Most Common Headers
1. Accept : application/json
2. User-Agent
3. Authprization
4. Content-Type
5. Cookie
6. Cache-Control

## CORS Headers
1. Access-Control-Allow-Origin
2. Access-Control-Allow-Credentials
3. Access-Control-Allow-Method

## Security Headers
1. Cross-Origin-Encoded-Policy
2. Cross-Origin-Opner-Ploicy
3. Content-Security-Policy
4. X-XSS-Protection

# HTTP Methods
Basic set of operations that can be used to interact with server

1. GET : retrieve a resources
2. HEAD : No message body (response headers only)
3. OPTIONS : what operations are available
4. TRACE : loopback test (get some data)
5. DELETE : remove a resource
6. PUT : replace a resource
7. POST : interact with resource (mostly add)
8. PATCH : change part of a resource

## HTTP Status Code
1. 1xx => Informational
2. 2xx => Success
3. 3xx => Redirection
4. 4xx => Client error
5. 5xx => Server error

100 - Continue    400 - Bad request
102 - Processing  401 - Unauthorized
200 - ok          402 - Payment required
201 - created     404 - Not Found
202 - accepted    500 - Internal Server error
307 - temporary redirect  504 - Gateway timeout
308 - permanent redirect



