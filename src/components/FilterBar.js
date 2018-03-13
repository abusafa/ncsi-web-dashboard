import React from 'react';
import { Select, Radio, TreeSelect, Row, Col as _Col, Icon } from 'antd';
import styled from 'styled-components';
import {observer} from "mobx-react";

const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;


const Col = styled(_Col)`
  margin-bottom: 16px;
`
Col

const Container = styled.div`
  direction: rtl;
  text-align: right;
`

const Title = styled.h1`
  text-align: right;
  color:#1ABB9C;
  font-weight: bold;
  font-size: 20px;
  color: rgb(23, 46, 68);
    font-size: 20px;
`

const ControlTitle = styled.h1`
text-align: left;
    color: #1ABB9C;
    font-weight: bold;
    font-size: 20px;
    color: rgb(23,46,68);
    font-size: 30px;
    margin-top: -80px;
`

const YearsContainer = styled.div`
`

const OutletsContainer = styled.div`

`

const children = [2017,2016,2015,2014,2013]
.map((year, key)=>(
  <Option key={year}>{year}</Option>
))
const icons ={
  'in':<Icon type="arrow-left" />,
  'out':<Icon type="arrow-right" />,
  'inout':<Icon type="retweet" />,
}



const outletTypes = [
  {
    label:'الكل',
    name:['land','air','sea']
  },
  {
    label:'بري',
    name:['land']
  },
  {
    label:'جوي',
    name:['air']
  },
  {
    label:'بحري',
    name:['sea']
  }
]


const directionTypes = [

  {
    label:'صادرات',
    name:'out'
  },
  {
    label:'واردات',
    name:'in'
  },
  {
    label:'إعادة التصدير',
    name:'inout'
  }
]

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      outletType:['land','air','sea'],
      outlet:'',
      directionType:'out',
    };

  }

  handleChangeYear(year) {
    const { StatsStore } = this.props;
    StatsStore.year = year;
    StatsStore.calculateStats();
  }

  handleOutletChange(outlet){
    this.setState({ outlet });
  }

  handleOutletTypeChange(e){
    console.log('outletType',  e.target.value);
    const { StatsStore } = this.props;
    StatsStore.outletTypes = e.target.value.map(o=>o);

    StatsStore.calculateStats();

    this.setState({ outletType: e.target.value });
  }

  handleDirectionTypeChange(e){
    console.log('directionType', e.target.value);
    const { StatsStore } = this.props;
    StatsStore.direction = e.target.value;
    StatsStore.calculateStats();

    this.setState({ directionType: e.target.value });
  }

  render() {
    const { outletType, directionType } = this.state;
    const { StatsStore, showTitle=true , title, bigTitle} = this.props;
    const { years, filterTitle } = StatsStore;


    const OutletsTypeSelect = (
      <OutletsContainer>
        <Radio.Group size='large' value={outletType} onChange={(e)=>this.handleOutletTypeChange(e)}>
          {outletTypes.map(({label, name},key)=>(
            <Radio.Button key={name} value={name}>{label}</Radio.Button>
          ))}
         </Radio.Group>
      </OutletsContainer>
    )


    const DirectionTypesSelect = (
      <OutletsContainer>
        <Radio.Group size='large' value={directionType} onChange={(e)=>this.handleDirectionTypeChange(e)}>
          {directionTypes.map(({label, name},key)=>(
            <Radio.Button key={name} value={name}> {icons[name]} {label}</Radio.Button>
          ))}
         </Radio.Group>
      </OutletsContainer>
    )


    const YearsSelect = (
      <YearsContainer>
        <Select
        //  mode="tags"
         size='large'
         placeholder="الرجاء اختيار السنوات"
         defaultValue={2017}
         onChange={value=>this.handleChangeYear(value)}
         style={{ width: '100%' }}
       >
         {children}
       </Select>

      </YearsContainer>
    )


    const OutletsSelect = (
      <TreeSelect
       showSearch
       size='large'
       style={{ width: 200 }}
       value={this.state.outlet}
       dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
       placeholder="الرجاء اختيار الميناء"
       allowClear
       treeDefaultExpandAll
       onChange={(outlet)=>this.handleOutletChange(outlet)}
     >
       <TreeNode value="parent 1" title="parent 1" key="0-1">
         <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
           <TreeNode value="leaf1" title="my leaf" key="random" />
           <TreeNode value="leaf2" title="your leaf" key="random1" />
         </TreeNode>
         <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
           <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
         </TreeNode>
       </TreeNode>
     </TreeSelect>
    )

    return (
      <Container>
        <Row type="flex" justify="end">
          {/* <Col >{OutletsTypeSelect}</Col> */}
          <Col xl={14} lg={14} md={14} sm={24} xs={24} >
            {/* {showTitle && filterTitle && <Title className="">{filterTitle}</Title>} */}
             {bigTitle&&<ControlTitle>{bigTitle}</ControlTitle>}
             {title&&<Title>{title}</Title>}

          </Col>
          <Col  xl={10} lg={10} md={10} sm={24} xs={24} >
            <Row type="flex" justify="end">
              <Col style={{paddingLeft:20}}>{YearsSelect}</Col>
              <Col>{DirectionTypesSelect}</Col>

            </Row>

            </Col>
          {/* <Col style={{paddingRight:20}}>{OutletsSelect}</Col> */}
       </Row>

      </Container>
    );
  }
}


export default observer(FilterBar);
