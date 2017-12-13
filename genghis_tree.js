d3.select(window).on('load', init);

function init() {
    var treeData = [
        {
            "name": "Yesugei",
            "_parents": [
                {
                    "name": "Temügin",
                    "_parents": [
                        {
                            "name": "Jochi",
                            "_parents": [
                                {
                                    "name": "Batu",

                                },
                                {
                                    "name": "Berke",

                                }
                            ]
                        },
                        {
                            "name": "Chagatai",

                            "_parents": [
                                {
                                    "name": "Baidar",
                                }
                            ]
                        }
                        {
                            "name": "Ogedei",
                            "_parents":
                                {
                                    "name": "Güyuk"
                                },
                        {
                            "name": "Kashin"
                        }

                }
                {
                    "name": "Tolui",
                    "_parents": [
                        {
                            "name": "Möngke"
                        }
                        {
                            "name": "Kublai"
                        }
                        {
                            "name": "Hulagu"
                        }
                        {
                            "name": "Ariq Böke"
                        }
                    ]
                }

            ]
        }
        {
            "name": "Khasar",
        },

        {
            "name": "Khachiun",
        }

        {
            "name": "Temüge"
        }

    ]
}
    ];
    //Dimensions of the boxes
    var boxWidth = 200,
        boxHeight = 50;

    var svg = d3.select("body")
        .attr("bgcolor", "#2c2c2c")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 500)
        .append("g")
        .attr("transform", "translate(150,200)");


    var tree = d3.layout.tree()
        .separation(function () {
            return .5;
        }) //same distance for all cases
        .children(function (person) {
            return person._parents;
        }); //ancestors are child-nodes

        .nodeSize([100, 200]); //in order to have a standard node-size and not adjustable to the content/available space

    root = treeData[0];

    update(root);


    //Writes in boxes and connects lines.

    function map(d) {

        var nodes = tree.nodes(root),
            links = tree.links(nodes);


        //Declares nodes and enters them

        var node = svg.selectAll("g.person")
            .data(nodes)
            .enter().append("g")
            .attr("class", "person")
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Draws the boxes
        node.append("rect")
            .attr({
                x: -(boxWidth / 2),
                y: -(boxHeight / 2),
                width: boxWidth,
                height: boxHeight
            });

        // Writes the person's name in the box
        node.append("text")
            .attr("dx", -(boxWidth / 2) + 10)
            .attr("dy", 0)
            .attr("text-anchor", "start")
            .attr('class', 'name')
            .text(function (d) {
                return d.name;
            });

        // Declares and enters the links

        svg.selectAll("path.link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", map(d){
            return "M" + d.source.y + "," + d.source.x
                + "H" + (d.source.y + (d.target.y - d.source.y) / 2)
                + "V" + d.target.x
                + "H" + d.target.y;

    });


    }
}
