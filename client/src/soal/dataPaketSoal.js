import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, Snackbar } from '@material-ui/core';
import ReactTable from 'react-table';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import SoalIcon from 'material-ui/svg-icons/action/description';

import { GroupAdd, Edit, Delete } from '@material-ui/icons';

var par = '';

export default class dataPaketSoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataPaketSoal: [],
            countK: 0,
            dialog: false,
            deleteId: '',
            sbOpen: false,
            sbMsg: ''
        }
        this.getDataPaketSoal = this.getDataPaketSoal.bind(this);
        this.delPaketSoal = this.delPaketSoal.bind(this);
        this.deletePaketSoal = this.deletePaketSoal.bind(this);
        this.delDialogClose = this.delDialogClose.bind(this);
        this.delDialogCancel = this.delDialogCancel.bind(this);
    }

    componentDidMount() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/paketSoal/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            for (var i = 0; i < data.length; i += 1) {
                self.setState({ [data[i].no]: i })
            }
            self.setState({
                countK: data.length,
                dataPaketSoal: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
        console.log(self.state)

    }

    getDataPaketSoal() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/paketSoal/', {
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
                dataPaketSoal: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    delPaketSoal = (props) => {
        console.log(props);
        this.state.deleteId = props;
        this.setState({ dialog: true });
    }

    delDialogClose = () => {
        this.setState({ dialog: false });
        this.deletePaketSoal();
    };

    delDialogCancel = () => {
        this.state.deleteId = '';
        this.setState({ dialog: false });
    };

    deletePaketSoal() {
        let self = this;
        console.log(self.state.deleteId);
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/paketSoal/" + this.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
        }).then(function (response) {
            if (response.status == 200) {
                self.getDataPaketSoal();
                return response.json();
            } else if (response.status == 500) {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Data paket soal masih digunakan'
                })
                console.log(self.state)
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    render() {
        const data = this.state.dataPaketSoal;
        var i = 1;
        const columns = [
            {
                Header: 'Keterangan',
                accessor: 'keterangan'
            }, {
                Header: 'Tipe',
                accessor: 'tipe'
            }, {
                Header: 'Jumlah Soal',
                accessor: 'jumlah_soal'
            }, {
                Header: '',
                accessor: 'id',
                Cell: props => [
                    <a href={'#/kontainerSoal/' + props.value} style={{ marginLeft: '10px' }}><Button variant="fab" mini color="primary" title="Data Soal"><SoalIcon /></Button></a>,
                    <a href={'#/paketSoal/' + props.value} style={{ marginLeft: '10px' }}><Button variant="fab" mini color="secondary"><Edit /></Button></a>,
                    <Button variant="fab" mini style={{ marginLeft: '10px' }} onClick={() => this.delPaketSoal(props.value)}><Delete /></Button>
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
                            <ToolbarTitle text={'Data Paket Soal'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/paketSoal/insert"><Button variant="raised" color="primary">
                                Tambah Paket Soal
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