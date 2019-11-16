import React from 'react';
import EditMonitoring from '../EditMonitoring/EditMonitoring';
import toJson from 'enzyme-to-json';
import firebase from 'firebase';
import { shallow } from 'enzyme';

firebase.initializeApp({
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
});

let props={
    match:{
        params:{
            id_tutoring:jest.fn()    
    }}
};


describe('Testing EditMonitoring component', () => {

    it('Test if EditMonitoring renders correctly', () =>{
        jest.fn();
        const tree = shallow(<EditMonitoring {...props}/>);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('should call onChange in Text Field #name', () => {
        
        // Evento necessario para mudar o valor do event.target.value na função
        const event = {
          target: { value: 'Name Test' }
        };

        const component = shallow(<EditMonitoring {...props}/>);

        // Achar o TextField com id="name" e simular o evento de mudança no campo
        component.find('#name').simulate('change', event);
        
        // Conferindo se o valor do campo #name é igual ao que foi 'setado'
        // no passo anterior. Isso me garante que o campo de nome recebeu o valor "Name Test" 
        expect(component.find('#name').props().value).toEqual('Name Test');
    });
});