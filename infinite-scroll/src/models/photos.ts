import { config, log } from '../deps.ts'

config({ path: '../../.env' })
const API_KEY = config().API_KEY

export interface Photo {
  id: string
  description: string
  html: string
  regularURL: string
}

const photos = new Map<number, Photo>()

async function getRandomPhotos(count: number = 10) {
  log.info(`Get ${count} random photo(s)...`)
  const unsplashURL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`
  const response = await fetch(unsplashURL, { method: 'GET' })

  if (!response.ok) {
    log.warning('Problem fetching photos from Unsplash API')
    throw new Error('Fetching photos failed.')
  }

  const randomPhotos = await response.json()
  for (const photo of randomPhotos) {
    log.info(photos)
  }
}

await getRandomPhotos(10)
log.info('Downloading photos...')

// endpoints

export function getAll() {
  log.info('photos here')
}
