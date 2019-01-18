import React, {Component} from 'react';
import {listStudents} from '../../../api/list-students';
import {withTracker} from 'meteor/react-meteor-data';
import Input from '../Input/Input';
import './Students.css';
import '../Input/Input

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
                <div className="Container-title">
                    <h1 className="title">Liste</h1>
                    <h4 className="sub-title">qui permet de lister les étudiants d'Hétic</h4>
                </div>
                <form className="Form">
                    <Input
                     value={ firstNameInput }
                     change={this.handleChange('firstNameInput')}
                    />
                    <Input
                        value={ lastNameInput }
                        change={this.handleChange('lastNameInput')}/>
                    <Input
                        value={ gitHubInput }
                        change={this.handleChange('gitHubInput')}/>
                    <div>
                    <button onClick={this.handleSubmit} className="Button-submit">Valider</button>
                    </div>

                    <div className="Container-list">
                        <ul className="Content-list">
                            {
                                this.props.list.map((element, index) =>
                                    <li key={index}>
                                        <div className="Container-infoName">
                                            {element.firstName} {element.lastName} {element.gitHub}
                                        </div>
                                        <div className="Container-button">
                                            <button onClick={this.removeItemByID(element._id)}>Supprimer</button>
                                            <button value={index} onClick={this.updateItem}>Modifier</button>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
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
