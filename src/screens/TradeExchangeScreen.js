
import React, {PropTypes} from 'react';
import Screen from '../components/Screen';
import styled from 'styled-components';
import { find } from 'lodash';
import mapboxgl from 'mapbox-gl';
import { Tabs, Modal, Card , Select} from 'antd';
import TradeChart from '../components/TradeChart';
import { PanelManager } from '../mobx/Panels';
import ReactMapboxGl, {GeoJSONLayer, Feature, Popup } from "react-mapbox-gl";
import countriesGeojson from '../data/countries.geo.json';
import countries from '../data/countries.json';
import { Scrollbars } from 'react-custom-scrollbars';
import { Row, Col, Button} from 'antd';
import Fuse from 'fuse.js';
import {StatsStore} from '../mobx/Stats';

const turf = window.turf;
const TabPane = Tabs.TabPane;

const mapBBox = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              4.921875,
              -10.833305983642491
            ],
            [
              92.10937499999999,
              -10.833305983642491
            ],
            [
              92.10937499999999,
              47.040182144806664
            ],
            [
              4.921875,
              47.040182144806664
            ],
            [
              4.921875,
              -10.833305983642491
            ]
          ]
        ]
      }
    }
  ]
};

const omanGeojson = {
  "type": "FeatureCollection",
  "features": []
}
omanGeojson.features.push(find(countriesGeojson.features, f=> f.id == "OMN"))

const Option = Select.Option;

// const options = {
//   shouldSort: true,
//   threshold: 0.6,
//   location: 0,
//   distance: 100,
//   maxPatternLength: 32,
//   minMatchCharLength: 1,
//   keys: [
//     "name_ar",
//     "name"
//   ]
// };
//
// const fuse = new Fuse(countries, options);

const MapBox = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiaWhhYiIsImEiOiJZT19QbkJJIn0.ROWLhlTd-2mI94QvdzrH8g"
});



// A simple line from origin to destination.
const route = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [ 56, 21],
                [ 23, 23]
            ]
        }
    }]
};

// Calculate the distance in kilometers between route start/end point.
var lineDistance = turf.lineDistance(route.features[0], 'kilometers');

var arc = [];

// Draw an arc between the `origin` & `destination` of the two points
for (var i = 0; i < lineDistance; i++) {
    var segment = turf.along(route.features[0], i / 1000 * lineDistance, 'kilometers');
    arc.push(segment.geometry.coordinates);
}

route.features[0].geometry.coordinates = arc;



const CountryPanel = styled.div`
position: absolute;
top: 65px;
right: 20px;

`

const Wrapper = styled.div`
margin-top: 20px;

`

const TapsPanel = styled.div`
position: absolute;
bottom: -17px;
background: #fff;
z-index: 1000;
width: 100%;

`


const CountryLabel = styled.h2`
position: absolute;
top:70px;
left:30px;
background: rgba(0, 0, 0, 0.7);
padding: 7px 20px;
color: #fff;
border-radius: 26px;
`
const Title = styled.h2`
text-align: center;
z-index: 10000;
position: relative;
border: 0;
font-size: 34px;
color: #172e44;
background-color: #172e443d;
`
const Map = styled(MapBox)`
position: absolute!important;
top: 0;
left: 0;
right: 0;
bottom: 0;
direction: ltr;
`;

const polygonPaint = {
  'fill-color': '#6F788A',
  'fill-opacity': 0,
};

const omanPaint = {
  'fill-color': 'red',
  'fill-opacity': 0.5,
};


const selectedCountryPaint = {
  'fill-color': '#00a79b',
  'fill-opacity': 0.6,
};

const multiPolygonPaint = {
  'fill-color': '#3bb2d0',
  'fill-opacity': 0.5
};
export default class TradeExchangeScreen extends React.Component {
  constructor(props) {
    super(props);


    const bbox = turf.bbox(mapBBox);
    const bounds = [
      [
        bbox[0], bbox[1]
      ],
      [
        bbox[2], bbox[3]
      ]
    ]

    this.state = {
      center:[ 56, 21],
      fitBounds:bounds,
      zoom: [2],
      pitch: [0],
      bearing: [0],
      hoverCountry: null,
      selectedCountry: {
        "type": "FeatureCollection",
        "features": []
      },
    }
  }

  handleCountryHover(e){
    const country = e.features[0];
    const countryData = find(countries, c=> c['iso_alpha_3'] == country.properties.isoA3);
    const name = countryData ? countryData.name_ar : ''
    this.setState({
      hoverCountry: name
    })
  }

  handleCountryClick(e){
    const country = e.features[0];
    console.log('country', country.toJSON());
    const centroid = turf.centroid(country);
    if( country.properties.isoA3 === 'OMN'){
      console.log('this.state.selectedCountry', this.state.selectedCountry);

      if(this.state.selectedCountry.features.length>0){
        const selectedCountry = this.state.selectedCountry.features[0];
        Modal.info({
          title: find(countries, c=> c['iso_alpha_3'] == selectedCountry.properties.isoA3).name_ar,
          okText:'x',
          width:1200,
          content: (
            <div>
              <TradeChart isoA3={selectedCountry.properties.isoA3}/>
            </div>
          ),
          onOk() { StatsStore.direction='in' },
        });
      }

      return;
    }

    this.setState({
      center:centroid.geometry.coordinates,
      zoom:[4],
      selectedCountry: {
        "type": "FeatureCollection",
        "features": [country.toJSON()]
      }
    });

    this.calculateRoute(centroid.geometry.coordinates)
  }


  calculateRoute(coordinates){
    // A simple line from origin to destination.
    const route = {
        "type": "FeatureCollection",
        "features": [{
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [ 56, 21],
                    coordinates
                ]
            }
        }]
    };

    // Calculate the distance in kilometers between route start/end point.
    var lineDistance = turf.lineDistance(route.features[0], 'kilometers');
    var arc = [];

    // Draw an arc between the `origin` & `destination` of the two points
    for (var i = 0; i < lineDistance; i++) {
      var segment = turf.along(route.features[0], i / 1000 * lineDistance, 'kilometers');
      arc.push(segment.geometry.coordinates);
    }

    route.features[0].geometry.coordinates = arc;

    const bbox = turf.bbox(route);
    let b1 = bbox[0] - 10;

    let b2 = bbox[1] - 10;
    let b3 = bbox[2] + 10;
    let b4 = bbox[3] + 10;
    b2 = b2<= 90? b2 : 90
    b4 = b4<= 90? b4 : 90

    const bounds = [
      [
        b1,
        b2
      ],
      [
        b3,
        b4
      ]
    ];


    this.setState({route, fitBounds:bounds})
  }

  handleSelectedCountryClick(e){
    const country = e.features[0];

    Modal.info({
      title: find(countries, c=> c['iso_alpha_3'] == country.properties.isoA3).name_ar,
      okText:'x',
      width:1400,
      content: (
        <div>
          <TradeChart isoA3={country.properties.isoA3}/>
        </div>
      ),
      onOk() {StatsStore.direction='out'},
    });
  }


  handleSearch(value){
    console.log(value);
    const country = find(countriesGeojson.features, f=> f.id == value);

    const centroid = turf.centroid(country);
    if(!country) {
      this.setState({
        selectedCountry: null
      });
      return;
    }
     this.setState({
       center:centroid.geometry.coordinates,
       zoom:[4],
       selectedCountry: {
         "type": "FeatureCollection",
         "features": [country]
       }
     });

     this.calculateRoute(centroid.geometry.coordinates)



  }

  handleClearResults(){
    this.setState({
      center:[56, 21],
      zoom:[2],
      route:null,
      selectedCountry: {
        "type": "FeatureCollection",
        "features": []
      }
    })
  }

  render() {
    const { zoom, route,center, hoverCountry, bearing, pitch, fitBounds, selectedCountry } = this.state;

    console.log('route',route);
    return (
      <Screen panelManager={PanelManager} pageIndex='trade' className='pt-page-2'>
        <Map
          fitBounds={fitBounds}
          bearing={bearing}
          pitch={pitch}


          style="mapbox://styles/mapbox/light-v9">

          <GeoJSONLayer
            data={countriesGeojson}
            fillPaint={polygonPaint}
            fillOnClick={(e)=> this.handleCountryClick(e)}
            fillOnMouseMove={(e)=> this.handleCountryHover(e)}
          />

          <GeoJSONLayer
            data={omanGeojson}
            fillPaint={omanPaint}
          />

          {route && <GeoJSONLayer
            data={route}
            lineLayout = {{
            'line-cap': 'round' ,
            'line-join': 'round'
            }}

            linePaint = {{
            'line-color': '#4790E5',
            'line-opacity': 0.6,
            'line-width': 4
            }}
          />}

          {selectedCountry && <GeoJSONLayer
            data={selectedCountry}
            fillPaint={selectedCountryPaint}
            fillOnClick={(e)=> this.handleSelectedCountryClick(e)}

          />}


        </Map>
          <Title>التبادل التجاري</Title>
        <CountryPanel>
          <Card >

            <h3>الرجاء اختيار الدولة</h3>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="بحث عن دولة"
              optionFilterProp="children"
              onChange={(value)=> this.handleSearch(value)}
              // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {countries.map(c => (
                <Option value={c.iso_alpha_3}>{c.name_ar}</Option>
              ))}

            </Select>
            <Wrapper>
              <Button type="primary" icon="delete" onClick={()=> this.handleClearResults()}>مسح النتائج</Button>

            </Wrapper>


          </Card>
        </CountryPanel>
        {hoverCountry && <CountryLabel>
          {hoverCountry}
        </CountryLabel>}

        {/* <TapsPanel>
          <Tabs defaultActiveKey="1"  >
            <TabPane tab="حركة إعادة التصدير" key="3">

            </TabPane>
            <TabPane tab="حركة الواردات" key="2">
            </TabPane>
            <TabPane tab="حركة الصادرات" key="1">
            </TabPane>
          </Tabs>
        </TapsPanel> */}

      </Screen>
    );
  }
}
