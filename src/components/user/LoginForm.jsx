import React from 'react';
import {useNavigate } from "react-router-dom";

export function LoginForm(props) {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return(
        <div className="container">
               <div className="divForm">
                   <i className="bi bi-x-lg" onClick={goBack}></i>
                    <form className="form-horizontal">
                        <fieldset>
                            <div id="legend">
                                <legend className="">Введите email и пароль</legend>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="email">E-mail</label>
                                <div className="controls">
                                    <input  onChange={props.change}  type="text" id="email" name="email"  className="input-xlarge"/>
                                </div>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="password">Пароль</label>
                                <div className="controls">
                                    <input  onChange={props.change}   type="password" id="password" name="password"
                                            className="input-xlarge"/>
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="controls divBtn">
                                    <button className="btn btn-danger" type="button" onClick={props.tryLogin}>Войти</button>
                                    <button className="btn btn-danger" type="button" onClick={props.doOpenRegForm}>Регистрация</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
         </div>
    )
}