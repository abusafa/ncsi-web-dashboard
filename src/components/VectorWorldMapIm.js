import React from 'react';
import styled from 'styled-components';
import svgMapBG from '../assets/mapbg.svg';
import MapChart from './MapChart'
const Container = styled.div `
  ${'' /* background-image: url(${svgMapBG});
  background-position-y: 8px; */}
  background-color: #d5eae9;

`

const MapContainer = styled.div `
`




const countries = [
"BH",
"BE",
"BR",
"BG",
"CL",

]

export default class VectorWorldMapIm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <MapContainer>
          <MapChart  countries={countries} type="importers"/>
        </MapContainer>

      </Container>
    );
  }
}
