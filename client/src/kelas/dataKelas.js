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

export default class dataKelas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataKelas: [],
            countK: 0,
            dialog: false,
            deleteId: '',
            sbOpen: false,
            sbMsg: ''
        }
        this.getDataKelas = this.getDataKelas.bind(this);
        this.delKelas = this.delKelas.bind(this);
        this.deleteKelas = this.deleteKelas.bind(this);
        this.delDialogClose = this.delDialogClose.bind(this);
        this.delDialogCancel = this.delDialogCancel.bind(this);
    }

    componentDidMount() {
        this.getDataKelas();
    }

    getDataKelas() {
        let self = this;
        if (localStorage.getItem('role') == 'superadmin') {
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kelas/superadmin', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({
                    countK: data.length,
                    dataKelas: data
                });
            }).catch(err => {
                console.log('caught it!', err);
            })
        } else {
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kelas/' + localStorage.getItem('no_induk'), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({
                    countK: data.length,
                    dataKelas: data
                });
            }).catch(err => {
                console.log('caught it!', err);
            })
        }
    }

    delKelas = (props) => {
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
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/kelas/" + this.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status == 200) {
                self.getDataKelas();
                return response.json();
            } else if (response.status == 500) {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Data kelas masih digunakan'
                })
                console.log(self.state)
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    render() {
        const data = this.state.dataKelas
        const columns = [{
            Header: 'Kelas',
            accessor: 'id_kelas',
            padding: '20 50 20 50'
        }, {
            Header: 'Semester',
            accessor: 'semester'
        }, {
            Header: '',
            accessor: 'id_kelas',
            Cell: props => [
                <a href={'#/mhsKelas/' + props.value}><Button variant="fab" mini color="primary"><GroupAdd /></Button></a>,
                <a href={'#/kelas/' + props.value} style={{ marginLeft: '10px' }}><Button variant="fab" mini color="secondary"><Edit /></Button></a>,
                <Button variant="fab" mini style={{ marginLeft: '10px' }} onClick={() => this.delKelas(props.value)}><Delete /></Button>
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
                            <ToolbarTitle text={'Data Kelas'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            {localStorage.getItem('role')=='dosen' ? [
                                <a href="#/kelas/insert"><Button variant="raised" color="primary">
                                Tambah Kelas
                            </Button></a>
                            ]:[]}
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