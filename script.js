async function drawMap() {
var svg = d3.select("body").append("svg")
  .attr("width", 960*2)
  .attr("height", 1160*2)
 d3.json("places.geojson", function(error, data) {
   let features = [];
   const millisecondsToWait = 500;
   for(let i = 0; i < data.features.length; i++){
      features.push(data.features[i])
      var group = svg.selectAll("g")
        .data(features)
        .enter()
        .append("g");

      var projection = d3.geo.mercator();
      var path = d3.geo.path().projection(projection);

      var areas = group.append("path")
        .attr("d", path)
        .attr("class", "area")
        .attr("fill", "steelblue");
     await sleep(millisecondsToWait);
   };
});
async function sleep(msec) {
    return new Promise(resolve => setTimeout(resolve, msec));
}
}
drawMap();
