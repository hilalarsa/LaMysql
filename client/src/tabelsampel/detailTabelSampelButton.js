import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { showNotification as showNotificationAction } from 'admin-on-rest';
import { push as pushAction } from 'react-router-redux';

class DetailTabelSampelButton extends React.Component {
    handleClick = () => {
        const { push, record } = this.props;
        console.log(`${record.id}`);
        console.log("data record")
        console.log(record)
        push(`/tabelsampel/getDetailTabel/${record.table_name}`)
        // push(`tabelsampel/${record.id}`)
        // push("mhsKelas/?" + $.param({id: record.id}));
        // push(`mhsKelas/`)
    }

    render() {
        return (<RaisedButton label='Detail'
            onClick={this.handleClick}
            primary={true}
        />)
    }
}

DetailTabelSampelButton.propTypes = {
    push: PropTypes.func,
    record: PropTypes.object,
    showNotification: PropTypes.func,
};

export default connect(null, {
    showNotification: showNotificationAction,
    push: pushAction
})(DetailTabelSampelButton);