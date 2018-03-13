import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import { filter, sum } from 'lodash';
import  {BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import outletsProductsDB from '../data/new/outlets-products.json';
import { CSVLink } from 'react-csv';

import {observer} from "mobx-react";

const Container = styled.div`
  direction: ltr;
  margin-top: 20px;
  margin-bottom: 20px;
  min-height:400px;

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

export default class ChartByOutletType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      csv:[]
    }
  }


  componentDidMount(){
    const csv = [['السنة','الميناء','القيمة']];
    const data  =  years.map(year=>{
      let result = {year};
      this.props.outlets.map(o=>{
        const value = sum(filter(outletsProductsDB, d=> d.POE_CODE == o.properties.POE_CODE && d.YEAR == year).map(m=>m.VALUE));
        result[o.properties.ARB_DESC]=value
        csv.push([year,o.properties.ARB_DESC, value ])

      })

      return result;
    })


    this.setState({
      data,
      csv
    })


    console.log('data', data)

  }

  	render () {
      const { data , csv} = this.state;
      console.log('chart by outlet',data, csv);

  	return (
        <Card bordered={false}>
          <Container  style={{height:'450px'}}>
            <CSVLink className="ant-btn" style={{    position: 'absolute', top: '16px',
    left:'11px'}} data={csv} ><span style={{ lineHeight: '24px'}}>تصدير</span></CSVLink>

          <ResponsiveContainer height={340}>

        	<BarChart data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="year"/>
           <YAxis tickFormatter={(v)=> `${v/100000000} bn`}/>
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip/>
           <Legend />
            {this.props.outlets.map((o,i)=>(
              <Bar dataKey={o.properties.ARB_DESC} fill={colors[i]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Container>

        </Card>
    );
  }
}
