import React from 'react'; // ES6
import Contact from './Contact';
// var react=require('react'); // 이와 같은 문법 ES5
class App extends React.Component{
    render(){
        return(
            <Contact />
        );
    } 
}

export default App; // 다른 곳에서도 사용할 수 있도록 함
// module.export=App; // ES5 버전