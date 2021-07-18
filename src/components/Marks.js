import React from 'react'
import { curveNatural, line } from 'd3'

const Marks = ({ data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius }) => (
  <g className="marks">
    <path //
      d={line() //
        .x((d) => xScale(xValue(d)))
        .y((d) => yScale(yValue(d)))
        .curve(curveNatural)(data)}
    />
    {/* {data.map((d) => (
      <circle //
        cx={xScale(xValue(d))}
        cy={yScale(yValue(d))}
        r={circleRadius}
        // className="mark"
      >
        <title>{tooltipFormat(xValue(d))}</title>
      </circle>
    ))} */}
  </g>
)

export default Marks
