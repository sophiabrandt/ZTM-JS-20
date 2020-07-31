function makeCallback(controller) {
  return (ctx) => {
    const httpRequest = {
      body: ctx.request.body,
      query: ctx.request.query,
      params: ctx.request.params,
      method: ctx.request.method,
      headers: {
        'Content-Type': ctx.request.headers.get('Content-Type'),
        'User-Agent': ctx.request.headers.get('user-agent'),
      },
    }
    controller(ctx)
      .then((httpReply) => {
        if (httpReply.headers) {
          ctx.response.headers(httpReply.headers)
        }
        ctx.response.type = 'application/json'
        ctx.response.status = httpReply.status
        ctx.response.body = httpReply.body
      })
      .catch((_error) => {
        ctx.response.status = 500
        ctx.response.body = 'An unkown error occurred.'
      })
  }
}

export { makeCallback }
