import React from 'react';
import { Card, CardHeader, CardActions, EditButton, CreateButton, RefreshButton, CardText, List, Datagrid, TextField } from 'material-ui/Card';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};
const PostActions = ({ resource, filters, displayedFilters, filterValues, basePath, showFilter }) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, { resource, showFilter, displayedFilters, filterValues, context: 'button' })}
        <CreateButton basePath={basePath} />
        <RefreshButton />
    </CardActions>
);

export const jadwalSesi = (props) => (
    <List {...props} title="List Jadwal">
        <Datagrid>
            <TextField source="tipe" />
            {/* <TextField source="tanggal_mulai"/>
            <TextField source="tanggal_selesai" />
            <TextField source="waktu_mulai" />
            <TextField source="waktu_selesai" /> */}
            <TextField source="keterangan" />
            {/* <EditButton /> */}
        </Datagrid>
    </List>
);

export default jadwalSesi;
