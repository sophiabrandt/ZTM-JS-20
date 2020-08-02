import { config } from './config.js'

const url = config.url
let photos = []

const loader = document.getElementById('loader')
const stackContainer = document.getElementById('stack-container')

async function fetchData(apiURL = url) {
  try {
    const response = await fetch(apiURL)
    const data = await response.json()
    return data
  } catch (e) {
    console.error(e)
  }
}

async function setPhotos(apiURL = url) {
  photos = await fetchData(apiURL)
  return photos
}

function displayPhotos(photoData) {
  // create new elements for each photo
  photoData.forEach((photo) => {
    // create <a> element to link to Unsplash
    const item = document.createElement('a')
    item.setAttribute('href', photo.link)
    item.setAttribute('target', '__blank')

    // create <imd> for photo
    const img = document.createElement('img')
    img.setAttribute('src', photo.imgURL)
    img.setAttribute('alt', photo.description)
    img.setAttribute('title', photo.description)

    // put <img> inside <a>, append to stack container
    item.appendChild(img)
    stackContainer.appendChild(item)
  })
}

// fetch and display photos on startup
async function fetchAndDisplayPhotos() {
  await setPhotos(url)
  displayPhotos(photos)
}

fetchAndDisplayPhotos()
