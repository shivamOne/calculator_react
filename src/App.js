import { useReducer } from 'react';
import DigitButtons from './digitbutton';
import OprationButtons from './oprationbutton';
import './App.css';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOS_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, {type, payload}) {
  switch(type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          current: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.current === "0") {
       return state
      }
      if (payload.digit === "." && state.current.includes(".")) {
       return state
      }

      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      }
    case ACTIONS.CHOOS_OPERATION:
      if (state.current == null && state.privious == null) {
        return state
      }

      if(state.current ==null) {
        return {
          ...state,
          opration: payload.opration,
        }
      }

      if (state.privious == null) {
        return {
          ...state,
          opration: payload.opration,
          privious: state.current,
          current: null,
        }
      }

      return {
        ...state,
        privious: evaluate(state),
        opration: payload.opration,
        current: null,
      }
    case ACTIONS.CLEAR:
      return{} 
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          current:null
        }
      }
      if (state.current == null) return state
      if (state.current.length === 1) {
        return { ...state, current: null }
      }

      return {
        ...state,
        current:state.current.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (
        state.opration ==null ||
        state.current == null ||
        state.privious == null 
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        privious:  null,
        opration: null,
        current: evaluate(state)

      }
  }
}

function evaluate({current, privious, opration}) {
  const prev = parseFloat(privious)
  const  curnt = parseFloat(current)
  if (isNaN(prev) || isNaN(curnt)) return ""

  let computation = ""
  switch(opration) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "/":
      computation = prev / current
      break
  }

  return computation.toString()

}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function format(operand) {
  if (operand == null) return
  const [ integer, decimal] = operand.split(".")
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const [{current, privious, opration}, dispatch] = useReducer(reducer, {})



  return (
    <div className='calculator-grid'>
      <div className='output'>
        <div className='privious'>{format(privious)} {opration}</div>
        <div className='current'>{format(current)}</div>
      </div>
      <button className='span-two' 
      onClick={() => dispatch({type: ACTIONS.CLEAR})}
      >
        AC
      </button>      
      <button onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}
      >
        DEL
      </button>     
      <OprationButtons opration="/" dispatch={dispatch} />   
      <DigitButtons digit="1" dispatch={dispatch} />   
      <DigitButtons digit="2" dispatch={dispatch} />   
      <DigitButtons digit="3" dispatch={dispatch} />   
      <OprationButtons opration="*" dispatch={dispatch} /> 
      <DigitButtons digit="4" dispatch={dispatch} />   
      <DigitButtons digit="5" dispatch={dispatch} />   
      <DigitButtons digit="6" dispatch={dispatch} />   
      <OprationButtons opration="+" dispatch={dispatch} />     
      <DigitButtons digit="7" dispatch={dispatch} />   
      <DigitButtons digit="8" dispatch={dispatch} /> 
      <DigitButtons digit="9" dispatch={dispatch} /> 
      <OprationButtons opration="-" dispatch={dispatch} />  
      <DigitButtons digit="." dispatch={dispatch} /> 
      <DigitButtons digit="0" dispatch={dispatch} /> 
      <button className='span-two' onClick={() => dispatch({type: ACTIONS.EVALUATE})}
      >
        =
      </button>     

    </div>
  )
}

export default App;
