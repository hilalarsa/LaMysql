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
    TabbedForm, FormTab, Filter, LongTextInput
} from 'admin-on-rest';
import KerjakanKuisButton from './kerjakanKuisButton';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { push as pushAction } from 'react-router-redux';
import Clock from '../Clock'
import ReactTable from "react-table";
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

// class Try extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {

//         };
//     }
//     componentDidMount(){
//         var par = localStorage.getItem('no_induk')
//         fetch('http://localhost:5000/getIdSesi/' + par, { //ambil waktu dari jadwal
//             method: 'GET'
//         }).then(function (response) {
//             if (response.status >= 400) {
//                 throw new Error("Bad response from server");
//             }
//             return response.json();
//         }).then(function (data) {
//             console.log(data[0].paket)

//         }).catch(err => {
//             console.log('caught it!', err);
//         })
//     }

//     render(){
//         return
//     <List {...props} title="YOLO">
//         <Datagrid>
//             <TextField source="id" />
//             <TextField source="text_soal" />
//             <KerjakanKuisButton />
//             {/* <Try /> */}
//         </Datagrid>
//     </List>
//     }
// }

{/* <Clock type={record} /> */}
const PostTitle = (props) => (
    <span>{props}{console.log(props)}</span>
);
export const listKuis = (props,{record}) => (
    <List {...props} title="Kuis">
        <Datagrid>
            <TextField source="id" />
            <TextField source="text_soal" />
            <KerjakanKuisButton/>
        </Datagrid>
    </List>
);



export default listKuis;