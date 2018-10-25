import React from 'react';
import TextField from 'material-ui/TextField';
import { createHashHistory } from 'history';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import JawabButton from './JawabButton';
import CustomSnackbar from '../Snackbar';
import ReactTable from "react-table";

import { Snackbar } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { push as pushAction } from 'react-router-redux';
import { connect } from 'react-redux';

import { Card, CardHeader, CardText } from 'material-ui/Card';
import { listKuis } from './kuis';
import TestQuery from './TestQuery';

// var par = '';
var fieldIn = [];
const history = createHashHistory();


class kerjakanKuis extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            kuis: [], //data id soal, text soal, kunci jawaban
            value: '', //jawaban dari mahasiswa dr textField
            text_jawaban:'', //jawaban dari data fetch
            saveSuccess: false, //tampilkan snackbar jika true
            tabel_soal:[],
            status:'',
            answer:'',
            done: false,
            echo: this.props,
            nomorsoal: this.props.match.params.id,
            attempt:'',
            columnTabel:[],
            dataTabel:[],
            showTable:false,
            gambar:'',
            showImage:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        // this.handleTabelSoalClick = this.handleTabelSoalClick.bind(this);
        
    }
    
    componentDidMount() {
        let self = this;
        let no_induk = localStorage.getItem('no_induk')
        const nomorsoal = this.state.nomorsoal
        console.log()
        // console.log(process.env.REACT_APP_SERVER_ENDPOINT+'/kuis/' + nomorsoal)
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kuis/' + nomorsoal, {
            method: 'GET',
            headers: {'Authorization': localStorage.getItem('token')}
        }).then(function (response) {
            // if (response.status >= 400) {
            //     throw new Error("Bad response from server");
            // }else if(response.status>= 200){
            //     console.log("this responese with 200 OK from server")
            // }
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            self.setState({ kuis: data });
            //disini dikasih for
            
            // self.setState({ buttonTabel: data[].nama_tabel}) //dapat id soal, text soal, text jawaban, tapi text jawaban ga dipakai
            self.setState({ text_jawaban : data[0].text_jawaban }) //dapat text kunci jawaban dari fetch
            if(data[0].gambar!='-'){
                console.log("gambar ada"+data[0].gambar)
                self.setState({ gambar: './img/soal/'+data[0].gambar})
                self.setState({ showImage:true})
            }else{
                console.log("gambar null")
                self.setState({ showImage:false})
            }
            self.setState({ tabel_soal: data[0].namatabelsoal.split(',') }) 
        })
        .catch(err => {
            console.log('caught it!', err);
        })
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleClick(event) {
        event.preventDefault();
    }    

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    myanswer = (answer) => {
        console.log("myanswer");
        /**
         * Fungsi ini untuk mengambil hasil dari component JawabButton
         * Kemudian dimasukkan di parameter fetch, untuk menload soal yang sesuai
         */
        let self = this;
        const nomorbaru = this.state.echo.match.params.id;
        const { push } = self.props
        // console.log(this.state.echo.match.params.id)
        this.setState({ saveSuccess: true });
        // this.setState({ status: answer });
        
        this.setState({ nomorsoal: nomorbaru})

    }

    handleRequestClose = () => {
        this.setState({
            saveSuccess: false,
        });
    };

    changeAttempt = (changeAttemptState)=>{
        //if changeAttemptState == decrement, kurangi, else tambahi akjsdfhniaslgudfe
        let temporaryAttempt = this.state.attempt - 1
        this.setState({attempt:temporaryAttempt})
        // setAttempt()
        localStorage.setItem('attempt', this.state.attempt)
    }
    // setAttempt  = ()=>{
    // }

    handleTabelSoalClick = (hit) =>{
        let self = this
        var obj = {
            "query": "SELECT * FROM "+hit,
            "nama_tabel": hit
        }
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/sesi/getDetailTabel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')},
            body: JSON.stringify(obj)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ columnTabel: data.fields });
            self.setState({ dataTabel: data.isi });
            self.setState({ showTable: true })

        }).catch(err => {
            console.log('caught it!', err);
        })
        // const {push} = this.props;

        // console.log("ini hit:"+hit)
        // push(`/tabelsampel/getDetailTabel/`+hit)

    }

    render() {
        const { classes } = this.props;
        const { kuis,gambar } = this.state;
        const attempt = this.state.attempt
        var tabel_soal = this.state.tabel_soal
        return (
            <div className="kerjakanKuis">
                <RaisedButton
                    label="Kembali"
                    onClick={()=>window.history.back()}
                    primary={true}
                />
                <Card style={{ margin: '0em' }} key="classCard">
                    <CardHeader title={kuis.map(hit =>
                        <p>{hit.text_soal}</p>
                    )}/>
                        
                
                {/* {tabel_soal.forEach(function (item, index) {
                    
                 },this)} */}
                    <CardText>

                        <TextField
                            id="multiline-static"
                            label="Multiline"
                            multiline
                            rows="5"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                        {this.state.showImage ?
                        <img src={gambar} style={{width: '300px'}} /> : null }

                        <table>
                            <tr>
                                <td>
                                    <TestQuery
                                        onClick={this.myanswer}
                                        propsCoba="Hello world"
                                        jawaban={this.state.value}
                                        changeAttempt={this.changeAttempt}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <JawabButton
                                        jawaban={this.state.value}
                                        kunci={this.state.text_jawaban}
                                        id_soal={this.state.nomorsoal}
                                        primary={true}
                                        onClick={this.handleClick}
                                    />
                                </td>
                            </tr>
                        </table>


                
                

                {/* <h1>Attempt left : {attempt}</h1> */}

                

                <h4>Tabel Soal yang digunakan</h4>
                <table>
                    <tr>
                            {tabel_soal.map(hit =>
                                <td>
                                    <RaisedButton
                                        label={hit}
                                        onClick={() => this.handleTabelSoalClick(hit)}
                                        primary={true}
                                    />
                                </td>
                            )}
                    </tr>
                </table>
                

                {this.state.showTable ?
                    <ReactTable
                        data={this.state.dataTabel}
                        columns={this.state.columnTabel}
                        defaultPageSize={5}
                    /> : null}

                {/* <Snackbar
                    open={this.state.saveSuccess}
                    message={this.state.status}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                /> */}
                </CardText>
                </Card>
            </div>
        );
    }
}

export default connect(null, {
    push: pushAction
})(kerjakanKuis);
//useless ==>

// const ParentComponent = props => (
//     <div className="card calculator">
//         <div id="children-pane">
//             {props.children}
//         </div>
//     </div>
// );

    // reloadPage() {
    //     window.location.reload();
    // }

    // logChange(e) {
    //     // this.setState({ [e.target.name]: e.target.value });
    //     fieldIn[this.state.fieldNum] = e.target.value;
    //     console.log("nim" + this.state.fieldNum + " = " + e.target.value);
    // }

    // handleRequestClose = () => {
    //     this.setState({
    //         saveSuccess: false,
    //     });
    // };

    // handleDialogOpen = () => {
    //     this.setState({ dialog: true });
    // };

    // handleDialogClose = () => {
    //     this.setState({ dialog: false });
    //     this.deleteData();
    // };