import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import ReactHighcharts from 'react-highcharts';
import highcharts3d from 'highcharts/highcharts-3d'
import outletsProductsDB from '../data/new/outlets-products.json';
import { filter, sum } from 'lodash';
import { CSVLink } from 'react-csv';

import {observer} from "mobx-react";
highcharts3d(ReactHighcharts.Highcharts);

const Container = styled.div`
  direction: ltr;
  margin-top: 20px;
  margin-bottom: 20px;
  min-height:400px;
`
const colors = ["#8884d8","#82ca9d","#fd9390","#f5d570","#909fad","#82ca9d","#8884d8","#82ca9d" ]
const years = [2013,2014,2015,2016,2017]

const config = {
    chart: {
        renderTo: 'container',
        type: 'line',
        options3d: {
            enabled: false,
            alpha: 25,
            beta: 15,
            depth: 100,
            viewDistance: 25
        }
    },
    tooltip: {
      useHTML: true,
      enabled:true,
      formatter: function () {
            return 'السنة <b>' + this.x +
                '</b> القيمة <b>' + Math.floor(this.y) + '</b>';
        }
    },
    legend:{
      enabled:false
    },
    xAxis: {
       categories: years,
       title: {
           text: null
       }
   },
   credits: {
        enabled: false
    },

   yAxis: {

        title: {
            text: 'القيمة',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    title: {
        text: 'حسب السنوات'
    },
    plotOptions: {
        column: {
            depth: 25,
            colorByPoint: true
        }
    },
    colors: colors,
    series: [{
        name: 'السنوات',
        data: [29.9, 71.5, 106.4, 129.2, 144.0]
    }]
}

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

export default class ChartByOutletTypeHighCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      csv:[['السنة','القيمة']]
    }
  }

  componentDidMount(){
    const { outletType } = this.props;
    let result = []
    let csv = [['السنة','القيمة']]

    years.map((year, i)=> {
      const value = sum(filter(outletsProductsDB, d=> d.TYPE == outletType && d.YEAR == year).map(m=>m.VALUE));
      result.push(value)
      csv.push([year, value])
    })

    this.setState({
      csv,
      data:result,
    })

  }

  	render () {
      const { data , csv } = this.state;
      console.log('ChartByOutletType data', data);
      config.series= [{
        name: 'السنوات',

          data: data
      }]
  	return (

        <Card bordered={false}>
          <Container>
            <CSVLink className="ant-btn" style={{float:'left'}} data={csv} ><span style={{ lineHeight: '24px'}}>تصدير</span></CSVLink>
          <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
        </Container>

        </Card>
    );
  }
}
