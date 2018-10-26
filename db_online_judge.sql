-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 26, 2018 at 02:48 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_online_judge`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_event`
--

CREATE TABLE `tbl_event` (
  `id_event` int(11) NOT NULL,
  `id_mhs` varchar(30) NOT NULL,
  `waktu_mulai_event` time NOT NULL,
  `attempt` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `id_kontainer` int(11) NOT NULL,
  `id_jadwal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_event`
--

INSERT INTO `tbl_event` (`id_event`, `id_mhs`, `waktu_mulai_event`, `attempt`, `status`, `id_kontainer`, `id_jadwal`) VALUES
(69, '1531140037', '03:29:03', 10, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_jadwal`
--

CREATE TABLE `tbl_jadwal` (
  `id_jadwal` int(11) NOT NULL,
  `tgl_mulai` varchar(30) NOT NULL,
  `tgl_selesai` varchar(20) NOT NULL,
  `waktu_mulai` varchar(30) NOT NULL,
  `waktu_selesai` varchar(30) NOT NULL,
  `id_kontainer` int(11) NOT NULL,
  `keterangan` varchar(360) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_jadwal`
--

INSERT INTO `tbl_jadwal` (`id_jadwal`, `tgl_mulai`, `tgl_selesai`, `waktu_mulai`, `waktu_selesai`, `id_kontainer`, `keterangan`) VALUES
(1, '2018-07-18', '2018-12-26', '00:00:00', '23:59:00', 1, 'Uji coba kuis 1 Workshop'),
(2, '2018-07-18', '2018-08-26', '00:00:00', '23:00:00', 2, 'Uji coba latihan 1 Workshop');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_jadwal_kelas`
--

CREATE TABLE `tbl_jadwal_kelas` (
  `id_jadwal_kelas` int(11) NOT NULL,
  `id_jadwal` int(11) NOT NULL,
  `id_kelas` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_jadwal_kelas`
--

INSERT INTO `tbl_jadwal_kelas` (`id_jadwal_kelas`, `id_jadwal`, `id_kelas`) VALUES
(1, 1, 'MI2E2017'),
(2, 2, 'MI2E2017');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kelas`
--

CREATE TABLE `tbl_kelas` (
  `id_kelas` varchar(8) NOT NULL,
  `semester` int(11) NOT NULL,
  `NIP` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_kelas`
--

INSERT INTO `tbl_kelas` (`id_kelas`, `semester`, `NIP`) VALUES
('MI1A2015', 2, '111122223333'),
('MI1A2017', 2, '111122223333'),
('MI1A2018', 2, '111122223333'),
('MI2E2017', 2, '111122223333');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kontainer`
--

CREATE TABLE `tbl_kontainer` (
  `id_kontainer` int(11) NOT NULL,
  `tipe` enum('Latihan','Kuis','UTS','UAS') NOT NULL,
  `keterangan` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_kontainer`
--

INSERT INTO `tbl_kontainer` (`id_kontainer`, `tipe`, `keterangan`) VALUES
(1, 'Kuis', 'Uji Coba Kuis 1'),
(2, 'Latihan', 'Uji Coba Latihan 1'),
(3, 'Latihan', 'Deploy Latihan');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_kontainer_soal`
--

CREATE TABLE `tbl_kontainer_soal` (
  `id_kontainer_soal` int(11) NOT NULL,
  `id_kontainer` int(11) NOT NULL,
  `id_soal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_kontainer_soal`
--

INSERT INTO `tbl_kontainer_soal` (`id_kontainer_soal`, `id_kontainer`, `id_soal`) VALUES
(1, 1, 27),
(2, 1, 28),
(3, 1, 29),
(4, 1, 30),
(5, 1, 31),
(6, 1, 32),
(7, 1, 33),
(8, 1, 34),
(9, 1, 35),
(10, 1, 36),
(11, 2, 27),
(12, 2, 28),
(13, 2, 29),
(14, 2, 30),
(15, 2, 31),
(16, 2, 32),
(17, 2, 33),
(18, 2, 34),
(19, 2, 35),
(20, 2, 36),
(23, 1, 19);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mhs_jadwal`
--

CREATE TABLE `tbl_mhs_jadwal` (
  `id_mhs_jadwal` int(11) NOT NULL,
  `NIM` varchar(30) NOT NULL,
  `id_jadwal` int(11) NOT NULL,
  `nilai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mhs_jawaban`
--

CREATE TABLE `tbl_mhs_jawaban` (
  `id_mhs_jawaban` int(11) NOT NULL,
  `id_event` int(11) NOT NULL,
  `id_soal` int(11) NOT NULL,
  `text_jawaban` text NOT NULL,
  `nilai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_mhs_kelas`
--

CREATE TABLE `tbl_mhs_kelas` (
  `id_mhs_kelas` int(11) NOT NULL,
  `NIM` varchar(30) NOT NULL,
  `id_kelas` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_mhs_kelas`
--

INSERT INTO `tbl_mhs_kelas` (`id_mhs_kelas`, `NIM`, `id_kelas`) VALUES
(7, '1531140037', 'MI1A2017'),
(48, '1531140084', 'MI1A2015'),
(49, '1531140037', 'MI1A2015'),
(50, '1531140084', 'MI1A2017'),
(51, '1531140037', 'MI1A2018'),
(52, '1531140084', 'MI1A2018'),
(53, '154001', 'MI2E2017'),
(54, '154002', 'MI2E2017'),
(55, '154003', 'MI2E2017'),
(56, '154004', 'MI2E2017'),
(57, '154005', 'MI2E2017'),
(58, '154006', 'MI2E2017'),
(59, '154007', 'MI2E2017'),
(60, '154008', 'MI2E2017'),
(61, '154009', 'MI2E2017'),
(62, '1540010', 'MI2E2017');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_nilai`
--

CREATE TABLE `tbl_nilai` (
  `id_nilai` int(11) NOT NULL,
  `no_induk` varchar(30) NOT NULL,
  `id_jadwal_kelas` int(11) NOT NULL,
  `nilai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_nilai`
--

INSERT INTO `tbl_nilai` (`id_nilai`, `no_induk`, `id_jadwal_kelas`, `nilai`) VALUES
(51, '1531140084', 1, 0),
(52, '1531140084', 1, 0),
(53, '1531140084', 1, 0),
(54, '1531140084', 1, 0),
(55, '1531140084', 1, 0),
(56, '1531140084', 1, 0),
(57, '1531140084', 1, 0),
(58, '1531140084', 1, 0),
(59, '1531140037', 1, 0),
(60, '1531140037', 1, 0),
(61, '1531140037', 1, 0),
(62, '1531140037', 2, 0),
(63, '1531140037', 2, 0),
(64, '1531140037', 1, 0),
(65, '1531140037', 1, 0),
(66, '1531140037', 2, 0),
(67, '154001', 1, 0),
(68, '154005', 1, 100);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_soal`
--

CREATE TABLE `tbl_soal` (
  `id_soal` int(11) NOT NULL,
  `text_soal` text NOT NULL,
  `gambar` text NOT NULL,
  `text_jawaban` text NOT NULL,
  `namatabelsoal` varchar(90) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_soal`
--

INSERT INTO `tbl_soal` (`id_soal`, `text_soal`, `gambar`, `text_jawaban`, `namatabelsoal`) VALUES
(19, 'Tampilkan id dari tabel sql yang nama = "sakura"', 'gambar19.png', 'select id from tsql where name=''sakura''', 'tsql'),
(20, 'Pilih id,nama dari tabel tsql yang memiliki nama ''Naruto''', '', 'select id,nama from tsql where nama=''naruto''', 'tsql'),
(21, 'Pilih id,nama_paket,harga dari tabel paket yang memiliki harga >= 30000', '', 'select * from paket where harga >= 30000', 'paket'),
(22, 'Pilih harga dari tabel paket yang memiliki nama_paket=''Paket Pelajar 3''', '', 'select harga from paket where nama_paket=''Paket Pelajar 3''', 'paket'),
(23, 'Pilih nama_kategori dari tabel kategori dan nama_paket,detail dari tabel paketyang memiliki harga > 30000 ', '', 'select a.nama_kategori, b.nama_paket, b.detail from kategori as a JOIN paket as b ON a.id_paket=b.id WHERE b.harga > 30000', 'kategori,paket'),
(24, 'Pilih nama kategori dari tabel kategori dan harga dari tabel paket yang memiliki id paket lebih dari 3', '', 'select a.nama_kategori,b.harga from kategori as a JOIN paket as b ON a.id_paket=b.id WHERE b.id > 3', 'kategori,paket'),
(25, 'Tampilkan jumlah paket yang memiliki harga 40000 atau lebih', '', 'select count(id) from paket where harga >= 40000', 'kategori,paket'),
(27, 'Tampilkan nama dan harga dari tabel tb_wisata dengan harga kurang dari 50000 urut terbesar ke terkecil', 'gambar27.png', 'SELECT nama,harga FROM tb_wisata WHERE harga < 50000 ORDER BY harga desc', 'tb_wisata'),
(28, 'Tampilkan total harga dari tb_wisata dengan alamat yang mengandung kata Batu', 'gambar28.png', 'SELECT SUM(harga) FROM tb_wisata WHERE alamat LIKE ''%Batu%''', 'tb_wisata'),
(29, 'Tampilkan nama matakuliah, jumlah jadwal dan ruangan dari matakuliah dengan jumlah jadwal paling sedikit', 'gambar29.png', 'SELECT nama_matkul, COUNT(id_jadwal) as jumlah, ruangan from tb_matkul m JOIN tb_jadwal j on m.id_matkul = j.id_matkul GROUP BY(j.id_matkul) ORDER BY (jumlah) LIMIT 1', 'tb_matkul,tb_jadwal'),
(30, 'Tampilkan NIM, gabungan nama depan dan nama belakang (dipisah spasi) dan jumlah jadwal dari masing-masing mahasiswa', 'gambar30.png', 'SELECT m.NIM, concat(nama_depan, '' '', nama_belakang), COUNT(id_jadwal) from tb_mahasiswa m JOIN tb_jadwal j on m.NIM = j.NIM GROUP BY(j.NIM)', 'tb_mahasiswa,tb_jadwal'),
(31, 'Tampilkan nama depan dan total sks dari masing-masing mahasiswa', 'gambar31.png', 'SELECT nama_depan, sum(sks) from tb_mahasiswa m join tb_jadwal j on m.NIM = j.NIM join tb_matkul mk on j.id_matkul = mk.id_matkul GROUP BY(j.NIM)', 'tb_mahasiswa,tb_jadwal,tb_matkul'),
(32, 'Tampilkan nim dan nama depan dari mahasiswa berurutan menaik berdasarkan nama belakangnya', 'gambar32.png', 'SELECT nim, nama_depan FROM tb_mahasiswa ORDER BY(nama_belakang)', 'tb_mahasiswa'),
(33, 'Tampilkan rata-rata dari 2 tempat wisata dengan harga paling murah', 'gambar33.png', 'SELECT AVG(harga) FROM tb_wisata ORDER BY (harga) LIMIT 2', 'tb_wisata'),
(34, 'Tampilkan NIM, nama depan, dan ruangan yang digunakan oleh mahasiswa dengan NIM 1531140037', 'gambar34.png', 'SELECT m.NIM, m.nama_depan, ruangan FROM tb_mahasiswa m JOIN tb_jadwal j on m.NIM = j.NIM WHERE m.NIM = ''1531140037''', 'tb_mahasiswa,tb_jadwal'),
(35, 'Tampilkan NIM, nama matakuliah, dan ruangan yang digunakan oleh mahasiswa dengan nama depan yang mengandung karakter ''pri''', 'gambar35.png', 'SELECT m.NIM, nama_matkul, ruangan FROM tb_mahasiswa m JOIN tb_jadwal j on m.NIM = j.NIM JOIN tb_matkul mk on j.id_matkul = mk.id_matkul WHERE m.nama_depan LIKE ''%pri%''', 'tb_mahasiswa,tb_jadwal,tb_matkul'),
(36, 'Tampilkan nama matakuliah yang diikuti oleh mahasiswa dengan nama depan Hilal', 'gambar36.png', 'SELECT nama_matkul FROM tb_mahasiswa m JOIN tb_jadwal j on m.NIM = j.NIM JOIN tb_matkul mk ON j.id_matkul = mk.id_matkul WHERE m.nama_depan = ''Hilal''', 'tb_mahasiswa,tb_jadwal,tb_matkul');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `username` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `level` enum('superadmin','dosen','mahasiswa','') NOT NULL,
  `no_induk` varchar(30) NOT NULL,
  `nama` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`username`, `password`, `level`, `no_induk`, `nama`) VALUES
('dosen', 'dosen123', 'dosen', '111122223333', 'dosen satu'),
('admin', 'admin123', 'superadmin', '12345', 'SUPERADMIN'),
('mhs', 'mhs123', 'mahasiswa', '1531140037', 'Prisalia A'),
('1531140084', '19970927HI', 'mahasiswa', '1531140084', 'Hilal Arsa Himawan'),
('user1', 'pass1', 'mahasiswa', '154001', 'user1'),
('user10', 'pass10', 'mahasiswa', '1540010', 'user10'),
('wowo', 'wowo', 'mahasiswa', '154002', 'wowo'),
('user3', 'pass3', 'mahasiswa', '154003', 'user3'),
('user4', 'pass4', 'mahasiswa', '154004', 'user4'),
('user5', 'pass5', 'mahasiswa', '154005', 'user5'),
('user6', 'pass6', 'mahasiswa', '154006', 'user6'),
('user7', 'pass7', 'mahasiswa', '154007', 'user7'),
('user8', 'pass8', 'mahasiswa', '154008', 'user8'),
('user9', 'pass9', 'mahasiswa', '154009', 'user9');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_event`
--
ALTER TABLE `tbl_event`
  ADD PRIMARY KEY (`id_event`),
  ADD KEY `id_mhs` (`id_mhs`),
  ADD KEY `id_kontainer` (`id_kontainer`),
  ADD KEY `id_jadwal` (`id_jadwal`);

--
-- Indexes for table `tbl_jadwal`
--
ALTER TABLE `tbl_jadwal`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `id_kontainer_soal` (`id_kontainer`);

--
-- Indexes for table `tbl_jadwal_kelas`
--
ALTER TABLE `tbl_jadwal_kelas`
  ADD PRIMARY KEY (`id_jadwal_kelas`),
  ADD KEY `id_jadwal` (`id_jadwal`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indexes for table `tbl_kelas`
--
ALTER TABLE `tbl_kelas`
  ADD PRIMARY KEY (`id_kelas`),
  ADD KEY `NIP` (`NIP`);

--
-- Indexes for table `tbl_kontainer`
--
ALTER TABLE `tbl_kontainer`
  ADD PRIMARY KEY (`id_kontainer`);

--
-- Indexes for table `tbl_kontainer_soal`
--
ALTER TABLE `tbl_kontainer_soal`
  ADD PRIMARY KEY (`id_kontainer_soal`),
  ADD KEY `id_kontainer` (`id_kontainer`),
  ADD KEY `id_soal` (`id_soal`);

--
-- Indexes for table `tbl_mhs_jadwal`
--
ALTER TABLE `tbl_mhs_jadwal`
  ADD PRIMARY KEY (`id_mhs_jadwal`),
  ADD KEY `NIM` (`NIM`),
  ADD KEY `id_jadwal` (`id_jadwal`);

--
-- Indexes for table `tbl_mhs_jawaban`
--
ALTER TABLE `tbl_mhs_jawaban`
  ADD PRIMARY KEY (`id_mhs_jawaban`),
  ADD KEY `id_mhs_jadwal` (`id_event`),
  ADD KEY `id_soal` (`id_soal`);

--
-- Indexes for table `tbl_mhs_kelas`
--
ALTER TABLE `tbl_mhs_kelas`
  ADD PRIMARY KEY (`id_mhs_kelas`),
  ADD KEY `NIM` (`NIM`),
  ADD KEY `id_kelas` (`id_kelas`);

--
-- Indexes for table `tbl_nilai`
--
ALTER TABLE `tbl_nilai`
  ADD PRIMARY KEY (`id_nilai`),
  ADD KEY `no_induk` (`no_induk`),
  ADD KEY `id_jadwal_kelas` (`id_jadwal_kelas`);

--
-- Indexes for table `tbl_soal`
--
ALTER TABLE `tbl_soal`
  ADD PRIMARY KEY (`id_soal`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD UNIQUE KEY `no_induk` (`no_induk`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_event`
--
ALTER TABLE `tbl_event`
  MODIFY `id_event` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;
--
-- AUTO_INCREMENT for table `tbl_jadwal`
--
ALTER TABLE `tbl_jadwal`
  MODIFY `id_jadwal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_jadwal_kelas`
--
ALTER TABLE `tbl_jadwal_kelas`
  MODIFY `id_jadwal_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `tbl_kontainer`
--
ALTER TABLE `tbl_kontainer`
  MODIFY `id_kontainer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tbl_kontainer_soal`
--
ALTER TABLE `tbl_kontainer_soal`
  MODIFY `id_kontainer_soal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT for table `tbl_mhs_jadwal`
--
ALTER TABLE `tbl_mhs_jadwal`
  MODIFY `id_mhs_jadwal` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_mhs_jawaban`
--
ALTER TABLE `tbl_mhs_jawaban`
  MODIFY `id_mhs_jawaban` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `tbl_mhs_kelas`
--
ALTER TABLE `tbl_mhs_kelas`
  MODIFY `id_mhs_kelas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT for table `tbl_nilai`
--
ALTER TABLE `tbl_nilai`
  MODIFY `id_nilai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `tbl_soal`
--
ALTER TABLE `tbl_soal`
  MODIFY `id_soal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_event`
--
ALTER TABLE `tbl_event`
  ADD CONSTRAINT `tbl_event_ibfk_1` FOREIGN KEY (`id_mhs`) REFERENCES `tbl_user` (`no_induk`),
  ADD CONSTRAINT `tbl_event_ibfk_2` FOREIGN KEY (`id_jadwal`) REFERENCES `tbl_jadwal` (`id_jadwal`);

--
-- Constraints for table `tbl_jadwal`
--
ALTER TABLE `tbl_jadwal`
  ADD CONSTRAINT `tbl_jadwal_ibfk_1` FOREIGN KEY (`id_kontainer`) REFERENCES `tbl_kontainer_soal` (`id_kontainer`);

--
-- Constraints for table `tbl_jadwal_kelas`
--
ALTER TABLE `tbl_jadwal_kelas`
  ADD CONSTRAINT `tbl_jadwal_kelas_ibfk_1` FOREIGN KEY (`id_jadwal`) REFERENCES `tbl_jadwal` (`id_jadwal`),
  ADD CONSTRAINT `tbl_jadwal_kelas_ibfk_2` FOREIGN KEY (`id_kelas`) REFERENCES `tbl_kelas` (`id_kelas`);

--
-- Constraints for table `tbl_kelas`
--
ALTER TABLE `tbl_kelas`
  ADD CONSTRAINT `tbl_kelas_ibfk_1` FOREIGN KEY (`NIP`) REFERENCES `tbl_user` (`no_induk`);

--
-- Constraints for table `tbl_kontainer_soal`
--
ALTER TABLE `tbl_kontainer_soal`
  ADD CONSTRAINT `tbl_kontainer_soal_ibfk_1` FOREIGN KEY (`id_kontainer`) REFERENCES `tbl_kontainer` (`id_kontainer`),
  ADD CONSTRAINT `tbl_kontainer_soal_ibfk_2` FOREIGN KEY (`id_soal`) REFERENCES `tbl_soal` (`id_soal`);

--
-- Constraints for table `tbl_mhs_jadwal`
--
ALTER TABLE `tbl_mhs_jadwal`
  ADD CONSTRAINT `tbl_mhs_jadwal_ibfk_1` FOREIGN KEY (`NIM`) REFERENCES `tbl_user` (`no_induk`),
  ADD CONSTRAINT `tbl_mhs_jadwal_ibfk_2` FOREIGN KEY (`id_jadwal`) REFERENCES `tbl_jadwal` (`id_jadwal`);

--
-- Constraints for table `tbl_mhs_jawaban`
--
ALTER TABLE `tbl_mhs_jawaban`
  ADD CONSTRAINT `tbl_mhs_jawaban_ibfk_2` FOREIGN KEY (`id_soal`) REFERENCES `tbl_soal` (`id_soal`),
  ADD CONSTRAINT `tbl_mhs_jawaban_ibfk_3` FOREIGN KEY (`id_event`) REFERENCES `tbl_event` (`id_event`);

--
-- Constraints for table `tbl_mhs_kelas`
--
ALTER TABLE `tbl_mhs_kelas`
  ADD CONSTRAINT `tbl_mhs_kelas_ibfk_1` FOREIGN KEY (`NIM`) REFERENCES `tbl_user` (`no_induk`),
  ADD CONSTRAINT `tbl_mhs_kelas_ibfk_2` FOREIGN KEY (`id_kelas`) REFERENCES `tbl_kelas` (`id_kelas`);

--
-- Constraints for table `tbl_nilai`
--
ALTER TABLE `tbl_nilai`
  ADD CONSTRAINT `tbl_nilai_ibfk_1` FOREIGN KEY (`id_jadwal_kelas`) REFERENCES `tbl_jadwal_kelas` (`id_jadwal_kelas`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
