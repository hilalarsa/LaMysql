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

export default class editJadwal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // tanggal_mulai: new Date(),
            // tanggal_selesai: new Date(),
            tanggal_mulai: '',
            tanggal_selesai: '',
            waktu_mulai: '',
            waktu_selesai: '',
            paketSoal: '',
            id_kontainer: '',
            keterangan: '',
            kelas: [],
            dataPaketSoal: [],
            dataKelas: [],
            sbOpen: false,
            sbMsg: '',
            tabelSoal: [],
            checked: false,
            finished: false
        }
        par = (props.match.url).substr(8);
        this.handleChange = this.handleChange.bind(this);
        this.simpanJadwal = this.simpanJadwal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.sendKelas = this.sendKelas.bind(this);
        this.getJadwal = this.getJadwal.bind(this);
        this.getKelas = this.getKelas.bind(this);
        this.getPaketSoal = this.getPaketSoal.bind(this);
    }

    componentWillMount() {
        let self = this;
        self.getKelas();
    }

    getKelas() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kelas/' + localStorage.getItem('no_induk'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ dataKelas: data })
            for (var i = 0; i < data.length; i += 1) {
                self.setState({
                    [data[i].id_kelas]: false
                })
            }
            self.getPaketSoal();
            // console.log(self.state.tabelSoal)
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getPaketSoal() {
        let self = this;
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
            // console.log(self.state.tabelSoal)
            self.getJadwal();
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getJadwal() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/jadwal/edit/' + par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({
                // tanggal_mulai: new Date(data[0].tanggal_mulai),
                // tanggal_selesai: new Date(data[0].tanggal_selesai),
                tanggal_mulai: data[0].tanggal_mulai,
                tanggal_selesai: data[0].tanggal_selesai,
                waktu_mulai: data[0].waktu_mulai,
                waktu_selesai: data[0].waktu_selesai,
                paketSoal: data[0].paket,
                id_kontainer: data[0].id_kontainer,
                keterangan: data[0].keterangan,
                checked: true
            })
            if (data[0].kelas !== null) {
                var temp = data[0].kelas.split(',');
                self.setState({kelas: temp})
                for (var i = 0; i < temp.length; i += 1) {
                    self.setState({
                        [temp[i]]: true
                    })
                }
            }
            console.log(self.state)
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    simpanJadwal() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/jadwal/' + par, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify({
                tanggal_mulai: self.state.tanggal_mulai,
                tanggal_selesai: self.state.tanggal_selesai,
                waktu_mulai: self.state.waktu_mulai,
                waktu_selesai: self.state.waktu_selesai,
                id_kontainer: self.state.id_kontainer,
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
                // self.sendKelas(() => console.log('okaay'))
                self.sendKelas();
                // (finished ? window.location = "/#/jadwal" : null)
            }
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    sendKelas() {
        let self = this;
        for (var i = 0; i < self.state.kelas.length; i += 1) {
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/jadwal/kelas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                // headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    kelas: self.state.kelas[i]
                })
            }).then(function (response) {
                if (response.status == 200) {
                    window.location.href = '#/jadwal/';
                } else {
                    self.setState({
                        sbOpen: true,
                        sbMsg: 'Penyimpanan gagal'
                    })
                }
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
            this.setState({ [e.target.value]: true })
        } else {
            index = options.indexOf(+e.target.value)
            options.splice(index, 1)
            this.setState({ [e.target.value]: false })
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
                                value={this.state.tanggal_mulai}
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
                                value={this.state.tanggal_selesai}
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
                                value={this.state.waktu_mulai}
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
                                value={this.state.waktu_selesai}
                            /><br />
                            <div style={{ marginLeft: '50px' }}>
                                <InputLabel htmlFor="paket-soal">Kontainer</InputLabel>
                                <br /><br />
                                <TextField style={{ width: '400px' }}
                                    id="paketSoal"
                                    select={true}
                                    label="Paket Soal"
                                    onChange={this.handleChange('id_kontainer')}
                                    value={this.state.id_kontainer}>
                                    {this.state.dataPaketSoal.map(member =>
                                        <MenuItem key={member.id} value={member.id}>{member.id + '-' + member.tipe + '-' + member.keterangan}</MenuItem>
                                    )}
                                </TextField><br /><br />
                                <FormHelperText>Required</FormHelperText>
                            </div>

                            {this.state.checked ? [
                                <div style={{ margin: '20px' }}>Kelas Partisipan :<br />
                                    {this.state.dataKelas.map(member =>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={this.state[member.id]}
                                                    onChange={this.handleCheck.bind(this)}
                                                    value={member.id}
                                                    color="primary"
                                                />
                                            }
                                            label={member.id}
                                        />
                                    )}<br /></div>
                            ] : []}

                            <TextField
                                required={true}
                                id="keterangan"
                                label="Keterangan"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('keterangan')}
                                value={this.state.keterangan}
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