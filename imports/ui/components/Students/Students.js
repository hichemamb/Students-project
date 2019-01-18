import React, {Component} from 'react';
import {listStudents} from '../../../api/list-students';
import {withTracker} from 'meteor/react-meteor-data';
import Input from '../Input/Input';

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

        this.setState({
            data: {
                firstNameInput: '',
                lastNameInput: '',
                gitHubInput: ''
            }
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
                    <Input
                        value={firstNameInput}
                        change={this.handleChange('firstNameInput')}
                        placeholder={'Firstname'}/>
                    <Input
                        value={lastNameInput}
                        change={this.handleChange('lastNameInput')}
                        placeholder={'Lastname'}/>
                    <Input
                        value={gitHubInput}
                        change={this.handleChange('gitHubInput')}
                        placeholder={'Github'}/>

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
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        list: listStudents.find({}).fetch(),
    };
})(Students);
