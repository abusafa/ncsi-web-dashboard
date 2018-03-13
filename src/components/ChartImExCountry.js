import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import LineChart from './LineChart';
import { Tabs } from 'antd';
import { find } from 'lodash';
import importers from '../data/oman/exporters.json'
import countries from '../data/countries.json'


window.importers =importers;
window.countries =countries;

const Container = styled.div`
  direction: ltr;
  margin-top: 20px;
  margin-bottom: 20px;
`

const TabPane = Tabs.TabPane;





export default class ChartImExCountry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { isoA2 ='BG'} = this.props;
    const code = find(countries, c=> c.iso_alpha_2 == isoA2).iso_code;
    const trend = find(importers.trends.value, o=> o.exporter == code)
    const series1 = [
      {
        name: 'حجم التبادل التجاري',
        data: trend ? trend.agg_value: []
      }
    ]

    const series2 = [
      {
        name: 'الميزان التجاري',
        data: trend ? trend.agg_weight: []
      }
    ]


    const title= 'حركة إعادة التصدير';

    return (
      <Container>


          <Tabs defaultActiveKey="1">

            <TabPane tab="الميزان التجاري" key="2">
              <LineChart
                title={title}
                subTitle=''
                series={series2}
              />
            </TabPane>

            <TabPane tab="حجم التبادل التجاري" key="1">
              <LineChart
                title={title}
                subTitle=''
                series={series1}
              />
            </TabPane>

          </Tabs>
      </Container>
    );
  }
}
