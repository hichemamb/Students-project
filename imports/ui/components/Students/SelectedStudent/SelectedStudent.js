import React, {Component} from 'react';
import {listStudents} from '../../../../api/list-students';
import Input from '../../Input/Input';

class SelectedStudent extends Component {

    state = {
        modifData: {
            firstNameInput: '',
            lastNameInput: '',
            gitHubInput: '',
        },
    };


    handleChangeUpdate = (content) => event => {
        const modifData = this.state.modifData;
        this.setState({
            modifData: {...modifData, [content]: event.target.value}
        });
    };

    handleUpdate = () => {
        listStudents.update({_id: localStorage.getItem('id')}, {
            $set: {
                firstName: this.state.modifData.firstNameInput,
                lastName: this.state.modifData.lastNameInput,
                gitHub: this.state.modifData.gitHubInput
            }
        });
        this.props.history.push('/');
    };


    render() {
        const firstNameInput = this.state.modifData.firstNameInput;
        const lastNameInput = this.state.modifData.lastNameInput;
        const gitHubInput = this.state.modifData.gitHubInput;

        return (
            <div className="Students">
                <form>
                    <Input
                        value={ firstNameInput }
                        change={this.handleChangeUpdate('firstNameInput')}/>
                    <Input
                        value={ lastNameInput }
                        change={this.handleChangeUpdate('lastNameInput')}/>
                    <Input
                        value={ gitHubInput }
                        change={this.handleChangeUpdate('gitHubInput')}/>

                    <button onClick={this.handleUpdate}>Modifier</button>

                </form>
            </div>
        );
    }
}

export default SelectedStudent;



