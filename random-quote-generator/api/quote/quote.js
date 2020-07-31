function makeBuildQuote() {
  return function makeQuote(quoteInfo) {
    const { quoteAuthor, quoteText } = quoteInfo

    return Object.freeze({
      getQuoteAuthor: () => quoteAuthor,
      getQuoteText: () => quoteText,
    })
  }
}

export { makeBuildQuote }
