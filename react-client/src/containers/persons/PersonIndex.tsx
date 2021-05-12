import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { AppContext } from "../../context/AppContext";
import { IPerson } from "../../dto/IPerson";
import { BaseService } from "../../services/base-service";
import { EPageStatus } from "../../types/EPageStatus";

const RowDisplay = (props: { person: IPerson }) => (
    <tr>
        <td>
            {props.person.firstName}
        </td>
        <td>
            {props.person.lastName}
        </td>
        <td>
            {props.person.personsIdCode}
        </td>
        <td>
            <Link to={'/Persons/' + props.person.id}>Details </Link> 
            | <Link to={'/Persons/Edit/' + props.person.id}>Edit </Link> 
            | <Link to={'/Persons/Delete/' + props.person.id}>Delete </Link>
        </td>
    </tr>
);

const PersonIndex = () => {
    const [persons, setPersons] = useState([] as IPerson[]);

    const [pageStatus, setPageStatus] = useState({ pageStatus: EPageStatus.Loading, statusCode: -1 });
    const appState = useContext(AppContext);

    const loadData = async () => {
        let result = await BaseService.getAll<IPerson>('/persons', appState.jwt!);

        if (result.ok && result.data) {
            setPageStatus({ pageStatus: EPageStatus.OK, statusCode: 0 });
            setPersons(result.data);
        } else {
            setPageStatus({ pageStatus: EPageStatus.Error, statusCode: result.statusCode });
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    return (
        <>
            <h1>Persons</h1>
            <Link to={'/Persons/Create'}>Create new</Link> 
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            First Name
                        </th>
                        <th>
                            Last Name
                        </th>
                        <th>
                            ID code
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {persons.map(person =>
                        <RowDisplay person={person} key={person.id} />)
                    }
                </tbody>
            </table>
            <Loader {...pageStatus} />
        </>
    );
}

export default PersonIndex;
