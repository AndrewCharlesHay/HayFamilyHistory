
var svg = d3.select("body").append("svg")
  .attr("width", 960*2)
  .attr("height", 1160*2)
 d3.json("places.geojson", function(error, data) {
   let features = [];
   var millisecondsToWait = 500;
   for(feature in data.features){
    setTimeout(function() {
      features.push(feature)
      var group = svg.selectAll("g")
        .data(data.features)
        .enter()
        .append("g")

      var projection = d3.geo.mercator(); //.scale(7300).translate([0,1980]);
      var path = d3.geo.path().projection(projection);

      var areas = group.append("path")
        .attr("d", path)
        .attr("class", "area")
        .attr("fill", "steelblue")
    }, millisecondsToWait);
   }
});
