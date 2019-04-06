/* eslint-disable no-unused-vars, no-undef */
import * as React from 'react';
import { shallow } from 'enzyme';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import MegaMenuItem from '../MegaMenu/MegaMenuItem';

describe('MegaMenuItem', () => {
  it('should render image if string is passed in icon prop', () => {
    const itemWrapper = shallow(<MegaMenuItem to="" title="" icon="image" />);
    expect(
      itemWrapper.contains(<img src="image" alt="" className="odc-mega-menu-item__icon" />),
    ).toEqual(true);
  });

  it('should render a react component if it is passed in icon prop', () => {
    const itemWrapper = shallow(<MegaMenuItem to="" title="" icon={<div id="node" />} />);
    expect(itemWrapper.contains(<div id="node" />)).toEqual(true);
  });

  it('should render a react component if it is passed in icon prop', () => {
    const itemWrapper = shallow(
      <MegaMenuItem to="" title="" icon={<div id="node" />} externalLink />,
    );
    expect(itemWrapper.find(ExternalLinkAltIcon).exists()).toEqual(true);
  });
});
