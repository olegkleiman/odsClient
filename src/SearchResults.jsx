// @flow
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import _ from 'lodash';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";
import type { SearchResults_QueryResponse } from '__generated__/earchResults_Query.graphql.js'

import environment from './Environment';
import { DataConsumer} from './DataContext';

const SearchResultsQuery = graphql`
query SearchResultsQuery(
  $query: String!
) {
  search(contains: $query) {

    ... on DataSet {
      name
      description
      type
      __typename
    }
    ... on Category {
      name
      description
      __typename
    }
  }
}
`;

const SearchResults = (props) => {

  const { t } = useTranslation();

  return <DataConsumer>
          {
            ({searchQuery}) => {
              const variables = {
                "query": searchQuery
              }
              return <Paper elevation={1}>
                <Typography variant="h5" component="h3">
                    {t('SearchResults')} "{searchQuery}"
                </Typography>
                <QueryRenderer
                            environment={environment}
                            query={SearchResultsQuery}
                            variables={variables}
                            render={ ({error, props}) => {
                                if (error) {
                                    return <div>{error}</div>;
                                }
                                if (!props) {
                                    return (<div>Loading...</div>);
                                }
                            }}
                />
            </Paper>
            }
          }
        </DataConsumer>

};

export default SearchResults;
