import React from 'react';
import {loginUser, fetchUserRequest} from "../../../redux/actions";
import compose from "../../../utils/compose";
import withService from "../../../additional-components/hoc/withService";
import {connect} from "react-redux";
import { withCookies } from 'react-cookie';
import './login-component.css';
import {Link} from "react-router-dom";

class LoginComponent extends React.Component {

    state = {
        username: '',
        password: '',
        message: '',
    };

    render() {
        const {username, password, message} = this.state;

        return(
            <div className='wrapper-login'>

                <div className='login'>

                    <h3 className='label'>Authorization / <Link to='/sign'>Registration</Link></h3>

                    <form>

                        {message && <div className='error'>{message}</div>}

                        <table cellPadding={5}>

                            <tbody>
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

                        <button onClick={this.login}>Login</button>

                    </form>

                </div>

            </div>
        )
    }

    login = (e) => {
        e.preventDefault();
        const {login, loginUser, history} = this.props;
        const {username, password} = this.state;
        const credentials = {username, password};

        fetchUserRequest();
        login(credentials)
            .then(token => {
                console.log(token);
                loginUser();
                history.push('/');
            })
            .catch(message => {
                console.log(message);
                this.setState({message: message.toString()});
            });
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
}

const mapMethodsToProps  = ({ authController : { login }}) => ({ login });
const mapDispatchToProps = {loginUser, fetchUserRequest};
const mapStateToProps    = null;

export default compose(
    withCookies,
    withService(mapMethodsToProps),
    connect(mapStateToProps, mapDispatchToProps)
)(LoginComponent);