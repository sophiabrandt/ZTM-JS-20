import { Application, send, log, flags, oakCors } from './deps.ts'

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

// cors
app.use(oakCors())

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
