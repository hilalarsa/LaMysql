import React from 'react';
import { Route } from 'react-router-dom';
//DASHBOARD
import dashboard from '../dashboard/Dashboard';
import editUser from '../dashboard/editUser';

//SOAL SESI
import listSoalSesi from '../jadwalsesi/listSoalSesi';

//TABEL SAMPEL
import tabelsampel from '../tabelsampel/tabelsampel';
import tambahTabelSampel from '../tabelsampel/tambahTabelSampel';
import detailTabelSampel from '../tabelsampel/detailTabelSampel';

//DATA USER
import dataUser from '../user/dataUser';
import tambahUser from '../user/tambahUser';
import editDataUser from '../user/editUser';

//DATA SOAL
import dataSoal from '../soal/dataSoal';
import tambahSoal from '../soal/tambahSoal';
import editDataSoal from '../soal/editDataSoal';

//DATA KONTAINER SOAL
import dataKontainerSoal from '../soal/dataKontainerSoal';
import dataPaketSoal from '../soal/dataPaketSoal';
import tambahPaketSoal from '../soal/tambahPaketSoal';
import editPaketSoal from '../soal/editPaketSoal';

//DATA KELAS
import dataKelas from '../kelas/dataKelas';
import editKelas from '../kelas/editKelas';
import tambahKelas from '../kelas/tambahKelas';
import dataMhsKelas from '../kelas/dataMhsKelas';

//JADWAL
import dataJadwal from '../jadwal/dataJadwal';
import tambahJadwal from '../jadwal/tambahJadwal';
import editJadwal from '../jadwal/editJadwal';

//NILAI
import dataNilai from '../nilai/dataNilai';
import kelasNilai from '../nilai/kelasNilai';
import nilaiJawaban from '../nilai/nilaiJawaban';

//KERJAKAN
import kerjakanKuis from '../kuis/kerjakanKuis';
import kerjakanLatihan from '../latihan/kerjakanLatihan';

//JADWAL SESI
import jadwalSesi from '../jadwalSesi';

export default [
    <Route exact path="/dashboard" component={dashboard} />,
    <Route exact path="/dashboard/edit" component={editUser} />,  

    <Route exact path="/user" component={dataUser} />,
    <Route exact path="/user/insert" component={tambahUser} />,
    <Route exact path="/user/:id" component={editDataUser} />,

    <Route exact path="/kuis/:id" component={kerjakanKuis} />,

    <Route exact path="/latihan/:id" component={kerjakanLatihan} />,

    <Route exact path="/sesi/getAllSoal/:id" component={listSoalSesi} />,

    <Route exact path="/tabelsampel" component={tabelsampel} />,
    <Route exact path="/tabelsampel/insert" component={tambahTabelSampel} />,
    <Route exact path="/tabelsampel/detail/:id" component={detailTabelSampel} />,

    <Route exact path="/mhsKelas/:id" component={dataMhsKelas} />,
    <Route exact path="/kontainerSoal/:id" component={dataKontainerSoal} />,

    <Route exact path="/soal" component={dataSoal} />,
    <Route exact path="/soal/insert" component={tambahSoal} />,
    <Route exact path="/soal/:id" component={editDataSoal} />,

    <Route exact path="/kelas" component={dataKelas} />,
    <Route exact path="/kelas/insert" component={tambahKelas} />,
    <Route exact path="/kelas/:id" component={editKelas} />,

    <Route exact path="/paketSoal" component={dataPaketSoal} />,
    <Route exact path="/paketSoal/insert" component={tambahPaketSoal} />,
    <Route exact path="/paketSoal/:id" component={editPaketSoal} />,
    
    <Route exact path="/jadwal" component={dataJadwal} />,
    <Route exact path="/jadwal/insert" component={tambahJadwal} />,
    <Route exact path="/jadwal/:id" component={editJadwal} />,

    <Route exact path="/nilai" component={dataNilai} />,
    <Route exact path="/nilai/jawaban/:id" component={nilaiJawaban} />,
];

/*
 <Route exact path="/soal" component={dataSoal} />,
    <Route exact path="/soal/insert" component={tambahSoal} />,
    <Route exact path="/soal/:id" component={editDataSoal} />,

    <Route exact path="/kelas" component={dataKelas} />,
    <Route exact path="/kelas/:id" component={editKelas} />,
    <Route exact path="/kelas/insert" component={tambahKelas} />,

    <Route exact path="/jadwal" component={dataJadwal} />,
    <Route exact path="/jadwal/insert" component={tambahJadwal} />,

    <Route exact path="/nilai" component={dataNilai} />,
*/