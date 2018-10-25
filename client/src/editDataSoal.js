import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import Paper from '@material-ui/core/Paper';
import { InputLabel, Input, FormGroup } from '@material-ui/core';

var par = '';

export default class editDataSoal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soal: [],
            text_soal: '',
            text_jawaban: '',
            gambar: '',
            file: '',
            imagePreviewUrl: '',
            formStat: 'edit'
        }
        par = (props.match.url).substr(6);
        this.logChange = this.logChange.bind(this);
        this.klikSimpan = this.klikSimpan.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.klikCreate = this.klikCreate.bind(this);
        // console.log(par);
        if (par === "create") {
            this.setState({ formStat: "create" })
        }
    }

    componentDidMount() {
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
            self.setState({ soal: data });
            self.setState({ text_soal: data[0].text_soal, text_jawaban: data[0].text_jawaban, gambar: data[0].gambar });
            console.log(self.state);
            // console.log('data get!');
        }).catch(err => {
            console.log('caught it!', err);
        });
    }

    klikBatal() {
        window.location = "/#/soal";
    }

    klikSimpan() {
        console.log(this.state);
        this._handleSubmit;
        // var base64Data = req.rawBody.replace(/^data:image\/png;base64,/, "");

        var data = { text_soal: '', text_jawaban: '', gambar: '', imgUrl: '' };

        data['gambar'] = this.state.gambar;
        data['imgUrl'] = this.state.imagePreviewUrl;
        data['text_soal'] = this.state.text_soal;
        data['text_jawaban'] = this.state.text_jawaban;
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

    klikCreate(){
        console.log(this.state);
        this._handleSubmitl
        var data = { text_soal: '', text_jawaban: '', gambar: '', imgUrl: '' };
        data['gambar'] = this.state.gambar;
        data['imgUrl'] = this.state.imagePreviewUrl;
        data['text_soal'] = this.state.text_soal;
        data['text_jawaban'] = this.state.text_jawaban;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/soal/", {
            method: 'POST',
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
            if (data === "success") {
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
        // console.log(this.state.file);
        // TODO: do something with -> this.state.file
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

    render() {

        let { imagePreviewUrl } = this.state;
        let { gambar } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl !== '') {
            $imagePreview = (<img style={{ width: '400px', height: 'auto' }} src={imagePreviewUrl} />);
        } else if (gambar !== '') {
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
                            {par === "create" ?
                                <Button onClick={this.klikCreate}>Simpan</Button>
                                :
                                <Button onClick={this.klikSimpan}>Simpan</Button>
                            }
                        </ToolbarGroup>
                    </Toolbar>
                    {par === "create" ?
                        [
                            <FormGroup style={{ padding: '30px 30px 50px 30px' }}>
                                <InputLabel style={{ margin: '20px 20px 10px 0px' }}>Teks Soal</InputLabel>
                                <Input id="text_soal" onChange={this.logChange} />
                                <InputLabel style={{ margin: '20px 20px 10px 0px' }}>Teks Jawaban</InputLabel>
                                <Input id="text_soal" onChange={this.logChange} />
                                <InputLabel style={{ margin: '20px 20px 10px 0px' }}>Gambar</InputLabel>
                                <input type="file" onChange={this._handleImageChange} style={{ width: '200px', height: '30px' }} />
                                {$imagePreview}
                            </FormGroup>
                        ] :
                        [
                            <div>
                                {this.state.soal.map(member =>
                                    <FormGroup style={{ padding: '30px 30px 50px 30px' }}>
                                        <InputLabel style={{ margin: '20px 20px 10px 0px' }}>Teks Soal</InputLabel>
                                        <Input id="text_soal" defaultValue={member.text_soal} onChange={this.logChange} />
                                        <InputLabel style={{ margin: '20px 20px 10px 0px' }}>Teks Jawaban</InputLabel>
                                        <Input id="text_jawaban" defaultValue={member.text_jawaban} onChange={this.logChange} />
                                        <InputLabel style={{ margin: '20px 20px 10px 0px' }}>Gambar</InputLabel>
                                        <input type="file" onChange={this._handleImageChange} style={{ width: '200px', height: '30px' }} />
                                        {$imagePreview}
                                        {/* <Button variant="raised" color="primary" style={{ width: '200px', margin: '30px 0px 20px 0px' }}>Pilih Gambar</Button> */}
                                        {/* <img src={'img/soal/' + member.gambar} style={{ width: '300px', height: 'auto' }} /> */}
                                    </FormGroup>
                                )}
                            </div>
                        ]
                    }
                </Paper>
            </div>
        )
    }
}