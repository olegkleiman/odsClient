// @flow

import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';

import type { DataSetContentQueryResponse, DataSetType } from './__generated__/DataSetContentQuery.graphql.js'
import environment from './Environment';
import ReportDataSet from './ReportDataSet';
import GoogleSheetDataSet from './GoogleSheetDataSet';

const DataSetContentQuery = graphql`
  query DataSetContentQuery($datasetId: ID!) {
    dataset(id: $datasetId) {
      name
      type
      id
      url
      data_url
      description
      heb_description      
    }
  }
`;

const DataSetContent = (props: DataSetContentQueryResponse) => {

  const _datasetId = props.match.params.dsId;
  const queryVariables = {
    datasetId: _datasetId
  }

  return (
      <QueryRenderer environment={environment}
                  query={DataSetContentQuery}
                  variables={queryVariables}
                  render={ ({error, props}) => {
                      if (error) {
                          return <div>{error}</div>;
                      }
                      if (!props) {
                          return (<div>Loading...</div>);
                      }

                      if( props.dataset.type == 'REPORT') {
                        return (<ReportDataSet dataUrl={props.dataset.data_url}
                                               reportUrl={props.dataset.url} />)
                      } else {
                      return <GoogleSheetDataSet />
                    }
                   } }/>

  );

};

export default DataSetContent;
