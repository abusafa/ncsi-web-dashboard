import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
`

const AppIcon = styled(Icon)`
  font-size: 20px;
  color: #e4e4e4;
  background-color: #00a89c;
  width: 30px;
  height: 30px;
  line-height: 29px;
  border-radius: 15px;
  margin-left: 10px;
  &: hover{
    background-color: #d5eae9;
    color: #00a89c;
  }
`

export default class HeaderIcons extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <AppIcon type="android-o" />
        <AppIcon type="apple-o" />
      </Container>
    );
  }
}
