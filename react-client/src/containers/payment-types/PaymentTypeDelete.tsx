import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IPaymentType } from "../../dto/IPaymentType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Redirect } from "react-router";

const PaymentTypeDelete = () => {
    const {id} = useParams() as IRouteId; 
    const [paymentType, setPaymentType] = useState({} as IPaymentType);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const appState = useContext(AppContext);

    const deleteClicked = async (e: Event) => {
        e.preventDefault();
        
        let result = await BaseService.delete<IPaymentType>(id, '/paymenttypes', appState.jwt!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPaymentType(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
        return (
            <>
            {<Redirect to="/ProductTypes/" />}
            </>
        );
        
    }

    const loadData = async () => {
        let result = await BaseService.get<IPaymentType>(id, '/paymenttypes', appState.jwt!);

    

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPaymentType(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
        console.log(paymentType);
    }, []);
    
    return (
        <>
        <h1>Delete</h1>

        <h3>Are you sure you want to delete this?</h3>
        <div>
            <h4>Payment Type</h4>
            <hr />
            <dl className="row">
                <dt className = "col-sm-2">
                    Payment Type
                </dt>
                <dd className = "col-sm-10">
                    {paymentType.paymentTypeName}  
                </dd>
            </dl>

            <form onSubmit={(e) => deleteClicked(e.nativeEvent)}>
                <button  type="submit" className="btn btn-danger" >Delete</button>|
                <Link to={'/PaymentTypes/'}>Back to List</Link> 
            </form>
        </div>
        </>
    );
}

export default PaymentTypeDelete;
