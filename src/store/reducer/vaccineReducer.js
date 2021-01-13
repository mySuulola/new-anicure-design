import {
    ADD_VACCINE,
    DELETE_VACCINE,

  } from '../constant';
  
  const initialVaccineState = {
    allVaccines: [] 
  };
  
  const vaccineReducer = (state = initialVaccineState, action) => {
    console.log(action)
    switch (action.type) {
      case ADD_VACCINE:
        console.log('got here', action.payload)
        return {
          ...state,
          allVaccines: [
              ...state.allVaccines,
            {id: state.allVaccines.length, ...action.payload}
          ]
        };
      case DELETE_VACCINE:
        const filteredVaccines = state.allVaccines.filter( item => item.id !== action.payload.id)
        console.log(filteredVaccines)
        return {
          ...state,
          allVaccines: [
            ...filteredVaccines
          ]
        };
      default:
        console.log('2')
        return state;
    }
  };
  
  export default vaccineReducer;
  