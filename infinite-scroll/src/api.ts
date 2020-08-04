import { Router, helpers } from './deps.ts'
import { Photo } from './models/photos.ts'

import * as photos from './models/photos.ts'

const router = new Router()

router.get('/', (ctx) => {
  ctx.response.redirect('/index.html')
})

router.get('/photos/random', async (ctx) => {
  const searchParams = helpers.getQuery(ctx)
  const count = searchParams.count ? Number(searchParams.count) : null
  if (count) {
    ctx.response.body = await photos.getRandomPhotos(count)
  } else {
    await photos.getRandomPhotos()
  }
})

export default router
