import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, Snackbar } from '@material-ui/core';
import ReactTable from 'react-table';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper, TextField } from 'material-ui';
import Dialog from 'material-ui/Dialog';

import { GroupAdd, Edit, Delete } from '@material-ui/icons';

var par = '';

export default class nilaiJawaban extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataJwb: [],
            countK: 0,
            dialog: false,
            deleteId: '',
            sbOpen: false,
            sbMsg: ''
        }
        par = (props.match.url).substr(15);
        console.log(par)
        this.getDataJwb = this.getDataJwb.bind(this);
        this.ubahNilai = this.ubahNilai.bind(this);
        this.delDialogClose = this.delDialogClose.bind(this);
        this.delDialogCancel = this.delDialogCancel.bind(this);
    }

    componentDidMount() {
        this.getDataJwb();
    }

    getDataJwb() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/nilai/jawaban/' + par, {
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

    delDialogClose = () => {
        this.setState({ dialog: false });
        this.deleteKelas();
    };

    delDialogCancel = () => {
        this.state.deleteId = '';
        this.setState({ dialog: false });
    };

    ubahNilai = prop => e => {
        let self = this;
        console.log(prop + '-' + e.target.value)
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/nilai/editNilai/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify({
                id: prop,
                nilai: e.target.value
            })
        }).then(function (response) {
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/nilai/editNilaiTotal/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify({
                    id: par
                })
            }).then(function (response) {

            }).catch(err => {
                console.log('caught it!', err);
            })
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    render() {
        const data = this.state.dataKelas
        const columns = [{
            Header: 'Kunci Jawaban',
            accessor: 'k_jwb',
            padding: '20 50 20 50'
        }, {
            Header: 'Jawaban Mhs',
            accessor: 'm_jwb'
        }
            , {
            Header: 'Nilai',
            accessor: 'jawaban',
            Cell: props => [
                <TextField
                    required={true}
                    id="nilai"
                    margin="normal"
                    style={{ width: '50px', textAlign: 'center' }}
                    defaultValue={props.value.substr(props.value.indexOf('-') + 1, props.value.length - 1)}
                    onChange={this.ubahNilai(props.value.substr(0, props.value.indexOf('-')))}
                />
            ]
        }
        ]
        const dialogAct = [
            <Button color="primary" onClick={this.delDialogCancel}>Cancel</Button>,
            <Button color="primary" onClick={this.delDialogClose}>Hapus</Button>,
        ];
        return (
            <div className="container">
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Data Jawaban'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <Button variant='raised' color='primary' onClick={()=>window.location.href='#/nilai'}>Kembali</Button>
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