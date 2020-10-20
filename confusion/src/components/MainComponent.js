import React, {Component} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponents';
import DishDetail from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter} from 'react-router-dom';
import AboutComponent from './AboutComponent';
import {connect} from 'react-redux';

const mapStateToProps =  state => {
    return{
      dishes : state.dishes,
      comments : state.comments,
      promotions : state.promotions,
      leaders : state.leaders
    }
}

class Main extends Component {

  constructor(props){
    super (props);

  }

  render() {

    const HomePage = () =>{
      return(
        <Home 
            dish={this.props.dishes.filter((dish) => dish.featured)[0]}
            promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
            leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }
    
    const DishwithId = ({match}) => {
      return(
        <DishDetail dish = {this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
        />
      )
    }

    const About = () => {
      return(
        <AboutComponent leaders = {this.props.leaders} />
      );
    }



    return (
      <div>
        <Header />
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path = "/menu" component={() => <Menu dishes = {this.props.dishes}/>}/>
            <Route path="/menu/:dishId" component={DishwithId} />
            <Route exact path="/contactus" component={Contact} />
            <Route path="/aboutus" component={About}/>
            <Redirect to="/home/"/>
          </Switch>
        <Footer/>
      </div>
    );

  }

}

export default withRouter(connect(mapStateToProps)(Main));
