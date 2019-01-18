import React, {Component} from 'react';
import {listStudents} from '../../../api/list-students';
import {withTracker} from 'meteor/react-meteor-data';

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

    updateItem = (event) => {
        event.preventDefault();
        const list = this.props.list;
        localStorage.setItem('id', list[event.target.value]._id);
        this.props.history.push('/student');
    };

    removeItemByID = (id) => (event) => {
        event.preventDefault();
        listStudents.remove(id);
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
                {/*<SelectedStudent
                    firstNameInput={this.state.modifData.firstNameInput}
                    lastNameInput={this.state.modifData.lastNameInput}
                    gitHubInput={this.state.modifData.gitHubInput}
                    onChange={this.handleChangeUpdate}
                    onUpdate={this.handleUpdate}
                />*/}
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        list: listStudents.find({}).fetch(),
    };
})(Students);
