import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';

class EditMhsKelas extends Component {
    handleClick = () => {
        const { push, record } = this.props;
        console.log(`${record.semester}`);
        push(`mhsKelas/${record.id}`)
        // push(`mhsKelas/${record.id}`)
        // push("mhsKelas/?" + $.param({id: record.id}));
        // push(`mhsKelas/`)
    }

    render() {
        return (<RaisedButton label='Mahasiswa'
            onClick={this.handleClick}
            primary={true}
        />)
    }
}

EditMhsKelas.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(EditMhsKelas);