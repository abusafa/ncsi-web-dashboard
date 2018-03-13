_.each(years, (y)=>{
	db = db.concat(flat(y))

})





function flat(year) {
  return exports.features.map((o) => {
    let outlet_type = _.find(outlets.features, (f) => {
      return f.properties.Code == o.properties.Code;
    }).properties.PointofEnt;

    let it = {
      outlet_id: o.properties.Code,
      outlet_en: o.properties.ENG_DESC,
      outlet_type: outlet_type,
      outlet: o.properties.ARB_DESC,
      year: year,
      value: o.properties['F' + year],
      key_indicator_id: o.properties.HS_CHAP,
      key_indicator: o.properties.ENG_DESC_1,
      key_indicator_ar: o.properties.ARB_DESC_1,
      in_out: 'out'

    };
    return it;

  });
}







filter1 = _.filter(db, (o)=> o.outlet_id === 6 && o.in_out==='in'&& o.year ===2010 )

_.sumBy(filter1, (o)=> o.value)
