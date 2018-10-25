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
    TabbedForm, FormTab
} from 'admin-on-rest';
import EditMhsKelas from './customButton/editMhsKelas';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

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

export const dataKelas = (props) => (
    <List {...props} actions={<PostActions />}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="semester" />
            <TextField source="NIP" />
            <EditButton />
            <EditMhsKelas />
        </Datagrid>
    </List>
);


export const editKelas = (props) => (
    <Edit title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" validate={required} />
            <TextInput source="semester" validate={required} />
            <TextInput source="NIP" validate={required} />
        </SimpleForm>
    </Edit>
);  


export const insertKelas = (props) => (
    <Create title={<PostTitle />} {...props}>
        <SimpleForm>
            <TextInput source="id" validate={required} />
            <TextInput source="semester" validate={required} />
            <TextInput source="NIP" validate={required} />
        </SimpleForm>
    </Create>
);

export default dataKelas;