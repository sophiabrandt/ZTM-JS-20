import { Application, Router, send, log, flags } from './deps.ts'
import { getSingleQuote } from './controllers/index.js'
import { makeCallback } from './callback/index.js'

const app = new Application()
const router = new Router()

const PORT = 3000
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

// allow oak to listen to thrown errors
app.addEventListener('error', (event) => {
  log.error(event.error)
})

// routes
router.get('/quotes/random', makeCallback(getSingleQuote))

app.use(router.routes())
app.use(router.allowedMethods())

// serve static files
app.use(async (ctx) => {
  const filePath = ctx.request.url.pathname
  const fileWhitelist = [
    '/index.html',
    '/index.js',
    '/style.css',
    '/static/twitter.svg',
    '/static/shuffle.svg',
  ]
  if (fileWhitelist.includes(filePath)) {
    await send(ctx, filePath, {
      root: `${Deno.cwd()}/client`,
    })
  }
})

if (import.meta.main) {
  log.info(`Starting server on post ${port}...`)
  await app.listen({ port })
}
