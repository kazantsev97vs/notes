import React from "react";
import './header.css';
import {logoutUser} from "../../redux/actions";
import compose from "../../utils/compose";
import withService from "../../additional-components/hoc/withService";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Input from "../search-input";
import Menu from "./svg-menu";

const Header = ({ username, isAuthorized, logout, logoutUser, onToggleMenu,
                    findAllByHeader, findAllByBackgroundColor, findAllByLabelList }) => {

    const search = (value) => {

        console.log("search")
        console.log(value)

        findAllByHeader(value)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });

        const green = {
            id:7,
            name:"green",
            color:"green"
        };
        findAllByBackgroundColor(green)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });

        const label = {
            id:1,
            name:"1"
        };
        findAllByLabelList(label)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            });

    };

    const onLogout = () => {

        logout()
            .then(res => {
                console.log(res)
                logoutUser("logout");
            })
            .then(res => {
                console.log(res)
                logoutUser("logout");
            })
    };

    const onClick = () => {

    };

    return (
        <div className='header'>

            <div className='header-label'>
                <button
                    className='button-menu'
                    onClick={onToggleMenu}
                >
                    <Menu/>
                </button>
                <Link to={'/'}><h3>NOTES</h3></Link>
            </div>


            {
                window.location.pathname === '/search' ?
                    <Input onClick={onClick} getValue={search} placeholder='Поиск...'/>
                    :
                    <Link to={'/search'}>
                        <Input onClick={onClick} getValue={search} placeholder='Поиск...'/>
                    </Link>
            }


            <div>
                {
                    isAuthorized &&
                    <div>
                        <div>{username}</div>
                        <Link onClick={onLogout} to='/login'>Logout</Link>
                    </div>
                }
            </div>

        </div>
    );
};

const mapDispatchToProps = {logoutUser};

const mapMethodsToProps  = ({
    authController : { logout },
    noteController : { findAllByHeader, findAllByBackgroundColor, findAllByLabelList }
}) => ({ logout, findAllByHeader, findAllByBackgroundColor, findAllByLabelList });

const mapStateToProps    = ({
    auth : { isAuthorized },
    user : { username, loading, error}
}) =>
    ({ isAuthorized, username, loading, error });

export default compose(
    withService(mapMethodsToProps),
    connect(mapStateToProps, mapDispatchToProps)
)(Header);