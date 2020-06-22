import React from "react";
import "../styles/App.css";
import { Switch, Route } from "react-router-dom";
import List from "./List";
import Edit from "./Edit";
import Create from "./Create";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route component={List} exact path="/" />
                <Route component={Create} path="/create" />
                <Route component={Edit} path="/edit/:issueId" />
            </Switch>
        </div>
    )
}

export default App;
