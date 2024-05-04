const redux = require('redux')
const createStore = redux.createStore

const ADD_COUNT = 'ADD_COUNT'
const DECREMENT_COUNT = 'DECREMENT_COUNT'

function addCounter () {
  return {
    type: ADD_COUNT
      }
}

function DecrementCounter () {
    return {
      type: DECREMENT_COUNT
    }
  }


const initialCounterState = {
  numOfSeats: 10,
  
       }
    
    

const countReducer = (state = initialCounterState, action) => {
  switch (action.type) {
    case ADD_COUNT: return {
      ...state,
      numOfSeats: state.numOfSeats + 1
    }
    case DECREMENT_COUNT: return {
        ...state,
        numOfSeats: state.numOfSeats - 1
      }
    
    default: return state
  }
}


const store = createStore(countReducer)
console.log('Initial State ', store.getState())
const unsubscribe = store.subscribe(() => {console.log("updated State",store.getState()) })
store.dispatch(addCounter())
store.dispatch(addCounter())
store.dispatch(addCounter())
store.dispatch(DecrementCounter())
store.dispatch(DecrementCounter())
unsubscribe()