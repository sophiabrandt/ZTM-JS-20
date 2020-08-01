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
getQuote(url).then(quote => {
  quoteAuthor.innerText = quote.data.quoteAuthor
  quoteText.innerText = quote.data.quoteText
})
