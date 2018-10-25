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

export default class tambahKelas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nip: localStorage.getItem('no_induk'),
            id_kelas: '',
            semester: 'GANJIL',
            sbOpen: false,
            sbMsg: ''
        }
        par = (props.match.url).substr(7);
        this.handleChange = this.handleChange.bind(this);
        this.checkKelas = this.checkKelas.bind(this);
    }

    componentWillMount() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kelas/edit/'+par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({
                id_kelas: data[0].id,
                semester: data[0].semester
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    checkKelas() {
        let self = this;
        var str = self.state.id_kelas;
        var re = /MI\d[A-Z]\d\d\d\d/;
        var found = str.match(re);
        if (!found || found[0] !== str) {
            self.setState({
                sbOpen: true,
                sbMsg: 'Contoh Format Kelas "MI1A2018"'
            })
        } else {
            console.log(self.state)
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kelas/'+par, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(self.state)
            }).then(function (response) {
                if (response.status == 200) {
                    window.location.href = '#/kelas/';
                } else if (response.status == 500) {
                    self.setState({
                        sbOpen: true,
                        sbMsg: 'Data kelas masih digunakan'
                    })
                    console.log(self.state)
                }else if (response.status == 600) {
                    self.setState({
                        sbOpen: true,
                        sbMsg: 'Data kelas sudah ada'
                    })
                    console.log(self.state)
                }
            }).catch(err => {
                console.log('caught it!', err);
            })
        }
    }

    simpanKelas() {

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
        const ranges = [
            {
                value: 'GENAP',
                label: 'Genap',
            },
            {
                value: 'GANJIL',
                label: 'Ganjil',
            }
        ]
        return (
            <div className="container">
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Edit Data Kelas '+par} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/kelas/"><RaisedButton>Kembali</RaisedButton></a>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{ margin: '20px' }}>
                        <MaterialUIForm onSubmit={this.checkKelas}>
                            <TextField
                                required={true}
                                id="id_kelas"
                                label="Kelas"
                                margin="normal"
                                value={this.state.id_kelas}
                                style={{ width: '400px' }}
                                onChange={this.handleChange('id_kelas')}
                            /><br /><br />
                            <TextField style={{ width: '400px' }}
                                id="semester"
                                select={true}
                                label="Semester"
                                onChange={this.handleChange('semester')}
                                value={this.state.semester}>
                                <MenuItem key='GENAP' value='GENAP' selected={true}>Genap</MenuItem>
                                <MenuItem key='GANJIL' value='GANJIL'>Ganjil</MenuItem>
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