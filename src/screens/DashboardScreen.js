import React, {PropTypes} from 'react';
import ScrollAnim from 'rc-scroll-anim';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import outletsDB from '../data/new/outletsdb.json'
import cn from 'classnames'
import { range } from 'lodash';

import Screen from '../components/Screen';
import styled from 'styled-components';
import {observer} from "mobx-react";
import { filter } from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';

import { Layout, Button ,Icon,  Row, Col as _Col} from 'antd';

import logoNcsi from '../assets/logo.png';
import PageManager from '../components/PageManager';
import { Wrapper, HorizontalMargin } from '../ui';


//store
// Mobx store
import {StatsStore} from '../mobx/Stats';
import {layers} from '../mobx/Layers';
import {Filter} from '../mobx/Filters';
import { PanelManager } from '../mobx/Panels';
// Charts
import ChartByOutletType from '../components/ChartByOutletType';
import ChartByOutletTypeHighCharts from '../components/ChartByOutletTypeHighCharts';
import ChartByOutlet from '../components/ChartByOutlet';
import TopIndecatorsTable from '../components/TopIndecatorsTable';
import FilterBar from '../components/FilterBar';
import TotalValuesCards from '../components/TotalValuesCards';
import MapBoxCard from '../components/MapBoxCard';


import HeaderIcons from '../components/HeaderIcons';
import TopExportersImporters from '../components/TopExportersImporters';

const dicProducts = {
  in:'اهم السلع المصدرة من السلطنة الى العالم',
  out:'اهم السلع المستوردة من  العالم',
  inout:'اهم السلع المعاد تصديرها الى العالم'
}

const dicCountry = {
  in:'اهم الدول المصدرة من السلطنة الى ',
  out:'اهم الدول المستوردة من  ',
  inout:'اهم الدول المعاد تصديرها الى '
}


const Parallax = ScrollAnim.Parallax;
var ScrollOverPack = ScrollAnim.OverPack;


const Col = styled(_Col)`
  margin-bottom: 16px;
`

const IconShowFilter = styled(Icon)`
font-size: 30px;
position: absolute;
top: 23px;
left: 13px;
`


const Box = styled.div`
width: 40%;
  height: 40px;
  line-height: 40px;
  margin: 5px auto;
  text-align: center;
  background: #019bf0;
  border-radius: 4px;
  color: #fff;
`

const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

const chartLabels = {
  land:'المنافذ البرية',
  sea:'المنافذ البحرية',
  air:'المنافذ الجوية',
}

const PageContent =  styled.div`
    padding: 5px 16px;
    background-color: #f2f7f7;
`;

const TotalValuesCardsWrapper = styled.div`
  margin-right: 10px;
  margin-left: 10px;
`


const Header =  styled.div`
    border-bottom: 1px solid #c3d6d4;
    background-color: #EDEDED;
`;

const HeaderMobile =  styled.div`
    border-bottom: 1px solid #00a79b;
    background-color: #FFF;
    z-index: 1000;
    position: relative;
`;



const MarginTop =  styled.div`
    height: 75px;
`;

const Margin =  styled.div`
    height: 150px;
`;
const Title = styled.h1`
  text-align: right;
  color:#1ABB9C;
  font-size:35px;
  margin-top:5px;
  margin-bottom:5px;
`


const Content =  styled.div`
    height: 100%;
    position: relative;
`;

const Spacer =  styled.div`
    height: 400px;
    position: relative;
`;

const Logo =  styled.img`
  width: 300px;

`;


class DashboardScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      boxes:range(4)
    }
    window.setState = this.setState
  }

  showFilter(){
    PanelManager.active = ['filter']
  }

  hideFilter(){
    PanelManager.active = ['dashboard']
  }

  render() {

    const { boxes } = this.state;
    console.log('StatsStore.outletTypes', StatsStore.outletTypes);
    let outletTypes =  StatsStore.outletTypes;
    if(outletTypes.length >0 && outletTypes[0] == '')  outletTypes=[]

    return (
      <div>
        <Screen panelManager={PanelManager} pageIndex={'filter'} className='pt-page-1 filter-panel'>
          <HorizontalMargin>
            <FilterBar StatsStore={StatsStore} bigTitle="التجارة الخارجية"  />
          </HorizontalMargin>
          <Button type="primary" size="large" onClick={()=> this.hideFilter()}>
            <Icon type="check" />
              موافق
            </Button>

        </Screen>


      <Screen panelManager={PanelManager} pageIndex='dashboard' className='pt-page-1'>

            <Header>
              <HeaderIcons />
              <Logo src={logoNcsi} />
              <HorizontalMargin>
                <FilterBar StatsStore={StatsStore}  bigTitle="التجارة الخارجية" />
              </HorizontalMargin>
            </Header>

          <Content>
            <TotalValuesCardsWrapper>
              <TotalValuesCards StatsStore={StatsStore}/>

            </TotalValuesCardsWrapper>

            <Scrollbars>

              <PageManager StatsStore={StatsStore}>
              <PageContent>


                  <Row gutter={12}>
                    <Col xl={7} lg={7} md={24} sm={24} xs={24} >
                      <TopIndecatorsTable  StatsStore={StatsStore} title={"أهم  السلع"}/>
                    </Col>
                     <Col xl={10} lg={10} md={24} sm={24} xs={24}>
                       <MapBoxCard StatsStore={StatsStore}/>
                     </Col>
                     <Col xl={7} lg={7} md={24} sm={24} xs={24} >
                       <TopExportersImporters StatsStore={StatsStore}   title={"أعلى  الدول"}/>
                     </Col>
                  </Row>

                 {outletTypes.map((type, key)=>(

                   <Row gutter={12} key={`outletTypesChart-${key}`} >
                     <Title>{chartLabels[type]}</Title>
                     <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                       {/* <ChartByOutletType outletType={type} /> */}
                       <ChartByOutletTypeHighCharts outletType={type} />
                     </Col>
                     <Col xl={12} lg={12} md={12} sm={24} xs={24} >
                       <ChartByOutlet  outlets={filter(outletsDB.features, o=> o.properties.TYPE==type)}/>
                     </Col>
                   </Row>
                 ))}
                 <h2>  © جميع الحقوق محفوظة للمركز الوطني للإحصاء والمعلومات. (2018)، سلطنة عمان</h2>
                <Spacer />



              </PageContent>
              </PageManager>
            </Scrollbars>
          </Content>
      </Screen>

      </div>

    );
  }
}

export default observer(DashboardScreen);
