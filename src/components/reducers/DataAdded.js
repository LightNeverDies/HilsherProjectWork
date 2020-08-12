const initialState = { data: [] }

const DataAdded = (state = initialState, action) => {
  switch (action.type) {
  case 'AddingNumber':
    return { ...state, data: [...state.data, action.payload] }
  default:
    return state
  }
}
export default DataAdded
