import React from 'react';
import styled from 'styled-components';
import { color2 } from '../styles/colors';
import Ionicon from 'react-ionicons'
import { Row, Col } from 'antd';
import Color from 'color';
import {observer} from "mobx-react";
import { Desktop, Tablet, Mobile, Default } from '../components/Responsive';

const Container =  styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width:70px;
  background-color: ${color2};
  overflow: hidden;
`;

const ContainerMobile =  styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height:50px;
  background-color: ${color2};
  overflow: hidden;
`;


const Wrapper =  styled.div`
`;

const Item = styled(Row)`
  padding: 20px 0px;
  background-color: ${props=> props.selected? '#00a89c':'#2b3f54'};
  &:hover {
    background-color: ${ Color(color2).alpha(0.5).lighten(0.5).toString()};
  }
`

const ItemContent = styled.div`
  width: 100%;
  text-align: center;
`


const ItemLabel = styled.div`{
  color: #fff;
}`

const MobileItem = styled.div`
  padding: 0px 20px;
  height: 70px;
  padding-top: 10px;
  display: inline-block;
  background-color: ${props=> props.selected? '#00a89c':'rgb(22,59,142)'};
  &:hover {
    background-color: ${ Color(color2).alpha(0.5).lighten(0.5).toString()};
  }
`



const Items = [
  {
    id:'dashboard',
    screens:['dashboard'],
    name:'item1',
    label:'التجارة',
    label2:'الخارجية',
    icon:'ion-stats-bars'
  },
  {
    id:'trade',
    name:'item2',
    screens:['trade'],
    label:'التبادل',
    label2:'التجاري',
    icon:'ion-earth'
  },
  // {
  //   id:3,
  //   name:'item3',
  //   icon:'ion-ios-location-outline'
  // },
  // {
  //   id:4,
  //   name:'item4',
  //   icon:'ion-ios-gear-outline'
  // },
  // {
  //   id:5,
  //   name:'item5',
  //   icon:'ion-log-out'
  // }
]
class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  handleItemClick(item){
    const { panelManager, pageIndex } = this.props;
    panelManager.active= item.screens;

    const { onItemClick } = this.props;
    if(onItemClick) onItemClick(item);
  }

  render() {
    const { panelManager, pageIndex } = this.props;

    return (

      <div>
        <Desktop>
          <Container>
            <Wrapper>
              {Items.map((item, key)=>(

                <Item selected={panelManager.active == item.id} onClick={()=> this.handleItemClick(item)} key={key} type="flex" justify="space-around" align="middle">
                    <ItemContent >
                      <Ionicon icon={item.icon} fontSize="30px" color="#fff"/>

                    </ItemContent>
                    <ItemLabel>{item.label} <br/> {item.label2}</ItemLabel>

                </Item>
              ))}
            </Wrapper>
          </Container>
        </Desktop>
        <Tablet>
          <Container>
            <Wrapper>
              {Items.map((item, key)=>(
                <Item selected={panelManager.active== item.id} onClick={()=> this.handleItemClick(item)} key={key} type="flex" justify="space-around" align="middle">
                  <Ionicon icon={item.icon} fontSize="30px" color="#fff"/>
                </Item>
              ))}
            </Wrapper>
          </Container>
        </Tablet>


        <Mobile>
          <ContainerMobile>
            <Wrapper>
              {Items.map((item, key)=>(
                <MobileItem selected={panelManager.active== item.id} onClick={()=> this.handleItemClick(item)} key={key} type="flex" justify="space-around" align="middle">
                  <Ionicon icon={item.icon} fontSize="30px" color="#fff"/>
                </MobileItem>
              ))}
            </Wrapper>
          </ContainerMobile>
        </Mobile>

      </div>
    );
  }
}


export default observer(Toolbar);
