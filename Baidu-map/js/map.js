let index = 0;
// 创建百度地图的实例
const map = new BMap.Map('container');
/* 
1.标准地图：BMAP_NORMAL_MAP
2.地球模式：BMAP_EARTH_MAP
3.普通卫星地图：BMAP_SATELLITE_MAP
 */
map.setMapType(BMAP_SATELLITE_MAP);
// 创建坐标点
const point = new BMap.Point(112.897167, 28.2079); // 经度112.897167， 纬度28.2079
// 添加控件,添加定时器防止页面加载工具时页面错乱
setTimeout(() => {
  // 比例尺
  map.addControl(new BMap.ScaleControl());
  // 缩放工具
  map.addControl(new BMap.NavigationControl());
  // 定位工具
  map.addControl(new BMap.GeolocationControl());
}, 1000);

// 初始化地图，设置中心点和地图级别，地图级别1-19
map.centerAndZoom(point, 19);

// 标识物中心点位置
const opts = {
  // 文本标注所在地理位置【中心点坐标】
  position: new BMap.Point(112.897167, 28.2079),
  // 文本的偏移量
  offset: new BMap.Size(-50, -200),
};
// 覆盖物，创建文本的标记对象(文字信息，标识物的中心点)
const label = new BMap.Label("<div class='map-round'>万树IT</div>", opts);
// 设置覆盖物样式
label.setStyle({
  border: 'none',
  background: 'none',
});
// 把覆盖物添加到地图上
map.addOverlay(label);
label.setZIndex(index);
// 给覆盖物添加点击事件(这个监听事件是百度给予的API，与DOM的API不一样，事件对象也不一样)
label.addEventListener('click', function (e) {
  /* // 清除覆盖物
    map.clearOverlays(); */
  this.setZIndex(++index);
  // 根据坐标移动地图
  map.panBy(0, 0);
});

// 二级覆盖物
{
  const opts = {
    position: new BMap.Point(112.897167, 28.2079),
    offset: new BMap.Size(-50, -100),
  };

  const label = new BMap.Label("<div class='map-ret'>厚浦万树</div>", opts);
  label.setStyle({
    border: 'none',
    background: 'none',
  });
  map.addOverlay(label);
  label.setZIndex(index);
  label.addEventListener('click', function (e) {
    this.setZIndex(++index);
    map.panBy(0, 0);
  });
}
