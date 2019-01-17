import React, {Component} from 'react';
import {listStudents} from '../../../api/list-students';
import {withTracker} from 'meteor/react-meteor-data';

class Students extends Component {

    state = {
        data: {
            firstNameInput: '',
            lastNameInput: '',
            gitHubInput: '',
        },
        modifData: {
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

    handleChangeUpdate = (content) => event => {
        const modifData = this.state.modifData;
        this.setState({
            modifData: {...modifData, [content]: event.target.value}
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

    handleUpdate = (event) => {
        event.preventDefault();
        listStudents.update({_id: localStorage.getItem('id')}, {
            $set: {
                firstName: this.state.modifData.firstNameInput,
                lastName: this.state.modifData.lastNameInput,
                gitHub: this.state.modifData.gitHubInput
            }
        });
    };

    removeItemByID = (id) => (event) => {
        event.preventDefault();
        listStudents.remove(id);
    };

    updateItem = (event) => {
        event.preventDefault();
        const list = this.props.list;
        localStorage.setItem('id', list[event.target.value]._id);
    };

    render() {
        const firstNameInput = this.state.data.firstNameInput;
        const lastNameInput = this.state.data.lastNameInput;
        const gitHubInput = this.state.data.gitHubInput;

        return (
            <div className="Students">
                <form>
                    <input type="text" value={firstNameInput}
                           onChange={this.handleChange('firstNameInput')}/>
                    <input type="text" value={lastNameInput}
                           onChange={this.handleChange('lastNameInput')}/>
                    <input type="text" value={gitHubInput}
                           onChange={this.handleChange('gitHubInput')}/>

                    <button onClick={this.handleSubmit}>Valider</button>

                    <ul>
                        {
                            this.props.list.map((element, index) =>
                                <li key={index}>{element.firstName} {element.lastName} {element.gitHub}
                                    <button onClick={this.removeItemByID(element._id)}>Supprimer</button>
                                    <button value={index} onClick={this.updateItem}>Modifier</button>
                                </li>
                            )
                        }
                    </ul>
                </form>
                <form>
                    <input type="text"
                           onChange={this.handleChangeUpdate('firstNameInput')}/>
                    <input type="text"
                           onChange={this.handleChangeUpdate('lastNameInput')}/>
                    <input type="text"
                           onChange={this.handleChangeUpdate('gitHubInput')}/>

                    <button onClick={this.handleUpdate}>Modifier</button>
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
