import { makeSingleQuote } from './single-quote.js'
import { quoteData } from '../data-access/index.js'

const singleQuote = makeSingleQuote({ quoteData })

const quoteService = Object.freeze({
  singleQuote,
})

export { quoteService, singleQuote }
