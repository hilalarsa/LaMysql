import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, Snackbar } from '@material-ui/core';
import ReactTable from 'react-table';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper } from 'material-ui';
import Dialog from 'material-ui/Dialog';

import { GroupAdd, Edit, Delete, Search } from '@material-ui/icons';

var par = '';

export default class tabelsampel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datatabel: [],
            deleteId: '',
            countK: '',
            dialog: false
        }
        this.getDataTabel = this.getDataTabel.bind(this);
        this.delTabel = this.delTabel.bind(this);
    }

    componentDidMount() {
        this.getDataTabel();
    }

    getDataTabel() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/tabelsampel/', {
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
                datatabel: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    delTabel = (props) => {
        this.state.deleteId = props;
        this.setState({ dialog: true });
    }

    delDialogClose = () => {
        this.setState({ dialog: false });
        this.deleteTabel();
    };

    delDialogCancel = () => {
        this.state.deleteId = '';
        this.setState({ dialog: false });
    };

    deleteTabel() {
        let self = this;
        console.log(self.state.deleteId);
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/tabelsampel/" + self.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status == 200) {
                self.getDataTabel();
                return response.json();
            } else if (response.status == 500) {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Gagal menghapus tabel'
                })
                console.log(self.state)
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    render() {
        const data = this.state.datatabel
        const columns = [{
            Header: 'Nama Tabel',
            accessor: 'table_name'
        }, {
            Header: 'Kolom',
            accessor: 'kolom',
            // padding: '20 50 20 50'
        }, {
            Header: 'Jumlah Baris',
            accessor: 'table_rows'
        }, {
            Header: '',
            accessor: 'table_name',
            Cell: props => [
                <a href={'#/tabelsampel/detail/' + props.value}><Button variant="fab" mini color="primary"><Search /></Button></a>,
                <Button variant="fab" mini style={{ marginLeft: '10px' }} onClick={() => this.delTabel(props.value)}><Delete /></Button>
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
                            <ToolbarTitle text={'Data Tabel Sampel'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            {localStorage.getItem('role') == 'dosen' || localStorage.getItem('role') == 'superadmin' ? [
                                <a href="#/tabelsampel/insert"><Button variant="raised" color="primary">Tambah Tabel</Button></a>
                            ] : []}
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