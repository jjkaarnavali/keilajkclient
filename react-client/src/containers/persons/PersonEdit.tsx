import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IPerson } from "../../dto/IPerson";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Redirect } from "react-router";

const PersonEdit = () => {
    const {id} = useParams() as IRouteId; 
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [objToEdit, setPerson] = useState({} as IPerson);
    const [alertMessage, setAlertMessage] = useState('');

    const appState = useContext(AppContext);

    const editClicked = async (e: Event) => {
        e.preventDefault();
        if (objToEdit.firstName === '' || objToEdit.lastName === '' || objToEdit.personsIdCode === '') {
            setAlertMessage('First name, last name and persons ID code cant be empty!');
        };
        setAlertMessage('');
        let result = await BaseService.put<IPerson>(objToEdit, '/persons', appState.jwt!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPerson(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
        
        
    }

    const loadData = async () => {
        let result = await BaseService.get<IPerson>(id, '/persons', appState.jwt!);

    

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPerson(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);
    
    return (
        <>
        <h1>Edit</h1>

        <h4>Person</h4>
        <hr />
        <form onSubmit={(e) => editClicked(e.nativeEvent)}>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        value={objToEdit.firstName} onChange={e => setPerson({ ...objToEdit, firstName: e.target.value })}
                        className="form-control"
                        type="text"
                        v-model={objToEdit.firstName}
                        id="firstName"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        value={objToEdit.lastName} onChange={e => setPerson({ ...objToEdit, lastName: e.target.value })}
                        className="form-control"
                        type="text"
                        v-model={objToEdit.lastName}
                        id="lastName"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="idCode">ID code</label>
                    <input
                        value={objToEdit.personsIdCode} onChange={e => setPerson({ ...objToEdit, personsIdCode: e.target.value })}
                        className="form-control"
                        type="text"
                        v-model={objToEdit.personsIdCode}
                        id="idCode"
                    />
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Edit
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

export default PersonEdit;

