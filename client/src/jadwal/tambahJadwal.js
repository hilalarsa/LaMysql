import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, TextField, Snackbar, Select, FormHelperText } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactTable from 'react-table'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper, MenuItem } from 'material-ui';
import MaterialUIForm from 'material-ui-form'

var par = '';

export default class tambahJadwal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tanggal_mulai: '',
            tanggal_selesai: '',
            waktu_mulai: '',
            waktu_selesai: '',
            paketSoal: '',
            keterangan: '',
            kelas: [],
            dataPaketSoal: [],
            dataKelas: [],
            sbOpen: false,
            sbMsg: '',
            tabelSoal: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.simpanJadwal = this.simpanJadwal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.sendKelas = this.sendKelas.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        let self = this;
        if (localStorage.getItem('role') == 'superadmin')
            self.getData('superadmin')
        else
            self.getData(localStorage.getItem('no_induk'))
    }

    getData(nip) {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kelas/' + nip, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ dataKelas: data })
            console.log(self.state.tabelSoal)
        }).catch(err => {
            console.log('caught it!', err);
        })
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/paketSoal', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ dataPaketSoal: data })
            console.log(self.state.tabelSoal)
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    simpanJadwal() {
        let self = this;
        if (self.state.kelas.length == 0) {
            self.setState({
                sbOpen: true,
                sbMsg: 'Pilih kelas partisipan'
            })
        } else {
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/jadwal/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify({
                    tanggal_mulai: self.state.tanggal_mulai,
                    tanggal_selesai: self.state.tanggal_selesai,
                    waktu_mulai: self.state.waktu_mulai,
                    waktu_selesai: self.state.waktu_selesai,
                    id_kontainer: self.state.paketSoal,
                    keterangan: self.state.keterangan,
                    kelas: self.state.kelas
                })
            }).then(function (response) {
                if (response.status >= 400) {
                    self.setState({
                        sbOpen: true,
                        sbMsg: 'Penyimpanan gagal'
                    })
                } else {
                    console.log('send next')
                    self.sendKelas();
                    window.location.href = '#/jadwal/';
                }
            }).catch(err => {
                console.log('caught it!', err);
            })
        }
    }

    sendKelas() {
        let self = this;
        for (var i = 0; i < self.state.kelas.length; i += 1) {
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/jadwal/kelas/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                // headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    kelas: self.state.kelas[i]
                })
            }).then(function (response) {
                // if (response.status == 200) {
                //     window.location.href = '#/paketSoal/';
                // } else {
                //     self.setState({
                //         sbOpen: true,
                //         sbMsg: 'Penyimpanan gagal'
                //     })
                // }
            }).catch(err => {
                console.log('caught it!', err);
            })
        }
    }

    handleChange = prop => e => {
        console.log(prop + "//" + e.target.value)
        this.setState({
            [prop]: e.target.value
        })
    }

    handleClose = () => {
        this.setState({ sbOpen: false });
    };

    handleCheck(e) {
        const options = this.state.kelas;
        let index;
        if (e.target.checked) {
            options.push(e.target.value)
        } else {
            index = options.indexOf(+e.target.value)
            options.splice(index, 1)
        }
        this.setState({ kelas: options })
    }

    render() {
        return (
            <div className="container" >
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Tambah Data Jadwal'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/jadwal"><RaisedButton>Kembali</RaisedButton></a>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{ margin: '20px' }}>
                        <MaterialUIForm onSubmit={this.simpanJadwal}>
                            <TextField
                                required={true}
                                id="tanggal_mulai"
                                label="Tanggal Mulai"
                                margin="normal"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ width: '30%', margin: '20px' }}
                                onChange={this.handleChange('tanggal_mulai')}
                            />
                            <TextField
                                required={true}
                                id="tanggal_selesai"
                                label="Tanggal Selesai"
                                margin="normal"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                style={{ width: '30%', margin: '20px' }}
                                onChange={this.handleChange('tanggal_selesai')}
                            />
                            <TextField
                                required={true}
                                id="waktu_mulai"
                                label="Waktu Mulai"
                                margin="normal"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                style={{ width: '30%', margin: '20px' }}
                                onChange={this.handleChange('waktu_mulai')}
                            />
                            <TextField
                                required={true}
                                id="waktu_selesai"
                                label="Waktu Selesai"
                                margin="normal"
                                type="time"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                style={{ width: '30%', marginLeft: '50px' }}
                                onChange={this.handleChange('waktu_selesai')}
                            /><br />
                            <div style={{ marginLeft: '50px' }}>
                                <InputLabel htmlFor="paket-soal">Kontainer</InputLabel>
                                <br /><br />
                                <TextField style={{ width: '400px' }}
                                    required={true}
                                    id="paketSoal"
                                    select={true}
                                    label="Paket Soal"
                                    onChange={this.handleChange('paketSoal')}
                                    value={this.state.paketSoal}>
                                    {this.state.dataPaketSoal.map(member =>
                                        <MenuItem key={member.id} value={member.id}>{member.id + '-' + member.tipe + '-' + member.keterangan}</MenuItem>
                                    )}
                                </TextField><br /><br />
                                {/* <Select
                                native
                                required
                                value={this.state.paketSoal}
                                // onSelect={this.handleChange('paketSoal')}
                                onChange={this.handleChange('paketSoal')}
                                name="paketSoal"
                                inputProps={{
                                    id: 'paket-soal',
                                }}
                            >
                                {this.state.dataPaketSoal.map(member =>
                                    <option value={member.id}>{member.id + '-' + member.tipe + '-' + member.keterangan}</option>
                                )}
                            </Select> */}
                                <FormHelperText>Required</FormHelperText>
                            </div>

                            <div style={{ margin: '20px' }}>Kelas Partisipan :<br />
                                {this.state.dataKelas.map(member =>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={this.handleCheck.bind(this)}
                                                value={member.id}
                                                color="primary"
                                            />
                                        }
                                        label={member.id}
                                    />
                                )}<br /></div>
                            <TextField
                                required={true}
                                id="keterangan"
                                label="Keterangan"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('keterangan')}
                            />
                            <Button variant="raised" type="submit" style={{ margin: '20px' }}>Simpan</Button><br /><br />
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