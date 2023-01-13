import { init } from "create-react-app/createReactApp";
import React , {useReducer}  from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";
import "./Style.css";

export const ACTIONS = {
  ADD_DIGIT : 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT : 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE : 'evaluate'
}

function reducer(state,{type , payload}){
    switch(type){
        case ACTIONS.CHOOSE_OPERATION:
            if(state.Current == null && state.Perv == null){
                return state
            }

            if(state.Perv == null){
                return {
                ...state ,
                operation: payload.Operation,
                Perv:state.Current,
                 Current: null,
                }
            }

            if(state.Current == null){
                return{
                    ...state,
                    operation:payload.operation,
                }
            }
            
            return{
                ...state,
                Perv:evaluate(state),
                operation:payload.operation,
                Current:null
            }

        case ACTIONS.CLEAR:
            return{}
            
        case ACTIONS.EVALUATE:
           if(
            state.operation == null ||
            state.Current == null ||
            state.Perv == null
           ){
                return state    
            }

            return{
               ...state,
               Perv:null,
               overwrite:true,
               operation:null,
               Current:evaluate(state) 
            }
        case ACTIONS.ADD_DIGIT:
            if(state.overwrite){
                return{
                    ...state,
                    Current:payload.digit,
                    overwrite:false,
                }
            }

            if(payload.digit === "0" && state.Current === "0") {return state}
            if(payload.digit === "." && state.Current.includes(".")) {return state}
            return {
                ...state ,
                Current: `${state.Current ||""}${payload.digit}`}
            
           

        
        case ACTIONS.DELETE_DIGIT:
           if(state.overwrite){
                return{
                    ...state,
                    overwrite: false,
                    Current: null
                   }
                }    
            if(state.Current == null) {return state}
            if(state.Current.length === 1){
                 return { ...state,Current:null}
                }

                return{
                    ...state,
                    Current:state.Current.slice(0,-1)
                }

            }
            
            
           

      
                

    }

function evaluate({Current , Perv , operation}){
    const perv = parseFloat(Perv)
    const current = parseFloat(Current)
    if(isNaN(perv) || isNaN(current)) return ""
    let computation = ""
    switch(operation){
        case "+":
          computation = perv + current
          break;
        case "*":
          computation = perv * current
          break;
        case "-":
          computation = perv - current
          break; 
        case "÷":
          computation = perv / current
          break ;
    }

    return computation.toString();

}

const intForamt = new Intl.NumberFormat('en-us',{
    maximumFractionDigits: 0 ,

})

function ForamtOperand(operand){
    if(operand == null) return
    const[integer,decimal] = operand.split(".")
    if(decimal == null){ return intForamt.format(integer)}
    return `${intForamt.format(integer)}`

}



 function App(){
    const[{Current , Perv , operation}, dispatch] =
     useReducer(reducer,
        {})
   
    return(
        <div>
          <div className="CalGrid">
            <div className="OutPut">
                <div className="PreviousOP">{Perv} {operation}</div>
                <div className="CurrentOP">{Current}</div>
                
            </div>
            <button className="SpanTwo" onClick={() => dispatch({type:ACTIONS.CLEAR})}>AC</button>
            <button onClick={()=> dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
            <OperationButton Operation="÷" dispatch={dispatch}/>
            <DigitButton digit="1" dispatch={dispatch} />
            <DigitButton digit="2" dispatch={dispatch} />
            <DigitButton digit="3" dispatch={dispatch} />
            <OperationButton Operation="*" dispatch={dispatch}/>
            <DigitButton digit="4" dispatch={dispatch} />
            <DigitButton digit="5" dispatch={dispatch} />
            <DigitButton digit="6" dispatch={dispatch} />
            <OperationButton Operation="+" dispatch={dispatch}/>
            <DigitButton digit="7" dispatch={dispatch} />
            <DigitButton digit="8" dispatch={dispatch} />
            <DigitButton digit="9" dispatch={dispatch} />
            <OperationButton Operation="-" dispatch={dispatch}/>
            <DigitButton digit="." dispatch={dispatch} />
            <DigitButton digit="0" dispatch={dispatch} />
            {/*
            <button>*</button>
           
            <button>+</button>
       
            <button>-</button>
            <button>.</button>
           
            
            */}
            <button className="SpanTwo" onClick={() => dispatch({type:ACTIONS.EVALUATE})}>=</button>
          </div>
         
          
        </div>
     
    )
}



export default App


