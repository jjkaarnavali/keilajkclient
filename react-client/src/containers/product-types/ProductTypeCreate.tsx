import { Redirect, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { IRouteId } from "../../types/IRouteId";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IProductType } from "../../dto/IProductType";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";
import { Route, Switch } from 'react-router-dom';

interface IFormValues {
    input: string;
}
export interface IFormProps {
    values: IFormValues;

    handleChange: (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => void;
}
const ProductTypeCreateView = (props: IFormProps) => {
    return (
        <>
        <h1>Create</h1>

        <h4>Product type</h4>
        <hr />
        <form>
        <div className="row">
            <div className="col-md-4">
                <div className="form-group">
                    <label htmlFor="typeName">Product type</label>
                    <input
                        value={props.values.input}
                        className="form-control"
                        onChange={(e) => props.handleChange(e.target)}
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
            <Link to={'/ProductTypes/'}>Back to List</Link> 
        </div>
        </>
    );
}

const initialFormValues: IFormValues = {
    input: ''
};

const ProductTypeCreate = () => {
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleChange = (target: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) => {
        // todo: update form value
        console.log(target);
        console.log(target.value);
        console.log(target.id);
        setFormValues({ ...formValues, input: target.value });
        console.log(formValues.input);
    }

    const [productType, setProductType] = useState({} as IProductType);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);
    productType.typeName = formValues.input;
    console.log("mis on");
    console.log(formValues.input);
    const objToCreate: IProductType = {
        id:
        undefined,
        typeNameId:
        undefined,
        typeName:
        formValues.input
    };

    const postData = async () => {

        console.log(appState.jwt);
        let result = await BaseService.post<IProductType>(objToCreate, '/producttypes', appState.jwt!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setProductType(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    onsubmit = () =>{
        
        postData();
        return <Route path="/producttypes"/>
    }

    


    return <ProductTypeCreateView values={formValues} handleChange={handleChange} />
}
export default ProductTypeCreate;
