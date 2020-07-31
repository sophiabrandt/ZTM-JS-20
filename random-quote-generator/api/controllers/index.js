import { makeGetQuote } from './get-quote.js'

const getQuote = makeGetQuote()

const quoteController = Object.freeze({
  getQuote,
})

export { quoteController, getQuote }
