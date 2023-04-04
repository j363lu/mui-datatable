// This component uses recharts. Documentation can be found here: https://recharts.org/en-US/examples/SimpleScatterChart
// This component uses mui Tabs. Documentation can be found here: https://mui.com/material-ui/react-tabs/

import React, { useState, useEffect } from 'react';
import '../index.css';
import CDF from "./CDF";
import $ from 'jquery';
import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// The tooltip style when you hover your mouse on points
const tooltipWrapperStyle = { 
  "background-color": "rgba(255, 255, 255, 0.8)",
  border: "2px groove",
  "border-radius": "6px",
  padding: "0px 5px",
}

function ScatterPlot(props) {
  const [x, setX] = useState("avgTOI");
  const [y, setY] = useState("avgBTT");
  const [variables, setVariables] = useState([]);
  const [tabIndex, setTabIndex] = useState("0");

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex.toString());
  };


  // get a list of options for the select x,y axis tags
  const axis = () => {
    let v = [];
    for (const column of props.columns) {
      if (isNaN(props.data[0][column])) {
        continue;
      }
      const opt = <option value={column}>{column}</option>;
      v.push(opt);
    }
    setVariables(v);
  }

  const x_axis_change = (event) => {
    setX(event.target.value);
  }

  const y_axis_change = (event) => {
    setY(event.target.value);
  }

  // customize the tooltip for the scatter plot
  // payload is an array of two objects [x, y]
  // both have properties dataKey, name, payload, type, unit, value
  const customizedToolTip = (point) => {
    if (!point || point.payload.length === 0) {
      return;
    }

    const data_point = point.payload[0]["payload"];
    const x_val = point.payload[0];
    const y_val = point.payload[1];
    let name = data_point["Name"];

    // no name column in data
    if (!name) {
      name = "N/A"
    }


    return (
      <div className="custom-tooltip">
        <p className="label">{`Name : ${name}`}</p>
        <p className="label">{`${x_val["dataKey"]} : ${x_val["value"]}`}</p>
        <p className="label">{`${y_val["dataKey"]} : ${y_val["value"]}`}</p>
      </div>
    );
  }

  useEffect(() => {
    axis()
  }, [props]);

  return (
    <>
      <button type="button" id="scatterplotButton" className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#scatterplotModal">
        Scatter Plot
      </button>

      <div className="modal fade" id="scatterplotModal" tabindex="-1" aria-labelledby="modal-title" aria-hidden="true">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content">

            <div className="modal-body">
              <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>

              <TabContext value={tabIndex} sx={{ width: "100%", height: "100%" }}>
                <Box sx={{ width: "100%", height: "100%" }}>
                  <Tabs value={Number(tabIndex)} onChange={handleTabChange}>
                    <Tab label="Scatter plot" />
                    <Tab label="CDF" />
                  </Tabs>
                  <TabPanel value="0" index="0" sx={{ width: "100%", height: "100%" }}>

                    <div className="container">
                      <div className="row">
                        <form className="col-2 offset-2">
                          <label for="x-axis">x-axis: </label>
                          <select id="x-axis" onChange={x_axis_change} value={x}>
                            {variables}
                          </select>
                        </form>

                        <form className="col-2 offset-4">
                          <label for="y-axis">y-axis: </label>
                          <select id="y-axis" onChange={y_axis_change} value={y}>
                            {variables}
                          </select>
                        </form>
                      </div>
                    </div>

                    <ResponsiveContainer width="90%" height="90%" >
                      <ScatterChart>
                        <CartesianGrid />
                        <XAxis type="number" dataKey={x} name={x} domain={['dataMin', 'dataMax']} />
                        <YAxis type="number" dataKey={y} name={y} domain={['dataMin', 'dataMax']} />
                        <ZAxis type="number" range={[25, 25]} />
                        <Tooltip content={customizedToolTip} wrapperStyle={tooltipWrapperStyle} />
                        <Scatter data={props.data} fill="#8884d8" />
                      </ScatterChart>
                    </ResponsiveContainer>

                  </TabPanel>
                  <TabPanel value="1" index="1" sx={{ width: "100%", height: "100%" }}>
                    <CDF variables={variables} data={props.data} />
                  </TabPanel>
                </Box>
              </TabContext>
            </div>

          </div>
        </div>
      </div>    
    </>
  )
}

export default ScatterPlot;