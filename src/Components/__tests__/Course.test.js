import React from 'react';
import Course from '../EditProfile/Course';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import { MemoryRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';

const course = jest.fn();


describe('Testing Course component', () => {
  it('Test if Course renders correctly', () =>{
    const tree = renderer.create(
      <Router><Course course={course}/></Router>
      )
      expect(toJson(tree)).toMatchSnapshot()
  });
  it('allows us to set props', () => {
    const wrapper = mount(<Course bar="baz" />);
    expect(wrapper.props().bar).toMatchSnapshot('baz');
    wrapper.setProps({ bar: 'course' });
    expect(wrapper.props().bar).toMatchSnapshot('course');
  });
});