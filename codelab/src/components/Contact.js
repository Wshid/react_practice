import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
    
    constructor(props) { // 생성자 정의
        super(props); // 상위 생성자를 로드한다.
        this.state = {
            selectedKey: -1, // 선택된 객체의 index로 활용
            keyword:'',
            contactData: [{ // json 형태로 정의한다.
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };
        
        // constructor에서 this로 초기화
        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);
        
        this.handleCreate=this.handleCreate.bind(this); 
        this.handleRemove=this.handleRemove.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
    }
    
    
    componentWillMount(){ // 컴포넌트가 DOM 위에 생기기 전
        const contactData=localStorage.contactData;
        if(contactData){
            this.setState({
                contactData : JSON.parse(contactData) // string -> object
            });
        }
    }
    
    componentDidUpdate(prevProps, prevState){
        if(JSON.stringify(prevState.contactData)!= JSON.stringify(this.state.contactData)){
            localStorage.contactData=JSON.stringify(this.state.contactData);
        }
    }
    
    handleChange(e){
        this.setState({
            keyword:e.target.value // event.target.value
        });
    }
    
    handleClick(key){
        this.setState({
            selectedKey: key
        });
        
        console.log(key, 'is selected');
    }
    
    handleCreate(contact){
        this.setState({ // update 메소드를 활용한다.
            contactData: update(this.state.contactData, { $push : [contact]}) // 추가시에도 배열 형태 유지
        });
    }
    
    handleRemove(){ // parameter를 가지지 않음. selectedKey를 사용
        if(this.state.selectedKey<0){
            return; // 아무것도 선택 하지 않았을때 그냥 끝낸다.
        }
        this.setState({
            contactData: update(this.state.contactData,
                {
                    $splice: [[this.state.selectedKey, 1]] // 내용 삭제시, 이중배열 형태
                }
            ),
            selectedKey : -1
        });
    }
    
    handleEdit(name, phone){ // 상대적으로 create와 delete보다 구문이 복잡
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedKey]: { // 특정 인덱스에 값을 정의한다.
                        name: {
                            $set : name
                        },
                        phone:{
                            $set : phone
                        }
                    }
                }
            )
        });
        
    }
    
    render() {
        const mapToComponents = (data) => {
            data.sort();
            
            data=data.filter((contact)=>{ // indexOf 값이 -1보다 크다면 인덱스가 존재함
                return contact.name.toLowerCase().indexOf(this.state.keyword)>-1; // filter 함수를 통하여 필터링
                } // return 구문에는 T/F 값이 오게 된다.
            );
            
            return data.map((contact, i) => { // contact와 index를 매개로 하는 return 구문
                return (<ContactInfo
                    contact={contact}
                    key={i}
                    onClick={() => this.handleClick(i)} // 매개변수 전달시에 arrow 활용
                    />);
            });
        };
        
        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails
                    isSelected={this.state.selectedKey!=-1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}
                />
                <ContactCreate onCreate={this.handleCreate}/>
            </div>
        );
    }
}