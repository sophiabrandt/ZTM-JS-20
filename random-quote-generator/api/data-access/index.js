import { makeQuoteData } from './make-quote-data.js'

const url =
  'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

const quoteData = makeQuoteData({ url })

export { quoteData }
