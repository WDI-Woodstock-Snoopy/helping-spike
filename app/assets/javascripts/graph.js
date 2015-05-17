var json = {
    "nodes":
        [
            {"name":"Client 1",       "group":1},
            {"name":"Loadbalancer 1", "group":2},
            {"name":"Webserver 1",    "group":3},
            {"name":"Webserver 2",    "group":3}
        ],
    "links":
        [
            {"source":0, "target":1, "value":1},
            {"source":1, "target":2, "value":1},
            {"source":1, "target":3, "value":1}
        ]
};

var width = 1200;
var height = 800;

var color = d3.scale.category10();

var force = d3.layout.force()
    .charge(-180)
    .linkDistance(70)
    .size([width, height]);

var svg = d3.select("#graph");

function getGraph(json) {
    force
        .nodes(json.nodes)
        .links(json.links)
        .start();

    var links = svg.append("g").selectAll("line.link")
        .data(force.links())
        .enter().append("line")
        .attr("class", "link")
        .attr("marker-end", "url(#arrow)");

    var nodes = svg.selectAll("circle.node")
        .data(force.nodes())
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 8)
        .style("fill", function(d) { return color(d.group); })
        .call(force.drag);

    nodes.append("title")
        .text(function(d) { return d.name; });

    force.on("tick", function() {
        links.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        nodes.attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    });
};

getGraph(json);
