function makeListSingleQuote({ singleQuoteData }) {
  return async function listSingleQuote() {
    const fetchedQuote = await singleQuoteData.fetchSingleQuote()

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

export { makeListSingleQuote }
