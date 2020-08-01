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

getQuote(url).then((quote) => {
  if (!!quote.data) {
    if (quote.data.quoteAuthor.trim().length === 0) {
      quoteAuthor.innerText = 'Unknown'
    } else {
      quoteAuthor.innerText = quote.data.quoteAuthor
    }

    // reduce font size for long quotes for better
    // container fitting
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
