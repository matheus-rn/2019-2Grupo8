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

let component =  shallow(<EditMonitoring {...props}/>);

describe('Testing EditMonitoring component', () => {

    it('Test if EditMonitoring renders correctly', () =>{
        jest.fn();
        expect(toJson(component)).toMatchSnapshot();
    });

    it('should call onChange in Text Field #name', () => {
        
        // Evento necessario para mudar o valor do event.target.value na função
        const event = {
          target: { value: 'Name Test' }
        };

        // Achar o TextField com id="name" e simular o evento de mudança no campo
        component.find('#name').simulate('change', event);
        
        // Conferindo se o valor do campo #name é igual ao que foi 'setado'
        // no passo anterior. Isso me garante que o campo de nome recebeu o valor "Name Test" 
        expect(component.find('#name').props().value).toEqual('Name Test');
    });

    it('should call onChange in Text Field #subject', () => {
        
        const event = {
          target: { value: 'Subject Test' }
        };
        component.find('#subject').simulate('change', event);
        
        expect(component.find('#subject').props().value).toEqual('Subject Test');
    });

    it('should call onChange in Text Field #description', () => {
        
        const event = {
          target: { value: 'Description Test' }
        };
        component.find('#description').simulate('change', event);
        
        expect(component.find('#description').props().value).toEqual('Description Test');
    });
});