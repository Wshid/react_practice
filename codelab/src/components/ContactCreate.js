import React from 'react';
import PropTypes from 'prop-types'; // 15.5버전 이후 https://reactjs.org/docs/typechecking-with-proptypes.html

export default class ContactCreate extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name: '',
            phone:''
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
        this.handleKeyPress=this.handleKeyPress.bind(this);
    }
    
    handleChange(e){ // 여러 인자를 받아 처리가 가능함
        let nextState={};
        nextState[e.target.name]=e.target.value;
        this.setState(nextState);
        
    }
    
    handleClick(){
        // Contact에서 oncreate props를 받아 전달함
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        };
        
        this.props.onCreate(contact);
        this.setState({
            name : '',
            phone : ''
        });
        
        this.nameInput.focus();
    }
    
    handleKeyPress(e){
        if(e.charCode===13){ // 13은 Enter라는 의미
            this.handleClick();
        }
    }
    
    render(){
        return(
            <div>
                <h2> Create Contact </h2>
                <p>
                    <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}
                        ref={(ref)=>{this.nameInput=ref}}
                    />
                    <input type="text" name="phone" placeholder="phone" value={this.state.phone} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                </p>
                <button onClick={this.handleClick}> Create </button>
            </div>
        );
    }
}

ContactCreate.propTypes={
    onCreate : PropTypes.func
};

ContactCreate.defaultProps={
    onCreate : () => {console.error('onCreate not defined'); }
};