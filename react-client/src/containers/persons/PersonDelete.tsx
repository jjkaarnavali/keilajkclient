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

const PersonDelete = () => {
    const {id} = useParams() as IRouteId; 
    const [person, setPerson] = useState({} as IPerson);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const appState = useContext(AppContext);

    const deleteClicked = async (e: Event) => {
        e.preventDefault();
        
        let result = await BaseService.delete<IPerson>(id, '/persons', appState.jwt!);
        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPerson(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
        return (
            <>
            {<Redirect to="/Persons/" />}
            </>
        );
        
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
        console.log(person);
    }, []);
    
    return (
        <>
        <h1>Delete</h1>

        <h3>Are you sure you want to delete this?</h3>
        <div>
            <h4>Person</h4>
            <hr />
            <dl className="row">
                <dt className = "col-sm-2">
                    First Name
                </dt>
                <dd className = "col-sm-10">
                    {person.firstName}  
                </dd>
                <dt className = "col-sm-2">
                    Last Name
                </dt>
                <dd className = "col-sm-10">
                    {person.lastName}  
                </dd>
                <dt className = "col-sm-2">
                    ID code
                </dt>
                <dd className = "col-sm-10">
                    {person.personsIdCode}  
                </dd>
            </dl>

            <form onSubmit={(e) => deleteClicked(e.nativeEvent)}>
                <button  type="submit" className="btn btn-danger" >Delete</button>|
                <Link to={'/Persons/'}>Back to List</Link> 
            </form>
        </div>
        </>
    );
}

export default PersonDelete;
