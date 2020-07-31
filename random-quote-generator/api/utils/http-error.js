function makeHttpError({ status, errorMessage }) {
  return {
    headers: {
      'Content-Type': 'application/json',
    },
    status,
    body: JSON.stringify({
      success: false,
      error: errorMessage,
    }),
  }
}

export { makeHttpError }
