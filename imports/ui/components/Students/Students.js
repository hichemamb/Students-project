import React, {Component} from 'react';
import {listStudents} from '../../../api/list-students';
import { withTracker } from 'meteor/react-meteor-data';

class Students extends Component {

    state = {
        firstNameInput: '',
        lastNameInput: '',
        gitHubInput: '',
    };

    handleChangeFirstname = (event) => {
        event.preventDefault();
        this.setState({
            firstNameInput: event.target.value
        });
    };

    handleChangeLastname = (event) => {
        this.setState({
            lastNameInput: event.target.value
        });
    };

    handleChangeGithub = (event) => {
        this.setState({
            gitHubInput: event.target.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        //console.log(listStudents.find({}).fetch());
        listStudents.insert({
            firstName: this.state.firstNameInput,
            lastName: this.state.lastNameInput,
            gitHub: this.state.gitHubInput
        });
    };


    render() {
        return (
            <div className="Students">
                <form>
                    <input type="text" value={this.state.firstNameInput}
                           onChange={this.handleChangeFirstname}/>
                    <input type="text" value={this.state.lastNameInput}
                           onChange={this.handleChangeLastname}/>
                    <input type="text" value={this.state.gitHubInput}
                           onChange={this.handleChangeGithub}/>

                    <button onClick={this.handleSubmit}>Valider</button>
                    <ul>
                        {
                            this.props.list.map((element, index) =>
                                <li key={index}>{element.firstName} {element.lastName} {element.gitHub}</li>
                            )
                        }
                    </ul>
                </form>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        list: listStudents.find({}).fetch(),
    };
})(Students);
