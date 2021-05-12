import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { IRouteId } from "../../types/IRouteId";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IPerson } from "../../dto/IPerson";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";


const PersonDetails = () => {
    // get the router params from hook
    const {id} = useParams() as IRouteId; 
    const [person, setPerson] = useState({} as IPerson);
    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });

    const appState = useContext(AppContext);


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
            <h1>Details</h1>
            <div>
            <h4>Person</h4>
            <hr />
            <dl className="row" >
            <dt className="col-sm-4">
                First Name
            </dt>
            <dd className="col-sm-8">
                {person.firstName}
            </dd>
            <dt className="col-sm-4">
                Last Name
            </dt>
            <dd className="col-sm-8">
                {person.lastName}
            </dd>
            <dt className="col-sm-4">
                ID code
            </dt>
            <dd className="col-sm-8">
                {person.personsIdCode}
            </dd>
            <dt className="col-sm-4">
                Id
            </dt>
            <dd className="col-sm-8">
                {person.id}
            </dd>
            </dl>
            </div>
            <div>
                <Link to={'/Persons/Edit/' + person.id}>Edit </Link> 
            |   <Link to={'/Persons/'}>Back to List</Link> 
            </div>
            <Loader {...pageStatus} />
        </>
    );
}

export default PersonDetails;
