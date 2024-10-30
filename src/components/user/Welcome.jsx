import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

export function Welcome(props) {
    const {
        user,
        getOneUser,
        doOpenEditForm,
        doLogout,
        delete: deleteAccount,
        session_id
    } = props;

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        // Only fetch user data if we have a session_id and don't have user data
        if (session_id && (!user || !user.email)) {
            getOneUser();
        }
    }, [session_id, getOneUser, user]);

    return (
        <div className="container">
            <div className="userData">
                <i className="bi bi-x-lg" onClick={goBack}></i>
                <h2>Welcome, {user.name}</h2>
                <div className="personalData">
                    <div className="headerData">
                        <h4>Personal Information</h4>
                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={doOpenEditForm}
                        >
                            Edit
                        </button>
                    </div>
                    <form>
                        <div className="mainData">
                            <ul className="personalDataList">
                                <li>
                                    <label htmlFor="lastName">Last Name</label>
                                    <p>{user.lastName}</p>
                                </li>
                                <li>
                                    <label htmlFor="Name">First Name</label>
                                    <p>{user.name}</p>
                                </li>
                                <li>
                                    <label htmlFor="secondName">Middle Name</label>
                                    <p>{user.secondName}</p>
                                </li>
                                <li>
                                    <label htmlFor="birthDay">Date of Birth</label>
                                    <p>{user.birthDay}</p>
                                </li>
                                <li>
                                    <label htmlFor="male">Gender</label>
                                    <p>{user.male}</p>
                                </li>
                                <li>
                                    <label htmlFor="language">Language</label>
                                    <p>{user.language}</p>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="personalData">
                    <div className="headerData">
                        <h4>Contact Information</h4>
                    </div>
                    <form>
                        <div className="mainData">
                            <ul className="personalDataList">
                                <li>
                                    <label htmlFor="phone">Phone</label>
                                    <p>{user.phone}</p>
                                </li>
                                <li>
                                    <label htmlFor="email">Email</label>
                                    <p>{user.email}</p>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="divBtn">
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={doLogout}
                    >
                        Sign Out
                    </button>
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={deleteAccount}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
}