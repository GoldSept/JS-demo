// 优先调用浏览器H5定位接口，如果失败会调用IP定位
const geolocation = new BMap.Geolocation();
geolocation.getCurrentPosition(function (res) {
  console.log(res);
});

// 创建一个用于IP定位的城市
// const myCity = new BMap.LocalCity();
// 通过IP地址确定所在城市
myCity.get(function (result) {
  // console.log(result);
  console.log(result.name);
});
