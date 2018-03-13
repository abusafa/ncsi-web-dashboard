import React from 'react';
import { css } from 'styled-components'
import { Row, Col} from 'antd';

import Responsive from 'react-responsive';

export const Desktop = ({ children }) => <Responsive minWidth={992} children={children} />;
export const Tablet = ({ children }) => <Responsive minWidth={769} maxWidth={992} children={children} />;
export const Mobile = ({ children }) => <Responsive maxWidth={768} children={children} />;
export const Default = ({ children }) => <Responsive minWidth={768} children={children} />;

export const RespCol = ({ children }) => (
  <div>
    <Desktop component={Col}>
      {children}
    </Desktop>
    <Tablet component={Col}>
      {children}
    </Tablet>
    <Mobile component={Row}>
      {children}
    </Mobile>
  </div>

);


const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})
