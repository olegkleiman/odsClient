// @flow
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import { Link } from "react-router-dom";

import type { HomeQueryResponse } from '__generated__/HomeQuery.graphql.js'

import environment from './Environment';
import DataSet from './DataSet';

const HomeQuery = graphql`
  query HomeQuery {
    categories {
      name
      id
    }
    datasets {
      name
      id
      ...DataSet_item @module(name: "DataSet_item.react")
    }
  }
`;

const Home = (props) => {
    return <QueryRenderer
                environment={environment}
                query={HomeQuery}
                variables={{}}
                render={ ({error, props}) => {
                  if (error) {
                      return <div>{error}</div>;
                  }
                  if (!props) {
                      return (<div>Loading...</div>);
                  }

                  return (<>
                            <div>Categories</div>
                            {
                                props.categories.map( (item, index) => {
                                  return (<div key={index}>
                                            <Link to={`/category/${item.id}`}>{item.name}</Link>
                                          </div>)
                                })
                            }
                            <div>DataSets</div>
                            {
                              props.datasets.map( (item, index) => {
                                return (<div key={index}>
                                          <DataSet item={item} />
                                       </div>)
                              })
                            }
                         </>)
                }}
            />
};

export default Home;
