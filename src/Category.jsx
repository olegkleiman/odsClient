import React from 'react';
import {graphql, QueryRenderer} from 'react-relay';

import environment from './Environment';
import DataSetList from './DataSetList';

const CategoryQuery = graphql`
query CategoryQuery($categoryId: ID!) {
  category(id: $categoryId) {
    name
    heb_name
    id

  }
}
`;

const Category = (props) => {

  const _categoryId = props.match.params.categoryId;
  const queryVariables = {
    categoryId: _categoryId
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
                                 <DataSetList list={props.category.datasets} />
                               </div>)

                      }
                    }/>
  )

};

export default Category;
