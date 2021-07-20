import React from 'react'
// import { curveNatural, line } from 'd3'

const Marks = ({ binnedData, xScale, yScale, tooltipFormat, innerHeight }) => (
  <g className="marks">
    {/* <path //
      d={line() //
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveNatural)(binnedData)}
    /> */}
    {binnedData.map((
      d // each el of binnedData array
    ) => (
      <rect //
        x={xScale(d.x0)} // left x of each rect
        y={yScale(d.y)} //
        width={xScale(d.x1) - xScale(d.x0)} //
        height={innerHeight - yScale(d.y)} //
        className="mark"
      >
        <title>{tooltipFormat(d.y)}</title>
      </rect>
    ))}
  </g>
)

export default Marks
