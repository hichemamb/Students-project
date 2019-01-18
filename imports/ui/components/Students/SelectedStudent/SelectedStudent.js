import React, {Component} from 'react';
import {listStudents} from '../../../../api/list-students';
import {withTracker} from 'meteor/react-meteor-data';


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
                    <input type="text"
                           value={firstNameInput}
                           onChange={this.handleChangeUpdate('firstNameInput')}
                    />
                    <input type="text"
                           value={lastNameInput}
                           onChange={this.handleChangeUpdate('lastNameInput')}/>
                    <input type="text"
                           value={gitHubInput}
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
})(SelectedStudent);

