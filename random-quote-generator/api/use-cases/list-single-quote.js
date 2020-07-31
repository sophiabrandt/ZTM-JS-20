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
    return fetchedSingleQuote
  }
}

export { makeListSingleQuote }
