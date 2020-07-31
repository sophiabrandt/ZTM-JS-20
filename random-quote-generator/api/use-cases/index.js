import { makeListSingleQuote } from './list-single-quote.js'
import { singleQuoteData } from '../data-access/index.js'

const listSingleQuote = makeListSingleQuote({ singleQuoteData })

const quoteService = Object.freeze({
  listSingleQuote,
})

export { quoteService, listSingleQuote }
