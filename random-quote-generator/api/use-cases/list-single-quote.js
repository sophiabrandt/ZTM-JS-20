import { makeQuote } from '../quote/index.js'

function makeListSingleQuote({ singleQuoteData }) {
  return async function listSingleQuote() {
    const fetchedSingleQuote = await singleQuoteData.fetchSingleQuote()

    if (!fetchedSingleQuote) {
      return fetchedNothing()
    }

    function fetchedNothing() {
      return {
        data: false,
        message: 'Quote not available',
      }
    }

    const singleQuote = makeQuote(fetchedSingleQuote)

    return {
      quoteAuthor: singleQuote.getQuoteAuthor(),
      quoteText: singleQuote.getQuoteText(),
    }
  }
}

export { makeListSingleQuote }
