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

export default class editDataSoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text_soal: '',
            text_jawaban: '',
            gambar: '',
            namatabelsoal: [],
            namatabel: '',
            file: '',
            imagePreviewUrl: '',
            tabelSoal: [],
            selectedTabelSoal: [],
            checked: false
        }
        par = (props.match.url).substr(6);
        this.klikSimpan = this.klikSimpan.bind(this);
        this.getDataSoal = this.getDataSoal.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
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
            for (var i = 0; i < data.length; i += 1) {
                self.setState({
                    [data[i].namatabel]: false,
                })
            }
        }).then(function (data) {
            self.getDataSoal();
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getDataSoal() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/soal/' + par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            if (data[0].kelas !== null) {
                var temp = data[0].namatabelsoal.split(',');
                for (var i = 0; i < temp.length; i += 1) {
                    self.setState({[temp[i]]: true})
                }
            }
            self.setState({
                text_soal: data[0].text_soal,
                text_jawaban: data[0].text_jawaban,
                gambar: data[0].gambar,
                checked: true
            });
            console.log(self.state);
        }).catch(err => {
            console.log('caught it!', err);
        });
        console.log(self.state.tabelSoal)
    }

    klikBatal() {
        window.location = "/#/soal";
    }

    klikSimpan() {
        console.log(this.state);
        this._handleSubmit;

        var data = { text_soal: '', text_jawaban: '', gambar: '', imgUrl: '', namatabelsoal: '' };

        data['gambar'] = this.state.gambar;
        data['imgUrl'] = this.state.imagePreviewUrl;
        data['text_soal'] = this.state.text_soal;
        data['text_jawaban'] = this.state.text_jawaban;
        data['namatabelsoal'] = this.state.namatabel;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/soal/" + par, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            } else {
                window.location = "/#/soal";
                return response.json();
            }
        }).then(function (data) {
            if (data == "success") {
                this.setState({ saveSuccess: true });
            }
        }).catch(function (err) {
            console.log(err)
        });
    }

    logChange(e) {
        this.setState({ [e.target.id]: [e.target.value] });
    }

    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
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
            options.push(e.target.value);
            this.setState({ [e.target.value]: true })
        } else {
            index = options.indexOf(+e.target.value)
            options.splice(index, 1)
            this.setState({ [e.target.value]: false })
        }
        this.setState({ namatabelsoal: options, namatabel: options.toString() })
    }

    render() {

        let { imagePreviewUrl } = this.state;
        let { gambar } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl !== '') {
            $imagePreview = (<img style={{ width: '400px', height: 'auto' }} src={imagePreviewUrl} />);
        } else if (gambar !== '-') {
            $imagePreview = (<img style={{ width: '400px', height: 'auto' }} src={'/img/soal/' + gambar} />);
        }

        return (
            <div className="container">
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Soal #' + par} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <Button onClick={this.klikBatal}>Batal</Button>
                            <ToolbarSeparator />
                            <Button onClick={this.klikSimpan}>Simpan</Button>
                        </ToolbarGroup>
                    </Toolbar>
                    <MaterialUIForm onSubmit={this.klikSimpan}>
                        <TextField
                            required={true}
                            id="text_soal"
                            label="Text Soal"
                            margin="normal"
                            style={{ width: '90%', margin: '20px' }}
                            onChange={this.handleChange('text_soal')}
                            value={this.state.text_soal}
                        />
                        <TextField
                            required={true}
                            id="text_jawaban"
                            label="Text Jawaban"
                            margin="normal"
                            style={{ width: '90%', margin: '20px' }}
                            onChange={this.handleChange('text_jawaban')}
                            value={this.state.text_jawaban}

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
                        {this.state.checked ? [
                            <div style={{ margin: '20px' }}>Tabel Soal :<br />
                                {this.state.tabelSoal.map(member =>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state[member.namatabel]}
                                                // checked={true}
                                                onChange={this.handleCheck.bind(this)}
                                                value={member.namatabel}
                                                color="primary"
                                            />
                                        }
                                        label={member.namatabel}
                                    />
                                )}<br /></div>
                        ] : [<div style={{ margin: '20px' }}>Tabel Soal :<br />
                            {this.state.tabelSoal.map(member =>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={this.handleCheck.bind(this)}
                                            value={member.namatabel}
                                            color="primary"
                                        />
                                    }
                                    label={member.namatabel}
                                />
                            )}<br /></div>]}
                    </MaterialUIForm>
                </Paper>
            </div>
        )
    }
}