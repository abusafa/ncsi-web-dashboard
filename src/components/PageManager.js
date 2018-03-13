import React from 'react';
import {observer} from "mobx-react";
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { Row, Col } from 'antd';
import LoadingData from './LoadingData';

const Title = styled.h1`
  color: #173d88;
`
const Container = styled.div`
  height: 100%;
`
class PageManager extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children, StatsStore } = this.props;
    const { loading } = StatsStore;
    if(loading) return (<LoadingData />);

    return (
      <Container>
        {children}
      </Container>
    );
  }
}


export default observer(PageManager);
