import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, TextField, Snackbar, Select, FormHelperText } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactTable from 'react-table'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper, MenuItem } from 'material-ui';
import MaterialUIForm from 'material-ui-form';
import Dialog from 'material-ui/Dialog';

import { GroupAdd, Edit, Delete } from '@material-ui/icons';

var par = '';

export default class dataNilai extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataNilai: [],
            dataKelas: [],
            dataJadwal: [],
            countK: 0,
            dialog: false,
            deleteId: '',
            sbOpen: false,
            sbMsg: '',
            id_jadwal: '',
            jadwal: '',
            kelas: '',
            role: localStorage.getItem('role')
        }
        this.getDataNilai = this.getDataNilai.bind(this);
        this.delNilai = this.delNilai.bind(this);
        this.delDialogClose = this.delDialogClose.bind(this);
        this.delDialogCancel = this.delDialogCancel.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.getNilaiasMhs = this.getNilaiasMhs.bind(this);
    }

    componentDidMount() {
        var role = this.state.role;
        if (role === 'dosen') {
            this.getJadwal(localStorage.getItem('no_induk'));
        } else if (role == 'superadmin') {
            this.getJadwal('superadmin');
        } else if (role == 'mahasiswa') {
            this.getNilaiasMhs();
        }
    }

    getDataNilai(id_jadwal) {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/nilai/' + id_jadwal, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            // console.log(self.state)
            self.setState({
                countK: data.length,
                dataNilai: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getJadwal(nip) {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/nilai/jadwal/' + nip, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            // console.log(data)
            self.setState({
                dataJadwal: data,
                id_jadwal: data[0].id,
                jadwal: data[0].jadwal,
            });
            self.getDataNilai(data[0].id);
        }).catch(err => {
            console.log('caught it!', err);
        })
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kelas/' + nip, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            // console.log(data)
            self.setState({
                dataKelas: data,
                kelas: data[0].id_kelas
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getNilaiasMhs() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/nilai/mhs/' + localStorage.getItem('no_induk'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({
                countK: data.length,
                dataNilai: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
        console.log(self.state);
    }

    delNilai = (props) => {
        console.log(props);
        this.state.deleteId = props;
        this.setState({ dialog: true });
    }

    delDialogClose = () => {
        this.setState({ dialog: false });
        this.deleteSoal();
    };

    delDialogCancel = () => {
        this.state.deleteId = '';
        this.setState({ dialog: false });
    };

    deleteSoal() {
        let self = this;
        console.log(this.state.deleteId);
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/nilai/" + this.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status == 200) {
                // window.location = "/#/nilai";
                self.componentDidMount();
                return response.json();
            } else if (response.status == 500) {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Data soal masih digunakan'
                })
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    changeFilter = prop => e => {
        let self = this;
        console.log(prop + "//" + e.target.value)
        self.setState({
            [prop]: e.target.value
        })
        // for (var i = 0; i < self.state.dataJadwal.length; i += 1) {
        //     if (self.state.dataJadwal[i].id == e.target.value) {
        //         this.setState({
        //             jadwal: self.state.dataJadwal[i].jadwal
        //         })
        //     }
        // }
        self.getDataNilai(e.target.value);
        console.log(self.state)
    }

    render() {
        const data = this.state.dataNilai;
        let columns = [];
        if (this.state.role == 'dosen') {
            columns = [{
                Header: 'NIM',
                accessor: 'nim'
            }, {
                Header: 'Nama',
                accessor: 'nama'
            }, {
                Header: 'Nilai',
                accessor: 'nilai'
            }, {
                Header: '',
                accessor: 'id_event',
                Cell: props => [
                    <a href={'#/nilai/jawaban/' + props.value} style={{ marginLeft: '10px' }}><Button variant="fab" mini color="secondary"><Edit /></Button></a>
                ]
            }]
            // } else if (this.state.role == 'mahasiswa' ) {
        } else {
            columns = [{
                Header: 'Kelas',
                accessor: 'kelas'
            }, {
                Header: 'NIM',
                accessor: 'nim'
            }, {
                Header: 'Jadwal',
                accessor: 'jadwal'
            }, {
                Header: 'Nilai',
                accessor: 'nilai'
            }]
        }
        const dialogAct = [
            <Button color="primary" onClick={this.delDialogCancel}>Cancel</Button>,
            <Button color="primary" onClick={this.delDialogClose}>Hapus</Button>,
        ];
        return (
            <div className="container">
                <Paper>
                    {localStorage.getItem('role') == 'dosen' || localStorage.getItem('role') == 'superadmin' ?
                        [
                            <div>
                                <Toolbar style={{ background_color: '#000' }}>
                                    <ToolbarGroup firstChild={true}>
                                        <ToolbarTitle text={'Data Nilai'} style={{ paddingLeft: '20px' }} />
                                    </ToolbarGroup>
                                </Toolbar>
                                <Toolbar style={{ background_color: '#000' }}>
                                    <ToolbarGroup>
                                        <TextField style={{ width: '150px' }}
                                            required={true}
                                            select={true}
                                            label="Kelas"
                                            onChange={this.changeFilter('kelas')}
                                            value={this.state.kelas}>
                                            {this.state.dataKelas.map(member =>
                                                <MenuItem key={member.id_kelas} value={member.id}>{member.id_kelas}</MenuItem>
                                            )}
                                        </TextField>
                                        <TextField style={{ width: '300px', marginLeft: '20px' }}
                                            required={true}
                                            select={true}
                                            label="Jadwal"
                                            onChange={this.changeFilter('id_jadwal')}
                                            value={this.state.id_jadwal}>
                                            {this.state.dataJadwal.map(member =>
                                                // {
                                                member.kelas == this.state.kelas ? [
                                                    <MenuItem key={member.id} value={member.id}>{member.jadwal}</MenuItem>
                                                ] : null
                                                // }
                                            )}
                                        </TextField>
                                        <ToolbarSeparator />
                                        <Button variant="raised" color="primary"
                                            style={{ float: 'right' }}
                                            onClick={() => this.delNilai(this.state.id_jadwal)}
                                        >
                                            Hapus Nilai</Button>
                                        {/* <Button variant="raised" color="primary" onClick={this.delNilai(this.state.id_jadwal)}>
                                Hapus Nilai
                            </Button> */}
                                    </ToolbarGroup>
                                </Toolbar>
                            </div>
                        ] : [
                            <Toolbar style={{ background_color: '#000' }}>
                                <ToolbarGroup firstChild={true}>
                                    <ToolbarTitle text={'Daftar Nilai'} style={{ paddingLeft: '20px' }} />
                                </ToolbarGroup>
                            </Toolbar>
                        ]}

                    <ReactTable style={{ textAlign: 'center' }}
                        data={data}
                        columns={columns}
                        defaultPageSize={10}
                        className="-highlight"
                    />

                </Paper>
                <Dialog
                    actions={dialogAct}
                    modal={false}
                    open={this.state.dialog}
                    onRequestClose={this.delDialogCancel}
                >Hapus data?</Dialog>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.sbOpen}
                    message={this.state.sbMsg}
                    onClose={this.handleClose}
                />
            </div>
        )
    }
}