import React from 'react';
import {loginUser, logoutUser, fetchUserRequest} from "../../../redux/actions";
import compose from "../../../utils/compose";
import withService from "../../../additional-components/hoc/withService";
import {connect} from "react-redux";
import { withCookies } from 'react-cookie';
import '../login-component/login-component.css';
import {Link} from "react-router-dom";

class SignComponent extends React.Component {

    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        message: '',
    };

    render() {
        const {firstName, lastName, username, password, message} = this.state;

        return(
            <div className='wrapper-login'>

                <div className='login'>

                    <h3 className='label'>Registration / <Link to='/login'>Authorization</Link></h3>

                    <form>

                        {message && <div className='error'>{message}</div>}

                        <table cellPadding={5}>

                            <tbody>
                                <tr>
                                    <td>
                                        <span>firstName:</span>
                                    </td>
                                    <td>
                                        <input type="text" name="firstName" value={firstName} onChange={this.onChange}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <span>lastName:</span>
                                    </td>
                                    <td>
                                        <input type="text" name="lastName" value={lastName} onChange={this.onChange}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <span>username:</span>
                                    </td>
                                    <td>
                                        <input type="text" name="username" value={username} onChange={this.onChange}/>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <span>password:</span>
                                    </td>
                                    <td>
                                        <input type="password" name="password" value={password} onChange={this.onChange}/>
                                    </td>
                                </tr>
                            </tbody>

                        </table>

                        <button onClick={this.signUp}>Sign-up</button>

                    </form>

                </div>

            </div>
        )
    }

    loginIn = (user) => {
        const {login, loginUser, history} = this.props;

        fetchUserRequest();
        login(user)
            .then(res => {
                console.log(res)
                loginUser();
                history.push('/');
            })
            .catch(message => {
                this.setState({message: message.toString()});
            });
    };

    signUp = (e) => {
        e.preventDefault();
        const {registration} = this.props;
        const {firstName, lastName, username, password} = this.state;
        const credentials = {firstName, lastName, username, password};

        fetchUserRequest();
        registration(credentials)
            .then(res => {
                console.log(res);
                this.loginIn(credentials);
            })
            .catch(message => {
                console.log(message)
                this.setState({message: message + ""});
            });
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
}

const mapMethodsToProps  = ({ authController : { registration, login }}) => ({ registration, login });
const mapDispatchToProps = {loginUser, fetchUserRequest};
const mapStateToProps    = null;

export default compose(
    withCookies,
    withService(mapMethodsToProps),
    connect(mapStateToProps, mapDispatchToProps)
)(SignComponent);