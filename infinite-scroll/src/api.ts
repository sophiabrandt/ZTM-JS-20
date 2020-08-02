import { Router } from './deps.ts'
import { Photo } from './models/photos.ts'

import * as photos from './models/photos.ts'

const router = new Router()

router.get('/', (ctx) => {
  ctx.response.redirect('/index.html')
})

router.get('/photos/random', async (ctx) => {
  ctx.response.body = await photos.getRandomPhotos()
})


export default router
