import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup } from '@material-ui/core';
import ReactTable from 'react-table'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper } from 'material-ui';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Home, ThreeDRotation } from '@material-ui/icons';
import HomeIcon from 'material-ui/svg-icons/action/home';
import TabelIcon from 'material-ui/svg-icons/device/storage';
import KelasIcon from 'material-ui/svg-icons/social/group';
import PaketIcon from 'material-ui/svg-icons/action/assignment';
import SoalIcon from 'material-ui/svg-icons/action/description';
import JadwalIcon from 'material-ui/svg-icons/editor/insert-invitation';
import NilaiIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import UserIcon from 'material-ui/svg-icons/social/person';

var par = '';

export default class dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            level: localStorage.getItem('role'),
            activeSession: [],
            profile: []
        }
        // this.getDataasMhs = this.getDataasMhs.bind(this);
    }

    componentDidMount() {
        let self = this;
        // console.log(localStorage.getItem('role'));
        if (self.state.level === 'dosen' || self.state.level === 'superadmin') {
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/login/getDataEdit/' + localStorage.getItem('no_induk'), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({ userData: data });
                var prof = []
                prof.push(data[0])
                self.setState({ profile: prof });
                // console.log(self.state.profile)
            }).catch(err => {
                console.log('caught it!', err);
            })
        } else if (self.state.level === 'mahasiswa') {
            console.log('im student')
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/login/getDataasMhs/' + localStorage.getItem('no_induk'), {
                method: 'GET'
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({ userData: data });
                self.state.profile.push(data[0])

                fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/login/getActiveSess/' + self.state.userData[0].id_kelas, {
                    method: 'GET'
                }).then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                }).then(function (dataSess) {
                    self.setState({ activeSession: dataSess });
                    console.log(self.state.activeSession)
                }).catch(err => {
                    console.log('caught it!', err);
                })
            }).catch(err => {
                console.log('caught it!', err);
            })
        }
    }

    render() {
        const data = this.state.activeSession;
        const columns = [{
            Header: 'Tanggal Mulai',
            accessor: 'tgl_mulai'
        }, {
            Header: 'Tanggal Selesai',
            accessor: 'tgl_selesai'
        }, {
            Header: 'Waktu Mulai',
            accessor: 'waktu_mulai'
        }, {
            Header: 'Waktu Selesai',
            accessor: 'waktu_selesai'
        }, {
            Header: 'Keterangan',
            accessor: 'keterangan'
        }, {
            Header: '',
            Cell: props => <a href='#'><RaisedButton>Start</RaisedButton></a> // Custom cell components!
        }]
        // console.log(this.state.userData)

        return (
            <div className="container">
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Selamat Datang'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{ padding: '30px' }}>
                        {this.state.userData.map(member =>
                            <table>
                                <tr>
                                    <td style={{ width: '150px' }}>Username</td>
                                    <td style={{ width: '20px' }}>:</td>
                                    <td>{member.username}</td>
                                </tr>
                                <tr>
                                    <td>Nama</td>
                                    <td>:</td>
                                    <td>{member.nama}</td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50px' }}>No. Induk</td>
                                    <td>:</td>
                                    <td>{member.no_induk}</td>
                                </tr>
                            </table>
                        )}
                        <br /><br /><a href="#/dashboard/edit"><Button variant="raised" color="primary">
                            Edit Data
                            </Button></a>
                    </div>
                    {localStorage.getItem('role') == 'dosen' ? [
                        <div>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography><b><TabelIcon /> Tabel Sampel</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Tabel sampel adalah tabel yang digunakan sebagai target untuk mengeksekusi query.
                                        Dosen dapat menambahkan tabel baru dengan cara mengisi query create table dan insert.
                                        Dosen juga dapat menghapus tabel yang ada.
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography><b><KelasIcon /> Kelas</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Data kelas dibuat oleh dosen. Kelas ini nantinya menentukan siapa yang dapat mengikuti sesi jadwal.
                                        Dosen harus menambahkan NIM dari mahasiswa yang
                                        akan mengikuti kelasnya. Dosen harus mengelola data kelas sebelum membuat jadwal.
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography><b><SoalIcon /> Soal</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Data soal adalah data yang nantinya dapat dikelompokkan menjadi paket soal.
                                        Pada data soal terdapat teks soal, query jawaban, upload gambar serta
                                        memilih tabel sampel yang digunakan. Satu soal dapat digunakan pada banyak
                                        paket soal.
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography><b><PaketIcon /> Paket Soal</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Paket Soal digunakan untuk mengelompokkan soal. Paket soal nantinya dipilih pada saat membuat jadwal.
                                        Satu paket soal dapat digunakan pada banyak jadwal.
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography><b><JadwalIcon /> Jadwal</b></Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        Jadwal digunakan untuk mengatur waktu pengerjaan kuis/latihan mahasiswa.
                                        Satu jadwal dapat diikuti oleh banyak kelas, selama kelas tersebut merupakan
                                        kelas yang dibuat oleh Anda.
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    ]:[]}
                </Paper>
            </div>
        )
    }
}