// imports
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import classNames from 'classnames';
import { Desktop, Tablet, Mobile, Default } from './components/Responsive';
import mapboxgl from 'mapbox-gl';
import { Wrapper } from './ui';
import { Scrollbars } from 'react-custom-scrollbars';
import { media } from './components/Responsive';
import styled from 'styled-components';
import { spring, AnimatedRoute, AnimatedSwitch } from 'react-router-transition';
import { Layout, Button , Row, Col} from 'antd';
import {ContainerQuery} from 'react-container-query';

//import 'antd/dist/antd.css';
import './styles/antd.rtl.css';

import './styles/animations.css';
import './styles/animate.css';
import './App.css';



// componetns


//UI
import Toolbar from './ui/Toolbar';
import { Shadow } from './ui';
// Screens

import DashbaordScreen from './screens/DashboardScreen';
import TradeExchangeScreen from './screens/TradeExchangeScreen';
// Mobx store
import {StatsStore} from './mobx/Stats';
import {layers} from './mobx/Layers';
import {Filter} from './mobx/Filters';
import { PanelManager } from './mobx/Panels';

const { Header, Footer, Sider, Content } = Layout;
//mapboxgl.accessToken = 'pk.eyJ1IjoiaWhhYiIsImEiOiJZT19QbkJJIn0.ROWLhlTd-2mI94QvdzrH8g';
mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.1/mapbox-gl-rtl-text.js');

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
  },
};

const Container =  styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right:0;
  overflow: hidden;

`;


const PageWrapper =  styled.div`
  position: absolute;
  top: 0;
  right: 70px;
  ${media.phone`right: 0px;`}
  bottom: 0;
  left:0;
  overflow: hidden;
  direction: rtl;

`;

const PageWrapperMobile =  styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  ${media.phone`right: 0px;`}
  bottom: 0;
  left:0;
  overflow: hidden;
  direction: rtl;

`;








class App extends Component {

  constructor(props) {
    super(props);
    this.state={
      pageIndex:2
    }
  }

  render() {
    const { pageIndex } = this.state;
    return (
      <ContainerQuery query={query}>
        {params => <Container className={classNames(params)} >
          <Toolbar
            panelManager={PanelManager}
            onItemClick={(item)=> console.log(item)}
          />

            <Desktop>
              <PageWrapper>
                <DashbaordScreen />
                <TradeExchangeScreen />
              </PageWrapper>
            </Desktop>

            <Tablet>
              <PageWrapper>
                <DashbaordScreen />
                <TradeExchangeScreen />
              </PageWrapper>
            </Tablet>

            <Mobile>
              <PageWrapperMobile>
                <DashbaordScreen />
                <TradeExchangeScreen />
              </PageWrapperMobile>
            </Mobile>

        </Container>
      }
    </ContainerQuery>
    );
  }
}


const MiniSidebar = {
  backgroundColor:'#c00'
};

export default App;
