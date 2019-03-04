// @flow
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import { useTranslation } from "react-i18next";
import moment from 'moment';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { DataConsumer } from './DataContext';

const ReportDataSet = ({dataset}) => {

  const { t } = useTranslation();

  const [vizUrl, setVizUrl] = useState('');
  const [data, setData] = useState({ values: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [vizMenuOpen, setVizMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [url, setUrl] = useState(dataset.data_url);

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

  const visChanged = (viz) => {
    setVizUrl(viz.url);
  }

  const handleVizMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleVizMenuClose = () => {
    setAnchorEl(null);
  }

  return (<>
          <div className='card card-nav-tabs'>
              <div className='header' style={{
                  backgroundColor: 'rgb(24, 109, 176)'
                }}>
                <Tabs>
                    <TabList>
                      <Tab>{t('Info')}</Tab>
                      <Tab>{t('Data')}</Tab>
                      <Tab>{t('Visualizations')}

        <IconButton
          aria-label="More"
          aria-owns={vizMenuOpen ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={handleVizMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu open={vizMenuOpen}
          onClick={handleVizMenuClick}
          anchorEl={anchorEl}
          onClose={handleVizMenuClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: 200,
            },
          }}>
          <MenuItem>One
          </MenuItem>
        </Menu>
                      </Tab>
                    </TabList>

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
                                src={`${dataset.data_url}`}>
                              </iframe>
                        }
                      </h2>
                    </TabPanel>
                    <TabPanel>
                      <h2>
                        <iframe width="1200" height="900"
                                src={`${vizUrl}`}
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
