// @flow
import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import type { HomeQueryResponse } from '__generated__/HomeQuery.graphql.js'

import { DataConsumer } from './DataContext';
import environment from './Environment';
import DataSet from './DataSet';
import DataSetList from './DataSetList';

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
      ...DataSetList_list @module(name: "DataSetList_list.react")
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
                                  <ul>
                                  {
                                      props.categories.map( (item, index) => {

                                        const categoryName = ( direction === 'ltr' ) ? item.name : item.heb_name;

                                        return (<li key={index}>
                                                  <Link to={`/category/${item.id}`}>{categoryName}</Link>
                                                </li>)
                                      })
                                  }
                                  </ul>
                                </>)
                              }}

                            </DataConsumer>
                            <h2>{t('DataSets')}</h2>
                            <DataSetList list={props.datasets} />
                         </>)
                }}
            />
};

export default Home;
