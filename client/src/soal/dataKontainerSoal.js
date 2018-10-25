import ReactTable from 'react-table';
import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';
import Snackbar from 'material-ui/Snackbar';
import { createHashHistory } from 'history';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from '@material-ui/core/Paper';
import { GroupAdd, Edit, Delete } from '@material-ui/icons';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

var par = '';
var fieldIn = [];

export default class dataMhsKelas extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataKontainerSoal: [],
            dataSoal: [],
            selectedSoal: [],
            showData: true,
            addField: false,
            fieldNum: 0,
            saveSuccess: false,
            dialog: false,
            deleteId: 0,
            choose_soal: false,
            jumlah_soal: 0,
        }
        par = (props.match.url).substr(15);
        console.log(par);
        this.logChange = this.logChange.bind(this);
        this.selectSoal = this.selectSoal.bind(this);
        this.simpanSoal = this.simpanSoal.bind(this);
        this.showData = this.showData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/kontainerSoal/' + par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({
                dataKontainerSoal: data,
                jumlah_soal: data.length
            });
            console.log(self.state)
        }).catch(err => {
            console.log('caught it!', err);
        });

        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/soal/choose/' + par, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ dataSoal: data });
        }).catch(err => {
            console.log('caught it!', err);
        });
    }

    delMhsKelas = (props) => {
        this.state.deleteId = props;
        this.handleDialogOpen();
    }

    deleteData() {
        console.log(this.state.deleteId);
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/kontainerSoal/delete/" + this.state.deleteId, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            } else {
                self.getData();
                return response.json();
            }
        }).then(function (data) {
            if (data == "success") {
                self.setState({ saveSuccess: true });
            }
        }).catch(function (err) {
            console.log(err)
        });
        this.setState({
            yesDelete: false
        })
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

    menuState = {
        anchorEl: null,
    };

    menuHandleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    menuHandleClose = () => {
        this.setState({ anchorEl: null });
    };

    chooseSoal = () => {
        this.setState({ showData: false });
        this.setState({ anchorEl: null });
    };

    createSoal = () => {
        this.setState({ anchorEl: null });
    };

    selectSoal(id) {
        let keepIn = true;
        for (var i = 0; i < this.state.selectedSoal.length; i++) {
            if (this.state.selectedSoal[i] === id.target.value) {
                this.state.selectedSoal.splice(i, 1);
                keepIn = false;
                this.setState({ fieldNum: this.state.fieldNum - 1 })
            }
        }
        if (keepIn) {
            this.state.selectedSoal[this.state.fieldNum] = id.target.value;
            this.setState({ fieldNum: this.state.fieldNum + 1 })
        }
    }

    simpanSoal() {
        let self = this;
        var data = {
            id_soal: '',
            id_kontainer: par
        };
        for (var i = 0; i < this.state.selectedSoal.length; i += 1) {
            data['id_soal'] = this.state.selectedSoal[i];
            data['id_kontainer'] = par;
            console.log(JSON.stringify(data));
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+"/kontainerSoal/insert", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') },
                body: JSON.stringify(data)
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                } else {
                    self.setState({ showData: true });
                    self.getData();
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

    showData() {
        this.setState({ showData: true })
    }

    render() {
        const { anchorEl } = this.state;
        const dialogAct = [
            <FlatButton label="Cancel" primary={true} onClick={this.handleDialogClose} />,
            <FlatButton label="Hapus" primary={true} onClick={this.handleDialogClose} />,
        ];
        const data_kontainer_soal = this.state.dataKontainerSoal;
        const data_soal = this.state.dataSoal;

        var i = 1;
        const columns_kontainer_soal = [
            {
                Header: 'ID',
                accessor: 'id'
            }, {
                Header: 'Teks Soal',
                accessor: 'text_soal'
            }, {
                Header: 'Gambar',
                accessor: 'gambar'
            }, {
                Header: 'Teks Jawaban',
                accessor: 'text_jawaban'
            }, {
                Header: '',
                accessor: 'id',
                Cell: props => [
                    <Button variant="fab" mini style={{ marginLeft: '10px' }} onClick={() => this.delMhsKelas(props.value)}><Delete /></Button>
                ]
            }]
        const columns_soal = [
            {
                Header: 'ID',
                accessor: 'id'
            }, {
                Header: 'Teks Soal',
                accessor: 'text_soal'
            }, {
                Header: 'Gambar',
                accessor: 'gambar'
            }, {
                Header: 'Teks Jawaban',
                accessor: 'text_jawaban'
            }]
        const children = [];
        let counter = 0;
        return (
            <div className="container">
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Paket Soal ' + par} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            Jumlah Soal : {this.state.jumlah_soal}
                            <ToolbarSeparator />
                            {this.state.showData ?
                                [
                                    <div>
                                        <Button
                                            aria-owns={anchorEl ? 'simple-menu' : null}
                                            aria-haspopup="true"
                                            onClick={this.chooseSoal}
                                        >Tambah Soal</Button>|
                                        <Button
                                            aria-owns={anchorEl ? 'simple-menu' : null}
                                            aria-haspopup="true"
                                            onClick={()=>window.location.href='#/paketSoal'}
                                        >Kembali</Button>
                                    </div>
                                ]
                                :
                                [
                                    <div>
                                        <Button onClick={this.simpanSoal}>Simpan</Button>
                                        |
                                    <Button onClick={this.showData}>Kembali</Button>
                                    </div>
                                ]
                            }
                        </ToolbarGroup>
                    </Toolbar>
                    {this.state.showData ?
                        [
                            <ReactTable style={{ textAlign: 'center' }}
                                data={data_kontainer_soal}
                                columns={columns_kontainer_soal}
                                defaultPageSize={5}
                                className="-highlight"
                            />
                        ]
                        :
                        [
                            <Table>
                                <TableHead>
                                    <TableRow style={{ textAlign: "center" }}>
                                        <TableCell> </TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Teks Soal</TableCell>
                                        <TableCell>Gambar</TableCell>
                                        <TableCell>Teks Jawaban</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.dataSoal.map(member =>
                                        <TableRow key={member.id_soal}>
                                            <TableCell padding="checkbox">
                                                <Checkbox value={member.id_soal} onChange={this.selectSoal.bind(member.id_soal)} />
                                            </TableCell>
                                            <TableCell style={{ width: '30px' }}>{member.id_soal}</TableCell>
                                            <TableCell style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>{member.text_soal}</TableCell>
                                            <TableCell>{member.gambar}</TableCell>
                                            <TableCell>{member.text_jawaban}</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
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
//