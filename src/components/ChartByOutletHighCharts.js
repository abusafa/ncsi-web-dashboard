import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { filter, sum } from 'lodash';
import ReactHighcharts from 'react-highcharts';
import highcharts3d from 'highcharts/highcharts-3d'

import outletsProductsDB from '../data/new/outlets-products.json';

import {observer} from "mobx-react";


highcharts3d(ReactHighcharts.Highcharts);

const Container = styled.div`
  direction: ltr;
  margin-top: 20px;
  margin-bottom: 20px;
`



const directionLabels = {
  out:'صادرات',
  in:'واردات',
  inout:'إعادة تصدير',
}

const chartLabels = {
  land:'بري',
  sea:'بحري',
  air:'جوي',
}

const years = [2013,2014,2015,2016,2017]
const colors = ["#8884d8","#82ca9d","#fd9390","#f5d570","#909fad","#82ca9d","#8884d8","#82ca9d" ]

export default class ChartByOutletHighCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
  }


  componentDidMount(){
    const data  =  years.map(year=>{
      let result = {year};
      this.props.outlets.map(o=>{
        const value = sum(filter(outletsProductsDB, d=> d.POE_CODE == o.properties.POE_CODE && d.YEAR == year).map(m=>m.VALUE));
        result[o.properties.ARB_DESC]=value

      })

      return result;
    })


    this.setState({
      data
    })


    console.log('data', data)

  }

  	render () {
      const { data } = this.state;
  	return (
      <Container>
        <Card bordered={false}>
          <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
        </Card>
      </Container>
    );
  }
}
