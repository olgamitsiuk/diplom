import React, { useEffect} from 'react';
import {useNavigate } from "react-router-dom";
import {API_URL} from "../../config";

export function Welcome(props) {

    const {user} = props;
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    useEffect(() => {
        props.getOneUser()
        }, [props.session_id]
    )

    return(
        <div className="container">
            <div className="userData">
                <i className="bi bi-x-lg" onClick={goBack}></i>
                <h2>Добро пожаловать {user.name}</h2>
                <div className="personalData">
                    <div className="headerData">
                        <h4>Личные данные</h4>
                        <button type="button" className="btn btn-link" onClick={props.doOpenEditForm}>Редактировать</button>
                    </div>
                    <form>
                        <div className="mainData">
                            <ul className="personalDataList">
                                <li><label htmlFor="lastName">Фамилия</label>
                                    <p>{user.lastName}</p>
                                </li>
                                <li>
                                    <label htmlFor="Name">Имя</label>
                                    <p>{user.name}</p>
                                </li>
                                <li>
                                    <label htmlFor="secondName">Отчество</label>
                                    <p>{user.secondName}</p>
                                </li>
                                <li>
                                    <label htmlFor="birthDay">Дата рождения</label>
                                    <p>{user.birthDay}</p>
                                </li>
                                <li>
                                    <label htmlFor="male">Пол</label>
                                    <p>{user.male}</p>
                                </li>
                                <li>
                                    <label htmlFor="language">Язык</label>
                                    <p>{user.language}</p>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="personalData">
                    <div className="headerData">
                        <h4>Контакты</h4>
                    </div>
                    <form>
                        <div className="mainData">
                            <ul className="personalDataList">
                                <li><label htmlFor="phone">Телефон</label>
                                    <p>{user.phone}</p>
                                </li>
                                <li>
                                    <label htmlFor="email">email</label>
                                    <p>{user.email}</p>
                                </li>
                            </ul>
                        </div>
                    </form>
                </div>
                <div className="divBtn">
                    <button className="btn btn-danger" type="button" onClick={props.doLogout}>Выйти</button>
                    <button className="btn btn-danger" type="button" onClick={props.delete}>Удалить учетную запись</button>
                </div>
            </div>
        </div>
    )
}