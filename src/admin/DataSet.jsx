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

const DataSet = ({item, classes, maxTextLength, editCallback}) => {

  const _editDataSet = () => {
    editCallback(item);
  }

  return (<Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                DataSet #{item.id}
              </Typography>
              <Typography variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography component="p">
                {item.description.substr(0, maxTextLength).trim()}...
              </Typography>
              <Typography component="p">
                <a href={item.data_url} target="_blank">
                  Data URL
                </a>
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={_editDataSet} size="small" color="primary">Edit</Button>
            </CardActions>
          </Card>)
}

export default createFragmentContainer(
  withStyles(styles)(DataSet),
  graphql`
    fragment DataSetItem_item on DataSet {
        name
        heb_name
        id
        url
        data_url
        description
        heb_description
        visualizations {
          name
          heb_name
          url
        }
    }
  `);
