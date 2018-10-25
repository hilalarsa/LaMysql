import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import Create from 'material-ui/svg-icons/content/create';
import AddCircle from 'material-ui/svg-icons/content/add-circle';
import { createHashHistory } from 'history';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from '@material-ui/core/Paper';
import SelectField from 'material-ui/SelectField';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { color } from '@material-ui/core/colors';

var par = '';

export default class kelasNilai extends Component {
    constructor(props) {
        super(props)
        this.state = {
            kelas: []
        }
    }

    componentDidMount() {
        let self = this;
        fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/nilai', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            self.setState({ kelas: data });
            console.log(self.state.kelas);
        }).catch(err => {
            console.log('caught it!', err);
        });
    }

    openNilai(idKelas) {
        window.location = "/#/nilai/" + idKelas;
    }

    render() {
        return (
            <div className="container">
                <Paper>
                    <Toolbar style={{ background_color: '#000' }}>
                        <ToolbarGroup firstChild={true}>
                            <ToolbarTitle text={'Data Nilai'} style={{ paddingLeft: '20px' }} />
                        </ToolbarGroup>
                    </Toolbar>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ textAlign: "center" }}>Kelas</TableCell>
                                <TableCell style={{ textAlign: "center" }}>Tahun</TableCell>
                                <TableCell style={{ textAlign: "center" }}> </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.kelas.map(member =>
                                <TableRow key={member.id_kelas}>
                                    <TableCell style={{ textAlign: "center" }}>{member.Kelas}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>{member.Tahun}</TableCell>
                                    <TableCell style={{ textAlign: "center" }}>
                                        <RaisedButton onClick={() => this.openNilai(member.id_kelas)} primary={true}>Lihat Nilai</RaisedButton>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}