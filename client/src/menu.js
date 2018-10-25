import React from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MenuItemLink, getResources, WithPermission } from 'admin-on-rest';
//icons
import PostIcon from 'material-ui/svg-icons/action/book';
import MhsIcon from 'material-ui/svg-icons/social/people';
// import KelasIcon from 'material-ui/svg-icons/action/perm-contact-calendar';
import PrintIcon from 'material-ui/svg-icons/action/print';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import AddIcon from 'material-ui/svg-icons/social/group-add';
import EventNoteIcon from 'material-ui/svg-icons/notification/event-note';
import StorageIcon from 'material-ui/svg-icons/device/storage';
import ListIcon from 'material-ui/svg-icons/action/view-list';

import { Home, ThreeDRotation } from '@material-ui/icons';
import HomeIcon from 'material-ui/svg-icons/action/home';
import TabelIcon from 'material-ui/svg-icons/device/storage';
import KelasIcon from 'material-ui/svg-icons/social/group';
import PaketIcon from 'material-ui/svg-icons/action/assignment';
import SoalIcon from 'material-ui/svg-icons/action/description';
import JadwalIcon from 'material-ui/svg-icons/editor/insert-invitation';
import NilaiIcon from 'material-ui/svg-icons/action/chrome-reader-mode';
import UserIcon from 'material-ui/svg-icons/social/person';

const THEME = createMuiTheme({
    typography: {
        fontFamily: '"Montserrat", sans-serif',
    },
});

const Menu = ({ resources, onMenuTap, logout }) => (
    <div>
        <WithPermission value='dosen'>
            <MenuItemLink to="/dashboard" primaryText="Dashboard" onClick={onMenuTap} leftIcon={<HomeIcon />}/>
            <MenuItemLink to="/tabelsampel" primaryText="Tabel Sampel" onClick={onMenuTap} leftIcon={<TabelIcon />} />
            <MenuItemLink to="/kelas" primaryText="Kelas" onClick={onMenuTap} leftIcon={<KelasIcon />} />
            <MenuItemLink to="/soal" primaryText="Soal" onClick={onMenuTap} leftIcon={<SoalIcon />} />
            <MenuItemLink to="/paketSoal" primaryText="Paket Soal" onClick={onMenuTap} leftIcon={<PaketIcon />} />
            <MenuItemLink to="/jadwal" primaryText="Jadwal" onClick={onMenuTap} leftIcon={<JadwalIcon />} />
            <MenuItemLink to="/nilai" primaryText="Nilai" onClick={onMenuTap} leftIcon={<NilaiIcon />} />
        </WithPermission>
        <WithPermission value='superadmin'>
            <MenuItemLink to="/dashboard" primaryText="Dashboard" onClick={onMenuTap} leftIcon={<UserIcon />}/>
            <MenuItemLink to="/user" primaryText="User" onClick={onMenuTap} leftIcon={<HomeIcon />}/>
            <MenuItemLink to="/tabelsampel" primaryText="Tabel Sampel" onClick={onMenuTap} leftIcon={<TabelIcon />} />
            <MenuItemLink to="/kelas" primaryText="Kelas" onClick={onMenuTap} leftIcon={<KelasIcon />} />
            <MenuItemLink to="/soal" primaryText="Soal" onClick={onMenuTap} leftIcon={<SoalIcon />} />
            <MenuItemLink to="/paketSoal" primaryText="Paket Soal" onClick={onMenuTap} leftIcon={<PaketIcon />} />
            <MenuItemLink to="/jadwal" primaryText="Jadwal" onClick={onMenuTap} leftIcon={<JadwalIcon />} />
            <MenuItemLink to="/nilai" primaryText="Nilai" onClick={onMenuTap} leftIcon={<NilaiIcon />} />
        </WithPermission>
        <WithPermission value='mahasiswa'>
            <MenuItemLink to="/dashboard" primaryText="Dashboard" onClick={onMenuTap} leftIcon={<HomeIcon />} />
            <MenuItemLink to="/jadwalSesi" primaryText="Jadwal Sesi" onClick={onMenuTap} leftIcon={<JadwalIcon />} />
            <MenuItemLink to="/nilai" primaryText="Nilai" onClick={onMenuTap} leftIcon={<NilaiIcon />} />
        </WithPermission>
        {/* <MenuItemLink to="/kuis" primaryText="Kuis" onClick={onMenuTap} /> */}
        {/* <MenuItemLink primaryText="Logout" onClick={logout} /> */}
        
        {logout}
    </div>
);

const mapStateToProps = state => ({
    resources: getResources(state),
})
export default connect(mapStateToProps)(Menu);