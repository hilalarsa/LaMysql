import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';
import Link from 'react-router-dom/Link';

class KerjakanKuisButton extends Component {
    handleClick = () => {
        const { push, record } = this.props;
        console.log(`${record.id}`);
        console.log("get data kuis")
        console.log(this.props)
        push(`kuis/${record.id}`)
        
        // push("mhsKelas/?" + $.param({id: record.id}));
        // push(`mhsKelas/`)
    }

    render() {
        return (<RaisedButton label='Kerjakan soal'
            onClick={this.handleClick}
            primary={true}
        />)
    }
}

KerjakanKuisButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(KerjakanKuisButton);