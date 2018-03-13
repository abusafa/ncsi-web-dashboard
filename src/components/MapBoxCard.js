import React from 'react';
import ReactMapboxGl, {GeoJSONLayer, Feature, Popup } from "react-mapbox-gl";
import CountUp from 'react-countup'
import { Tag, Icon } from 'antd';
import cn from 'classnames';
import styled from 'styled-components';
import { filter } from 'lodash';
import {observer} from "mobx-react";
import OutletMarkerInfo from './OutletMarkerInfo'
import { Checkbox,Switch, Card } from 'antd';
import { observe } from 'mobx';
import outlets from '../data/new/outletsdb.json'
const CheckboxGroup = Checkbox.Group;

const Container = styled.div `
`
const MapBox = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiaWhhYiIsImEiOiJZT19QbkJJIn0.ROWLhlTd-2mI94QvdzrH8g"
});


const Map = styled(MapBox)`
  height: 100%;
`
const CardView = styled.div`
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.18);
`

const MapContainer = styled.div`
  height: 500px;
  direction: ltr;
`

const OutletTypsCheckboxGroup = styled(CheckboxGroup)`
margin-top: -15px;
margin-bottom: 15px;
`



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

`;

const SwitchLabel = styled.span`
  margin-left: 1px;
  margin-right: 10px;
`



const SwitchesWrapper = styled.div`
padding: 10px;
background-color: #fff;
border-bottom: 1px solid #c2cbcc;
`

const SwitchContainer = styled.span`
float:left;
`


const SwitchTitleLabel = styled.span`
margin-right: 10px;
`

const SwitchesContainer = styled.div`
background: #fff;
padding: 4px;
border-radius: 16px;
box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.18);
height: 30px;
`



const symbolLayout = {
  'text-field': '{ARB_DESC}',
  'text-size':12,

  //'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top'
};
const symbolPaint = {
  'text-halo-width':2,
  'text-halo-color':'#fff',
  'text-color': '#333',


};

const circleLayout = { visibility: 'visible' };
const circlePaint = {
  'circle-color': '#9B59B6',
  'circle-radius': 8,
  'circle-opacity': 0.8
};

const landPaint = {
  ...circlePaint,
  'circle-color': '#1ABB9C',
};

const seaPaint = {
  ...circlePaint,
  'circle-color': '#3498DB',
};

const airPaint = {
  ...circlePaint,
  'circle-color': '#9B59B6',
};



const options = [
  { label: 'بري', value: 'land' },
  { label: 'بحري', value: 'sea' },
  { label: 'جوي', value: 'air' },
];

const SwitchLabels = {
  land:'المنافذ البرية',
  sea:'المنافذ البحرية',
  air:'المنافذ الجوية',
}

class MapBoxCard extends React.Component {
  constructor(props) {
    super(props);
    this.switches = {
      land:true,
      sea:true,
      air:true

    }
    this.state = {
      outlets:[],
      center:[ 56, 21],
      zoom: [4.7],
      landGeojson:null,
      seaPaint:null,
      airGeojson:null
    }
  }

  componentDidMount(){
    const { StatsStore } = this.props;

    observe(StatsStore, change => {
      this.getGeojson()
    })
    this.getGeojson()
  }



  onChange(checked, item){
    this.switches[item] = checked;
    const checkedValues = cn(this.switches).split(' ');
    const { StatsStore } = this.props;
    StatsStore.outletTypes = checkedValues;
    StatsStore.selectedOutlet = null;
    StatsStore.calculateStats();

    this.setState({
      outlet:null,
      center:[ 56, 21],
      zoom: [5],
    });

  }

  getGeojson(){

    const { StatsStore } = this.props;
    const filterdRecords = filter(outlets.features, o=> StatsStore.outlets.includes(o.properties.POE_CODE)).map(o=>o);
    console.log('StatsStore.outlets', StatsStore.outlets);
    this.setState({
      landGeojson:{
        "type": "FeatureCollection",
        "features": filter(filterdRecords, (f)=> f.properties.TYPE == "land").map(r=>r)
      },
      seaGeojson:{
        "type": "FeatureCollection",
        "features": filter(filterdRecords, (f)=> f.properties.TYPE == "sea").map(r=>r)
      },
      airGeojson:{
        "type": "FeatureCollection",
        "features": filter(filterdRecords, (f)=> f.properties.TYPE == "air").map(r=>r)
      }
    })
  }

  onClickCircle(e){
    const { StatsStore } = this.props;

    const feature = e.features[0]
    console.log(feature);
    StatsStore.selectedOutlet = feature.properties.POE_CODE;
    StatsStore.selectedOutletFeature = feature;
    feature.code = feature.properties.POE_CODE
    this.setState({
      outlet:feature,
      center:feature.geometry.coordinates,
      zoom:[16]
    });
  }

  handleInfoWindowClick(){
    const { StatsStore } = this.props;


    StatsStore.selectedOutletFeature = null;
    StatsStore.calculateStats();

    this.setState({
      outlet:null,
      center:[ 56, 21],
      zoom: [5]
    })


  }

  render() {
    const {center, zoom, landGeojson, seaGeojson, airGeojson, outlet} = this.state;
    const { StatsStore } = this.props;
    const { filterTitle } = StatsStore;

    return (
      <Container>
        <CardView>
          <SwitchesWrapper>

            <SwitchesContainer>
              <SwitchTitleLabel>{filterTitle}</SwitchTitleLabel>

              {['land', 'sea', 'air'].map((item, key)=>(
                <SwitchContainer className={item}>
                  <SwitchLabel>{SwitchLabels[item]}</SwitchLabel> <Switch key={key} defaultChecked={true} onChange={(checked)=> this.onChange(checked, item)} />
                </SwitchContainer>
              ))}
            </SwitchesContainer>
          </SwitchesWrapper>

          <MapContainer>
            <Map
              center={center}
              zoom={zoom}
              style="mapbox://styles/ihab/cjbsygec9a4pl2rmfp4tt0v8b">
              {landGeojson && <GeoJSONLayer
                 data={landGeojson}
                 circleLayout={circleLayout}
                 circlePaint={landPaint}
                 circleOnClick={(feature)=>this.onClickCircle(feature)}
                 symbolLayout={symbolLayout}
                 symbolPaint={symbolPaint}
               />}

               {seaGeojson && <GeoJSONLayer
                  data={seaGeojson}
                  circleLayout={circleLayout}
                  circlePaint={seaPaint}
                  circleOnClick={(feature)=>this.onClickCircle(feature)}
                  symbolLayout={symbolLayout}
                  symbolPaint={symbolPaint}
                />}

                {airGeojson && <GeoJSONLayer
                   data={airGeojson}
                   circleLayout={circleLayout}
                   circlePaint={airPaint}
                   circleOnClick={(feature)=>this.onClickCircle(feature)}
                   symbolLayout={symbolLayout}
                   symbolPaint={symbolPaint}
                 />}

               {outlet && (
                  <Popup
                    key={outlet.id}
                    coordinates={outlet.geometry.coordinates}
                  >
                    <OutletMarkerInfo
                        onClose={()=> this.handleInfoWindowClick()}
                        outlet={outlet}
                        statsStore={StatsStore}
                    />

                  </Popup>
                )}

             </Map>


          </MapContainer>
        </CardView>
      </Container>
    );
  }
}

export default observer(MapBoxCard);
