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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import JawabButton from './JawabButton';
import CustomSnackbar from '../Snackbar';
import ReactTable from "react-table";

import { Snackbar } from 'material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { push as pushAction } from 'react-router-redux';
import { connect } from 'react-redux';
import moment from 'moment';

import { showNotification as showNotificationAction } from 'admin-on-rest';
import { isNull } from 'util';
// import { listKuis } from './kuis';
// import TestQuery from './TestQuery';
// import Clock from './Clock'
// var par = '';
var fieldIn = [];
const history = createHashHistory();

class kerjakanSesiButton extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            sbDenied:false
        }

    }

    // componentDidMount() {
        // let self = this;

        // const nomorsoal = this.state.nomorsoal
        /*
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/jadwalSesi/' + nomorsoal, {
            method: 'GET'
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            // self.setState({ kuis: data });
            // self.setState({ text_jawaban: data[0].text_jawaban }) //dapat text kunci jawaban dari fetch
            // self.setState({ tabel_soal: data[0].namatabelsoal.split(',') })
        }).catch(err => {
            console.log('caught it!', err);
        })

        */
    // }
    handleClick = ()=>{
        let self = this
        const { push, record } = this.props;
        console.log(this.props);
        console.log("button ditekan")

        var obj = {
            id_mhs: localStorage.getItem('no_induk'),
            waktu_mulai_event: moment().format("HH:mm:ss"),
            attempt: 10,
            status: 1,
            id_kontainer: record.paket,
            id_jadwal: record.id,
        }
        var par = localStorage.getItem('no_induk')
        // var par = record.id //id jadwal
        // if(localStorage.getItem('id_jadwal')==null){
            // console.log("id jadwal kosong")
        // }

        console.log(record)
        
        // if(localStorage.getItem('id_jadwal')!=null && record.id!=localStorage.getItem('id_jadwal')){
        //     console.log('ANDA DILARANG IKUT SESI LAIN SEBELUM SESI SEBELUMNYA SELESAI')
        //     push(`/sesi/getAllSoal/${record.paket}`)
        // }else{
            localStorage.setItem('id_jadwal',record.id)
        // }
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/jadwalSesi/getEvent/"+par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' , 'Authorization': localStorage.getItem('token')},
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error(response.statusText); 
            }else{
                console.log("MASUK RESPONSE 200")
                return response.json()
            }
        }).then(function(data){
            if (data.result != null){
                // console.log(data.result)
                // console.log(data.result[0].id_kontainer)
                if(record.paket!=data.result[0].id_kontainer){
                    console.log("SUDAH MASUK SESI LAIN< GAK BOLEH LANJUT SESI INI DULU")
                    self.setState({sbDenied:true})
                    push(`/jadwalSesi`)
                }else{
                    push(`/sesi/getAllSoal/${data.result[0].id_kontainer}`)
                }
                // if(data.result)
            }else{
                fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/jadwalSesi/tambahEvent", {
                        method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                    body: JSON.stringify(obj)
                }).then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    console.log("redirect ke get All soal");
                    push(`/sesi/getAllSoal/${record.paket}`)
                    // return response.json();
                }).catch(err => {
                    console.log('caught it!', err);
                })
            }
            console.log(data.message)
            /*if(data.message=="KERJAKAN"){
                fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/jadwalSesi/tambahEvent", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')},
                    body: JSON.stringify(obj)
                }).then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    console.log("redirect ke get All soal");
                    push(`/sesi/getAllSoal/${record.paket}`)
                    // return response.json();
                }).catch(err => {
                    console.log('caught it!', err);
                })
            }else{
                push(`/sesi/getAllSoal/${record.paket}`)
            }*/
        }).catch(err => {
            console.log('caught it!', err);
        })
        
        
        //status => 1 : Mengerjakan, 0 : Belum Mengerjakan, jika status 1, komponen button kerjakan sesi tidak ditampilkan
        
        
        //type bisa "kuis" atau "latihan", diambil dari data query tbl_kontainer
    }
    handleRequestClose = () => {
        this.setState({
            sbDenied: false,
        });
    };
    render(){
        return (
            <div>
        <RaisedButton label='Kerjakan'
            onClick={this.handleClick}
            primary={true}
        />
            <Snackbar
                open={this.state.sbDenied}
                message="Selesaikan dulu sesi sebelumnya"
                autoHideDuration={4000}
                onRequestClose={this.handleRequestClose}
            />
            </div>
    )
    }
}
kerjakanSesiButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(kerjakanSesiButton);
