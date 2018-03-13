import {observable} from "mobx"

export const layers = observable([
  {
    name:'بري',
    show:true,
    groupId: 'بري',
    style:{
      'circle-radius': 7,
      'circle-color': '#9575CD',
      'circle-opacity': .5,
    }
  },

  {
    name:'بحري',
    show:true,
    groupId: 'بحري',
    style:{
      'circle-radius': 7,
      'circle-color': '#4DB6AC',
      'circle-opacity': .5,
    }
  },

  {
    name:'جوي',
    show:true,
    groupId: 'جوي',
    style:{
      'circle-radius': 7,
      'circle-color': '#C6FF00',
      'circle-opacity': .5,
    }
  },

])
