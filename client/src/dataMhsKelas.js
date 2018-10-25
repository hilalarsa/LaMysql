import React, { Component } from 'react';
// import { Table, TableHeader, TableHeaderColumn,TableRowColumn } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';

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

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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
            fieldNum: 0,
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
        console.log(par);
    }

    componentDidMount() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kuis/' + par, {
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

    delMhsKelas = (props) => {
        this.state.deleteId = props;
        this.handleDialogOpen();
    }

    deleteData() {
        console.log(this.state.deleteId);
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/mhsKelas/delete/" + this.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            } else {
                window.location.reload();
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
            // nim: [],
            nim: '',
            id_kelas: par
        };
        // data['nim'] = fieldIn;

        for (var i = 0; i <= this.state.fieldNum; i += 1) {
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
                    window.location.reload();
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
        // this.setState({ [e.target.name]: e.target.value });
        fieldIn[this.state.fieldNum] = e.target.value;
        console.log("nim" + this.state.fieldNum + " = " + e.target.value);
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
        this.deleteData();
    };

    render() {
        const dialogAct = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleDialogClose} />,
            <FlatButton label="Hapus" primary={true} onClick={this.handleDialogClose} />,
        ];

        const children = [];
        for (var i = 0; i < this.state.fieldNum; i += 1) {
            children.push(<ChildComponent key={i} number={i} onChange={this.logChange} float={i + 1} />);
        };

        let id_mhsKelas=1;
        return (
            <div className="container" style={{ backgroundColor: '#fff' }}>
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={par} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <ToolbarSeparator />
                            {this.state.showData ?
                                <RaisedButton label="Tambah Mahasiswa" primary={true} onClick={this.tambahMhs} />
                                : <RaisedButton label="Kembali" primary={true} onClick={this.showMhs} />
                            }
                        </ToolbarGroup>
                    </Toolbar>
                    {this.state.showData ?
                        [
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No.</TableCell>
                                        <TableCell>NIM</TableCell>
                                        <TableCell>Nama Mahasiswa</TableCell>
                                        <TableCell> </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.mhsKelas.map(member =>
                                        <TableRow key={member.id}>
                                            <TableCell>{id_mhsKelas++}</TableCell>
                                            <TableCell>{member.NIM}</TableCell>
                                            <TableCell>{member.nama}</TableCell>
                                            <TableCell>
                                                <IconButton tooltip="Hapus" iconStyle={{ color: "#FF0000" }} onClick={() => this.delMhsKelas(member.id)}>
                                                    <DeleteSweep />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        ]
                        :
                        [
                            <form style={{ backgroundColor: '#fff', height: 'auto', padding: '20px' }} onSubmit={this.handleSubmit} method="POST">
                                <TextField hintText="NIM" floatingLabelText="NIM 0" name="nim0" onChange={this.logChange} />
                                <ParentComponent addChild={this.onAddChild}>
                                    {children}
                                </ParentComponent>
                                <IconButton tooltip="Tambah" onClick={this.addField} style={{ left: '300px', bottom: '40px' }}>
                                    <AddCircleOutline />
                                </IconButton>
                                <input type="submit" value="simpan" />
                            </form>
                        ]
                    }
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
        <TextField hintText="NIM" floatingLabelText={"NIM " + props.float} name={"nim" + props.number} onChange={props.onChange} />
    </div>
);
