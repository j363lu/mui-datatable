// This component uses recharts. Documentation can be found here: https://recharts.org/en-US/examples/SimpleScatterChart
// This component uses mui Tabs. Documentation can be found here: https://mui.com/material-ui/react-tabs/

import React, { useState, useEffect } from 'react';
import '../index.css';
import CDF from "./CDF";
import ScatterPlot from './ScatterPlot';
import $ from 'jquery';
import { Box, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';

function Plot(props) {
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

  useEffect(() => {
    axis()
  }, [props]);

  return (
    <>
      <button type="button" id="scatterplotButton" className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#scatterplotModal">
        Plots
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
                    <ScatterPlot variables={variables} data={props.data} />
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

export default Plot;