import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme'
import Grid from '../../src/components/Grid';
import { List } from 'immutable';

chai.use(chaiEnzyme());

describe('Grid Component', () => {

  it('should render an empty grid', () => {
    const gridData = List.of(
      'E', 'E', 'E',
      'E', 'E', 'E' ,
      'E', 'E', 'E'
    );

    const wrapper = shallow(
      <Grid data={gridData} onGridCellClick={() => {}} disableGrid={false} />
    );
    expect(wrapper).to.have.html('<table class="table-center"><tbody><tr><td><button id="0" class="btn-cell"></button></td><td><button id="1" class="btn-cell"></button></td><td><button id="2" class="btn-cell"></button></td></tr><tr><td><button id="3" class="btn-cell"></button></td><td><button id="4" class="btn-cell"></button></td><td><button id="5" class="btn-cell"></button></td></tr><tr><td><button id="6" class="btn-cell"></button></td><td><button id="7" class="btn-cell"></button></td><td><button id="8" class="btn-cell"></button></td></tr></tbody></table>');
  });
});
