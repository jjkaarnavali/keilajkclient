import { useParams } from "react-router-dom";
import { IRouteId } from "../../types/IRouteId";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IProductType } from "../../dto/IProductType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Redirect } from "react-router";

const ProductTypeEdit = () => {
    const {id} = useParams() as IRouteId; 
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const [objToEdit, setProductType] = useState({} as IProductType);
    const [alertMessage, setAlertMessage] = useState('');

    const appState = useContext(AppContext);

    const editClicked = async (e: Event) => {
        e.preventDefault();
        if (objToEdit.typeName === '') {
            setAlertMessage('Empty typename!');
        };
        setAlertMessage('');
        let result = await BaseService.put<IProductType>(objToEdit, '/producttypes', appState.jwt!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProductType(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
        
        
    }

    const loadData = async () => {
        let result = await BaseService.get<IProductType>(id, '/producttypes', appState.jwt!);

    

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProductType(result.data);
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

        <h4>Product type</h4>
        <hr />
        <form onSubmit={(e) => editClicked(e.nativeEvent)}>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="typeName">Product type</label>
                    <input
                        value={objToEdit.typeName} onChange={e => setProductType({ ...objToEdit, typeName: e.target.value })}
                        className="form-control"
                        type="text"
                        v-model={objToEdit.typeName}
                        id="typeName"
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
            <Link to={'/ProductTypes/'}>Back to List</Link> 
        </div>
        </>
    );
}

export default ProductTypeEdit;

