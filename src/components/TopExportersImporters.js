import React, {PropTypes} from 'react';
import {Table, Tag, Card} from 'antd'
import styled from 'styled-components';
import numeral from 'numeral';
import { find,filter, sum } from 'lodash';
import {observer} from "mobx-react";
import CountUp from 'react-countup'
import QueueAnim from 'rc-queue-anim';
import { observe } from 'mobx';
import countriesdb from '../data/new/countriesdb.json'
import { Title } from '../ui/index'
import { CSVLink } from 'react-csv';

//data
import ImportersData from '../data/oman/importers.json';
import ExportersData from '../data/oman/exporters.json';
import CountriesData from '../data/oman/countries.json'



const titles={
  in:'موردين',
  out:'مصدر إليهم',
  inout:'معاد التصدير إليهم',
}

const DataDic={
  in:ImportersData,
  out:ExportersData,
  inout:{main:[]},
}

const FieldDic={
  in:'importer',
  out:'exporter',
  inout:'reexporter',
}


const ColorDic={
  in:'rgba(22, 59, 142, 0.82)',
  out:'rgba(0, 167, 155, 0.79)',
  inout:'rgb(102, 102, 102)',
}

const Container = styled.div`
min-height:500px;

`;

const StyledCard = styled(Card)`

`;

const Item = styled.div`
  position: relative;
  padding: 10px 0px;
border-bottom: 1px solid #e9e9e9;
`;

const ItemTitle=styled.h3`
margin-bottom: 10px;
`
const Flag = styled.img`
height:40px;
width:40px;
position: absolute;
top:10px;
left: 10px;
`;





class TopExportersImporters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
  }

  componentDidMount(){
    const { StatsStore } = this.props;


    this.setState({data:[]});

    let filteredData = filter(countriesdb,c=> c.COUNTRY_CD != "other" &&  c.COUNTRY_CD != "total" && c.YEAR == StatsStore.year && c.DIRECTION ==StatsStore.direction);
    let total = find(countriesdb ,c=> c.COUNTRY_CD == "total" && c.YEAR == StatsStore.year && c.DIRECTION ==StatsStore.direction).VALUE;
    let data = filteredData.map(d=>{
      let cnt = find(CountriesData, (c)=> c.COUNTRY_CD == d.COUNTRY_CD );
      return {
        name:d.ARB_DESC,
        value:d.VALUE,
        flag: cnt? cnt.map_short_name:'',
        percent: ((d.VALUE/total)*100).toFixed(2),

      }
    })

    let field = FieldDic[StatsStore.direction];
    let tagColor = ColorDic[StatsStore.direction];
    this.setState({data, tagColor})



    observe(StatsStore, change => {
      this.setState({data:[]});

      let filteredData = filter(countriesdb,c=> c.COUNTRY_CD != "other" &&  c.COUNTRY_CD != "total" && c.YEAR == StatsStore.year && c.DIRECTION ==StatsStore.direction);
      let total = find(countriesdb ,c=> c.COUNTRY_CD == "total" && c.YEAR == StatsStore.year && c.DIRECTION ==StatsStore.direction).VALUE;

      let data = filteredData.map(d=>{
        let cnt = find(CountriesData, (c)=> c.COUNTRY_CD == d.COUNTRY_CD );
        return {
          name:d.ARB_DESC,
          value:d.VALUE,
          flag: cnt? cnt.map_short_name:'',
          percent: ((d.VALUE/total)*100).toFixed(2),

        }
      })

      let field = FieldDic[StatsStore.direction];
      let tagColor = ColorDic[StatsStore.direction];


      setTimeout( ()=> {
        this.setState({data, tagColor})
      }, 1200);
    })
  }


  renderRows(){

    const {StatsStore} = this.props;

    const { data, tagColor } = this.state;

    console.log('renderRows', data);
    data.push({
      flag:"globe",
      name:"أخرى",
      percent:"30",
      value:10000000
    })


    return data.map(({name,value, flag, percent},key)=>(
      <Item key={`top-cont-${key}`}>
        <ItemTitle>{name}</ItemTitle>
        <Tag style={{
            width: 140,
            textAlign: 'center'
          }} color={tagColor}><CountUp
            style={{fontSize:16}}
            start={0}
            end={value}
            duration={2.75}
            useEasing
            useGrouping
            separator=','
          /></Tag>
          <Tag style={{
            fontSize:16,
             width: 140,
             textAlign: 'center',
               color: '#1ABB9C'
           }} color='#fff'>{percent} %</Tag>
        <Flag  src={`flags/${flag? flag.toLowerCase():'null'}.svg`} />
      </Item>

    ))
  }

  render() {
    const { data } = this.state;
    const csv = data.map(d=> ([d.name, d.value, d.percent]))
    csv.unshift(['السلعة','القيمة','النسبة'])

    const {StatsStore, title} = this.props;
    let _title = `${title} ${StatsStore.year}`

    // const title=titles[StatsStore.direction]
    return (
      <StyledCard bordered={false}>
        <Container>
          <CSVLink className="ant-btn" style={{float:'left'}} data={csv} ><span style={{ lineHeight: '24px'}}>تصدير</span></CSVLink>

          <Title style={{fontSize:24, color:'#636363'}} key='a'>{_title}</Title>
          <QueueAnim>
            {this.renderRows()}
          </QueueAnim>
        </Container>
      </StyledCard>

    );
  }
}

export default observer(TopExportersImporters);
