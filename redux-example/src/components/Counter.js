/*
 * Value와 Control을 감싸는 smart Component
 */
import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import Value from './Value';
import Control from './Control';

//import {connect, bindActionCreators} from 'react-redux';
import {connect} from 'react-redux';

import * as actions from '../actions';
/*
const propTypes={
    
};

const defaultProps={
    
};
*/
class Counter extends Component{
    constructor(props){
        super(props);
        this.setRandomColor=this.setRandomColor.bind(this);
    }
    
    setRandomColor(){
        const color=[
            Math.floor((Math.random()*55)+200),
            Math.floor((Math.random()*55)+200),
            Math.floor((Math.random()*55)+200)
        ];
        
        this.props.handleSetColor(color);
    }
    
    render(){
        
        const color=this.props.color;
        const style={ // 원래 smart에는 style을 지정하지 않음. 예외상황
            background: `rgb(${color[0]}, ${color[1]}, ${color[2]})` // ES6, template literal
            
        };
        
        return(
            <div style={style}>
                <Value number={this.props.number}/>
                <Control
                    onPlus={this.props.handleIncrement}
                    onSubtract={this.props.handleDecrement}
                    onRandomizeColor={this.setRandomColor}
                />
            </div>
        );
    }
}

//Counter.propTypes=propTypes;
//Counter.defaultProps=defaultProps;

//redux state를 components의 props로 변경해주는 함수
const mapStateToProps=(state)=>{ // component의 state와는 다름
    return {
        number: state.counter.number,
        color: state.ui.color
    };
};

// 3가지 Action을 담당할 함수 매핑
const mapDispatchToProps = (dispatch)=>{
    //return bindActionCreators(actions, dispatch); // 처리를 자동으로 해주지만, 이름 지정이 불가능함
    
    return {
        handleIncrement: () => { dispatch(actions.increment())},
        handleDecrement: () => { dispatch(actions.decrement())},
        handleSetColor : (color) => { dispatch(actions.setColor(color))}
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter); // component를 redux에 연결
