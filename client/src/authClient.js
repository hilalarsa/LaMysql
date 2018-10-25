import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'admin-on-rest';
import authSession from './authSession';
import decodeJwt from '../node_modules/jwt-decode';

export default (type, params) => {
    // called when the user attempts to log in
    console.log(type);
    if (type === AUTH_LOGIN) {
        const { username, password } = params;

        const request = new Request(`http://localhost:5000/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        })
        console.log(request)
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    console.log('error')
                    throw new Error("Wrong username and password combination");
                }
                return response.json();
            })
            .then((data) => {
                const decodedToken = decodeJwt(data.token);
                // console.log(decodedToken)
                localStorage.setItem('token', data.token);
                localStorage.setItem('role', decodedToken.payload[0].role);
                localStorage.setItem('no_induk', decodedToken.payload[0].no_induk);

                // console.log(localStorage.getItem('token'))
                // console.log(localStorage.getItem('role'))
            })
            .catch((err) => {
                console.log("Error")
                return Promise.reject('Username atau password salah');
                console.log(err);
            })
        return Promise.resolve();
    }

    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        console.log(params)
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('no_induk');
        return Promise.resolve();
    }

    // called when the API returns an error
    if (type === AUTH_ERROR) {
        console.log(params)
        const { status } = params;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('no_induk');
            // authSession.setUsername("");
            return Promise.reject('Username atau password salah');
        }
        return Promise.resolve();
    }
    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject(); //cek apakah token masih berlaku
    }

    if (type === AUTH_GET_PERMISSIONS) {
        const role = localStorage.getItem('role');
        // if(role==null){
        //     console.log("role null");
        //     return Promise.reject('Not authorized')
        // }else{
        // console.log("ini role dari get permission"+role)
        return Promise.resolve(role);
        // }
    }
    return Promise.reject('Unknown method');
};