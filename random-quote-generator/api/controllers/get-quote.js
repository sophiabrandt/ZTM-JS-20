import { makeHttpError } from '../utils/http-error.js'
import { singleQuote } from '../use-cases/index.js'

function makeGetQuote() {
  return async function getQuote(ctx) {
    try {
      const data = await singleQuote()
      return {
        headers: {
          'Content-Type': 'application/json',
        },
        status: data.data ? 200 : 400,
        body: {data  },
      }
    } catch (e) {
      return makeHttpError({ status: 400, errorMessage: e.message })
    }
  }
}
// function makeGetQuote() {
//   return async function getQuote(ctx) {
//     singleQuote()
//       .then((fetched) => {
//         return {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           status: fetched.fetched ? 200 : 400,
//           body: { fetched },
//         }
//       })
//       .catch((e) => {
//         return makeHttpError({ status: 400, errorMessage: e.message })
//       })
//   }
// }

export { makeGetQuote }
