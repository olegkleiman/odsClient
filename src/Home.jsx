// @flow
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { HomeQueryResponse } from '__generated__/HomeQuery.graphql.js'

import { DataConsumer } from './DataContext';
import environment from './Environment';
import DataSet from './DataSet';

const HomeQuery = graphql`
  query HomeQuery {
    categories {
      name
      heb_name
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

    const { t } = useTranslation();

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
                            <DataConsumer>
                              { ({direction})  => {

                                return (<>
                                  <h2>{t('Categories')}</h2>
                                  {
                                      props.categories.map( (item, index) => {

                                        const categoryName = ( direction === 'ltr' ) ? item.name : item.heb_name;

                                        return (<div key={index}>
                                                  <Link to={`/category/${item.id}`}>{categoryName}</Link>
                                                </div>)
                                      })
                                  }
                                </>)
                              }}

                            </DataConsumer>
                            <h2>{t('DataSets')}</h2>
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
