import { makeHttpError } from '../utils/http-error.js'
import { listSingleQuote } from '../use-cases/index.js'

function makeGetSingleQuote() {
  return async function getSingleQuote(ctx) {
    try {
      const data = await listSingleQuote()
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: data ? 200 : 400,
        body: { data },
      }
    } catch (e) {
      return makeHttpError({ status: 400, errorMessage: e.message })
    }
  }
}

export { makeGetSingleQuote }
