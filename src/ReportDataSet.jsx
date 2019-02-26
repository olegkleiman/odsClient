// @flow
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

const ReportDataSet = ({dataUrl, reportUrl}) => {

  const [data, setData] = useState({ values: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [url, setUrl] = useState(
    'https://sheets.googleapis.com/v4/spreadsheets/1GXt4v3Sa1hogK2vvD6fgiEJEG7_kOSr4k_j3riDsXts/values:batchGet?ranges=A:Z&key=AIzaSyABrJkY9bVKLn3YB8f4kmiiGBDWhv4goYA',
  );

  const fetchData = async () => {
    // setIsLoading(true);
    setIsError(false);
    try {

      const result = await fetch(url);
      const jsonResult = await result.json();

      setData(jsonResult.valueRanges[0]);

    } catch( err ) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
      fetchData();
  },
  [] // meaning fetch only after mounting
  );

  return (<>
          <div className='card card-nav-tabs'>
              <div className='header' style={{
                  backgroundColor: 'rgb(24, 109, 176)'
                }}>
                <Tabs>
                    <TabList>
                      <Tab>Info</Tab>
                      <Tab>Table</Tab>
                      <Tab>Report</Tab>
                    </TabList>

                    <TabPanel>
                      <h2>Info
                      {
                        data.values.map(item => console.log(item) )
                      }
                      </h2>
                    </TabPanel>
                    <TabPanel>
                      <h2>
                        {
                          isLoading ? (
                            <div>Loading ...</div>
                          ): <iframe width="1200" height="900"
                                frameBorder="0" style={{border:0}}
                                src={`${dataUrl}`}>
                              </iframe>
                        }
                      </h2>
                    </TabPanel>
                    <TabPanel>
                      <h2>
                        <iframe width="1200" height="900"
                                src={`${reportUrl}`}
                                frameBorder="0" style={{border:0}}
                                allowFullScreen>
                        </iframe>
                      </h2>
                    </TabPanel>
                  </Tabs>
              </div>
              {isError && <div>Something went wrong ...</div>}


          </div>
        </>)
};

export default ReportDataSet;
