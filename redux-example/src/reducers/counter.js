//actiontypes를 불러와야 함
import * as types from '../actions/ActionTypes';
    //types 내부에 변수가 모두 담겨 온다.

// 초기 상태는 상수로 작성
const initialState= {
    number: 0,
    dummy:'dumbdumb',
    dumbObject:{
        d:0,
        u:1,
        m:2,
        b:3
    }
};

// ES6만의 DefaultArgument 이용
export default function counter(state = initialState, action){
    // action의 개수가 많아지면 switch 문을 사용한다고 함
    switch(action.type){
        case types.INCREMENT:
            //return { number:state.number+1 }; // 이와 같이 새로운 객체를 생성하여 리턴
            //return {...state, number:state.number+1}; // 인수가 여러가지일때 덮어씌우는 spread 문법
            return {
                ...state,
                number:state.number+1,
                dumbObject:{
                    ...state.dumbObject,
                    u:0
                }
            };
        case types.DECREMENT:
            return{
                ...state,
                number:state.number-1
            };
        default:
            return state;
        // set color시에는 아무런 변화가 없음.
        // 다른 리듀서에서 처리할 수 있도록 해야함
    }
    
}