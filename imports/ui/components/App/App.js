import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Students from '../Students/Students';
import SelectedStudent from '../Students/SelectedStudent/SelectedStudent';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Fragment>
                        <Route exact path="/" component={Students}/>
                        <Route exact path="/student" component={SelectedStudent}/>
                    </Fragment>
                </Router>
            </div>
        );
    }
}

export default App;
