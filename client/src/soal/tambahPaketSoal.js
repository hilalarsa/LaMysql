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

export default class tambahPaketSoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            tipe: 'Latihan',
            keterangan: '',
            sbOpen: false,
            sbMsg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.klikSimpan = this.klikSimpan.bind(this);
    }

    componentDidMount() {
        console.log(this.state)
    }

    klikSimpan() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT +'/paketSoal/', {
            method: 'POST',
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
                            <ToolbarTitle text={'Tambah Data Paket Soal'} style={{ paddingLeft: '20px' }} />
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
                                label="Keterangan"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('keterangan')}
                            /><br /><br />
                            <TextField style={{ width: '400px' }}
                                id="tipe"
                                select={true}
                                label="tipe"
                                onChange={this.handleChange('tipe')}
                                value={this.state.tipe}>
                                <MenuItem key='Latihan' value='Latihan' selected={true}>Latihan</MenuItem>
                                <MenuItem key='Kuis' value='Kuis'>Kuis</MenuItem>
                            </TextField><br /><br />
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