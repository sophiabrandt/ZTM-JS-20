import { config } from './config.js'

const url = config.url
let photos = []

const loader = document.getElementById('loader')
const stackContainer = document.getElementById('stack-container')

async function fetchData(apiURL = url) {
  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: { 'Set-Cookie': 'SameSite=strict' },
    })
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

function setAttributes(elements, attributes) {
  for (const [key, value] of Object.entries(attributes)) {
    elements.setAttribute(key, value)
  }
}

function displayPhotos(photoData) {
  // create new elements for each photo
  photoData.forEach((photo) => {
    // create <a> element to link to Unsplash
    const item = document.createElement('a')
    setAttributes(item, {
      href: photo.link,
      target: '_blank',
    })

    // create <imd> for photo
    const img = document.createElement('img')
    setAttributes(img, {
      src: photo.imgURL,
      alt: photo.description,
      title: photo.description,
    })

    // put <img> inside <a>, append to stack container
    item.appendChild(img)
    stackContainer.appendChild(item)
  })
}

function showLoading() {
  loader.classList.remove('visually-hidden')
}

async function hideLoading() {
  setTimeout(() => {
    loader.classList.add('visually-hidden')
  }, 1000)
}

// fetch and display photos on startup
async function fetchAndDisplayPhotos() {
  await setPhotos(url)
  displayPhotos(photos)
}

// check to see if scrolling is near bottom of page
window.addEventListener('scroll', async () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading()
    await fetchAndDisplayPhotos()
    hideLoading()
  }
})

fetchAndDisplayPhotos()
