import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import ResetButton from '../../src/components/ResetButton';

describe('ResetButton Component', () => {

  it('should render a button', () => {
    const wrapper = shallow(<ResetButton onClick={() => {}}/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

  it('Should handle onClick', () => {
    const handleBtnClick = sinon.spy();
    const wrapper = shallow(<ResetButton onClick={handleBtnClick} />);
    wrapper.find('button').simulate('click');
    expect(handleBtnClick.calledOnce).to.equal(true);
  });
});
