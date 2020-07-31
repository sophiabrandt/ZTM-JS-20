import { makeSingleQuoteData } from './make-single-quote-data.js'

const url =
  'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'

const singleQuoteData = makeSingleQuoteData({ url })

export { singleQuoteData }
