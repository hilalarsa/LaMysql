import React, {
    Component
} from 'react';
import PropTypes from 'prop-types';
import {
    connect
} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {
    showNotification as showNotificationAction
} from 'admin-on-rest';
import {
    push as pushAction
} from 'react-router-redux';
import { Snackbar } from 'material-ui';
import Dialog from 'material-ui/Dialog';
import Button from '@material-ui/core/Button';
/**Button ini ada di komponen kerjakanLatihan, untuk menerima inputField dari kerjakanLatihan, nilainya dari props
 * 1. Ambil textInput dari inputField
 * 2. Ambil kunci jawaban dari state.kuncijawaban, yang sebelumnya didapat dari database
 */
class JawabButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasil: '', //hasil=isi dari snackBar, bisa error+isi errornya apa, Jawabanbenar, Jawabansalah
            attempt: 0,
            saveSuccess: false,
            dialog: false
        };
        this.delDialogClose = this.delDialogClose.bind(this);
        this.delDialogCancel = this.delDialogCancel.bind(this);
        this.submitJawaban = this.submitJawaban.bind(this);
    }

    handleClick = () => {
        console.log("into dialog true")
        this.setState({ dialog: true });
    }

    submitJawaban() {
        const {
            push,
            jawaban,
            kunci,
            attempt,
            id_soal
        } = this.props; //ambil dari props komponen di kerjakanLatihan
        let self = this;
        self.setState({
            attempt: attempt
        })
        var obj = {
            "jawaban": jawaban,
            "kunci": kunci,
        }

        // console.log(`${record.jawaban}`);
        fetch(process.env.REACT_APP_SERVER_ENDPOINT + "/latihan/jawabLatihan", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        }).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            } else {
                return response.json().then(function (data) {
                    if (data.Error) {
                        self.setState({
                            hasil: data.Error.sqlMessage
                        })
                        // self.props.propsanswer(self.state.hasil) /8 juli 2018
                    } else if (data.Jawaban == "benar") {
                        /*** Jika benar, simpan hitung attempt sekarang * nilaistandar = nilai yang baku, opo jare lah*/
                        self.setState({
                            hasil: "Jawaban benar"
                        })
                        self.setState({
                            saveSuccess: true,
                        });
                        // self.props.propsanswer(self.state.hasil)
                    } else if (data.Jawaban == "salah") {
                        self.setState({
                            hasil: "Jawaban salah"
                        })
                        self.setState({
                            saveSuccess: true,
                        });
                        // self.props.propsanswer(self.state.hasil)
                    }
                    console.log(data.Jawaban);
                    return data.Jawaban
                });
            }
        }).then((status) => {

            if (status == "benar") {
                var nilai = 10
            } else if (status == "salah") {
                var nilai = 0
            }

            var obj = {
                id_mhs: localStorage.getItem('no_induk'),
                text_jawaban: jawaban,
                id_soal,
                nilai
            }

            fetch(process.env.REACT_APP_SERVER_ENDPOINT + "/latihan/simpanJawaban", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify(obj)
            }).then((response) => {
                // console.log("get response!",response);
                if (response.status >= 400) {
                    return "error"
                } else {
                    return response.json()
                }
            }).then((data) => {
                console.log("datadata", data)
                if (data == "error") {
                    console.log("error");
                } else {
                    console.log("Tidak error");
                    console.log(data);
                    // setTimeout(() => {
                    push(`/sesi/getAllSoal/${data.id_kontainer}`)
                    // }, 2000);
                }

            }).catch(function (err) {
                console.log(err)
                // console.log(data)
            });

        }).catch(function (err) {
            console.log(err)
        });
        console.log("button jawab ditekan")
        // return fetch(request)
        // push(`jawabLatihan/${jawaban}`)
        // push(`mhsKelas/${record.id}`)
        // push("mhsKelas/?" + $.param({id: record.id}));
        // push(`mhsKelas/`)
    }
    delDialogClose = () => {
        this.setState({ dialog: false });
        this.submitJawaban();
    };

    delDialogCancel = () => {
        this.setState({ dialog: false });
    };

    handleRequestClose = () => {
        this.setState({
            saveSuccess: false,
        });
    };

    render() {
        const dialogAct = [
            <Button color="primary" onClick={this.delDialogCancel}>Cancel</Button>,
            <Button color="primary" onClick={this.delDialogClose}>Submit</Button>,
        ];
        return (
            <div>
                <RaisedButton
                    label='Jawab Latihan'
                    onClick={this.handleClick}
                    primary={true}
                    style={{marginTop: '30px'}}
                />
                <Dialog
                    actions={dialogAct}
                    modal={false}
                    open={this.state.dialog}
                    onRequestClose={this.delDialogCancel}
                >Yakin submit jawaban? Setelah di submit, jawaban yang masuk tidak dapat diganti lagi.</Dialog>
                <Snackbar
                    open={this.state.saveSuccess}
                    message={this.state.hasil}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        )
    }
}

JawabButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(JawabButton);