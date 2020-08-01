import { config } from './config.js'

// target HTML elements
const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const quoteAuthor = document.getElementById('author')
const twitterButton = document.getElementById('twitter')
const newQuoteButton = document.getElementById('new-quote')

// get quote
let url = config.url

async function getQuote(url) {
  try {
    const response = await fetch(url)
    const quote = await response.json()
    return quote
  } catch (e) {
    console.error(e.message)
  }
}

function getAndDisplayNewQuote(url) {
  // check aria-pressed state of button
  getQuote(url).then((quote) => {
    if (!!quote.data) {
      if (quote.data.quoteAuthor.trim().length === 0) {
        quoteAuthor.innerText = 'Unknown'
      } else {
        quoteAuthor.innerText = quote.data.quoteAuthor
      }

      // improve readability/style for long text
      if (quote.data.quoteText.length > 120) {
        quoteText.classList.add('long-quote')
        quoteAuthor.classList.add('long-quote')
      } else {
        quoteText.classList.remove('long-quote')
        quoteAuthor.classList.remove('long-quote')
      }
      quoteText.innerText = quote.data.quoteText
    }
  })
}

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

// tweet
function tweetQuote() {
  const quote = quoteText.innerText
  const author = quoteAuthor.innerText
  const twitterUrl = `http://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteButton.addEventListener('click', (e) =>
  handleButtonClick(e, getAndDisplayNewQuote(url))
)
newQuoteButton.addEventListener('keydown', (e) =>
  handleButtonKeyDown(e, getAndDisplayNewQuote(url))
)
twitterButton.addEventListener('click', (e) => handleButtonClick(e, tweetQuote))
twitterButton.addEventListener('keydown', (e) =>
  handleButtonKeyDown(e, tweetQuote)
)

// Get a quote on start
getAndDisplayNewQuote(url)
