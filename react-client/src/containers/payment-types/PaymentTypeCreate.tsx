import { Redirect, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { IRouteId } from "../../types/IRouteId";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IPaymentType } from "../../dto/IPaymentType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Route, Switch } from 'react-router-dom';
import PaymentTypeIndex from "./PaymentTypeIndex";

const PaymentTypeCreate = () => {
    const appState = useContext(AppContext);

    const [objToCreate, setPaymentType] = useState({} as IPaymentType);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [alertMessage, setAlertMessage] = useState('');

    const createClicked = async (e: Event) => {
        e.preventDefault();
        if (objToCreate.paymentTypeName === '') {
            setAlertMessage('Empty typename!');
        };
        setAlertMessage('');
        let result = await BaseService.post<IPaymentType>(objToCreate, '/paymenttypes', appState.jwt!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPaymentType(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    return (
        <>
        <h1>Create</h1>

        <h4>Payment type</h4>
        <hr />
        <form onSubmit={(e) => createClicked(e.nativeEvent)}>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="typeName">Payment type</label>
                    <input
                        value={objToCreate.paymentTypeName} onChange={e => setPaymentType({ ...objToCreate, paymentTypeName: e.target.value })}
                        className="form-control"
                        type="text"
                        id="typeName"
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
            <Link to={'/PaymentTypes/'}>Back to List</Link> 
        </div>
        </>
    );
}

export default PaymentTypeCreate;
