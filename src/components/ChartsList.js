import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import LineChart from './LineChart'

export default class ChartsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Scrollbars>
          <LineChart />
            <LineChart />
              <LineChart />
                <LineChart />
      </Scrollbars>
);
  }
}
