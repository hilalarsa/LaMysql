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
            id: '',
            semester: 'GANJIL',
            sbOpen: false,
            sbMsg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.checkKelas = this.checkKelas.bind(this);
    }

    componentDidMount() {
        console.log(this.state)
    }

    checkKelas() {
        let self = this;
        var str = self.state.id;
        var re = /MI\d[A-Z]\d\d\d\d/;
        var found = str.match(re);
        if (!found || found[0] !== str) {
            self.setState({
                sbOpen: true,
                sbMsg: 'Contoh Format Kelas "MI1A2018"'
            })
        } else {
            console.log(self.state)
            fetch(process.env.REACT_APP_SERVER_ENDPOINT +'/kelas/checkKelas/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(self.state)
            }).then(function (response) {
                if (response.status == 200) {
                    window.location.href = '#/mhsKelas/' + self.state.id;
                } else {
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
        console.log("SIMPAN KELAS")
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
                            <ToolbarTitle text={'Tambah Data Kelas'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/kelas/"><RaisedButton>Kembali</RaisedButton></a>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{ margin: '20px' }}>
                        <MaterialUIForm onSubmit={this.checkKelas}>
                            <TextField
                                required={true}
                                id="id"
                                label="Kelas"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('id')}
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