import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { InputLabel, Input, FormGroup } from '@material-ui/core';
import ReactTable from 'react-table'

var par = '';

export default class dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            level: localStorage.getItem('role'),
            activeSession: [],
            profile: []
        }
        // this.getDataasMhs = this.getDataasMhs.bind(this);
    }

    componentDidMount() {
        let self = this;
        // console.log(localStorage.getItem('role'));
        if (self.state.level === 'dosen') {
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/login/getDataasDosen/' + localStorage.getItem('no_induk'), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({ userData: data });
                var prof = []
                prof.push(data[0])
                self.setState({ profile: prof });

                // console.log(self.state.profile)
            }).catch(err => {
                console.log('caught it!', err);
            })
        } else if (self.state.level === 'mahasiswa') {
            console.log('im student')
            fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/login/getDataasMhs/' + localStorage.getItem('no_induk'), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
            }).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            }).then(function (data) {
                self.setState({ userData: data });
                self.state.profile.push(data[0])

                fetch(process.env.REACT_APP_SERVER_ENDPOINT+'/login/getActiveSess/' + self.state.userData[0].id_kelas, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token') }
                }).then(function (response) {
                    if (response.status >= 400) {
                        throw new Error("Bad response from server");
                    }
                    return response.json();
                }).then(function (dataSess) {
                    self.setState({ activeSession: dataSess });
                    console.log(self.state.activeSession)
                }).catch(err => {
                    console.log('caught it!', err);
                })
            }).catch(err => {
                console.log('caught it!', err);
            })
        }
    }

    render() {
        const data = this.state.activeSession;
        const columns = [{
            Header: 'Tanggal Mulai',
            accessor: 'tgl_mulai'
        }, {
            Header: 'Tanggal Selesai',
            accessor: 'tgl_selesai'
        }, {
            Header: 'Waktu Mulai',
            accessor: 'waktu_mulai'
        }, {
            Header: 'Waktu Selesai',
            accessor: 'waktu_selesai'
        }, {
            Header: 'Keterangan',
            accessor: 'keterangan'
        }, {
            Header: '',
            Cell: props => <a href='#'>Start</a> // Custom cell components!
        }]
        // console.log(this.state.userData)

        return (
            <div className="container">
                {this.state.profile.map(member =>
                    <Card style={{ margin: '2em' }} key={member.no_induk}>
                        <CardHeader title={"Selamat Datang " + member.level} />
                        <CardText>
                            <p>Username : {member.username}</p>
                            <p>No. Induk : {member.no_induk}</p>
                            <p>Nama : {member.nama}</p>
                            {member.level === 'mahasiswa' ?
                                [
                                    <p key='kelas'>Kelas : {member.id_kelas}</p>
                                ] : []}
                        </CardText>
                        {member.level === 'mahasiswa' ?
                            [
                                <CardText>
                                    {/* <b>ACTIVE SESSION</b>
                                    <ReactTable style={{ height: 'auto' }}
                                        data={data}
                                        columns={columns}
                                    /> */}
                                </CardText>
                            ] : []}
                    </Card>
                )}
                {/* <ReactTable
                data={data}
                columns={columns}/> */}
            </div>
        )
    }
}