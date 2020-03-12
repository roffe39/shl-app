import React from "react";
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { NavigationBar } from './components/navigationBar';
import { SHLstanding } from "./components/shlstanding";
import { Players } from "./components/players";
import { Teams } from "./components/teams";
import { Goalkeepers } from "./components/goalkeepers";
import { Game } from "./components/games";
import { Home } from "./components/home";
import {Header} from "./components/header";
import "./App.css";

const App = () => {
  return (
    <>
    <NavigationBar/>
    <Header/>
     <Router>
       <Switch>
         <Route exact path="/" component={Home}/>
         <Route path="/statistic" component={SHLstanding}/>
         <Route path="/table" component={SHLstanding}/>
         <Route path="/players" component={Players}/>
         <Route path="/teams" component={Teams}/>
         <Route path="/goalkeepers" component={Goalkeepers}/>
         <Route path="/games" component={Game}/>
       </Switch>
     </Router>
    </>
  );
};

export default App;
