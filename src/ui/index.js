import styled from 'styled-components';


export const Container = styled.div`
  min-height: 500px;
`


export const Wrapper = styled.div`
  padding: ${props=> props.size? props.size : '30px'};
`


export const VerticallMargin = styled.div`
  padding: ${props=> props.size? props.size : '30px'} 0px;
`

export const HorizontalMargin = styled.div`
  padding: 0px ${props=> props.size? props.size : '30px'} ;
`

export const Shadow = styled.div`
  box-shadow: 2px 0px 4px 0px rgba(0,0,0,0.75);
`

export const Title = styled.h1`
  color: rgb(90, 90, 90);
  color: rgb(23, 46, 68);
    font-size: 20px;

`

export const SubTitle = styled.h2`
  color: rgb(90, 90, 90);
`
