import React from 'react';
import ReactHighcharts from 'react-highcharts';
import styled from 'styled-components';
import {Card} from 'antd';

const Container = styled.div `
  direction: ltr;
`

export default class LineChart extends React.Component {
  constructor(props) {
    super(props);
    const {
      title = 'title',
      subTitle = 'subtitle'
    } = props;
    this.state = {
      config: {


        lang: {
            decimalPoint: '.',
            thousandsSep: ','
        },

        title: {
          text: title
        },
        credits: {
          enabled: false
        },
        subtitle: {
          text: subTitle
        },
        tooltip:{
          useHTML:true,
          pointFormat: '{series.name}: <b>{point.y}</b><br/>',

        },

        yAxis: {
          title: {
            text: 'القيمة'
          },
          labels: {
            useHTML:true,
            formatter: function () {
                return `OMR ${this.value/1000000000}bn`;
            }
        },
        },
        xAxis: {
          categories: [2011, 2012, 2013, 2014, 2015]
        },
        series: props.series
      }
    }
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    const {
      series,
      title = 'title'
    } = nextProps;
    if (series) {
      this.state = {
        config: {

          ...this.state.config,
          lang: {
              decimalPoint: ',',
              thousandsSep: '.'
          },
    

          tooltip:{
            useHTML:true,

          },

          title: {
            text: title
          },
          xAxis: {
            categories: [2011, 2012, 2013, 2014, 2015]
          },
          series: series
        }
      }
    }

  }

  render() {
    const {config} = this.state;
    return (
      <Container>
        <ReactHighcharts config={config}  ref="chart"></ReactHighcharts>
      </Container>
    );
  }
}
