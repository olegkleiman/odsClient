// @flow
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { useTranslation } from "react-i18next";
import moment from 'moment';

import { DataConsumer } from './DataContext';
import VizTabs from './VizTabs';

const ReportDataSet = ({dataset}) => {

  const { t } = useTranslation();

  return (<>
          <div className='card card-nav-tabs'>
              <div className='header' style={{
                  backgroundColor: 'rgb(24, 109, 176)'
                }}>
                <Tabs>
                    {
                      // See the issue https://github.com/reactjs/react-tabs/issues/253
                      // about dynamic Tabs rendering
                      VizTabs(dataset.visualizations)
                    }

                    <TabPanel>
                      <h2>
                        <DataConsumer>
                          {
                            ({direction}) => {
                              const _description = ( direction === 'ltr' ) ?
                                dataset.description : dataset.heb_description;
                              const _whenPublished = moment(dataset.whenPublished) ;
                              return (<div>
                                        <div>{_description}</div>
                                        <div>{_whenPublished.format('YYYY-MM-DD')}</div>
                                      </div>);
                            }
                        }
                        </DataConsumer>
                      </h2>
                    </TabPanel>
                    <TabPanel>
                      <h2>
                        <iframe width="1200" height="900"
                                frameBorder="0" style={{border:0}}
                                src={`${dataset.data_url}`}>
                        </iframe>
                      </h2>
                    </TabPanel>
                    {
                       dataset.visualizations.map( (item, index) => {
                        return (<TabPanel key={index}>
                                  <iframe width="1200" height="900"
                                          frameBorder="0" style={{border:0}}
                                          src={`${item.url}`}>
                                  </iframe>
                                </TabPanel>)
                       })
                    }
                  </Tabs>
              </div>
          </div>
        </>)
};

export default ReportDataSet;
