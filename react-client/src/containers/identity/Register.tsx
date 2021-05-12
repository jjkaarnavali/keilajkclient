import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import Alert, { EAlertClass } from "../../components/Alert";
import { AppContext } from "../../context/AppContext";
import { IdentityService } from "../../services/identity-service";

const Register = () => {
    const appState = useContext(AppContext);

    const [registerData, setRegisterData] = useState({ email: '', password: '', firstname: '', lastname: '', userlevel: ''});
    const [alertMessage, setAlertMessage] = useState('');

    const registerClicked = async (e: Event) => {
        e.preventDefault();
        if (registerData.email === '' || registerData.password === '' || registerData.firstname === '' || registerData.lastname === '' || registerData.userlevel === '') {
            setAlertMessage('Empty email or pawwsord!');
        };
        setAlertMessage('');
        let response = await IdentityService.Register('account/register', registerData);
        if (!response.ok) {
            setAlertMessage(response.messages![0]);
        } else {
            setAlertMessage('');
            appState.jwt = response.data!.token;
            appState.firstName = response.data!.firstname;
            appState.lastName = response.data!.lastname;
            appState.setAuthInfo(response.data!.token, response.data!.firstname, response.data!.lastname);
        }
    }

    return (
        <>
            { appState.jwt !== null ? <Redirect to="/" /> : null}
            <h1>Register</h1>
            <form onSubmit={(e) => registerClicked(e.nativeEvent)}>
                <div className="row">
                    <div className="col-md-6">
                        <section>
                            <hr />
                            <Alert show={alertMessage !== ''} message={alertMessage} alertClass={EAlertClass.Danger} />
                            <div className="form-group">
                                <label htmlFor="Input_Email">Email</label>
                                <input value={registerData.email} onChange={e => setRegisterData({ ...registerData, email: e.target.value })} className="form-control" type="email" id="Input_Email" name="Input.Email" placeholder="user@example.com"  autoComplete="username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Password">Password</label>
                                <input value={registerData.password} onChange={e => setRegisterData({ ...registerData, password: e.target.value })} className="form-control" type="password" id="Input_Password" name="Input.Password" placeholder="Input your current password..." autoComplete="current-password" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Firstname">First Name</label>
                                <input value={registerData.firstname} onChange={e => setRegisterData({ ...registerData, firstname: e.target.value })} className="form-control" type="firstname" id="Input_Firstname" name="Input.Firstname" placeholder="Input your first name..." autoComplete="firstname" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Lastname">Last Name</label>
                                <input value={registerData.lastname} onChange={e => setRegisterData({ ...registerData, lastname: e.target.value })} className="form-control" type="lastname" id="Input_Lastname" name="Input.Lastname" placeholder="Input your last name..." autoComplete="lastname" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Input_Userlevel">User Level</label>
                                <input value={registerData.userlevel} onChange={e => setRegisterData({ ...registerData, userlevel: e.target.value })} className="form-control" type="userlevel" id="Input_Userlevel" name="Input.Userlevel" placeholder="Input your user level..." autoComplete="userlevel" />
                            </div>
                            <div className="form-group">
                                <button onClick={(e) => registerClicked(e.nativeEvent)} type="submit" className="btn btn-primary">Register</button>
                            </div>
                        </section>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Register;
