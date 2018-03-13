import {observable} from "mobx"
import { each } from 'lodash';

export const PanelManager = observable({

  active:['dashboard'],
  animation:1,
  panels:[
  {
    name:'map',
    show:false,
    id: 2,
  },
  {
    name:'dashboard',
    show:true,
    id: 3,
  },

]})
