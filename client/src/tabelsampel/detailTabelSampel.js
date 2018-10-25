import React, { Component } from 'react';

import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { createHashHistory } from 'history';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ReactTable from "react-table";
import 'react-table/react-table.css'

var par = '';
var fieldIn = [];
const history = createHashHistory();

export default class detailTabelSampel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataTabel: [],
            columnTabel: [],
            showData: true,
            addField: false,
            fieldNum: 0,
            saveSuccess: false,
            dialog: false,
            deleteId: 0
        }

        par = (props.match.url);
        this.tambahMhs = this.tambahMhs.bind(this);
        this.showMhs = this.showMhs.bind(this);
        this.addField = this.addField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange = this.logChange.bind(this);
        console.log(par);
    }

    componentDidMount() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT +par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ columnTabel: data.fields });
            self.setState({ dataTabel: data.isi });
            console.log("DATA DITERIMA COK")
            console.log(self.state.dataTabel)
            console.log(self.state.columnTabel)
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    tambahMhs() {
        this.setState({
            showData: false
        })
    }

    showMhs() {
        this.setState({
            showData: true
        })
    }

    addField() {
        this.setState({
            // addField: true
            fieldNum: this.state.fieldNum + 1
        })
    }

    onAddChild = () => {
        fieldIn[this.state.fieldNum] =
            this.setState({
                fieldNum: this.state.fieldNum + 1
            });
    }


    handleSubmit(event) {
        event.preventDefault();
    }

    reloadPage() {
        window.location.reload();
    }

    logChange(e) {
    }

    handleRequestClose = () => {
        this.setState({
            saveSuccess: false,
        });
    };

    handleDialogOpen = () => {
        this.setState({ dialog: true });
    };

    handleDialogClose = () => {
        this.setState({ dialog: false });

    };

    render() {
        const dialogAct = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleDialogClose} />,
            <FlatButton label="Hapus" primary={true} onClick={this.handleDialogClose} />,
        ];

        return (

            <div className="container" style={{ backgroundColor: '#fff' }}>

                <ReactTable
                    style={{ textAlign: 'center' }}
                    data={this.state.dataTabel}
                    defaultPageSize={10}
                    columns={this.state.columnTabel}
                />
                {this.state.saveSuccess ?
                    <Snackbar
                        open={this.state.saveSuccess}
                        message="Data Tersimpan"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                    /> : null}
                <Dialog
                    actions={dialogAct}
                    modal={false}
                    open={this.state.dialog}
                    onRequestClose={this.handleDialogClose}
                >Hapus data?</Dialog>
            </div>
        );
    }
}
const ParentComponent = props => (
    <div className="card calculator">
        <div id="children-pane">
            {props.children}
        </div>
    </div>
);

const ChildComponent = props => (
    <div>
        <TextField hintText="NIM" floatingLabelText={"NIM " + props.float} name={"nim" + props.number} onChange={props.onChange} />
    </div>
);
