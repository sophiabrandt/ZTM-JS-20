import { Application, send, log, flags } from './deps.ts'

import api from './api.ts'

const app = new Application()

const PORT = 8000
const argPort = flags.parse(Deno.args).port
const port = argPort ? Number(argPort) : PORT

// create logger
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler('INFO'),
  },
  loggers: {
    default: {
      level: 'INFO',
      handlers: ['console'],
    },
  },
})

// error handling
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.response.body = 'Internal Server Error'
    throw err
  }
})

// allow oak to listen to thrown errors
app.addEventListener('error', (event) => {
  log.error(event.error)
})

// simple request logging middleware
app.use(async (ctx, next) => {
  await next()
  const time = ctx.response.headers.get('X-Response-Time')
  log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`)
})

// simple timer logging
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const delta = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${delta}ms`)
})

// routes
app.use(api.routes())
app.use(api.allowedMethods())

// serve static files
app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname
  const fileWhitelist = [
    '/index.html',
    '/index.js',
    '/style.css',
    '/static/images/loader.svg',
  ]
  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/public`,
    })
  }
})

if (import.meta.main) {
  log.info(`Starting server on post ${port}...`)
  await app.listen({
    port,
  })
}
