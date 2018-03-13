import React, {PropTypes} from 'react';
import styled , { keyframes } from 'styled-components';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { bounce } from 'react-animations';
import {autorun, observe} from 'mobx';
import { Table, Tag, Card, Col, Row } from 'antd'
import numeral from 'numeral';
import {observer} from "mobx-react";
import CountUp from 'react-countup'
import { Title } from '../ui/index'
import { color } from '../styles/colors'
import { CSVLink } from 'react-csv';

const Container = styled.div`
min-height:500px;
`;
const bounceAnimation = keyframes`${bounce}`;

const LiList = styled.div`
  border-bottom: 1px solid #e9e9e9;
  padding: 10px 0px;
  ${'' /* animation: 1s ${bounceAnimation}; */}

`

const ColorDic={
  in:'rgba(22, 59, 142, 0.82)',
  out:'rgba(0, 167, 155, 0.79)',
  inout:'#666',
}

class TopIndecatorsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      topIndecators:[]
    }

  }

  componentDidMount(){
    const { StatsStore } = this.props;

    setTimeout( ()=> {
      this.setState({topIndecators:StatsStore.topIndecators})
    }, 1500);

    observe(StatsStore, change => {
      this.setState({topIndecators:[]})
      setTimeout( ()=> {
        this.setState({topIndecators:StatsStore.topIndecators})
      }, 1200);
    })
  }

  render() {

    const { StatsStore , title} = this.props;
    const { topIndecators } = this.state;
    let _topIndecators = topIndecators;
    _topIndecators.push({name:'أخرى', value:906043440, in_out: StatsStore.direction})
    const csv = _topIndecators.map(d=> ([d.name, d.value]))
    csv.unshift(['السلعة','القيمة'])

    let _title = `${title} ${StatsStore.year}`

    const columns = [
      {
        title: 'name',
        dataIndex: 'name',
        // className: styles.name
      }, {
        title: 'percent',
        dataIndex: 'value',
        // className: styles.percent,
        render: (text, it) => <Tag style={{width:100, textAlign:'center'}} color={ColorDic[it.in_out]}>
          <CountUp
            start={0}
            end={text}
            duration={2.75}
            useEasing
            useGrouping
            separator=','
          />
        </Tag>
      }
    ]

    return (
      <Card bordered={false}>
      <Container>
        <CSVLink className="ant-btn" style={{float:'left'}} data={csv} ><span style={{ lineHeight: '24px'}}>تصدير</span></CSVLink>

        <Title style={{fontSize:24, color:'#636363'}} key='a'>{_title}</Title>
            {/* <Table pagination={false} showHeader={false} columns={columns} key={(record, key) => key} dataSource={topIndecators} /> */}

              <QueueAnim>

              {_topIndecators.map((item,key)=>(

                <LiList key={`top-ind-${key}`} >
                  <Row>
                    <Col span={15}>
                      <h3>{item.name}</h3>
                    </Col>
                    <Col span={9}>
                      <Tag style={{width:140, textAlign:'center'}} color={ColorDic[item.in_out]}>

                        <CountUp
                          style={{fontSize:16}}
                          start={0}
                          end={item.value}
                          duration={2.75}
                          useEasing
                          useGrouping
                          separator=','
                        />
                      </Tag>
                    </Col>
                  </Row>
                </LiList>
              ))}

            </QueueAnim>


      </Container>
          </Card>
    );
  }
}

export default observer(TopIndecatorsTable);
