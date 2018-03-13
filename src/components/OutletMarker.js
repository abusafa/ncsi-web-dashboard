import React, {PropTypes} from 'react';
import styled from 'styled-components';
import { Tag, Icon } from 'antd';
import { remove } from 'lodash';
import {color} from '../styles/colors';
import {observer} from "mobx-react";
import CountUp from 'react-countup'

const Container= styled.div`
  position: absolute;
  top: -30px;
  right: -15px;
`
const MakerContainer= styled.div``

const CountUpStyled = styled(CountUp)`
  margin-left: 10px;
  margin-right: 10px;
`
const CloseIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  background: #d6eae9;
  position: absolute;
  top: 3px;
  left: 3px;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  line-height: 20px;
  text-align: center;
`

const TagStyled = styled(Tag)`
  min-width: 170px;
  margin: 5px;
`

const Label = styled.div`
width:100px;
background-color: rgba(255,255,255,0.99);
padding: 1px 5px;
bottom: 10px;
position: absolute;
left: -105px;
font-family: cairo;
font-size: 9px;
border-radius: 2px;
box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.62);
`

const Info = styled.div`
    text-align: center;
    width: 200px;
    background-color: rgba(255,255,255,0.99);
    padding: 1px 5px;
    bottom: 10px;
    position: absolute;
    left: -90px;
    top: -155px;
    height: 150px;
    font-family: cairo;
    font-size: 9px;
    border-radius: 2px;
    box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.62);
`;

//outlet_type
const markerColors = {
  land:'rgb(22,59,142)',
  sea:'rgb(2, 169, 155)',
  air:'rgb(127, 142, 171)'
}


class OutletMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      toggled:false,
      label: false
    }
  }

  handleInfoWindowClick(){
    const { statsStore } = this.props;
    statsStore.selectedOutlet = null;
    statsStore.calculateStats();

  }

  handleMarkerClick(){
    const { statsStore, outlet } = this.props;
    statsStore.selectedOutlet = {
      code:outlet.code,
      name:outlet.name_ar
    }
    statsStore.calculateStats();
  }

  mouseOut(){
    this.setState({
      label: false
    });
  }

  mouseOver(){
    this.setState({
      label: true
    });
  }

  renderInfo(){
    const { statsStore, outlet , data} = this.props;
    const {name_ar='', outlet_type} = outlet;

    if( statsStore.selectedOutlet && statsStore.selectedOutlet.code == outlet.code) return (
      <Info>
        <CloseIcon type="close" onClick={()=> this.handleInfoWindowClick()} />

        <h2 style={{margin:5}}>{name_ar}</h2>

        <TagStyled color="#00a89c">صادرات:

          <CountUpStyled
            start={0}
            end={data.outValue}
            duration={2.75}
            useEasing
            useGrouping
            separator=','
          />

          </TagStyled>

        <TagStyled color="#1ABB9C">واردات:

          <CountUpStyled
            start={0}
            end={data.inValue}
            duration={2.75}
            useEasing
            useGrouping
            separator=','
          />
        </TagStyled>
        <TagStyled color="#666">إعادة التصدير:

          <CountUpStyled
            start={0}
            end={data.inoutValue}
            duration={2.75}
            useEasing
            useGrouping
            separator=','
          />
        </TagStyled>

      </Info>
    )

    return ''

  }

  render() {
    const { outlet, data } = this.props;
    const { toggled, label } = this.state;
    const {name_ar='', outlet_type} = outlet;
    const markerColor = markerColors[outlet_type]
    return (
      <Container


        >
          <MakerContainer
            onMouseOut={() => this.mouseOut()}
            onMouseOver={() => this.mouseOver()}
           onClick={()=> this.handleMarkerClick()}
           >
            <svg style={{width:30, height:30}} version="1.1" x="0px" y="0px" viewBox="0 0 512.533 512.533" >
              <path style={{fill:markerColor}} d="M406.6,62.4c-83.2-83.2-217.6-83.2-299.733,0c-83.2,83.2-83.2,216.533,0,299.733l149.333,150.4
        L405.533,363.2C488.733,280,488.733,145.6,406.6,62.4z"/>
              <path style={{fill:'#F3F3F3'}} d="M256.2,70.933c-77.867,0-141.867,62.933-141.867,141.867c0,77.867,62.933,141.867,141.867,141.867
        c77.867,0,141.867-62.933,141.867-141.867S334.066,70.933,256.2,70.933z"/>

            </svg>
          </MakerContainer>

        {label &&<Label>{name_ar}</Label>  }
        {/* {toggled && <Info>
          <h2 style={{margin:5}}>{name_ar}</h2>

          <Tag style={{margin:5}} color="#00a89c">صادرات: {data.outValue}</Tag>

          <Tag style={{margin:5}} color="#1ABB9C">واردات: {data.inValue}</Tag>
          <Tag style={{margin:5}} color="#666">إعادة التصدير: {data.inoutValue}</Tag>

        </Info>} */}
        {this.renderInfo()}
      </Container>

    );
  }
}

export default observer(OutletMarker);
