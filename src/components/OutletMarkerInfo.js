import React, {PropTypes} from 'react';
import styled from 'styled-components';
import { Tag, Icon } from 'antd';
import { remove } from 'lodash';
import {color} from '../styles/colors';
import {observer} from "mobx-react";
import CountUp from 'react-countup'
import { observe } from 'mobx';

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
`;



class OutletMarkerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data:{}
    }
  }


  componentDidMount(){

  }

  handleInfoWindowClick(){
    const { statsStore, onClose } = this.props;
    statsStore.selectedOutlet = null;
    if( onClose ) onClose()


  }






  render() {
    const { outlet, statsStore } = this.props;
    const data = statsStore.outletInfo;
    console.log(data);


    console.log('data', data);
    return (
      <Info>
        <CloseIcon type="close" onClick={()=> this.handleInfoWindowClick()} />

        <h2 style={{margin:5}}>{outlet.properties.NAME_AR}</h2>
        <div>
          <TagStyled color="#00a89c">صادرات:

            <CountUpStyled
              start={0}
              end={data.out}
              duration={2.75}
              useEasing
              useGrouping
              separator=','
            />

            </TagStyled>
        </div>
        <div>
          <TagStyled color="#1ABB9C">واردات:

            <CountUpStyled
              start={0}
              end={data.in}
              duration={2.75}
              useEasing
              useGrouping
              separator=','
            />
          </TagStyled>
        </div>

        <div>
          <TagStyled color="#666">إعادة التصدير:

            <CountUpStyled
              start={0}
              end={data.inout}
              duration={2.75}
              useEasing
              useGrouping
              separator=','
            />
          </TagStyled>
        </div>



      </Info>

    );
  }
}

export default observer(OutletMarkerInfo);
