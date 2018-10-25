import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, TextField, Snackbar, Select } from '@material-ui/core';
import ReactTable from 'react-table'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper, MenuItem } from 'material-ui';
import MaterialUIForm from 'material-ui-form'

export default class tambahUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '12345',
            // pass: '',
            level: 'dosen',
            nama: '',
            no_induk: '',
            // conf_pass: true,
            sbOpen: false,
            sbMsg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.klikSimpan = this.klikSimpan.bind(this);
    }

    componentDidMount() {
        let self = this;
    }

    klikSimpan() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/user/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify(self.state)
        }).then(function (response) {
            if (response.status > 200) {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Data gagal disimpan'
                })
            } else {
                window.location.href = '#/user/';                
                // console.log(self.state)
            }
        }).catch(err => {
            self.setState({
                sbOpen: true,
                sbMsg: 'Data gagal disimpan'
            })
            console.log('caught it!', err);
        })
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
                            <ToolbarTitle text={'Edit Data User'} style={{ paddingLeft: '20px' }} />
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
                                label="Password (default: 12345)"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('password')}
                                onFocus={() => this.setState({ conf_pass: false })}
                            /><br /><br />
                            <TextField style={{ width: '400px' }}
                                id="level"
                                select={true}
                                label="Level"
                                onChange={this.handleChange('level')}
                                value={this.state.level}>
                                <MenuItem key='Mahasiswa' value='mahasiswa' selected={true}>Mahasiswa</MenuItem>
                                <MenuItem key='Dosen' value='dosen'>Dosen</MenuItem>
                            </TextField><br /><br />
                            <TextField
                                required={true}
                                id="no_induk"
                                value={this.state.no_induk}
                                label="No Induk"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('no_induk')}
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