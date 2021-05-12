import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { IRouteId } from "../../types/IRouteId";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IProductType } from "../../dto/IProductType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const ProductTypeEdit = () => {
    const {id} = useParams() as IRouteId; 
    const [productType, setProductType] = useState({} as IProductType);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    let typeName = "";
    const appState = useContext(AppContext);


    const loadData = async () => {
        let result = await BaseService.get<IProductType>('/producttypes', appState.jwt!);

    

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProductType(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
        console.log(productType);
    }, []);

    return (
        <>
            <h1>Details</h1>
            <div>
            <h4>Product Type</h4>
            <hr />
            <dl className="row" >
            <dt className="col-sm-4">
                Product type
            </dt>
            <dd className="col-sm-8">
                {productType.typeName}
            </dd>
            <dt className="col-sm-4">
                Id
            </dt>
            <dd className="col-sm-8">
                {{id}}
            </dd>
    </dl>
    </div>
            <Loader {...pageStatus} />
        </>
    );
}

export default ProductTypeEdit;
