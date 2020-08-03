import { config, log } from '../deps.ts'

config({ path: '../../.env' })
const API_KEY = config().API_KEY

export interface Photo {
  id: string
  description: string
  link: string
  imgURL: string
}

const photos = new Map<string, Photo>()

async function fetchRandomPhotos(count: number = 30): Promise<void> {
  log.info(`Fetching ${count} random photo(s)...`)
  const unsplashURL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`
  const response = await fetch(unsplashURL, {
    method: 'GET',
    headers: { 'Content-Type': 'applicaton/json', 'Accept-Version': 'v1', 'Set-Cookie': 'SameSite=strict' },
  })

  if (!response.ok) {
    log.warning('Problem fetching photos from Unsplash API')
    throw new Error('Fetching photos failed.')
  }

  const randomPhotos = await response.json()
  for (const photo of randomPhotos) {
    const photoData = {
      id: photo['id'],
      description: photo['alt_description'],
      link: photo['links']['html'],
      imgURL: photo['urls']['regular'],
    }

    photos.set(photoData.id, photoData)
  }
}

await fetchRandomPhotos(30)
log.info('Downloading photos...')

// endpoints
export function getRandomPhotos() {
  return Array.from(photos.values())
}
