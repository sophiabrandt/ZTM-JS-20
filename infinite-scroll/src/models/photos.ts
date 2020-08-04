import { config, log } from '../deps.ts'

config({ path: '../../.env' })
const API_KEY = config().API_KEY

export interface Photo {
  id: string
  description: string
  link: string
  imgURL: string
}

const unsplashURL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}`

async function fetchRandomPhotos(count: number = 30): Promise<Array<Photo>> {
  const photos = new Map<string, Photo>()
  log.info(`Fetching ${count} random photo(s)...`)
  const url = `${unsplashURL}&count=${count}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'applicaton/json',
      'Accept-Version': 'v1',
      'Set-Cookie': 'SameSite=strict',
    },
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

  return Array.from(photos.values())
}

// endpoints
export function getRandomPhotos() {
  return fetchRandomPhotos(30)
}
