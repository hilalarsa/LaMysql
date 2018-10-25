import React, { Component } from 'react';
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
import ReactTable from "react-table";
import RaisedButton from 'material-ui/RaisedButton';
import { push as pushAction } from 'react-router-redux';
import dataMhsKelas from '../dataKontainerSoal';
import Clock from '../Clock'
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SelesaiSesiButton from "./selesaiSesiButton";

export class listSoalSesi extends React.Component {
    constructor(props) {
        super(props)
        // var {record} = props
        // console.log("Ini propos list soal sesi : "+record)
        this.state = {
            showTable:'',
            data:[],
            link:'',
            par: this.props.match.params.id,
            id_event:'',
            tipe:''
        }
        // this.changeAttempt = this.changeAttempt.bind(this);
    }

    componentDidMount(){
        const self = this
        let {par} = this.state
        console.log("TERSIMPAN ="+this.state.par)
        let no_induk = localStorage.getItem('no_induk')
        
        // console.log(this.props.match.params.id);
        // var par = this.props.match.params.id
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/sesi/getAllSoal/' + par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')},
            // body: JSON.stringify(obj)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log(data)
            self.setState({data:data})
            self.setState({link:data.id})
            self.setState({ tipe: data[0].tipe})
            console.log("INI TIPE BOYYY")
            console.log(data)
            console.log(data[0].tipe)

        }).then(()=>{
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/sesi/getEventId/' + no_induk, {
                method: 'GET',
                headers: { 'Authorization': localStorage.getItem('token')}
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
                .then(function (data) {
                    // console.log("ATTEMPT:" + data[0].attempt)
                    console.log("ID EVENT SET!",data[0].id_event)
                    self.setState({ id_event: data[0].id_event });
                })
                .catch(err => {
                    console.log('caught it!', err);
                })
        }).catch(err => {
            console.log('caught it!', err);
        })
        

    }

    handleTestQueryClick() {
        let self = this

    }

    handleRequestClose = () => {
        this.setState({
            saveSuccess: false,
        });
    };

    render() {
        const data = this.state.data
        const {par} = localStorage.getItem('id_jadwal')
        const {tipe} = this.state
        console.log(tipe)
        const columns = [{
            Header: 'Id',
            accessor: 'id',
            width: 50
        }, {
            Header: 'Text Soal',
            accessor: 'text_soal'
        }, {
            Header: '',
                Cell: ({ row }) => <RaisedButton label='Kerjakan'
                    onClick={this.handleClick}
                    primary={true}
                 href={`#/${tipe}/${row.id}`}/> // Custom cell components!
        }]
            
        return (
            <div>
                <Card style={{ margin: '2em' }} key="classCard">
                <table>
                        <SelesaiSesiButton id_event={this.state.id_event}/>
                    <tr>
                        <td>
                    <CardHeader title="Time left :"/>
                        </td>
                        <td>
                                <b><Clock par={par} /></b>
                        </td>
                    </tr>
                </table>
                
                    <CardText>
                <ReactTable
                    defaultPageSize={5}
                    data={data}
                    columns={columns} />
                    </CardText>
                {/* {this.state.showTable ?
                    <ReactTable
                        data={this.state.dataTabel}
                        columns={this.state.columnTabel}
                        defaultPageSize={5}
                    /> : null} */}
                    </Card>
            </div>
        )
    }

}   
export default listSoalSesi