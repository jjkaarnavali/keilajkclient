import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { IRouteId } from "../../types/IRouteId";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IPaymentType } from "../../dto/IPaymentType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";


const PaymentTypeDetails = () => {
    // get the router params from hook
    const {id} = useParams() as IRouteId; 
    const [paymentType, setPaymentType] = useState({} as IPaymentType);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const appState = useContext(AppContext);


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
            <h1>Details</h1>
            <div>
            <h4>Payment Type</h4>
            <hr />
            <dl className="row" >
            <dt className="col-sm-4">
                Payment type
            </dt>
            <dd className="col-sm-8">
                {paymentType.paymentTypeName}
            </dd>
            <dt className="col-sm-4">
                Id
            </dt>
            <dd className="col-sm-8">
                {paymentType.id}
            </dd>
            </dl>
            </div>
            <div>
                <Link to={'/PaymentTypes/Edit/' + paymentType.id}>Edit </Link> 
            |   <Link to={'/PaymentTypes/'}>Back to List</Link> 
            </div>
            <Loader {...pageStatus} />
        </>
    );
}

export default PaymentTypeDetails;
