const DUMMY_DATA = [
  {
    id: "d1",
    value: 10,
    region: "USA",
  },
  {
    id: "d2",
    value: 14,
    region: "USB",
  },
  {
    id: "d3",
    value: 16,
    region: "USC",
  },
  {
    id: "d4",
    value: 17,
    region: "USD",
  },
];

const xScale = d3
  .scaleBand()
  .domain(DUMMY_DATA.map((datapoint) => datapoint.region))
  .rangeRound([0, 250])
  .padding(0.1);
const yScale = d3.scaleLinear().domain([0, 20]).range([200, 0]);
const container = d3.select("svg").classed("container", true);
const bars = container
  .selectAll(".bar")
  .data(DUMMY_DATA)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("width", xScale.bandwidth())
  .attr("height", (data) => 200 - yScale(data.value))
  .attr("x", (data) => xScale(data.region))
  .attr("y", (data) => yScale(data.value));

setTimeout(() => {
  bars.data(DUMMY_DATA.slice(0, 2)).exit();
}, 2000);
