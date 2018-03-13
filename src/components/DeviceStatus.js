import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { GetStats } from '../api/ttc/Stats'
import BusIcon from './BusIcon'
import {observer} from "mobx-react";
import { filter, map } from 'lodash';
const BusImage = styled.img`
  width:40px;
`
const Container = styled.div`
  position: absolute;
  bottom: 20px;
  left: 30px;
  width: 600px;

  min-height: 100px;
`

const Block = styled.div`
    padding: 10px 10px;

`

const Label = styled.h4`

  margin-left: 10px;
  font-size: 20px;
  color:#bbb;
  line-height: 50px;
`

class DeviceStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [
        {
          label:'...',
          fill:"#55BC6E"

        },
        {
          label:'...',
          fill:"#F7941E"
        },
        {
          label:'...',
          fill:"#838A85"
        }
      ]
    }
  }


   componentWillReceiveProps(nextProps){
     const { geojson } = nextProps
     if(geojson)
     {
       const groups = filter(this.props.layers,  { show:true }).map(layer => layer.groupId)
       console.log('this.props.layers', this.props.layers)
       console.log('nextPropslayers', nextProps.layers)

       console.log('filter(this.props.layers,  { show:true })', filter(this.props.layers,  { show:true }))
       const stats = GetStats({geojson, groups});
       this.setState({
         blocks: [
           {
             label:`${stats.active}`,
             fill:"#55BC6E"

           },
           {
             label:`${stats.moving} `,
             fill:"#F7941E"
           },
           {
             label:'...',
             fill:"#838A85"
           }
         ]
       })
     }
   }



  render() {
    const { blocks } = this.state;
    return (
      <Container>
        <Row gutter={30} type="flex" justify="end">
        {blocks.map(({label, fill}, key)=>(
          <Col span={4}>
            <Block>

                  <BusIcon fill={fill}/>

                  <Label>{label}</Label>


            </Block>
          </Col>
        ))}
        </Row>
      </Container>
    );
  }
}


export default observer(DeviceStatus)
