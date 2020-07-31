function makeBuildQuote() {
  return function makeQuote(singleQuote) {
    const { quoteAuthor, quoteText } = singleQuote

    return Object.freeze({
      getQuoteAuthor: () => quoteAuthor,
      getQuoteText: () => quoteText,
    })
  }
}

export { makeBuildQuote }
