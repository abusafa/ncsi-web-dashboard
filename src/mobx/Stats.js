import {observable, action} from "mobx"
import lodash, {filter, orderBy, find, each, sumBy, uniq, sum, sortBy} from 'lodash';
import outletsDB from '../data/new/outletsdb.json'
import outletsProductsDB from '../data/new/outlets-products.json';
import countriesDB from '../data/new/countriesdb.json';

window.lodash = lodash;

export var Data = [];
export var OutletsData = [];

const TitleDic = {
  none:'لم يتم اختيار منفذ',
  all:'جميع المنافذ',
  all:'جميع المنافذ',
  sea:'البحرية',
  land:'البرية',
  air:'الجوية'
}

export const StatsStore = observable({
  outletTypes:['sea','land', 'air'],
  direction:'out',
  year: 2017,
  outlets:[],
  selectedOutlet:null,
  selectedOutletFeature:null,
  //overview:{in:0, out:0, inout:0},

  // get outlets(){
  //   const _outlets = filter(outletsDB.features, o=> this.outletTypes.includes(o.properties.TYPE)).map(o=> o.properties.POE_CODE);
  //   console.log('_outlets', _outlets);
  //   return _outlets;
  // },

  init: action.bound(function() {
    this.outlets = filter(outletsDB.features, o=> this.outletTypes.includes(o.properties.TYPE)).map(o=> o.properties.POE_CODE);
    //this.overview = this.calculateOverview();
  }),

  calculateStats: action.bound(function() {
    this.outlets = filter(outletsDB.features, o=> this.outletTypes.includes(o.properties.TYPE)).map(o=> o.properties.POE_CODE);

    //this.overview = this.calculateOverview();
  }),

  calculateOutlets: action.bound(function() {

    this.outlets = filter(outletsDB.features, o=> this.outletTypes.includes(o.properties.TYPE)).map(o=> o.properties.POE_CODE);

    //this.overview = this.calculateOverview();
  }),

  get filterTitle(){
    let title = ''
    if( this.outletTypes.length == 3) title = TitleDic.all;
    if( this.outletTypes.length == 2) title = TitleDic[this.outletTypes[0]] + ' و ' + TitleDic[this.outletTypes[1]];
    if( this.outletTypes.length == 1) title = TitleDic[this.outletTypes[0]];

    if( this.outletTypes.length == 0) title = TitleDic.none;
    if( this.selectedOutletFeature ) title = this.selectedOutletFeature.properties.ARB_DESC;



    return title;

  },

  get overview(){
    const _outlets = this.outlets.map(o=> o);
    return {
      in: find(countriesDB, o=> o.YEAR == this.year && o.COUNTRY_CD === "total" && o.DIRECTION == 'in').VALUE,
      out:find(countriesDB, o=> o.YEAR == this.year && o.COUNTRY_CD === "total" && o.DIRECTION == 'out').VALUE,
      inout:find(countriesDB, o=> o.YEAR == this.year && o.COUNTRY_CD === "total" && o.DIRECTION == 'inout').VALUE,
    };
  },

  get ___overview(){
    const _outlets = this.outlets.map(o=> o);
    return {
      in: sum(filter(outletsProductsDB, o=> o.DIRECTION == 'in' && o.YEAR == this.year && _outlets.includes(o.POE_CODE)).map(o=> o.VALUE)),
      out:sum(filter(outletsProductsDB, o=> o.DIRECTION == 'out' && o.YEAR == this.year && _outlets.includes(o.POE_CODE)).map(o=> o.VALUE)),
      inout:sum(filter(outletsProductsDB, o=> o.DIRECTION == 'inout' && o.YEAR == this.year && _outlets.includes(o.POE_CODE)).map(o=> o.VALUE)),
    };
  },

  get outletInfo(){
    console.log('outletInfo', this.selectedOutlet);
    let _in = find(outletsProductsDB, o=> o.DIRECTION == 'in' && this.selectedOutlet == o.POE_CODE && o.YEAR == this.year );
    let _out = find(outletsProductsDB, o=> o.DIRECTION == 'out' && this.selectedOutlet == o.POE_CODE && o.YEAR == this.year );
    let _inout = find(outletsProductsDB, o=> o.DIRECTION == 'inout' && this.selectedOutlet == o.POE_CODE && o.YEAR == this.year );
    return {
      in: _in? _in.VALUE : 0,
      out: _out? _out.VALUE : 0,
      inout: _inout? _inout.VALUE : 0,
    }
  },

  get topIndecators() {


    let filterdData=[];
    if(this.selectedOutlet) {
      filterdData = filter(outletsProductsDB, o=> o.DIRECTION == this.direction && o.YEAR == this.year && this.selectedOutlet == o.POE_CODE )
    } else {
      filterdData= filter(outletsProductsDB, o=> o.DIRECTION == this.direction && o.YEAR == this.year && this.outlets.includes(o.POE_CODE));

    }
    // return index < 5
    const ordered = orderBy(filterdData, ['VALUE'],['desc'])
    const filterd = filter(ordered, (f, index)=> f.PROD_ENG_DESC!='Other')
    const result = filter(filterd, (f, index)=> index<5).map(o =>{

      return {
        name: o.PROD_ARB_DESC,
        value: o.VALUE,
        in_out: o.DIRECTION
      }
    })
    console.log('result', result);
    return result;
  },

});


StatsStore.init();
