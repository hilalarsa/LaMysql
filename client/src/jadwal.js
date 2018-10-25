import React from 'react';
import {
    List,
    Edit,
    Create,
    Datagrid,
    TextField,
    EditButton, CreateButton, RefreshButton,
    DateInput,
    DisabledInput,
    required,
    SimpleForm,
    TextInput
} from 'admin-on-rest';
import { CardActions } from 'material-ui/Card';
import { push as pushAction } from 'react-router-redux';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const _tz_offset = new Date().getTimezoneOffset() / 60;
export const dateParser = v => {
  const regexp = /(\d{4})-(\d{2})-(\d{2})/
  var match = regexp.exec(v);
  if (match === null) return;
  
  var year = match[1];
  var month = match[2];
  var day = match[3];

  if (_tz_offset < 0) {
    // negative offset means our picked UTC date got converted to previous day
    var date = new Date(v);
    date.setDate(date.getDate() + 1);
    match = regexp.exec(date.toISOString())
    year = match[1];
    month = match[2];
    day = match[3];
  }
  const d = [year, month, day].join("-");
  return d;
};

//jadwal
export const postJadwal = (props) => (
    <List {...props} title="List Jadwal">
        <Datagrid>
            <TextField source="id" />
            <TextField source="tanggal_mulai" />
            <TextField source="tanggal_selesai" />
            <TextField source="waktu_mulai" />
            <TextField source="waktu_selesai" />
            <TextField source="paket" />
            <EditButton />
        </Datagrid>
    </List>
);

export const editJadwal = (props) => (
    <Edit title={"Edit Data"} {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <DateInput source="tanggal_mulai" validate={required} parse={dateParser} />
            <DateInput source="tanggal_selesai" validate={required} parse={dateParser} />
            <TextInput source="waktu_mulai" validate={required} />
            <TextInput source="waktu_selesai" validate={required} />
            <TextInput source="paket" validate={required} />
            <TextInput source="keterangan" validate={required} />
        </SimpleForm>
    </Edit>
);

export const insertJadwal = (props) => (
    <Create title={"Masukkan Data"} {...props}>
        <SimpleForm>
            <DateInput source="tanggal_mulai" validate={required} parse={dateParser} />
            <DateInput source="tanggal_selesai" validate={required} parse={dateParser} />
            <TextInput source="waktu_mulai" validate={required} />
            <TextInput source="waktu_selesai" validate={required} />
            <TextInput source="paket" validate={required} />
            <TextInput source="keterangan" validate={required} />
        </SimpleForm>
    </Create>
);
export default postJadwal;