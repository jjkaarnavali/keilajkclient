import { Redirect, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { IRouteId } from "../../types/IRouteId";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IPerson } from "../../dto/IPerson";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Route, Switch } from 'react-router-dom';
import PersonsIndex from "./PersonIndex";

const PersonCreate = () => {
    const appState = useContext(AppContext);

    const [objToCreate, setPerson] = useState({} as IPerson);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [alertMessage, setAlertMessage] = useState('');

    const createClicked = async (e: Event) => {
        e.preventDefault();
        if (objToCreate.firstName === '' || objToCreate.lastName === '' || objToCreate.personsIdCode === '') {
            setAlertMessage('First name, last name and persons ID code cant be empty!');
        };
        setAlertMessage('');
        let result = await BaseService.post<IPerson>(objToCreate, '/persons', appState.jwt!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPerson(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    return (
        <>
        <h1>Create</h1>

        <h4>Person</h4>
        <hr />
        <form onSubmit={(e) => createClicked(e.nativeEvent)}>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <input
                        value={objToCreate.firstName} onChange={e => setPerson({ ...objToCreate, firstName: e.target.value })}
                        className="form-control"
                        type="text"
                        id="firstName"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <input
                        value={objToCreate.lastName} onChange={e => setPerson({ ...objToCreate, lastName: e.target.value })}
                        className="form-control"
                        type="text"
                        id="lastName"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="idCode">ID code</label>
                    <input
                        value={objToCreate.personsIdCode} onChange={e => setPerson({ ...objToCreate, personsIdCode: e.target.value })}
                        className="form-control"
                        type="text"
                        id="idCode"
                    />
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
        </form>
        <div>
            <Link to={'/Persons/'}>Back to List</Link> 
        </div>
        </>
    );
}

export default PersonCreate;
