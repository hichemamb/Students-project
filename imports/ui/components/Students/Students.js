import React, {Component} from 'react';
import {listStudents} from '../../../api/list-students';
import { withTracker } from 'meteor/react-meteor-data';

class Students extends Component {

    state = {
        data: {
            firstNameInput: '',
            lastNameInput: '',
            gitHubInput: '',
        }
    };

    handleChange = (content) => event => {
        const data = this.state.data;
        this.setState({
            data: {...data, [content]: event.target.value}
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const firstNameInput = this.state.data.firstNameInput;
        const lastNameInput = this.state.data.lastNameInput;
        const gitHubInput = this.state.data.gitHubInput;

        listStudents.insert({
            firstName: firstNameInput,
            lastName: lastNameInput,
            gitHub: gitHubInput
        });
    };

    removeItemByID = (id) => (event) => {
        event.preventDefault();
        console.log(id);
        listStudents.remove(id);
    };

    render() {
        return (
            <div className="Students">
                <form>
                    <input type="text" value={this.state.firstNameInput}
                           onChange={this.handleChange('firstNameInput')}/>
                    <input type="text" value={this.state.lastNameInput}
                           onChange={this.handleChange('lastNameInput')}/>
                    <input type="text" value={this.state.gitHubInput}
                           onChange={this.handleChange('gitHubInput')}/>

                    <button onClick={this.handleSubmit}>Valider</button>
                    <ul>
                        {
                            this.props.list.map((element, index) =>
                                <li key={index}>{element.firstName} {element.lastName} {element.gitHub} <button onClick={this.removeItemByID(element._id)}>Supprimer</button></li>
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
