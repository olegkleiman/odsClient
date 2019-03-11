/**
 * @flow
 */
import React from 'react';
import { createFragmentContainer } from 'react-relay';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const DataSet = ({item, classes}) => {

  const editDataSet = () => {
    console.log('edit');
  }

  return (<Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                DataSet Name
              </Typography>
              <Typography variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography component="p">
                {item.description}
              </Typography>
              <Typography component="p">
                {item.data_url}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={editDataSet} size="small" color="primary">Edit</Button>
            </CardActions>
          </Card>)
}

export default createFragmentContainer(
  withStyles(styles)(DataSet),
  graphql`
    fragment DataSetItem_item on DataSet {
        name
        id
        url
        data_url
        description
        visualizations {
          name
          heb_name
          url
        }
    }
  `);
