import { HardwareRouter } from 'material-ui';

import React from 'react';
// import { jsonServerRestClient, Admin, Resource, Delete } from 'admin-on-rest';
import {
    Admin, Resource, Delete, fetchUtils, simpleRestClient
} from 'admin-on-rest';
import restClient from './restClient';
import Menu from './menu';
import authClient from './authClient';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
//icons
import PostIcon from 'material-ui/svg-icons/action/book';
import KelasIcon from 'material-ui/svg-icons/action/perm-contact-calendar';
import StorageIcon from 'material-ui/svg-icons/device/storage';
import ListIcon from 'material-ui/svg-icons/action/view-list';

// import { PostList } from './posts';
import dashboard from '../src/dashboard/Dashboard'
import {
    dataKelas
} from './kelas/dataKelas';
import {
    listTabel,
    insertTabel
} from './tabelsampel/tabelsampel';
import {
    postPaketSoal,
    editPaketSoal,
    insertPaketSoal,
    postSoal,
    insertSoal
} from './dataSoal';

import {
    postJadwal,
    editJadwal,
    insertJadwal
} from './jadwal';

import {
    listSesi
} from './jadwalsesi/jadwalSesi';

import {
    listKuis
} from './kuis/kuis';
import {
    listLatihan
} from './latihan/latihan';

import customRoutes from './customButton/customRoutes';
import {
    cyan500, cyan700,
    pinkA200,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';
import spacing from 'material-ui/styles/spacing';
import detailTabelSampel from './tabelsampel/detailTabelSampel';
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    console.log("Header set!");
    options.headers.set(`Authorization`, `Bearer ${token}`)
    console.log(options.headers)
    return fetchUtils.fetchJson(url, options);
}

const restClients = restClient(process.env.REACT_APP_SERVER_ENDPOINT, httpClient);
console.log("Process ENV REACT_APP_SERVER_ENDPOINT", process.env.REACT_APP_SERVER_ENDPOINT)


const muiTheme = getMuiTheme({
    spacing: spacing,
    fontFamily: 'Montserrat, sans-serif',
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        primary: '#000000'
    },
    appBar: {
        height: 20,
    },
});

const THEME = createMuiTheme({
    appBar: {
        height: 10,
    },
    typography: {
        fontFamily: '"Montserrat", sans-serif',
    },
});

const App = () => (
    <Admin title="Sistem Informasi Online Judge Teknologi Informasi"
        authClient={authClient}
        restClient={restClients}
        customRoutes={customRoutes}
        muiTheme={getMuiTheme(muiTheme)}
        menu={Menu}>

        <Resource name="dashboard" />
        <Resource name="kelas" />
        <Resource name="mhsKelas" />
        <Resource name="soal" />

        <Resource name="tabelsampel" />

        <Resource name="kelas" />

        <Resource name="paketSoal" />

        <Resource name="jadwal" />

        <Resource name="jadwalSesi" 
        list={listSesi} />

        <Resource name="tabelsampel" />

        <Resource name="jadwal" />

        <Resource name="kuis"
            list={listKuis}
        />

        <Resource name="latihan"
            list={listLatihan}
        />

        <Resource name="nilai" />
    </Admin>
);

export default App;