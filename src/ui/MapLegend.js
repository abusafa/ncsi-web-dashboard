import React from 'react';
import styled from 'styled-components';
import { GetStats } from '../api/ttc/Stats'
import ToggleEye from './ToggleEye'



const Container = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: rgba(25, 26, 26, 0.88);
  padding: 20px 40px;
  direction: rtl;
`

const Item = styled.div`
  margin: 10px 0;
  position: relative;
`

const Label = styled.h3`
  display: inline-block;
  margin-right: 10px;
  color:#bbb
`


const Count = styled.span`
background-color: #6e298d;
  padding: 2px 5px;
  border-radius: 8px;
  margin-right: 10px;
`

const Circle = styled.span`
  width:15px;
  height: 15px;
  background-color: ${props => props.color};
  border-radius: 10px;
  display: inline-block;
  border: 1px solid #fff;
`


export default class MapLegend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      legend: [
      ]
    }
  }

  componentDidMount(){
    const { layers } = this.props;
    const legend = layers.map((layer, key)=>{

      return {
        label:  layer.name,
        count: `2`,
        color: layer.style['circle-color']
      }
    });
    this.setState({
      legend
    })
  }


  handleToggleLayer(key, isToggled){
    const {layers} = this.props;
    layers[key].show = isToggled;
  }

  render() {
    const { legend } = this.state;
    return (
      <Container>
        {legend.map(({label, color, count},key)=>(
          <Item>
            <ToggleEye onToggle={(isToggled)=> this.handleToggleLayer(key, isToggled)}/>
            <Circle color={color}/>
            <Label>
              {label} {count && <Count>{count}</Count>}
            </Label>
          </Item>
        ))}
      </Container>
    );
  }
}
