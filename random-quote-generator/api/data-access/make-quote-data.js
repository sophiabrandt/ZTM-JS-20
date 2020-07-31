function makeQuoteData({ url }) {
  async function fetchQuote() {
    const response = await fetch(url)
    return await response.json()
    if (!data) {
      return null
    }
    return data
  }

  return Object.freeze({
    fetchQuote,
  })
}

export { makeQuoteData }
