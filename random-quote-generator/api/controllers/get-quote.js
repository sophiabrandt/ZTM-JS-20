import { singleQuote } from '../use-cases/index.js'

function makeGetQuote() {
  return async function getQuote(ctx) {
    try {
      const fetched = await singleQuote()
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: fetched.fetched ? 200 : 404,
        body: { fetched },
      }
    } catch (e) {
      return makeHttpError({ status: 400, errorMessage: e.message })
    }
  }
}

export { makeGetQuote }
