const generateTree = (areaList) => {
  
  const { provinces, cities, counties } = areaList;
  const options = [];
  const eachObj = (obj, cb) => Object.keys(obj).forEach(cb);
  const match = (v1, v2, base) => parseInt(v1 / base, 10) === parseInt(v2 / base, 10);

  eachObj(provinces, (prov) => {
    const cityList = [];

    eachObj(cities, (city) => {
      const countyList = [];

      if (match(city, prov, 10000)) {
        eachObj(counties, (county) => {
          if (match(county, city, 100)) {
            countyList.push({
              label: counties[county],
              value: county,
            });
          }
        });
        cityList.push({
          label: cities[city],
          value: city,
          children: countyList,
        });
      }
    });

    const item = {
      label: provinces[prov],
      value: prov,
      children: cityList,
    };

    options.push(item);
  });

  console.log(options)
  return options;
};


// import userApi from "../../api/user"
import publicApi from "../../api/public"

Component({
  properties: {
    areaLabel: String,
    displayLabel: String,
    defaultValue: String
  },
  data: {
    areaList: {},
    options: {},
    editArea: false,
    valueText: "",
    value: [],    
  },
  created: function(){
    // console.log("========= area selector created")
    publicApi.areaData().then(data => {
      const options = generateTree(data)
      // console.log("made area options ")
      // console.log(options)
      this.setData({options, areaList: data})
    })
    // const {user} = getApp().store.getState()
    this.setData({value: this.properties.defaultValue.split('|')})
  },
  methods:{  
    onLoad: function(){
      console.log("area selector onload =====")
    },
    toggleCitySelector(){
      this.setData({editArea: !this.data.editArea})
    },
    onChange(e) {
      // const area_code = e.detail.value
      console.log(e.detail.value)
      
      let [province_code, city_code, county_code] = e.detail.value
      // if city changes, clear county
      const [province_bk, city_bk, county_bk] = this.data.value
      // console.log("fetch backup select "+[province_bk, city_bk, county_bk])
      if (city_bk != city_code) {
        // console.log("city changed, clear county code")
        county_code = null
      }
      // if province changes, clear city 
      if (province_bk != province_code) {
        // console.log("province_code changed, clear city & county code")
        city_code = null
        county_code = null
      }
      
      const {provinces, cities, counties} = this.data.areaList
      const area_code = [province_code, city_code, county_code]
      let province_name = provinces[province_code]
      let city_name = city_code && provinces[province_code] != cities[city_code] ? cities[city_code] : ''
      let county_name = county_code ? counties[county_code] : ""

      let area_name = [province_name, city_name, county_name]
      // console.log(area_code)
      // console.log(area_name)
      this.setData({
        value: area_code,
        valueText: area_name,
        area_name
      });
      this.triggerEvent('areaChange', { value: area_code.join('|')});
    },  
      
  }
})
