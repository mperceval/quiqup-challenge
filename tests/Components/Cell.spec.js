import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon';
import Cell from '../../src/components/Cell';

chai.use(chaiEnzyme());

describe('Cell Component', () => {
  
  it('should render a button with id based on the idx value passed in', () => {
    const wrapper = shallow(
      <Cell idx={1} val={'X'} onClick={() => {}} />
    );

    const btn = wrapper.find('button');
    expect(btn).to.have.id(1);
  });

  it('should render a button with text based on the val passed in', () => {
    const wrapper = shallow(
      <Cell idx={1} val={'O'} onClick={() => {}} />
    );

    const btn = wrapper.find('button');
    expect(btn.text()).to.be.eql('O');
  });

  it('should render a button with CSS class set to player - as O was passed in as val', () => {
    const wrapper = shallow(
      <Cell idx={1} val={'O'} onClick={() => {}} />
    );

    const btn = wrapper.find('button');
    expect(btn).to.have.className('player')
  });

  it('should render a button with CSS class set to AI - as X was passed in as val', () => {
    const wrapper = shallow(
      <Cell idx={1} val={'X'} onClick={() => {}} />
    );

    const btn = wrapper.find('button');
    expect(btn).to.have.className('ai')
  });

  //TODO : this test is not reporting correctly - FIX
  it('should render a disabled button', () => {
    const wrapper = shallow(
      <Cell idx={1} val={'X'} onClick={() => {}} disabled={true} />
    );

    const btn = wrapper.find('button');
    expect(btn).to.be.disabled();
  });

  it('Should handle onClick', () => {
    const handleCellClick = sinon.spy();
    const wrapper = shallow(
    <Cell idx={0} val={'X'} onClick={handleCellClick} />
    );
    wrapper.find('button').simulate('click');
    expect(handleCellClick.calledOnce).to.equal(true);
  });
});
