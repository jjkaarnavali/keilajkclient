import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IPaymentType } from "../../dto/IPaymentType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const RowDisplay = (props: { paymentType: IPaymentType }) => (
    <tr>
        <td>
            {props.paymentType.paymentTypeName}
        </td>
        <td>
            <Link to={'/PaymentTypes/' + props.paymentType.id}>Details </Link> 
            | <Link to={'/PaymentTypes/Edit/' + props.paymentType.id}>Edit </Link> 
            | <Link to={'/PaymentTypes/Delete/' + props.paymentType.id}>Delete </Link>
        </td>
    </tr>
);

const PaymentTypeIndex = () => {
    const [paymentTypes, setPaymentTypes] = useState([] as IPaymentType[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.getAll<IPaymentType>('/paymenttypes', appState.jwt!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPaymentTypes(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }
    

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>PaymentTypes</h1>
            <Link to={'/PaymentTypes/Create'}>Create new</Link> 
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            PaymentType
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {paymentTypes.map(paymentType =>
                        <RowDisplay paymentType={paymentType} key={paymentType.id} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default PaymentTypeIndex;
