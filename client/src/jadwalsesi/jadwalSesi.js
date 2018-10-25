import React from 'react';
import {
    List,
    Edit,
    Create,
    Datagrid,
    ReferenceField,
    TextField,
    EditButton, CreateButton, RefreshButton,
    DisabledInput,
    LongTextInput,
    ReferenceInput,
    required,
    SelectInput,
    SimpleForm,
    TextInput,
    TabbedForm, FormTab, DateField
} from 'admin-on-rest';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import KerjakanSesiButton from './kerjakanSesiButton'

import { showNotification as showNotificationAction } from 'admin-on-rest';

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

const PostTitle = ({ record }) => {
    return <span>{record ? `"${record.id}"` : ''}</span>;
};

export const listSesi = (props, {record}) => (
    <List {...props} title="List Jadwal">
        <Datagrid>
            <TextField source="id" />
            <TextField source="keterangan" />
            <TextField source="tipe" />
            <TextField source="tgl_mulai"/>
            <TextField source="tgl_selesai" />
            <TextField source="waktu_mulai" />
            <TextField source="waktu_selesai" />
            {/* <ReferenceField label="Tipe" source="tipe" reference="jadwalSesi" linkType="show"> */}
                {/* <TextField source="keterangan" /> */}
                <KerjakanSesiButton type={record}/>

                {/* <Tipe/> */}
            {/* </ReferenceField> */}
        </Datagrid>
    </List>
);

export default listSesi;