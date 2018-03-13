  import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import LineChart from './LineChart';
import { Tabs, Row, Col, Table } from 'antd';
import { find } from 'lodash';
import importers from '../data/oman/exporters.json';
import exporters from '../data/oman/importers.json'
import LoadingData from './LoadingData';
import TopIndecatorsTable from './TopIndecatorsTable'
import countries from '../data/countries.json'
import {StatsStore} from '../mobx/Stats';
import FilterBar from './FilterBar';
import {observer} from "mobx-react";
import SimpleBarChart from './SimpleBarChart'

const ValueLabel = styled.span`
font-weight:bold;
color:#1ABB9C;
margin-left: 5px;
margin-right: 5px;

`;


const PercentageLabel = styled.span`
font-weight:bold;
color:#3498db;
margin-left: 5px;
margin-right: 5px;
`;

function randomValue(){
  return Math.floor(Math.random() * 1000000000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },{
  title: 'Value',
  dataIndex: 'value',
  key: 'value',
},  {
  title: 'weight',
  dataIndex: 'weight',
  key: 'weight',
}];



const dicWorld = {
  out:'اهم السلع المصدرة من السلطنة الى العالم',
  in:'اهم السلع المستوردة من  العالم',
  inout:'اهم السلع المعاد تصديرها الى العالم'
}

const dicCountry = {
  out:'اهم السلع المصدرة من السلطنة الى ',
  in:'اهم السلع المستوردة من  ',
  inout:'اهم السلع المعاد تصديرها الى '
}




function generateTitle(direction){
  const value1=randomValue();
  const value2=randomValue();
  const percent=79;
  // const dicTitle = {
  //   out:(<div>إجمالي الصادرات <ValueLabel>{value1}</ValueLabel> إجمالي صادرات بلد المنشأ <ValueLabel>{value2}</ValueLabel> النسبة <PercentageLabel>{percent}%</PercentageLabel></div>),
  //   in:(<div>إجمالي الواردات <ValueLabel>{value1}</ValueLabel> إجمالي واردات بلد المنشأ <ValueLabel>{value2}</ValueLabel> النسبة <PercentageLabel>{percent}%</PercentageLabel></div>),
  //   inout:(<div>إجمالي إعادة التصدير <ValueLabel>{value1}</ValueLabel></div>),
  // }

  const dicTitle = {
    out:(<div>إجمالي الصادرات <ValueLabel>{value1}</ValueLabel> </div>),
    in:(<div>إجمالي الواردات <ValueLabel>{value1}</ValueLabel> إجمالي واردات بلد المنشأ <ValueLabel>{value2}</ValueLabel> النسبة <PercentageLabel>{percent}%</PercentageLabel></div>),
    inout:(<div>إجمالي إعادة التصدير <ValueLabel>{value1}</ValueLabel></div>),
  }

  return dicTitle[direction]
}
const Container = styled.div`
  direction: ltr;
  margin-top: 20px;
  margin-bottom: 20px;
`

const TabPane = Tabs.TabPane;

class TradeChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series:[],
      commodities:[],
      loading:true,
    }
  }

  componentDidMount(){
    const { isoA3 ='BG'} = this.props;
    const code = find(countries, c=> c.iso_alpha_3 == isoA3).iso_code;
    const name = find(countries, c=> c.iso_alpha_3 == isoA3).name_ar;
    StatsStore.direction = 'out';
    StatsStore.year = 2017;


    const commoditiesUrl = 'https://resourcetrade.earth/api/2.0/commodities?year=2015&exporter=512';

    //fetch('http://cors-proxy.htmldriven.com/?url=' + encodeURIComponent(commoditiesUrl))

    fetch('https://cors-anywhere.herokuapp.com/' + commoditiesUrl)

    .then(res=> res.json())
    .then(json=> this.setState({commodities:json.main}));

    const urls = [
      'https://resourcetrade.earth/api/2.0/historical?year=2015&importer=512',
      'https://resourcetrade.earth/api/2.0/historical?year=2015&exporter=512',
      'https://resourcetrade.earth/api/2.0/historical?year=2015&importer='+code,
      'https://resourcetrade.earth/api/2.0/historical?year=2015&exporter='+code
    ];

    Promise.all(urls.map(url =>
      // fetch('http://cors-proxy.htmldriven.com/?url=' + encodeURIComponent(url)).then(resp => resp.json())
      fetch('https://cors-anywhere.herokuapp.com/' + url).then(resp => resp.json())

    )).then(results => {
        //const results = jsons.map(j=> JSON.parse(j.body))
        const omanImportValues = results[0].totals.map(t=> t.value).slice(11, 16);
        const omanExportValues = results[1].totals.map(t=> t.value).slice(11, 16);
        const countryImportValues = results[2].totals.map(t=> t.value).slice(11, 16);
        const countryExportValues = results[3].totals.map(t=> t.value).slice(11, 16);

        const series = [
          {
            name: 'الصادرات ',
            data: omanImportValues.map((value, key)=> omanExportValues[key] - value )
          },
          {
            name: 'الواردات ',
            data: omanImportValues.map((value, key)=> omanExportValues[key] + value )
          },
          {
            name: 'الميزان التجاري ',
            data: countryImportValues.map((value, key)=> countryExportValues[key] - value )
          },
          {
            name: 'التبادل التجاري  ',
            data: countryImportValues.map((value, key)=> countryExportValues[key] + value )
          }
        ]
        this.setState({
          series,
          name,
          loading:false,
          countryImportValues: results[2].totals,
          countryExportValues:results[2].totals
        })
    })
  }

  render() {
    const { series, commodities, loading , name, countryImportValues,countryExportValues} = this.state;
    console.log('render');
    const year=StatsStore.year
    const title= 'حركة الواردات';
    let totalValue=randomValue();



    if(loading) return <LoadingData />


    return (
      <Container>
        <FilterBar StatsStore={StatsStore} title={generateTitle(StatsStore.direction) }/>
        <Row gutter={8}>
          <Col  xl={7} lg={7} md={7} sm={24} xs={24} >
            <SimpleBarChart />
          </Col>

          <Col  xl={10} lg={10} md={10} sm={24} xs={24} >
            <LineChart
              title={''}
              subTitle=''
              series={series}
            />
          </Col>
          {/* <Col  xl={10} lg={10} md={10} sm={24} xs={24} >
            <TopIndecatorsTable StatsStore={StatsStore} title={dicWorld[StatsStore.direction]}/>
          </Col> */}
          <Col  xl={7} lg={7} md={7} sm={24} xs={24} >
            <TopIndecatorsTable StatsStore={StatsStore} title={dicCountry[StatsStore.direction] + name}/>
          </Col>
        </Row>
      </Container>
    );
  }
}


export default observer(TradeChart);
