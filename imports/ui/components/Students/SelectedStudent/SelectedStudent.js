import React, {Component} from 'react';
import {listStudents} from '../../../../api/list-students';
import Input from '../../Input/Input';
// import '../../Input/Input.css';
import './SelectedStudent.css';

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
            <div className="Select-students">
                <div className="Container-title">
                    <h1 className="title">Modifier vos informations ci-dessous</h1>
                </div>
                <form className="Form">
                    <Input
                        value={firstNameInput}
                        change={this.handleChangeUpdate('firstNameInput')}
                        placeholder={'Firstname'}/>
                    <Input
                        value={lastNameInput}
                        change={this.handleChangeUpdate('lastNameInput')}
                        placeholder={'Lastname'}/>
                    <Input
                        value={gitHubInput}
                        change={this.handleChangeUpdate('gitHubInput')}
                        placeholder={'Github'}/>
                    <div>
                        <button onClick={this.handleUpdate} className="Button">Modifier</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SelectedStudent;



