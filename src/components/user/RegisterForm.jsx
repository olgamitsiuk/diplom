import React from 'react';
import { useNavigate } from "react-router-dom";

export function RegisterForm(props) {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (<div className="container">
        <div className="divForm">
            <i className="bi bi-x-lg" onClick={goBack}></i>
            <form className="form-horizontal">
                <fieldset>
                    <div id="legend">
                        <legend className="">Registration</legend>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="name">Username</label>
                        <div className="controls">
                            <input
                                onChange={props.change}
                                type="text"
                                id="name"
                                name="name"
                                placeholder=""
                                className="input-xlarge"
                            />
                            <p className="help-block">Username can contain any characters or numbers, without spaces</p>
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="email">E-mail</label>
                        <div className="controls">
                            <input
                                onChange={props.change}
                                type="email"
                                id="email"
                                name="email"
                                placeholder=""
                                className="input-xlarge"
                            />
                            <p className="help-block">Please enter your E-mail</p>
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="password">Password</label>
                        <div className="controls">
                            <input
                                onChange={props.change}
                                type="password"
                                id="password"
                                name="password"
                                placeholder=""
                                className="input-xlarge"
                            />
                            <p className="help-block">Password must be at least 4 characters long</p>
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="password_confirm">Password (Confirm)</label>
                        <div className="controls">
                            <input
                                onChange={props.change}
                                type="password"
                                id="password_confirm"
                                name="password_confirm"
                                placeholder=""
                                className="input-xlarge"
                            />
                            <p className="help-block">Please confirm your password</p>
                        </div>
                    </div>
                    <div className="control-group">
                        <div className="controls divBtn">
                            <button className="btn btn-danger" type="button" onClick={props.doOpenLoginForm}>Back</button>
                            <button className="btn btn-danger" type="button" onClick={props.tryReg}>Register</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
    )
}