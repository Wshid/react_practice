import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { createStore } from 'redux';
import reducers from './reducers'; // index 파일을 로드하기 때문에 경로 지정이 reducers에서 끝남

import { Provider } from 'react-redux';

const store = createStore(reducers);


/* Test Code
import * as actions from './actions';

const store = createStore(reducers); // store 생성

// 현재 상태 

console.log(store.getState());
const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.dispatch(actions.increment()); // 하나의 액션을 만들어서 보냄
store.dispatch(actions.increment()); // 하나의 액션을 만들어서 보냄
store.dispatch(actions.decrement()); // 하나의 액션을 만들어서 보냄
store.dispatch(actions.setColor([200,200,200])); // 하나의 액션을 만들어서 보냄
unsubscribe(); // 한번더 호출하게 되면 subscribe가 해제된다.

store.dispatch(actions.setColor([210,210,210]));
*/
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);