import { observable, action } from "mobx"
import { each } from 'lodash';

export const Filter = observable({
  show: action.bound(function(id) {
  }),
  years:[2010, 2012, 2013, 2014, 2015],
  outlets:[4, 6, 11, 13, 16, 21],
  outletTypes:['بري', 'بحري', 'جوي'],
})
