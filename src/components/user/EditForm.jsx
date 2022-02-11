import React, { useEffect} from 'react';
import {useNavigate } from "react-router-dom";

export function EditForm(props) {
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
                    </div>
                    <form>
                        <div className="mainData">
                            <ul className="personalDataList">
                                <li><label htmlFor="lastName">Фамилия</label>
                                    <input type="text" name="lastName" onChange={props.change}  value={user.lastName}/>
                                </li>
                                <li>
                                    <label htmlFor="name">Имя</label>
                                    <input type="text" name="name" onChange={props.change}  value={user.name}/>
                                </li>
                                <li>
                                    <label htmlFor="secondName">Отчество</label>
                                    <input type="text" name="secondName" onChange={props.change}  value={user.secondName}/>
                                </li>
                                <li>
                                    <label htmlFor="birthDay">Дата рождения</label>
                                    <input type="date" name="birthDay" onChange={props.change}  value={user.birthDay}/>
                                </li>
                                <li>
                                    <label htmlFor="male">Пол</label>
                                    <select name="male" onChange={props.change}  value={user.male}>
                                        <option value="Мужской">Мужской</option>
                                        <option value="Женский">Женский</option>
                                    </select>
                                </li>
                                <li>
                                    <label htmlFor="language">Язык</label>
                                    <select name="language" onChange={props.change} value={user.language}>
                                        <option value="Русский" >Русский</option>
                                        <option value="Украинский" >Украинский</option>
                                    </select>
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
                                    <input type="number" name="phone" onChange={props.change}  value={user.phone}/>
                                </li>
                                <li>
                                    <label htmlFor="editEmail">email</label>
                                    <input type="email" name="editEmail" onChange={props.change} value={user.email} disabled />
                                </li>
                            </ul>
                        </div>
                        <div className="divBtn">
                            <button className="btn btn-dark" type="button" onClick={props.doCloseEditForm}>Закрыть</button>
                            <button className="btn btn-danger" type="button" onClick={props.doSaveEditForm}>Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}