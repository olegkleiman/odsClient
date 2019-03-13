/**
 * @flow
 */
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';

import environment from '../Environment';

import type { DashboardQueryResponse } from '__generated__/DashboardQueryResponse.graphql.js'
import DataSets from './DataSets';

const DashboardQuery = graphql`
  query DashboardQuery ($first: Int!, $after: String) {
    ...DataSets_root @arguments (first: $first, after: $after)
  }
`;

const Dashboard = (props) => {

  if( !localStorage.getItem('odsUserToken') ) {
    props.history.push('/admin');
    return null;
  }

  return (<QueryRenderer
              environment={environment}
              query={DashboardQuery}
              variables={{
                first: 2
              }}
              render={ ({error, props}) => {
                  if (error) {
                      return <div>{error}</div>;
                  }
                  if (!props) {
                      return (<div>Loading...</div>);
                  }

                  return <DataSets root={props} />
              }}>
          </QueryRenderer>)
};

export default Dashboard;
