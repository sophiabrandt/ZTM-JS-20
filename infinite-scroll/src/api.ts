import { Router } from './deps.ts'
import { Photo } from './models/photos.ts'

const router = new Router()

router.get('/', (ctx) => {
  ctx.response.body = `Unsplash API - Infinite Scroll`
})

export default router
