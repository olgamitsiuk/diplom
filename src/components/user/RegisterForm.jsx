import React from 'react';
import {useNavigate } from "react-router-dom";

export function RegisterForm(props) {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return( <div className="container">
            <div className="divForm">
                <i className="bi bi-x-lg" onClick={goBack}></i>
                    <form className="form-horizontal">
                        <fieldset>
                            <div id="legend">
                                <legend className="">Регистрация</legend>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="name">Имя пользователя</label>
                                <div className="controls">
                                    <input  onChange={props.change}  type="text" id="name" name="name" placeholder=""
                                            className="input-xlarge"/>
                                    <p className="help-block">Имя пользователя может содержать любые символы или цифры, без
                                        пробелов</p>
                                </div>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="email">E-mail</label>
                                <div className="controls">
                                    <input  onChange={props.change}  type="text" id="email" name="email" placeholder="" className="input-xlarge"/>
                                    <p className="help-block">Пожалуйста, укажите ваш E-mail</p>
                                </div>
                            </div>
                            <div className="control-group">

                                <label className="control-label" htmlFor="password">Пароль</label>
                                <div className="controls">
                                    <input  onChange={props.change}   type="password" id="password" name="password" placeholder=""
                                            className="input-xlarge"/>
                                    <p className="help-block">Пароль должен состоять не менее чем из 4 символов</p>
                                </div>
                            </div>
                            <div className="control-group">
                                <label className="control-label" htmlFor="password_confirm">Пароль (подтверждение)</label>
                                <div className="controls">
                                    <input  onChange={props.change}   type="password" id="password_confirm" name="password_confirm" placeholder=""
                                            className="input-xlarge"/>
                                    <p className="help-block">Пожалуйста, подтвердите пароль</p>
                                </div>
                            </div>
                            <div className="control-group">
                                <div className="controls divBtn">
                                    <button className="btn btn-danger" type="button" onClick={props.doOpenLoginForm}>Назад</button>
                                    <button className="btn btn-danger" type="button" onClick={props.tryReg}>Регистрация</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
          </div>
    )
}