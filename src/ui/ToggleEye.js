import React from 'react';
import styled from 'styled-components';
import Ionicon from 'react-ionicons'

const Icon = styled(Ionicon)`

`

const IconContainer = styled.div`

  position: absolute;
  top: -2px;
  right: -30px;
`


export default class ToggleEye extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      toggled: true
    }
  }

  handleToggle(){
    this.setState({
      toggled: !this.state.toggled
    })

    const { onToggle } = this.props;
    if(onToggle) onToggle(!this.state.toggled)
  }

  render() {
    const { toggled } = this.state;
    return (
      <IconContainer onClick={()=> this.handleToggle()}>
        {toggled && <Icon icon='ion-eye' fontSize="20px" color="#e1e1e1"/>}
        {!toggled && <Icon icon='ion-eye-disabled' fontSize="20px" color="#666"/>}
      </IconContainer>
    );
  }
}
