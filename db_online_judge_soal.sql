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
-- Database: `db_online_judge_soal`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_id` int(11) NOT NULL,
  `emp_name` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `nama_paket` varchar(200) NOT NULL,
  `status_paket` tinyint(1) NOT NULL,
  `hak_akses` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_name`, `address`, `email`, `username`, `password`, `status`, `nama_paket`, `status_paket`, `hak_akses`) VALUES
(1, 'Beli1', 'Malang', 'hilalarsa@gmail.com', 'beli1', '0136887391662a4b62b7ada2155a9005', 1, 'Paket 104 - Jurus KungFu untuk Anak SMK', 1, 'user'),
(2, 'Hilal', 'Malang', 'hilalarsa2@gmail.com', 'admin', '21232f297a57a5a743894a0e4a801fc3', 1, 'Paket 102 - Jurus KungFu untuk Anak SMP', 0, 'admin'),
(4, 'Naruto', 'Konoha', 'cloudhilal1@gmail.com', 'naruto', 'cf9ee5bcb36b4936dd7064ee9b2f139e', 0, 'Paket kombi', 0, 'user'),
(7, 'Naruto uzumaki', 'Konoha', 'naruto@gmail.com', 'naruto', 'cf9ee5bcb36b4936dd7064ee9b2f139e', 1, '', 0, 'siswa'),
(8, 'siswa', 'siswa', 'siswa@gmail.com', 'siswa', 'bcd724d15cde8c47650fda962968f102', 1, '', 0, 'siswa');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL,
  `id_paket` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `id_paket`) VALUES
(1, 'TPA', 1),
(2, 'TBI', 2),
(3, 'TIU', 3),
(4, 'WB', 4),
(5, 'TKP', 5);

-- --------------------------------------------------------

--
-- Table structure for table `kelas`
--

CREATE TABLE `kelas` (
  `id_kelas` int(11) NOT NULL,
  `nama_kelas` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kelas`
--

INSERT INTO `kelas` (`id_kelas`, `nama_kelas`) VALUES
(1, 'MI3A'),
(2, 'TI4A');

-- --------------------------------------------------------

--
-- Table structure for table `konfirmasi`
--

CREATE TABLE `konfirmasi` (
  `id` int(11) NOT NULL,
  `nama_pengirim` varchar(100) NOT NULL,
  `tanggal` varchar(100) NOT NULL,
  `nilai_transfer` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `username` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `konfirmasi`
--

INSERT INTO `konfirmasi` (`id`, `nama_pengirim`, `tanggal`, `nilai_transfer`, `image`, `username`, `status`) VALUES
(10, 'Hilal', '19 september', '50000', 'uploads/264.jpg', 'admin', 'sudah'),
(11, 'Hilalhilal', '1 Januari 2018', '100000', 'uploads/264.jpg', 'beli1', 'sudah'),
(12, 'Hilalhilal', '1 Januari 2018', '22', 'uploads/Pasted_Image_-_2.png', 'genba', 'sudah'),
(13, 'aad', '123', '123', 'uploads/264.jpg', 'admin', 'sudah'),
(14, 'senin', 'senin', '1000000', 'uploads/blockdiagram1(2)(1).png', 'beli1', 'sudah'),
(15, 'Haha', 'Sekarang', '100000', 'uploads/941679486_20150910031642.jpg', 'admin', 'sudah'),
(16, 'aad', 'a', 'a', 'uploads/264.jpg', 'admin', 'sudah'),
(17, 'beli1', 'beli1', 'beli1', 'uploads/264.jpg', 'beli1', 'sudah'),
(18, 's', 's', 's', 'uploads/99999.PNG', 'beli1', 'sudah');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `id_kelas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `nama`, `id_kelas`) VALUES
(1, 'Hilal', 1),
(2, 'Prisa', 2);

-- --------------------------------------------------------

--
-- Table structure for table `mesin`
--

CREATE TABLE `mesin` (
  `id_mesin` int(11) NOT NULL,
  `nama_mesin` varchar(50) NOT NULL,
  `kapasitas` int(11) NOT NULL,
  `waktu_terakhir` datetime DEFAULT NULL,
  `loading` int(11) DEFAULT NULL,
  `kanban` int(11) NOT NULL,
  `cycle` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mesin`
--

INSERT INTO `mesin` (`id_mesin`, `nama_mesin`, `kapasitas`, `waktu_terakhir`, `loading`, `kanban`, `cycle`) VALUES
(12, 'AC81T-01', 1400, '2018-03-12 04:49:00', 1200, 1300, 8),
(13, 'AC81T-02', 1300, '2018-02-28 10:30:47', NULL, 0, 8),
(14, 'AC90T-01', 1530, '2018-02-28 10:31:01', NULL, 0, 8),
(15, 'AC90T-02', 1251, '2018-02-28 10:31:10', NULL, 0, 8),
(16, 'AC90T-03', 1443, '2018-02-28 10:31:19', NULL, 0, 8),
(17, 'AC90T-05', 1478, '2018-02-28 10:31:27', NULL, 0, 8),
(18, 'AC90T-06', 1362, '2018-02-28 10:31:36', NULL, 0, 8);

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `id` int(11) NOT NULL,
  `nama_paket` varchar(200) NOT NULL,
  `detail` varchar(200) NOT NULL,
  `harga` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`id`, `nama_paket`, `detail`, `harga`) VALUES
(1, 'Paket Pelajar 1', 'TPA + TBI', '10000'),
(2, 'Paket Pelajar 2', 'TPA + TKP', '20000'),
(3, 'Paket Pelajar 3', 'TIU + WB + TKP', '30000'),
(4, 'Paket Pelajar 4', 'TPA + TBI + TIU + WB + TKP', '40000'),
(5, 'Paket 5 SPesial', 'TPA + TBI', '50000');

-- --------------------------------------------------------

--
-- Table structure for table `soal`
--

CREATE TABLE `soal` (
  `quizID` int(255) NOT NULL,
  `question` text NOT NULL,
  `choice1` text NOT NULL,
  `choice2` text NOT NULL,
  `choice3` text NOT NULL,
  `choice4` text NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soal`
--

INSERT INTO `soal` (`quizID`, `question`, `choice1`, `choice2`, `choice3`, `choice4`, `answer`) VALUES
(1, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(2, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(3, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(4, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(5, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(6, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(7, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(8, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(9, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(10, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(11, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(12, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(13, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(14, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(15, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(16, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(17, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(18, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(19, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(20, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(21, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(22, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(23, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(24, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(25, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(26, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(27, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(28, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(29, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(30, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(31, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(32, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(33, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(34, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(35, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(36, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(37, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(38, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(39, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban'),
(40, 'Pertanyaan', 'Pilihan1', 'Pilihan2', 'Pilihan3', 'Pilihan4', 'Jawaban');

-- --------------------------------------------------------

--
-- Table structure for table `soal88`
--

CREATE TABLE `soal88` (
  `id` int(11) NOT NULL,
  `soal` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soal88`
--

INSERT INTO `soal88` (`id`, `soal`) VALUES
(1, 'foo'),
(2, 'bar'),
(3, 'Pertanyaan2'),
(4, 'Pertanyaan3'),
(5, 'Pertanyaan4'),
(6, 'Pertanyaan5');

-- --------------------------------------------------------

--
-- Table structure for table `soal99`
--

CREATE TABLE `soal99` (
  `id` int(11) NOT NULL,
  `soal` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `soal99`
--

INSERT INTO `soal99` (`id`, `soal`) VALUES
(1, 'foo'),
(2, 'bar'),
(3, 'Pertanyaan2'),
(4, 'Pertanyaan3'),
(5, 'Pertanyaan4'),
(6, 'Pertanyaan5');

-- --------------------------------------------------------

--
-- Table structure for table `tb_jadwal`
--

CREATE TABLE `tb_jadwal` (
  `id_jadwal` int(11) NOT NULL,
  `NIM` int(10) NOT NULL,
  `id_matkul` int(11) NOT NULL,
  `ruangan` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_jadwal`
--

INSERT INTO `tb_jadwal` (`id_jadwal`, `NIM`, `id_matkul`, `ruangan`) VALUES
(1, 1531140037, 1, 'LPJ3'),
(2, 1531140037, 2, 'KR03'),
(3, 1531140037, 3, 'KB01'),
(4, 1531140037, 4, 'LBD1'),
(5, 1531140084, 3, 'KB01'),
(6, 1531140084, 4, 'KB01'),
(7, 1531140008, 2, 'LBD1'),
(8, 1531140075, 2, 'LBD1'),
(9, 1531140075, 3, 'LBD1');

-- --------------------------------------------------------

--
-- Table structure for table `tb_mahasiswa`
--

CREATE TABLE `tb_mahasiswa` (
  `NIM` int(10) NOT NULL,
  `nama_depan` varchar(30) NOT NULL,
  `nama_belakang` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_mahasiswa`
--

INSERT INTO `tb_mahasiswa` (`NIM`, `nama_depan`, `nama_belakang`) VALUES
(1531140008, 'Mentik', 'Afizah'),
(1531140037, 'Prisalia', 'Amanatus'),
(1531140075, 'Ninda', 'Arani'),
(1531140084, 'Hilal', 'Arsa');

-- --------------------------------------------------------

--
-- Table structure for table `tb_matkul`
--

CREATE TABLE `tb_matkul` (
  `id_matkul` int(11) NOT NULL,
  `nama_matkul` varchar(30) NOT NULL,
  `sks` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_matkul`
--

INSERT INTO `tb_matkul` (`id_matkul`, `nama_matkul`, `sks`) VALUES
(1, 'Bahasa Indonesia', 3),
(2, 'Kalkulus', 4),
(3, 'English for IT', 3),
(4, 'Basis Data', 6);

-- --------------------------------------------------------

--
-- Table structure for table `tb_wisata`
--

CREATE TABLE `tb_wisata` (
  `id_wisata` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `alamat` text NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_wisata`
--

INSERT INTO `tb_wisata` (`id_wisata`, `nama`, `alamat`, `harga`) VALUES
(1, 'Coban Rondo', 'Batu, Jawa Timur, Indonesia', 10000),
(2, 'Alun-alun', 'Kota Malang, Jawa Timur, Indonesia', 20000),
(3, 'Stadion Kanjuruhan', 'Kabupaten Malang, Jawa Timur, Indonesia', 5000),
(4, 'Jatim Park', 'Batu, Malang, Jawa Timur, Indonesia', 80000);

-- --------------------------------------------------------

--
-- Table structure for table `testsoal`
--

CREATE TABLE `testsoal` (
  `id` int(11) NOT NULL,
  `soal` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `testsoal`
--

INSERT INTO `testsoal` (`id`, `soal`) VALUES
(1, 'soal1'),
(2, 'soal2');

-- --------------------------------------------------------

--
-- Table structure for table `tsql`
--

CREATE TABLE `tsql` (
  `id` int(11) NOT NULL,
  `nama` varchar(110) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tsql`
--

INSERT INTO `tsql` (`id`, `nama`) VALUES
(1, 'naruto'),
(2, 'sasuke'),
(3, 'sakura'),
(4, 'kakashi'),
(5, 'madara');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `soal`
--
ALTER TABLE `soal`
  ADD PRIMARY KEY (`quizID`);

--
-- Indexes for table `testsoal`
--
ALTER TABLE `testsoal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tsql`
--
ALTER TABLE `tsql`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `soal`
--
ALTER TABLE `soal`
  MODIFY `quizID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
