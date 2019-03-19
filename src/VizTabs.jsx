import React from 'react';
import { useTranslation } from "react-i18next";
import { DataConsumer } from './DataContext';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const VizTabs = (visualizations) => {

  const { t } = useTranslation();

  return (<TabList>
            <Tab>{t('Info')}</Tab>
            <Tab>{t('Data')}</Tab>
            {
               visualizations.map( (item, index) => {
                    return (<Tab key={index}>{item.name}
                            </Tab>)
               })
            }
          </TabList>);

}


export default VizTabs;
