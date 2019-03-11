import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';

import environment from './Environment';
import DataSetList from './DataSetList';

const CategoryQuery = graphql`
query CategoryQuery($first: Int!, $after: String, $categoryId: ID!) {
  category(id: $categoryId) {
      name
      heb_name
  }
  ...DataSetList_list @arguments (first: $first,
                                  after: $after,
                                  categoryId: $categoryId)
                      @module(name: "DataSetList_list.react")
}
`;

const Category = (props) => {

  const _categoryId = props.match.params.categoryId;
  const queryVariables = {
    first: 10,
    categoryId: parseInt(_categoryId, 10)
  }

  return (
      <QueryRenderer environment={environment}
                      query={CategoryQuery}
                      variables={queryVariables}
                      render={ ({error, props}) => {
                        if (error) {
                            return <div>{error}</div>;
                        }
                        if (!props) {
                            return (<div>Loading...</div>);
                        }

                        return (<div>{props.category.name}
                                 <DataSetList list={props} />
                               </div>)

                      }
                    }/>
  )

};

export default Category;
