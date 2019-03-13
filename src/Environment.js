// @flow
import {
  Environment,
  Network,
  RecordSource,
  Store,
  QueryResponseCache
} from 'relay-runtime';

const cache = new QueryResponseCache({size: 100, ttl: 100000});

const SERVER = 'http://localhost:4000';

async function fetchQuery(operation, variables = {}, cacheConfig) {

  const queryId = operation.name;
  const cachedData = cache.get(queryId, variables);
  const isMutation = operation.operationKind === 'mutation';
  const isQuery = operation.operationKind === 'query';

  const forceFetch = cacheConfig && cacheConfig.force;

  if( isQuery && cachedData != null && !forceFetch ) {
    return cachedData;
  }

  const authHeader = `Basic ${localStorage.getItem('odsUserToken')}`;
  
  return fetch(SERVER, {
    method: 'POST',
    headers: {
       'Accept':'application/json',
       'Content-Type': 'application/json',
       "Authorization": authHeader
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    })
  }).then( response => {
    return response.json()
  }).then( json => {

    if( isQuery && json ) {
      cache.set(queryId, variables, json);
    }

    if( isMutation ) {
      cache.clear();
    }

    return json;

  }).catch( error => {
    return error;
  })

};

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
