import React, {PropTypes} from 'react';
import styled from 'styled-components';
import Spinner from 'react-spinkit';
import { Row, Col } from 'antd';

const Container = styled.div`
  height: 100%;
`
const Title = styled.h1`
  color: #173d88;
`

export default class LoadingData extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row style={{marginTop:100}} type="flex" justify="space-around" align="middle">
          <Col>
            <Spinner name="folding-cube" color="#00a99a" style={{width:50, height:50}} />
          </Col>
        </Row>
        <Row style={{marginTop:40}} type="flex" justify="space-around" align="middle">
          <Col>
            <Title>جار تحميل البيانات</Title>
          </Col>
        </Row>
      </Container>
    );
  }
}
