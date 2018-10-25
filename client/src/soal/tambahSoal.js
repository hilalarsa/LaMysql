import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup, TextField, Snackbar, Select } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ReactTable from 'react-table'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import { Paper, MenuItem } from 'material-ui';
import MaterialUIForm from 'material-ui-form';

var par = '';

export default class tambahSoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text_soal: '',
            gambar: '',
            text_jawaban: '',
            namatabel: '',
            namatabelsoal: [],
            sbOpen: false,
            sbMsg: '',
            tabelSoal: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.simpanSoal = this.simpanSoal.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/soal/namaTabel/all', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ tabelSoal: data })
            console.log(self.state.tabelSoal)
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                gambar: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    simpanSoal() {
        let self = this;
        // self.setState({ namatabel: self.state.namatabelsoal.toString() })
        // console.log(self.state)
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/soal/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify({
                text_soal: self.state.text_soal,
                gambar: self.state.gambar,
                text_jawaban: self.state.text_jawaban,
                namatabel: self.state.namatabel
            })
        }).then(function (response) {
            if (response.status == 200) {
                window.location.href = '#/soal/';
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

    handleChange = prop => e => {
        this.setState({
            [prop]: e.target.value
        })
    }

    handleClose = () => {
        this.setState({ sbOpen: false });
    };

    handleCheck(e) {
        const options = this.state.namatabelsoal;
        let index;
        if (e.target.checked) {
            options.push(e.target.value)
        } else {
            index = options.indexOf(+e.target.value)
            options.splice(index, 1)
        }
        this.setState({ namatabelsoal: options, namatabel: options.toString() })
    }

    render() {
        let { gambar } = this.state;
        let $imagePreview = null;
        if (gambar) {
            $imagePreview = (<img src={gambar} width='300px' />);
        }
        return (
            <div className="container" >
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Tambah Data Soal'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/soal/"><RaisedButton>Kembali</RaisedButton></a>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{ margin: '20px' }}>
                        <MaterialUIForm onSubmit={this.simpanSoal}>
                            <TextField
                                required={true}
                                id="text_soal"
                                label="Text Soal"
                                margin="normal"
                                style={{ width: '90%', margin: '20px' }}
                                onChange={this.handleChange('text_soal')}
                            />
                            <input
                                accept="image/*"
                                id="outlined-button-file"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={this._handleImageChange}
                            />
                            <label htmlFor="outlined-button-file">
                                <Button variant="outlined" component="span" style={{ margin: '20px' }}>Upload</Button>
                            </label>
                            {$imagePreview}
                            <TextField
                                required={true}
                                id="text_jawaban"
                                label="Text Jawaban"
                                margin="normal"
                                style={{ width: '90%', margin: '20px' }}
                                onChange={this.handleChange('text_jawaban')}
                            />
                            <div style={{ margin: '20px' }}>Tabel Soal :<br />
                                {this.state.tabelSoal.map(member =>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                // checked={this.state.checkedB}
                                                onChange={this.handleCheck.bind(this)}
                                                value={member.namatabel}
                                                color="primary"
                                            />
                                        }
                                        label={member.namatabel}
                                    />
                                )}<br /></div>
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