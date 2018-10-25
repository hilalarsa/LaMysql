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

export default class dataUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUser: [],
            countK: 0,
            dialog: false,
            deleteId: '',
            sbOpen: false,
            sbMsg: ''
        }
        this.getDataUser = this.getDataUser.bind(this);
        this.delUser = this.delUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.delDialogClose = this.delDialogClose.bind(this);
        this.delDialogCancel = this.delDialogCancel.bind(this);
    }

    componentDidMount() {
        this.getDataUser();
    }

    getDataUser() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/user/', {
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
                dataUser: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    delUser = (props) => {
        console.log(props);
        this.state.deleteId = props;
        this.setState({ dialog: true });
    }

    delDialogClose = () => {
        this.setState({ dialog: false });
        this.deleteUser();
    };

    delDialogCancel = () => {
        this.state.deleteId = '';
        this.setState({ dialog: false });
    };

    deleteUser() {
        let self = this;
        console.log(this.state.deleteId);
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/user/" + this.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status == 200) {
                self.getDataUser();
                return response.json();
            } else if (response.status == 500) {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Data user masih digunakan'
                })
                console.log(self.state)
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    render() {
        const data = this.state.dataUser
        const columns = [{
            Header: 'Username',
            accessor: 'username'
        }, {
            Header: 'No Induk',
            accessor: 'no_induk'
        }, {
            Header: 'Nama',
            accessor: 'nama'
        }, {
            Header: 'Level',
            accessor: 'level'
        }, {
            Header: '',
            accessor: 'username',
            Cell: props => [
                <a href={'#/user/' + props.value} style={{ marginLeft: '10px' }}><Button variant="fab" mini color="secondary"><Edit /></Button></a>,
                <Button variant="fab" mini style={{ marginLeft: '10px' }} onClick={() => this.delUser(props.value)}><Delete /></Button>
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
                            <ToolbarTitle text={'Data User'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/user/insert"><Button variant="raised" color="primary">
                                Tambah User
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