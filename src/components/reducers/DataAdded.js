const initialState = {
    data : []
}

const DataAdded = (state = initialState, action) =>{
    switch(action.type){
        case 'AddingNumber':

            let newArray = [];
            newArray.push(...action.payload)

            console.log(newArray)
            return {...state, data: newArray}
            default:
                return state;
    }
}
export default DataAdded;