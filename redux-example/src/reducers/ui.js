import * as types from '../actions/ActionTypes';

const initialState={
    color:[255,255,255] // 흰색으로 초기화
};

export default function ui(state = initialState, action){
    if(action.type===types.SET_COLOR){ // 오직 하나만 처리하므로, if문으로 처리
        return{
            color:action.color
        };
    }else{  
        return state; // 기존 상태 전달
    }
}