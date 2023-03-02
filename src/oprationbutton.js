import { ACTIONS } from "./App";
export default function OprationButtons({dispatch, opration }) {
    return(
        <button 
        onClick={() => dispatch({type: ACTIONS.CHOOS_OPERATION, payload: {opration}})}
        >
            {opration}
        </button>
    )
}