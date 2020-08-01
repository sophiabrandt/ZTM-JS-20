import { config } from './config.js'

// target HTML elements
const quoteContainer = document.getElementById('quote-container')
const quote= document.getElementById('quote')
const author = document.getElementById('author')
const twitterButton = document.getElementById('twitter')
const newQuoteButton = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Loading Spinner
function showLoadingSpinner() {
  loader.classList.remove('hidden')
  quoteContainer.classList.add('hidden')
}

function hideLoadingSpinner() {
  loader.classList.add('hidden')
  quoteContainer.classList.remove('hidden')
}

// read back-end URL from config, fetch data (reurns a Promise)
const apiURL = config.url

async function getQuote(url) {
  try {
    const response = await fetch(url)
    const quote = await response.json()
    return quote
  } catch (e) {
    return null
  }
}

// Display function and utilities

function displayAuthor(quoteAuthor) {
  if (quoteAuthor.trim().length === 0) {
    author.innerText = 'Unkown'
  }
  author.innerText = quoteAuthor
}

function displayQuote(quoteText) {
  if (quoteText.length > 120) {
    quote.classList.add('long-quote')
    // also reduce font size for the author
    // for visual consistency
    author.classList.add('long-quote')
  } else {
    quote.classList.remove('long-quote')
    author.classList.remove('long-quote')
  }
  quote.innerText = quoteText
}

function getAndDisplayNewQuote(url = apiURL) {
  showLoadingSpinner()

  getQuote(url).then((quote) => {
    if (!!quote.data) {
      displayAuthor(quote.data.quoteAuthor)
      displayQuote(quote.data.quoteText)
    }

    hideLoadingSpinner()
  })
}

// tweet
function tweetQuote() {
  const tweetQuote = quote.innerText
  const tweetAuthor = author.innerText
  const twitterUrl = `http://twitter.com/intent/tweet?text=${tweetQuote} - ${tweetAuthor}`
  window.open(twitterUrl, '_blank')
}

// handling button events
function buttonHandler(target, callback) {
  callback()
}

function handleButtonClick(event, callback) {
  buttonHandler(event.target, callback)
}

function handleButtonKeyDown(event, callback) {
  // Check to see if space or enter were pressed
  if (event.key === ' ' || event.key === 'Enter' || event.key === 'Spacebar') {
    // "Spacebar" for IE11 support
    // Prevent the default action to stop scrolling when space is pressed
    event.preventDefault()
    buttonHandler(event.target, callback)
  }
}

// Event Listeners
newQuoteButton.addEventListener('click', (e) =>
  handleButtonClick(e, getAndDisplayNewQuote)
)
newQuoteButton.addEventListener('keydown', (e) =>
  handleButtonKeyDown(e, getAndDisplayNewQuote)
)
twitterButton.addEventListener('click', (e) => handleButtonClick(e, tweetQuote))
twitterButton.addEventListener('keydown', (e) =>
  handleButtonKeyDown(e, tweetQuote)
)

// Start Random Quote Generator
getAndDisplayNewQuote(apiURL)
