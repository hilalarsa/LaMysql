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

export const detailTabel = (props) => (
    <List {...props} actions={<PostActions />}>
        <Datagrid>
            <TextField source="id" />
        </Datagrid>
    </List>
);


export default detailTabel;