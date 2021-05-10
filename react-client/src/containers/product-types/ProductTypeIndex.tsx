import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IProductType } from "../../dto/IProductType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const RowDisplay = (props: { productType: IProductType }) => (
    <tr>
        <td>
            {props.productType.typeName}
        </td>
        <td>
            <Link to={'/ProductTypes/' + props.productType.id}>Details</Link>
        </td>
    </tr>
);

const ProductTypeIndex = () => {
    const [productTypes, setProductTypes] = useState([] as IProductType[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.getAll<IProductType>('/producttypes', appState.jwt!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProductTypes(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>ProductTypes</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            ProductType
                        </th>
                        <th>
                            Product
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {productTypes.map(productType =>
                        <RowDisplay productType={productType} key={productType.id} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default ProductTypeIndex;
