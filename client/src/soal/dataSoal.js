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

export default class dataSoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSoal: [],
            countK: 0,
            dialog: false,
            deleteId: '',
            sbOpen: false,
            sbMsg: ''
        }
        this.getDataSoal = this.getDataSoal.bind(this);
        this.delSoal = this.delSoal.bind(this);
        this.delDialogClose = this.delDialogClose.bind(this);
        this.delDialogCancel = this.delDialogCancel.bind(this);
    }

    componentDidMount() {
        this.getDataSoal();
    }

    getDataSoal() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/soal/', {
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
                dataSoal: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    delSoal = (props) => {
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
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/soal/" + this.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status == 200) {
                self.getDataSoal();
                return response.json();
            } else if (response.status == 500) {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Data soal masih digunakan'
                })
                console.log(self.state)
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    render() {
        const data = this.state.dataSoal
        const columns = [{
            Header: 'ID',
            accessor: 'id',
        }, {
            Header: 'Text Soal',
            accessor: 'text_soal',
            // width: '35%'
        }, {
            Header: 'Gambar',
            accessor: 'gambar',
            // width: '10%'
        }, {
            Header: 'Text Jawaban',
            accessor: 'text_jawaban',
            // width: '30%'
        }, {
            Header: 'Tabel Soal',
            accessor: 'namatabelsoal',
            // width: '30%'
        }, {
            Header: '',
            accessor: 'id',
            // width: '20%',
            Cell: props => [
                <a href={'#/soal/' + props.value} style={{ marginLeft: '10px' }}><Button variant="fab" mini color="secondary"><Edit /></Button></a>,
                <Button variant="fab" mini style={{ marginLeft: '10px' }} onClick={() => this.delSoal(props.value)}><Delete /></Button>
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
                            <ToolbarTitle text={'Data Soal'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/soal/insert"><Button variant="raised" color="primary">
                                Tambah Soal
                            </Button></a>
                        </ToolbarGroup>
                    </Toolbar>
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