
var svg = d3.select("body").append("svg")
  .attr("width", 960)
  .attr("height", 1160)

 d3.json("usa.geojson", function(error, data) {
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

});
