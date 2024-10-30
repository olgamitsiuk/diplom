import React from 'react';
import { useNavigate } from "react-router-dom";

export function EditForm(props) {
    const {
        user,
        change,
        doCloseEditForm,
        doSaveEditForm
    } = props;

    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <div className="container">
            <div className="userData">
                <i className="bi bi-x-lg" onClick={goBack}></i>
                <h2>Welcome, {user.name}</h2>
                <div className="personalData">
                    <div className="headerData">
                        <h4>Personal Information</h4>
                    </div>
                    <form>
                        <div className="mainData">
                            <ul className="personalDataList">
                                <li>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        onChange={change}
                                        value={user.lastName || ''}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="name">First Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={change}
                                        value={user.name || ''}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="secondName">Middle Name</label>
                                    <input
                                        type="text"
                                        name="secondName"
                                        onChange={change}
                                        value={user.secondName || ''}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="birthDay">Date of Birth</label>
                                    <input
                                        type="date"
                                        name="birthDay"
                                        onChange={change}
                                        value={user.birthDay || ''}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="male">Gender</label>
                                    <select
                                        name="male"
                                        onChange={change}
                                        value={user.male || ''}
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </li>
                                <li>
                                    <label htmlFor="language">Language</label>
                                    <select
                                        name="language"
                                        onChange={change}
                                        value={user.language || ''}
                                    >
                                        <option value="English">English</option>
                                        <option value="Ukrainian">Ukrainian</option>
                                    </select>
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
                                    <input
                                        type="tel"
                                        name="phone"
                                        onChange={change}
                                        value={user.phone || ''}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="editEmail">Email</label>
                                    <input
                                        type="email"
                                        name="editEmail"
                                        onChange={change}
                                        value={user.email || ''}
                                        disabled
                                    />
                                </li>
                            </ul>
                        </div>
                        <div className="divBtn">
                            <button
                                className="btn btn-dark"
                                type="button"
                                onClick={doCloseEditForm}
                            >
                                Close
                            </button>
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={doSaveEditForm}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}