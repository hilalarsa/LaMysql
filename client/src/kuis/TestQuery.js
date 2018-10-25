import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
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
import { Snackbar } from 'material-ui';

class TestQuery extends React.Component { 
    constructor() {
        super()
        this.state = {
            hasil: [],
            saveSuccess: false,
            showTable:false,
            columnTabel: [],
            dataTabel: [],
            changeAttemptState: "decrement",
            status:""
        }
        // this.changeAttempt = this.changeAttempt.bind(this);
    }

    handleTestQueryClick() {
        // console.log(this.props.jawaban)
        /* Button ini ngapain sih?
        1. Kurangi attempt
        2. Ambil query dari textInput
        3. Kirim ke endpoint detailTabel pakai fetch
        4. terima fetch nya, tampilkan dalam bentuk react-table
        5.
        */
        
        let self = this
        var value = this.props.jawaban //value dari isi textInput
        // var tableName = value.match(/select.*from\s+(\w+)/i)[1];

         var obj = {
             "query": value,
         }
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/sesi/getDetailTabel', {
             method: 'POST',
             headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
             body: JSON.stringify(obj)
         }).then(function (response) {
             if (response.status >= 400) {
                 self.setState({
                     saveSuccess: true,
                 });
                 self.setState({
                     status: "Query error"
                 }); 
             }
             return response.json();
         }).then(function (data) {
             self.setState({ columnTabel: data.fields })
             self.setState({ dataTabel: data.isi })
             self.setState({ showTable:true })
             self.setState({
                 saveSuccess: true,
             })
             self.setState({
                 status: "Query berjalan",
             })
        }).catch(err => {
             console.log(err)
             console.log('caught it!', err);
         })
 
        this.props.changeAttempt(this.state.changeAttemptState)
        // this.setState({ attempt: this.state.attempt - 1 })

        // console.log(`${record.jawaban}`);
    }



    handleRequestClose = () => {
        this.setState({
            saveSuccess: false,
        });
    };

    render() {
        return (
            <div>
                <RaisedButton
                    label='Test Query'
                    onClick={this.handleTestQueryClick.bind(this)}
                    primary={true}
                />
                <Snackbar
                    open={this.state.saveSuccess}
                    message={this.state.status}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        )
    }

}
export default TestQuery