import React from 'react';

//export default는 그냥 앞에 나온 것. 바로 publish
export default class ContactInfo extends React.Component{
    render(){ // nativeHTML로 onclick처리를 활성화 시킨다.
        return(
            <div onClick={this.props.onClick}>
                {this.props.contact.name}
            </div>
        );
    }
}