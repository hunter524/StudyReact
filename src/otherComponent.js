import React from 'react';

 export const ExternalCompositeComponent = {
    DatePicker: function DatePicker(props) {
        return (<a>I am Date Picker!</a>);
    },
    TimePicker:function TimePicker(props) {
        return(<a>I am Time Picker!</a>)
    }
};

export class DefaultComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<a>I am a external DefaultComponent </a>);
    }
}
