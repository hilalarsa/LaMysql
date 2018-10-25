import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, TextField, Snackbar, Select } from '@material-ui/core';
import ReactTable from 'react-table'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper, MenuItem } from 'material-ui';
import MaterialUIForm from 'material-ui-form'

export default class editUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: localStorage.getItem('no_induk'),
            username: '',
            password: '',
            pass: '',
            nama: '',
            conf_pass: true,
            sbOpen: false,
            sbMsg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.klikSimpan = this.klikSimpan.bind(this);
    }

    componentDidMount() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/login/getDataEdit/' + self.state.id, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({
                username: data[0].username,
                password: data[0].password,
                pass: data[0].password,
                nama: data[0].nama
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
        console.log(self.state)
    }

    klikSimpan() {
        let self = this;
        if (self.state.password === self.state.pass) {
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/login/editUser/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(self.state)
            }).then(function (response) {
                if (response.status == 200) {
                    window.location.href = '#/dashboard/';
                } else {
                    self.setState({
                        sbOpen: true,
                        sbMsg: 'Data gagal disimpan'
                    })
                    // console.log(self.state)
                }
            }).catch(err => {
                console.log('caught it!', err);
            })
        }else{
            self.setState({
                sbOpen: true,
                sbMsg: 'Konfirmasi Password Kembali'
            })
        }
    }

    handleChange = prop => e => {
        this.setState({
            [prop]: e.target.value
        })
    }

    handleClose = () => {
        this.setState({ sbOpen: false });
    };

    render() {
        return (
            <div className="container">
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Edit Data Paket Soal'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/dashboard/"><RaisedButton>Kembali</RaisedButton></a>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{ margin: '20px' }}>
                        <MaterialUIForm onSubmit={this.klikSimpan}>
                            <TextField
                                required={true}
                                id="username"
                                value={this.state.username}
                                label="Username"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('username')}
                            /><br /><br />
                            <TextField
                                required={true}
                                id="password"
                                type='password'
                                value={this.state.password}
                                label="Password"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('password')}
                                onFocus={() => this.setState({ conf_pass: false })}
                            /><br /><br />
                            <TextField
                                type='password'
                                required={true}
                                disabled={this.state.conf_pass}
                                id="conf_password"
                                value={this.state.pass}
                                label="Password"
                                margin="normal"
                                onChange={this.handleChange('pass')}
                                style={{ width: '400px' }}
                            /><br /><br />
                            <TextField
                                required={true}
                                id="nama"
                                value={this.state.nama}
                                label="Nama"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('nama')}
                            /><br /><br />
                            <Button variant="raised" type="submit">Simpan</Button><br /><br />
                        </MaterialUIForm>
                        <Snackbar
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                            open={this.state.sbOpen}
                            message={this.state.sbMsg}
                            onClose={this.handleClose}
                        />
                    </div>
                </Paper>
            </div >
        )
    }
}