import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, Snackbar } from '@material-ui/core';
import ReactTable from 'react-table';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper } from 'material-ui';
import Dialog from 'material-ui/Dialog';

import { GroupAdd, Edit, Delete } from '@material-ui/icons';

var par = '';

export default class dataJadwal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataJadwal: [],
            countK: 0,
            dialog: false,
            deleteId: '',
            sbOpen: false,
            sbMsg: ''
        }
        this.getDataJadwal = this.getDataJadwal.bind(this);
        this.delJadwal = this.delJadwal.bind(this);
        this.delDialogClose = this.delDialogClose.bind(this);
        this.delDialogCancel = this.delDialogCancel.bind(this);
    }

    componentDidMount() {
        let self = this;
        if (localStorage.getItem('role') == 'superadmin')
            self.getDataJadwal('superadmin')
        else
            self.getDataJadwal(localStorage.getItem('no_induk'))
    }

    getDataJadwal(nip) {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/jadwal/'+nip, {
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
                dataJadwal: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    delJadwal = (props) => {
        console.log(props);
        this.state.deleteId = props;
        this.setState({ dialog: true });
    }

    delDialogClose = () => {
        this.setState({ dialog: false });
        this.deleteKelas();
    };

    delDialogCancel = () => {
        this.state.deleteId = '';
        this.setState({ dialog: false });
    };

    deleteKelas() {
        let self = this;
        console.log(this.state.deleteId);
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/jadwal/" + this.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status > 200) {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Data jadwal masih digunakan'
                })
                console.log(self.state)
            } else if (response.status == 200) {
                self.getDataKelas();
                return response.json();
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    render() {
        const data = this.state.dataJadwal
        const columns = [{
            Header: 'Tanggal Mulai',
            accessor: 'tanggal_mulai'
        }, {
            Header: 'Tanggal Selesai',
            accessor: 'tanggal_selesai'
        }, {
            Header: 'Waktu Mulai',
            accessor: 'waktu_mulai'
        }, {
            Header: 'Waktu Selesai',
            accessor: 'waktu_selesai'
        }, {
            Header: 'Paket Soal',
            accessor: 'paket'
        }, {
            Header: 'Kelas',
            accessor: 'kelas'
        }, {
            Header: 'Keterangan',
            accessor: 'keterangan'
        }, {
            Header: '',
            accessor: 'id',
            Cell: props => [
                <a href={'#/jadwal/' + props.value} style={{ marginLeft: '10px' }}><Button variant="fab" mini color="secondary"><Edit /></Button></a>,
                <Button variant="fab" mini style={{ marginLeft: '10px' }} onClick={() => this.delJadwal(props.value)}><Delete /></Button>
            ]
        }]
        const dialogAct = [
            <Button color="primary" onClick={this.delDialogCancel}>Cancel</Button>,
            <Button color="primary" onClick={this.delDialogClose}>Hapus</Button>,
        ];
        return (
            <div className="container">
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Data Jadwal'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/jadwal/insert"><Button variant="raised" color="primary">
                                Tambah Jadwal
                            </Button></a>
                        </ToolbarGroup>
                    </Toolbar>
                    <ReactTable style={{ textAlign: 'center' }}
                        data={data}
                        columns={columns}
                        defaultPageSize={5}
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