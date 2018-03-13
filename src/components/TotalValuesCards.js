import React from 'react';
import { bounce } from 'react-animations';
import QueueAnim from 'rc-queue-anim';

import styled , { keyframes } from 'styled-components';
import NumberFormat from 'react-number-format';
import CountUp from 'react-countup'
import { Desktop, Tablet, Mobile, Default } from './Responsive';
import { observe } from 'mobx';

import { Card, Row, Col as _Col, Icon } from 'antd';
import { Title, SubTitle } from '../ui'
import {observer} from "mobx-react";
import om from '../assets/om1.png'



const Currency = styled.span`
color: #1abb9c;
font-size: 15px;
`
const bounceAnimation = keyframes`${bounce}`;
const BouncyDiv = styled.div`
  animation: 1s ${bounceAnimation};
`;
const CardIcon = styled(Icon)`
  font-size: 50px;
  position: absolute;
  left: 20px;
  top: 30px;
`
const Col = styled(_Col)`
  margin-bottom: 5px;
`
const Om = styled.img`
position: absolute;
left: 55px;
width: 90px;
top: 0px;
`



const Container = styled.div`
  width: 100%;
  margin-top: 10px;
  min-height: 125px;
`;


const dataDic = (overview) => [
  {
    title:' الصادرات',
    value: overview.out,
    icon:{
      name:'arrow-left',
      color:'rgba(0, 167, 155, 0.79)'
    },
    col:7,
  },
  {
    title:'الواردات',
    value:overview.in,
    icon:{
      name:'arrow-right',
      color:'rgba(22, 59, 142, 0.82)'
    },
    col:10,
  },
  {
    title:'إعادة تصدير',
    value:overview.inout,
    icon:{
      name:'retweet',
      color:'#666'
    },
    col:7,
  }
]

class TotalValuesCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
  }


  componentDidMount(){
    const { StatsStore } = this.props;
    const { overview } = StatsStore;

    setTimeout( ()=> {
      this.setState({data:dataDic(overview)})
    }, 1500);

    observe(StatsStore, change => {
      console.log('change', change);
      if(change.name == 'year'){
        this.setState({data:[]})
        setTimeout( ()=> {
          this.setState({data:dataDic(StatsStore.overview)})
        }, 1200);
      }

    })
  }

  renderCards(){

    const { data } = this.state;


    return data.map(({title, value, icon, col}, key)=>(
      <Col className="gutter-row"  key={`card-${key}`} xl={col} lg={col} md={col} sm={24} xs={24} >
          <Card bordered={false} style={{backgroundColor:'#F7F7F7',marginLeft:5, marginRight:5}}>
            <div style={{minHeight:70}}>
            <QueueAnim delay={400} type={['right', 'left']}>
              <Title style={{fontSize:22, color:'#636363', fontWeight: 'bold'}} key='a'>{title} <Currency >بالريال العماني </Currency></Title>
              <Title key='b' style={{fontSize:26,  color:'#1ABB9C', fontWeight: 'bold'}}>
                {/* <NumberFormat value={value} displayType={'text'} thousandSeparator={true} prefix={''} renderText={value => <div>{value}</div>} /> */}
                <CountUp
                  start={0}
                  end={value}
                  duration={2.75}
                  useEasing
                  useGrouping
                  separator=','
                />
              </Title>
              <CardIcon  key='c' type={icon.name} style={{color:icon.color}} className="animated  flip"/>
              <Om src={om}  key='d'></Om>
            </QueueAnim>
            </div>
          </Card>

      </Col>
    ))
  }



  render() {

      return (
      <Container>

          <Row gutter={16}>
            <QueueAnim
              type={'bottom'}
              ease={['easeOutQuart', 'easeInOutQuart']}
              >
              {this.renderCards()}
            </QueueAnim>
          </Row>

      </Container>
    );
  }
}



export default observer(TotalValuesCards);
