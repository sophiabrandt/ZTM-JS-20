function makeSingleQuoteData({ url }) {
  async function fetchSingleQuote() {
    const response = await fetch(url)
    return await response.json()
    if (!data) {
      return null
    }
    return data
  }

  return Object.freeze({
    fetchSingleQuote,
  })
}

export { makeSingleQuoteData }
