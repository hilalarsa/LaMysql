import React, { Component } from 'react';
// import { Table, TableHeader, TableHeaderColumn,TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

import { GroupAdd, Edit, Delete } from '@material-ui/icons';

import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import Snackbar from 'material-ui/Snackbar';
import { createHashHistory } from 'history';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from '@material-ui/core/Paper';
import ReactTable from 'react-table';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { Button } from '@material-ui/core';

var par = '';
var fieldIn = [];
const history = createHashHistory();

export default class dataMhsKelas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mhsKelas: [],
            showData: true,
            addField: false,
            fieldNum: 1,
            saveSuccess: false,
            dialog: false,
            deleteId: 0
        }
        par = (props.match.url).substr(10);
        this.tambahMhs = this.tambahMhs.bind(this);
        this.showMhs = this.showMhs.bind(this);
        this.addField = this.addField.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.logChange = this.logChange.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.delMhsKelas = this.delMhsKelas.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.getDataMhsKelas = this.getDataMhsKelas.bind(this);
        console.log(par);
    }

    componentDidMount() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/mhsKelas/' + par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ mhsKelas: data });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    getDataMhsKelas(){
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/mhsKelas/' + par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ mhsKelas: data });
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
            showData: true,
            fieldNum: 1
        })
        fieldIn = [];
    }

    addField() {
        this.setState({
            fieldNum: this.state.fieldNum + 1
        })
    }

    delMhsKelas = (props) => {
        this.state.deleteId = props;
        this.setState({ dialog: true });
    }

    handleDialogClose = () => {
        this.setState({ dialog: false });
        this.deleteData();
    };

    handleDialogCancel = () => {
        this.state.deleteId = '';
        this.setState({ dialog: false });
    };

    deleteData() {
        let self =this;
        console.log(this.state.deleteId);
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/mhsKelas/delete/" + this.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            } else {
                self.getDataMhsKelas();
                return response.json();
            }
        }).then(function (data) {
            if (data == "success") {
                this.setState({ saveSuccess: true });
            }
        }).catch(function (err) {
            console.log(err)
        });
        this.setState({
            yesDelete: false
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {
            nim: '',
            id_kelas: par
        };
        let self = this;
        for (var i = 0; i < this.state.fieldNum; i += 1) {
            data['nim'] = fieldIn[i];
            data['id_kelas'] = par;
            console.log(JSON.stringify(data));
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/mhsKelas/insert", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                } else {
                    // window.location.reload();
                    self.getDataMhsKelas();
                    self.showMhs();
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
    }

    reloadPage() {
        window.location.reload();
    }

    logChange(e) {
        // console.log(e.target.id)
        fieldIn[e.target.id - 1] = e.target.value;
        console.log(fieldIn);
    }

    onKeyPress(event) {
        if (event.which === 13 || event.which === 9 /* Enter */) {
            console.log('enter pressed')
            event.preventDefault();
            if (event.target.value != '') {
                fieldIn[this.state.fieldNum - 1] = event.target.value;
                this.addField();
            }
        }
    }

    render() {
        const dialogAct = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleDialogCancel} />,
            <FlatButton label="Hapus" primary={true} onClick={this.handleDialogClose} />,
        ];

        const children = [];
        for (var i = 1; i <= this.state.fieldNum; i += 1) {
            children.push(<ChildComponent key={i}
                number={i}
                onChange={this.logChange}
                float={i}
            />);
        };
        const data = this.state.mhsKelas;
        let no = 1;
        const columns = [{
            Header: 'No.',
            Cell: props => no++
        }, {
            Header: 'NIM',
            accessor: 'NIM'
        }, {
            Header: 'Nama Mahasiswa',
            accessor: 'nama'
        }, {
            Header: '',
            accessor: 'id',
            Cell: props => [
                <Button variant="fab" mini style={{ marginLeft: '10px' }} onClick={() => this.delMhsKelas(props.value)}><Delete /></Button>
            ]
        }]
        return (
            <div className="container" style={{ backgroundColor: '#fff' }}>
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={par} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        {this.state.showData ?
                            [<ToolbarGroup>
                                <a href='/#/kelas'><Button>Kembali</Button></a>
                                <ToolbarSeparator />
                                <Button style={{ marginLeft: '10px'}} color="secondary" onClick={this.tambahMhs}><GroupAdd /></Button>
                            </ToolbarGroup>]
                            : [<ToolbarGroup>
                                <ToolbarSeparator />
                                <Button variant="contained" color="primary" onClick={this.showMhs}>Kembali</Button></ToolbarGroup>]
                        }
                    </Toolbar>
                    {this.state.showData ?
                        [<ReactTable style={{ textAlign: 'center' }}
                            data={data}
                            columns={columns}
                            defaultPageSize={10}
                            className="-highlight"
                        />]
                        : [<form
                            style={{ backgroundColor: '#fff', height: 'auto', padding: '20px' }}
                            onSubmit={this.handleSubmit} method="POST"
                            onKeyPress={this.onKeyPress}>
                            <ParentComponent>
                                {children}
                            </ParentComponent>
                            <Button variant="raised" type="submit">Simpan</Button><br /><br />
                        </form>]
                    }
                    <Dialog
                        actions={dialogAct}
                        modal={false}
                        open={this.state.dialog}
                        onRequestClose={this.handleDialogClose}
                    >Hapus data?</Dialog>
                </Paper>
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
        <TextField id={props.number} hintText="NIM" floatingLabelText={"NIM " + props.float}
            name={"nim" + props.number} onChange={props.onChange} />
    </div>
);
