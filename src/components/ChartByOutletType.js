import React from 'react';
import styled from 'styled-components';
import { Card } from 'antd';
import  {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import outletsProductsDB from '../data/new/outlets-products.json';
import { filter, sum } from 'lodash';

import {observer} from "mobx-react";

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

export default class ChartByOutletType extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data:[]
    }
  }

  componentDidMount(){
    const { outletType } = this.props;
    //let result = {};
    let result2 = []
    years.map((year, i)=> {
      const value = sum(filter(outletsProductsDB, d=> d.TYPE == outletType && d.YEAR == year).map(m=>m.VALUE));
      //result[year]=value;
      result2.push({year, value, fill:colors[i]})
    })

    console.log('result2',result2);

    this.setState({
      //data:[result],
      data:result2,
    })

    console.log('result2',result2);
  }

  	render () {
      const { data } = this.state;
      console.log('ChartByOutletType data', data);
  	return (
      <Container>
        <Card bordered={false}>
          <ResponsiveContainer height={340}>

        	<BarChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
           <XAxis dataKey="year" />
           <YAxis />
           <CartesianGrid strokeDasharray="3 3"/>
           <Tooltip />
           <Legend />
           {/* {years.map((o,i)=>(
             <Bar barSize={20} dataKey={o} fill={colors[i]} />
           ))} */}
           <Bar dataKey="value" barSize={20}  />
          </BarChart>
        </ResponsiveContainer>
        </Card>
      </Container>
    );
  }
}
