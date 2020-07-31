function makeSingleQuote({ quoteData }) {
  return async function singleQuote() {
    const fetchedQuote = await quoteData.fetchQuote()

    if (!fetchedQuote) {
      return fetchedNothing()
    }

    function fetchedNothing() {
      return {
        data: false,
        message: 'Quote not available',
      }
    }
    return fetchedQuote
  }
}

export { makeSingleQuote }
