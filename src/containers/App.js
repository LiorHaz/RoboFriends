import React,{Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css'
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import {setSearchField, requestRobots} from '../actions';
import {connect} from  'react-redux';
import Header from '../components/Header';


const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending : state.requestRobots.isPending,
        error: state.requestRobots.error
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => requestRobots(dispatch)
    }
}

class App extends Component  {
   

    componentDidMount(){
        this.props.onRequestRobots();
    }

   render(){
    const {searchField, onSearchChange,robots,isPending} = this.props;
    const filteredRobots = robots.filter(robot=>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return isPending?
    <h1 className='tc'>Loading...</h1>
    :(
        <div className='tc'>
            <Header/>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                    <CardList robots = {filteredRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
        
    );
   }
}

/*connect() - connects the App Component and subscribe to any 
state changes in the redux store, now the App knows that there's
a redux store somewhere and any time there's a change to it,
it may be intrested in that change*/

/* 'mapStateToProps' -  what state shd I listen to
  'mapDispatchToProps' - what dispatch/action shd I listen to */
export default 
connect(mapStateToProps,mapDispatchToProps)(App);