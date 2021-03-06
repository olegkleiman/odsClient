// @flow

import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';

import type { DataSetContentQueryResponse, DataSetType } from './__generated__/DataSetContentQuery.graphql.js'
import environment from './Environment';
import ReportDataSet from './ReportDataSet';
import CompoundtDataSet from './CompoundtDataSet';

const DataSetContentQuery = graphql`
  query DataSetContentQuery($datasetId: ID!) {
    dataset(id: $datasetId) {
      name
      type
      id
    	visualizations {
        name
        heb_name
        url
      }
      data_url
      description
      heb_description
      whenPublished
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
                        return (<ReportDataSet dataset={props.dataset} />)
                      } else if( props.dataset.type == 'COMPOUND' ){
                        return <CompoundtDataSet />
                      }
                      else {
                        return null;
                      }
                   } }/>

  );

};

export default DataSetContent;
