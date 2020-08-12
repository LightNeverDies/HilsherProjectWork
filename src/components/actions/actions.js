// eslint-disable-next-line import/prefer-default-export
export const AddNumber = (min, max) => (dispatch) => {
  console.log(min, max)
  fetch(`http://localhost:8000/?min=${min}&max=${max}`)
    .then((response) => response.json())
    .then((result) => {
      console.log(result)
      dispatch({
        type: 'AddingNumber',
        payload: result
      })
    })
    .catch((err) => console.error(err.message))
}
