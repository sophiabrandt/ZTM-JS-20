function makeCallback(controller) {
  return ({ request, response }, next) => {
    let httpRequest = request
    if (request.hasBody) {
      httpRequest = {
        body: request.body,
        method: request.method,
        params: request.params,
        headers: {
          'Content-Type': request.headers.get('Content-Type'),
          'User-Agent': request.headers.get('User-Agent'),
        },
      }
    }

    // must be wrapped in a Promise
    // see https://github.com/oakserver/oak/issues/148
    return new Promise((resolve, reject) => {
      controller(httpRequest)
        .then((httpResponse) => {
          if (httpResponse.headers) {
            response.headers.set('Content-Type', httpRequest.headers['Content-Type'])
          }
          response.status = httpResponse.status
          response.body = httpResponse.body
          resolve()
        })
        .catch((error) => {
          response.status = 500
          response.body = 'An unknown error occured'
          reject()
        })
    }).then(next)
  }
}

export { makeCallback }
