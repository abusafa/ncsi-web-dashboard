import React, {PropTypes} from 'react';
import {Table, Tag, Card} from 'antd'
import styled from 'styled-components';
import numeral from 'numeral';
import { find } from 'lodash';
import CountUp from 'react-countup'


//data
import ImportersData from '../data/oman/importers.json';
import CountriesData from '../data/oman/countries.json'


window.ImportersData =ImportersData;
window.CountriesData = CountriesData;

const Container = styled.div`

`;
const Flag = styled.img`
height:40px;
width:40px;
`;


const columns = [
  {
    title: 'flag',
    dataIndex: 'flaq',
    // className: styles.percent,
    render: (text, it) => <Flag  src={`flags/${text? text.toLowerCase():'null'}.svg`} />
  },
  {
    title: 'name',
    dataIndex: 'name',
    // className: styles.name
  }, {
    title: 'percent',
    dataIndex: 'value',
    // className: styles.percent,
    render: (text, it) => <Tag style={{
        width: 100,
        textAlign: 'center',

      }} color='#d897eb'>
      <CountUp
        start={0}
        end={text}
        duration={2.75}
        useEasing
        useGrouping
        separator=','
      />
    </Tag>
  },
  {
    title: 'percent',
    dataIndex: 'percent',
    // className: styles.percent,
    render: (text, it) => <Tag style={{
        width: 100,
        textAlign: 'center',
          color: '#1ABB9C'
      }} color='#fff'>{text} %</Tag>
  },


]


const Importers = ImportersData.main.map((e)=>{

  return {
    name: find(CountriesData, (c)=> c.code == e.importer ).ar_name,
    value: e.value,
    percent: ((e.value/2937522851)*100).toFixed(2),
    flaq: find(CountriesData, (c)=> c.code == e.importer ).map_short_name,
  }
});

export default class TopImporters extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card bordered={false}>
        <Container>
          <h3 style={{
            marginLeft: 20
          }}>أعلى خمسة موردين</h3>
          <Table pagination={false} showHeader={false} columns={columns} key={(record, key) => key} dataSource={Importers}/>
        </Container>
      </Card>

    );
  }
}
