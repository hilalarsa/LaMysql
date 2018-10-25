import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';

class EditKontainerSoal extends Component {
    handleClick = () => {
        const { push, record } = this.props;
        // console.log(`${record.semester}`);
        push(`kontainerSoal/${record.id}`)
    }

    render() {
        return (<RaisedButton label='Soal'
            onClick={this.handleClick}
            primary={true}
        />)
    }
}

EditKontainerSoal.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(EditKontainerSoal);