

import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
const data = [
  {name: 'نوع المنفذ', 'بري': 4000, 'بحري': 2400, 'جوي': 1001},

];




export default class SimpleBarChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<BarChart width={400} height={500} data={data}
          margin={{top: 5, right: 30, left: 20, bottom: 5}}>
     <XAxis dataKey="name"/>
     <YAxis/>
     <CartesianGrid strokeDasharray="3 3"/>
     <Tooltip/>
     <Legend />
     <Bar dataKey="بري" fill="#8884d8" />
     <Bar dataKey="بحري" fill="#82ca9d" />
     <Bar dataKey="جوي" fill="#f5d570" />
    </BarChart>);
  }
}
