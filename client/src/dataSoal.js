import React from 'react';
import {
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    EditButton, CreateButton, RefreshButton,
    ReferenceManyField,
    DisabledInput,
    required,
    SimpleForm,
    TextInput,
    TabbedForm, FormTab, Filter,
    SelectInput,
    ImageInput, ImageField
} from 'admin-on-rest';
import EditMhsKelas from './customButton/editMhsKelas';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import EditKontainerSoal from './customButton/editKontainerSoal';

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

export const postPaketSoal = (props) => (
    <List {...props} title="List Paket Soal">
        <Datagrid>
            <TextField source="id" />
            <TextField source="jumlah_soal" />
            <TextField source="tipe" />
            <TextField source="keterangan" />
            <EditButton />
            <EditKontainerSoal />
        </Datagrid>
    </List>
);

export const editPaketSoal = (props) => (
    <Edit title={"Edit Data"} {...props}>
        <SimpleForm>
            <DisabledInput source="id" validate={required} />
            <TextInput source="tipe" validate={required} />
            <TextInput source="keterangan" validate={required} />
        </SimpleForm>
    </Edit>
);

export const insertPaketSoal = (props) => (
    <Create title={"Masukkan Data"} {...props}>
        <SimpleForm>
            <SelectInput source="tipe" choices={[
                { id: 'Kuis', name: 'Kuis' },
                { id: 'Latihan', name: 'Latihan' },
                { id: 'UTS', name: 'UTS' },
                { id: 'UAS', name: 'UAS' }
            ]} />
            <TextInput source="keterangan" validate={required} />
        </SimpleForm>
    </Create>
);

//soal
export const postSoal = (props) => (
    <List {...props} title="List Soal">
        <Datagrid>
            <TextField source="id" />
            <TextField source="text_soal" />
            <TextField source="gambar" />
            <TextField source="text_jawaban" />
            <EditButton />
        </Datagrid>
    </List>
);

export const editSoal = (props) => (
    <Edit title={"Edit Data"} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="text_soal" validate={required} />
            <ImageInput source="gambar" label="Gambar" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            {/* <TextInput source="gambar" validate={required} /> */}
            <TextInput source="text_jawaban" validate={required} />
        </SimpleForm>
    </Edit>
);

export const insertSoal = (props) => (
    <Create title={"Masukkan Data"} {...props}>
        <SimpleForm redirect="/soal">
            <TextInput source="text_soal" validate={required} />
            <ImageInput source="gambar" label="Gambar" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            {/* <TextInput source="gambar" validate={required} /> */}
            <TextInput source="text_jawaban" validate={required} />
        </SimpleForm>
    </Create>
);
export default postPaketSoal;