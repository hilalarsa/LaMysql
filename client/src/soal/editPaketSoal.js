import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, TextField, Snackbar, Select } from '@material-ui/core';
import ReactTable from 'react-table'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper, MenuItem } from 'material-ui';
import MaterialUIForm from 'material-ui-form'

var par = '';

export default class editPaketSoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            tipe: 'Latihan',
            keterangan: '',
            sbOpen: false,
            sbMsg: ''
        }
        par = (props.match.url).substr(11);
        this.handleChange = this.handleChange.bind(this);
        this.klikSimpan = this.klikSimpan.bind(this);
    }

    componentDidMount() {
        let self = this;
        console.log(par);
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/paketSoal/' + par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({
                id: data[0].id,
                tipe: data[0].tipe,
                keterangan: data[0].keterangan
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
        console.log(self.state)
    }

    klikSimpan() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/paketSoal/' + par, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify(self.state)
        }).then(function (response) {
            if (response.status == 200) {
                window.location.href = '#/paketSoal/';
            } else {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Data Paket sudah ada'
                })
                console.log(self.state)
            }
        }).catch(err => {
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
                            <ToolbarTitle text={'Edit Data Paket Soal'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/paketSoal/"><RaisedButton>Kembali</RaisedButton></a>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{ margin: '20px' }}>
                        <MaterialUIForm onSubmit={this.klikSimpan}>
                            <TextField
                                required={true}
                                id="keterangan"
                                value={this.state.keterangan}
                                label="Keterangan"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('keterangan')}
                            /><br /><br />
                            {this.state.tipe === 'Latihan' ? [
                                <TextField style={{ width: '400px' }}
                                    id="tipe"
                                    select={true}
                                    label="Tipe"
                                    onChange={this.handleChange('tipe')}
                                    value={this.state.tipe}>
                                    <MenuItem key='Latihan' value='Latihan' selected={true}>Latihan</MenuItem>
                                    <MenuItem key='Kuis' value='Kuis'>Kuis</MenuItem>
                                </TextField>
                            ] : [
                                    <TextField style={{ width: '400px' }}
                                        id="tipe"
                                        select={true}
                                        label="Tipe"
                                        onChange={this.handleChange('tipe')}
                                        value={this.state.tipe}>
                                        <MenuItem key='Latihan' value='Latihan'>Latihan</MenuItem>
                                        <MenuItem key='Kuis' value='Kuis' selec>Kuis</MenuItem>
                                    </TextField>
                                ]}
                            <br /><br />
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