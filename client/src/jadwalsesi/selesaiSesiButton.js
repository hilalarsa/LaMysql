import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';
import Link from 'react-router-dom/Link';

class SelesaiSesiButton extends Component {
    handleClick = () => {
        const { push, record, id_event } = this.props;
        console.log(id_event)
        var no_induk = localStorage.getItem('no_induk')
        var id_jadwal = localStorage.getItem('id_jadwal')
        var obj={
            id_event,
            no_induk,
            id_jadwal
        }
        fetch(process.env.REACT_APP_SERVER_ENDPOINT +"/sesi/hapusSesi", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(obj)
        }).then((response) => {
            console.log("get response!",response);
            if (response.status >= 400) {
                return "error"
            } else {
                return response.json()
            }
        }).then((data) => {
            // console.log("datadata", data)
            if (data == "error") {
                console.log("error");
            } else {
                // localStorage.removeItem('id_jadwal')
                push(`/dashboard`)
            }
        }).catch(function (err) {
            console.log(err)
            // console.log(data)
        });

        
        // push("mhsKelas/?" + $.param({id: record.id}));
        // push(`mhsKelas/`)
    }

    render() {
        return (<RaisedButton label='Selesaikan sesi'
            onClick={this.handleClick}
            primary={true}
        />)
    }
}

// KerjakanKuisButton.propTypes = {
//     push: PropTypes.func,
//     record: PropTypes.object,
//     showNotification: PropTypes.func,
// };

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(SelesaiSesiButton);