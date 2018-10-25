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

export default class tambahTabelSampel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            create: '',
            insert: '',
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
        fetch(process.env.REACT_APP_SERVER_ENDPOINT +'/tabelsampel/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify(self.state)
        }).then(function (response) {
            if (response.status == 200) {
                window.location.href = '#/tabelsampel/';
            } else {
                self.setState({
                    sbOpen: true,
                    sbMsg: 'Gagal menyimpan data'
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
                            <ToolbarTitle text={'Tambah Tabel Sampel'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <a href="#/tabelsampel/"><RaisedButton>Kembali</RaisedButton></a>
                        </ToolbarGroup>
                    </Toolbar>
                    <div style={{ margin: '20px' }}>
                        <MaterialUIForm onSubmit={this.klikSimpan}>
                            <TextField
                                required={true}
                                id="create"
                                label="Query Create"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('create')}
                            /><br /><br />
                            <TextField
                                required={true}
                                id="insert"
                                label="Query Insert"
                                margin="normal"
                                style={{ width: '400px' }}
                                onChange={this.handleChange('insert')}
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