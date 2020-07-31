import { makeGetSingleQuote } from './get-single-quote.js'

const getSingleQuote = makeGetSingleQuote()

const quoteController = Object.freeze({
  getSingleQuote,
})

export { quoteController, getSingleQuote }
