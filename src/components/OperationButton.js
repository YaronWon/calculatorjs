import { ACTIONS } from "../App"

export default function OperationButton({dispatch, Operation}){
 return <button 
 onClick={() => dispatch({type: ACTIONS.CHOOSE_OPERATION ,payload:{Operation} })}>
    {Operation}</button>
}