const videoElement = document.getElementById('video')
const button = document.getElementById('button')

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia()
    videoElement.srcObject = mediaStream
    videoElement.onloadedmetadata = () => {
      videoElement.play()
    }
  } catch (e) {
    console.error(e.message)
  }
}

button.addEventListener('click', async () => {
  if (document.pictureInPictureElement) {
    try {
      document.exitPictureInPicture()
    } catch (e) {
      console.error(e.message)
    }
  }
  if ('pictureInPictureEnabled in document') {
    button.disabled = true
    await videoElement.requestPictureInPicture()
    button.disabled = false
  } else {
    alert('Picture in Picture is not available!')
  }
})

video.addEventListener('enterpictureinpicture', () => {
  button.textContent = 'STOP'
})

video.addEventListener('leavepictureinpicture', () => {
  button.textContent = 'START'
})

// on load
selectMediaStream()
