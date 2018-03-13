import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import LineChart from './LineChart';
import { Tabs, Row, Col } from 'antd';
import { find } from 'lodash';
import importers from '../data/oman/exporters.json';
import exporters from '../data/oman/importers.json'

import countries from '../data/countries.json'


const Container = styled.div`
  direction: ltr;
  margin-top: 20px;
  margin-bottom: 20px;
`

const TabPane = Tabs.TabPane;





export default class ChartImCountry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series:[]
    }
  }

  componentDidMount(){
    const { isoA2 ='BG'} = this.props;
    const code = find(countries, c=> c.iso_alpha_2 == isoA2).iso_code;
    const name = find(countries, c=> c.iso_alpha_2 == isoA2).name;

    const urls = [
      'https://resourcetrade.earth/api/1.0/historical?year=2015&importer=512',
      'https://resourcetrade.earth/api/1.0/historical?year=2015&exporter=512',
      'https://resourcetrade.earth/api/1.0/historical?year=2015&importer='+code,
      'https://resourcetrade.earth/api/1.0/historical?year=2015&exporter='+code
    ];

    Promise.all(urls.map(url =>
      fetch('http://cors-proxy.htmldriven.com/?url=' + encodeURIComponent(url)).then(resp => resp.json())
    )).then(jsons => {
        const results = jsons.map(j=> JSON.parse(j.body))
        const omanImportValues = results[0].totals.map(t=> t.value).slice(11, 16);
        const omanExportValues = results[1].totals.map(t=> t.value).slice(11, 16);
        const countryImportValues = results[2].totals.map(t=> t.value).slice(11, 16);
        const countryExportValues = results[3].totals.map(t=> t.value).slice(11, 16);

        const series = [
          {
            name: 'الميزان التجاري - سلطنة عمان',
            data: omanImportValues.map((value, key)=> omanExportValues[key] - value )
          },
          {
            name: 'حجم التبادل التجاري - سلطنة عمان',
            data: omanImportValues.map((value, key)=> omanExportValues[key] + value )
          },
          {
            name: 'الميزان التجاري - '+ name,
            data: countryImportValues.map((value, key)=> countryExportValues[key] - value )
          },
          {
            name: 'حجم التبادل التجاري - ' + name,
            data: countryImportValues.map((value, key)=> countryExportValues[key] + value )
          }
        ]
        this.setState({
          series
        })
    })
  }

  render() {
    const { series } = this.state;

    const title= 'حركة الواردات';

    return (
      <Container>
        <Row gutter={16}>

          <Col span={14}>
            <LineChart
              title={''}
              subTitle=''
              series={series}
            />
          </Col>
          <Col span={10}>

          </Col>
        </Row>
      </Container>
    );
  }
}
