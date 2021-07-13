import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../actions'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  withRouter
} from "react-router-dom";
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { RecipeWrapper } from './styles'
class Recipe extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    const { recipe } = this.props

    if(this.props.isLoading) return null
    if(recipe === null || recipe === undefined) return null

    const { name, instructions, ingredients } = recipe
    return (
      <Switch>
        <Route path={`/recipe/:recipeId`}>
          <RecipeWrapper>
            <Card>
              <Typography variant="h5" component="h2" gutterBottom>
                {name}
              </Typography>
              <List>
                {ingredients.map((ingredient) => {
                  return (
                  <ListItem key={ingredient} dense>
                    <ListItemText id={ingredient} primary={ingredient} />
                  </ListItem>
                )})}
              </List>
              <Typography gutterBottom>
                {instructions}
              </Typography>
            </Card>
          </ RecipeWrapper>
        </Route>
        <Route path={`/recipe`}>
          <div> Please choose recipe </div>
        </Route>
      </Switch>
    )
  }

  componentDidMount(){
    const { recipeId } = this.props.match.params
    this.props.selectRecipe(recipeId)
  }
}
const mapStateToProps = (state) => {
  const { recipe } = state
  return { ...recipe }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  selectRecipe: actions.selectRecipe,
}, dispatch)

const RecipeWithRouter = withRouter(Recipe)

export default connect(mapStateToProps, mapDispatchToProps)(RecipeWithRouter)
