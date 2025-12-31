-- MySQL schema for household_management
CREATE DATABASE IF NOT EXISTS household_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE household_management;

-- Địa lý
CREATE TABLE THANHPHO (
    MATHANHPHO INT AUTO_INCREMENT PRIMARY KEY,
    TENTHANHPHO VARCHAR(100)
) ENGINE = InnoDB;

CREATE TABLE QUANHUYEN (
    MAQUANHUYEN INT AUTO_INCREMENT PRIMARY KEY,
    TENQUANHUYEN VARCHAR(100),
    MATHANHPHO INT,
    CONSTRAINT FK_QUANHUYEN_THANHPHO FOREIGN KEY (MATHANHPHO) REFERENCES THANHPHO (MATHANHPHO)
) ENGINE = InnoDB;

CREATE TABLE XAPHUONG (
    MAXAPHUONG INT AUTO_INCREMENT PRIMARY KEY,
    TENXAPHUONG VARCHAR(100),
    MAQUANHUYEN INT,
    CONSTRAINT FK_XAPHUONG_QUANHUYEN FOREIGN KEY (MAQUANHUYEN) REFERENCES QUANHUYEN (MAQUANHUYEN)
) ENGINE = InnoDB;

-- Hộ khẩu
CREATE TABLE HOKHAU (
    SOHOKHAU INT AUTO_INCREMENT PRIMARY KEY,
    DIACHI TEXT,
    MAXAPHUONG INT,
    NGAYCAP DATETIME,
    GHICHU TEXT,
    CONSTRAINT FK_HOKHAU_XAPHUONG FOREIGN KEY (MAXAPHUONG) REFERENCES XAPHUONG (MAXAPHUONG)
) ENGINE = InnoDB;

CREATE TABLE NHANKHAU (
    MANHANKHAU INT AUTO_INCREMENT PRIMARY KEY,
    SOHOKHAU INT,
    HOTEN VARCHAR(100),
    GIOITINH VARCHAR(10),
    NGAYSINH DATETIME,
    NGHENGHIEP VARCHAR(100),
    QUANHEVOICHUHO VARCHAR(50),
    TRANGTHAI VARCHAR(50) DEFAULT 'Thuong tru',
    CMND VARCHAR(20),
    NOITHUONGTRUCHUYENDEN VARCHAR(200),
    NGAYCHUYENDI DATETIME NULL,
    NOICHUYEN VARCHAR(200),
    GHICHU TEXT,
    CONSTRAINT FK_NHANKHAU_HOKHAU FOREIGN KEY (SOHOKHAU) REFERENCES HOKHAU (SOHOKHAU)
) ENGINE = InnoDB;

-- Liên lạc
CREATE TABLE ContactInfo (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    MaNhanKhau INT,
    Type VARCHAR(20),
    Value VARCHAR(255),
    IsPrimary TINYINT(1) DEFAULT 0,
    CONSTRAINT FK_CONTACTINFO_NHANKHAU FOREIGN KEY (MaNhanKhau) REFERENCES NHANKHAU (MANHANKHAU)
) ENGINE = InnoDB;

CREATE INDEX idx_contact_nhankhau_type ON ContactInfo (MaNhanKhau, Type);

CREATE INDEX idx_contact_primary ON ContactInfo (MaNhanKhau, IsPrimary);

-- Biến động nhân khẩu
CREATE TABLE BIENDONGNHANKHAU (
    MABIENDONG INT AUTO_INCREMENT PRIMARY KEY,
    MANHANKHAU INT,
    LOAIBIENDONG VARCHAR(50),
    NGAYBATDAU DATETIME,
    NGAYKETTHUC DATETIME,
    LYDODOICHUYENDI TEXT,
    CONSTRAINT FK_BIENDONGNHANKHAU_NHANKHAU FOREIGN KEY (MANHANKHAU) REFERENCES NHANKHAU (MANHANKHAU)
) ENGINE = InnoDB;

-- Giấy tờ
CREATE TABLE GIAYTO (
    MAGIAYTO INT AUTO_INCREMENT PRIMARY KEY,
    MANHANKHAU INT,
    LOAIGIAYTO VARCHAR(50),
    SOGIAYTO VARCHAR(50),
    NGAYCAP DATETIME,
    NOICAP VARCHAR(100),
    CONSTRAINT FK_GIAYTO_NHANKHAU FOREIGN KEY (MANHANKHAU) REFERENCES NHANKHAU (MANHANKHAU)
) ENGINE = InnoDB;

-- Cán bộ - tài khoản
CREATE TABLE CANBO (
    MACANBO INT AUTO_INCREMENT PRIMARY KEY,
    HOTEN VARCHAR(100),
    CHUCVU VARCHAR(50),
    MAXAPHUONG INT,
    CONSTRAINT FK_CANBO_XAPHUONG FOREIGN KEY (MAXAPHUONG) REFERENCES XAPHUONG (MAXAPHUONG)
) ENGINE = InnoDB;


CREATE TABLE TAIKHOAN (
    MATAIKHOAN INT AUTO_INCREMENT PRIMARY KEY,

    MANHANKHAU INT NULL,
    MACANBO INT NULL,

    TENDANGNHAP VARCHAR(50) UNIQUE NOT NULL,
    EMAIL VARCHAR(100) UNIQUE,
    MATKHAU VARCHAR(100) NOT NULL,
    VAITRO ENUM('CONGDAN','CANBO','ADMIN') NOT NULL,
    TRANGTHAI ENUM('PENDING','ACTIVE','LOCKED') DEFAULT 'PENDING',

    CONSTRAINT FK_TAIKHOAN_NHANKHAU
        FOREIGN KEY (MANHANKHAU)
        REFERENCES NHANKHAU(MANHANKHAU)
        ON DELETE CASCADE,

    CONSTRAINT FK_TAIKHOAN_CANBO
        FOREIGN KEY (MACANBO)
        REFERENCES CANBO(MACANBO)
        ON DELETE CASCADE,

-- Mỗi tài khoản chỉ thuộc 1 loại
CONSTRAINT CK_TAIKHOAN_ONLY_ONE
    CHECK (
        (MANHANKHAU IS NOT NULL AND MACANBO IS NULL)
     OR (MACANBO IS NOT NULL AND MANHANKHAU IS NULL)
    )
) ENGINE=InnoDB;

CREATE TABLE LOAIPHI (
    MALOAI INT AUTO_INCREMENT PRIMARY KEY,
    TENLOAIPHI VARCHAR(100) NOT NULL,
    MOTA TEXT,
    BATBUOC TINYINT(1) DEFAULT 0,
    DINHMUC DECIMAL(12, 2),
    MUCTIEU DECIMAL(15, 2) DEFAULT 0.00 COMMENT 'Tổng số tiền mục tiêu cần đóng góp',
    CONSTRAINT UQ_LOAIPHI_TEN UNIQUE (TENLOAIPHI)
) ENGINE = InnoDB;

CREATE TABLE DOTTHU (
    MADOTTHU INT AUTO_INCREMENT PRIMARY KEY,
    MALOAI INT NOT NULL,
    TENDOTTHU VARCHAR(100) NOT NULL,
    NGAYBATDAU DATETIME,
    NGAYKETTHUC DATETIME,
    CONSTRAINT FK_DOTTHU_LOAIPHI FOREIGN KEY (MALOAI) REFERENCES LOAIPHI (MALOAI) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE TABLE THUPHI (
    MATHUPHI INT AUTO_INCREMENT PRIMARY KEY,
    SOHOKHAU INT NOT NULL,
    MADOTTHU INT NOT NULL,
    MALOAI INT NOT NULL,
    SOTIEN DECIMAL(12, 2) NOT NULL,
    NGAYDONG DATETIME DEFAULT CURRENT_TIMESTAMP,
    GHICHU TEXT,
    CONSTRAINT FK_THUPHI_HOKHAU FOREIGN KEY (SOHOKHAU) REFERENCES HOKHAU (SOHOKHAU) ON DELETE CASCADE,
    CONSTRAINT FK_THUPHI_DOTTHU FOREIGN KEY (MADOTTHU) REFERENCES DOTTHU (MADOTTHU) ON DELETE CASCADE,
    CONSTRAINT FK_THUPHI_LOAI FOREIGN KEY (MALOAI) REFERENCES LOAIPHI (MALOAI) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE INDEX idx_thuphi_ho_dot_loai ON THUPHI (SOHOKHAU, MADOTTHU, MALOAI);

-- Tạm trú - tạm vắng
CREATE TABLE TamTru (
    MaTamTru INT AUTO_INCREMENT PRIMARY KEY,
    MaNhanKhau INT,
    NoiTamTru VARCHAR(100),
    TuNgay DATETIME NOT NULL,
    DenNgay DATETIME NULL,
    LyDo TEXT,
    TrangThai VARCHAR(50) DEFAULT 'Dang tam tru',
    GhiChu TEXT,
    CONSTRAINT FK_TamTru_NhanKhau FOREIGN KEY (MaNhanKhau) REFERENCES NHANKHAU (MANHANKHAU)
) ENGINE = InnoDB;

CREATE INDEX idx_tamtru_nhankhau_ngay ON TamTru (MaNhanKhau, TuNgay);

CREATE TABLE TamVang (
    MaTamVang INT AUTO_INCREMENT PRIMARY KEY,
    MaNhanKhau INT,
    NoiDi VARCHAR(255),
    TuNgay DATETIME NOT NULL,
    DenNgay DATETIME NULL,
    LyDo TEXT,
    TrangThai VARCHAR(50) DEFAULT 'Dang tam vang',
    GhiChu TEXT,
    CONSTRAINT FK_TamVang_NhanKhau FOREIGN KEY (MaNhanKhau) REFERENCES NHANKHAU (MANHANKHAU)
) ENGINE = InnoDB;

CREATE INDEX idx_tamvang_nhankhau_ngay ON TamVang (MaNhanKhau, TuNgay);

-- Lịch sử thay đổi
CREATE TABLE LICHSU_THAYDOI_NHANKHAU (
    MALICHSUTHAYDOI INT AUTO_INCREMENT PRIMARY KEY,
    MANHANKHAU INT NOT NULL,
    LOAITHAYDOI VARCHAR(50) NULL,
    NOIDUNGTHAYDOI TEXT,
    NGAYTHAYDOI DATETIME NOT NULL,
    GHICHU TEXT,
    CONSTRAINT FK_LICHSU_NHANKHAU FOREIGN KEY (MANHANKHAU) REFERENCES NHANKHAU (MANHANKHAU) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE INDEX IX_LICHSU_NHANKHAU_MANHANKHAU ON LICHSU_THAYDOI_NHANKHAU (MANHANKHAU);

CREATE INDEX IX_LICHSU_NHANKHAU_NGAYTHAYDOI ON LICHSU_THAYDOI_NHANKHAU (NGAYTHAYDOI);

CREATE TABLE LICHSU_THAYDOI_HOKHAU (
    MALICHSUTHAYDOI INT AUTO_INCREMENT PRIMARY KEY,
    SOHOKHAU INT NOT NULL,
    NOIDUNGTHAYDOI TEXT,
    NGAYTHAYDOI DATETIME NOT NULL,
    GHICHU TEXT,
    CONSTRAINT FK_LICHSU_HOKHAU FOREIGN KEY (SOHOKHAU) REFERENCES HOKHAU (SOHOKHAU) ON DELETE CASCADE
) ENGINE = InnoDB;

CREATE INDEX IX_LICHSU_HOKHAU_SOHOKHAU ON LICHSU_THAYDOI_HOKHAU (SOHOKHAU);

CREATE INDEX IX_LICHSU_HOKHAU_NGAYTHAYDOI ON LICHSU_THAYDOI_HOKHAU (NGAYTHAYDOI);

-- View hỗ trợ
DROP VIEW IF EXISTS VW_NHANKHAU_CHITIET;

CREATE VIEW VW_NHANKHAU_CHITIET AS
SELECT
    nk.MANHANKHAU,
    nk.HOTEN,
    nk.GIOITINH,
    nk.NGAYSINH,
    nk.NGHENGHIEP,
    nk.QUANHEVOICHUHO,
    nk.TRANGTHAI,
    nk.CMND,
    nk.NOITHUONGTRUCHUYENDEN,
    nk.NGAYCHUYENDI,
    nk.NOICHUYEN,
    nk.GHICHU,
    hk.SOHOKHAU,
    hk.DIACHI,
    hk.NGAYCAP,
    xp.TENXAPHUONG
FROM
    NHANKHAU nk
    INNER JOIN HOKHAU hk ON nk.SOHOKHAU = hk.SOHOKHAU
    INNER JOIN XAPHUONG xp ON hk.MAXAPHUONG = xp.MAXAPHUONG;

-- Stored procedures
DELIMITER $$

CREATE PROCEDURE SP_GET_LICHSU_NHANKHAU_BY_HOKHAU(IN SOHOKHAU_PARAM BIGINT)
BEGIN
    SELECT 
        ls.MALICHSUTHAYDOI,
        ls.MANHANKHAU,
        nk.HOTEN,
        ls.LOAITHAYDOI,
        ls.NOIDUNGTHAYDOI,
        ls.NGAYTHAYDOI,
        ls.GHICHU
    FROM LICHSU_THAYDOI_NHANKHAU ls
    INNER JOIN NHANKHAU nk ON ls.MANHANKHAU = nk.MANHANKHAU
    WHERE nk.SOHOKHAU = SOHOKHAU_PARAM
    ORDER BY ls.NGAYTHAYDOI DESC;
END$$

CREATE PROCEDURE SP_THONGKE_GIOITINH()
BEGIN
    SELECT 
        GIOITINH,
        COUNT(*) AS SO_LUONG
    FROM NHANKHAU
    WHERE GIOITINH IS NOT NULL
    GROUP BY GIOITINH;
END$$

DELIMITER;

-- Dữ liệu -- -----------------------------------------------------------------------------------

INSERT INTO
    THANHPHO (TENTHANHPHO)
VALUES ('Hà Nội'),
    ('Hồ Chí Minh'),
    ('Đà Nẵng');

INSERT INTO
    QUANHUYEN (TENQUANHUYEN, MATHANHPHO)
VALUES ('Ba Đình', 1),
    ('Đống Đa', 1),
    ('Cầu Giấy', 1),
    ('Quận 1', 2),
    ('Quận 3', 2),
    ('Thủ Đức', 2),
    ('Hải Châu', 3),
    ('Thanh Khê', 3);

INSERT INTO
    XAPHUONG (TENXAPHUONG, MAQUANHUYEN)
VALUES ('Phúc Xá', 1),
    ('Kim Mã', 1),
    ('Láng Hạ', 2),
    ('Dịch Vọng', 3),
    ('Bến Nghé', 4),
    ('Phường 6', 5),
    ('Linh Trung', 6),
    ('Hòa Thuận', 7),
    ('An Khê', 8);

INSERT INTO
    HOKHAU (DIACHI, MAXAPHUONG, NGAYCAP)
VALUES ('12 Kim Mã', 2, '2021-01-01'),
    ('34 Láng Hạ', 3, '2020-05-10'),
    (
        '88 Dịch Vọng',
        4,
        '2022-03-03'
    ),
    (
        '10 Bến Nghé',
        5,
        '2023-02-02'
    ),
    (
        '45 Phường 6',
        6,
        '2019-09-09'
    ),
    (
        '78 Linh Trung',
        7,
        '2024-01-01'
    ),
    (
        '66 Hòa Thuận',
        8,
        '2020-12-12'
    ),
    ('99 An Khê', 9, '2021-07-07');

INSERT INTO
    HOKHAU (DIACHI, MAXAPHUONG, NGAYCAP)
VALUES ('101 Kim Mã', 2, '2020-01-01'),
    ('102 Kim Mã', 2, '2020-01-01'),
    (
        '201 Láng Hạ',
        3,
        '2021-02-02'
    ),
    (
        '202 Láng Hạ',
        3,
        '2021-02-02'
    ),
    (
        '301 Dịch Vọng',
        4,
        '2022-03-03'
    ),
    (
        '302 Dịch Vọng',
        4,
        '2022-03-03'
    ),
    (
        '401 Bến Nghé',
        5,
        '2023-04-04'
    ),
    (
        '402 Bến Nghé',
        5,
        '2023-04-04'
    ),
    (
        '501 Phường 6',
        6,
        '2020-05-05'
    ),
    (
        '601 Linh Trung',
        7,
        '2021-06-06'
    ),
    (
        '701 Hòa Thuận',
        8,
        '2022-07-07'
    ),
    ('801 An Khê', 9, '2023-08-08');

INSERT INTO
    NHANKHAU (
        SOHOKHAU,
        HOTEN,
        GIOITINH,
        NGAYSINH,
        NGHENGHIEP,
        QUANHEVOICHUHO,
        TRANGTHAI
    )
VALUES (
        1,
        'Nguyễn Văn A',
        'Nam',
        '1990-01-01',
        'Kỹ sư',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        1,
        'Trần Thị B',
        'Nữ',
        '1992-05-10',
        'Kế toán',
        'Vợ',
        'Thuong tru'
    ),
    (
        2,
        'Lê Văn C',
        'Nam',
        '2000-03-03',
        'Sinh viên',
        'Con',
        'Tam tru'
    ),
    (
        2,
        'Phạm Thị D',
        'Nữ',
        '1998-08-08',
        'Nhân viên',
        'Con',
        'Tam vang'
    ),
    (
        3,
        'Hoàng Văn E',
        'Nam',
        '1985-04-04',
        'Bác sĩ',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        4,
        'Nguyễn Thị F',
        'Nữ',
        '1999-09-09',
        'Bán hàng',
        'Chủ hộ',
        'Tam tru'
    ),
    (
        5,
        'Đỗ Văn G',
        'Nam',
        '1970-10-10',
        'Nông dân',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        6,
        'Lý Thị H',
        'Nữ',
        '2001-11-11',
        'Sinh viên',
        'Con',
        'Tam vang'
    ),
    (
        7,
        'Phan Văn I',
        'Nam',
        '1995-02-02',
        'Tài xế',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        8,
        'Vũ Thị K',
        'Nữ',
        '1988-06-06',
        'Giáo viên',
        'Chủ hộ',
        'Thuong tru'
    );

INSERT INTO
    NHANKHAU (
        SOHOKHAU,
        HOTEN,
        GIOITINH,
        NGAYSINH,
        NGHENGHIEP,
        QUANHEVOICHUHO,
        TRANGTHAI
    )
VALUES (
        9,
        'Nguyễn Văn L',
        'Nam',
        '1980-01-01',
        'Kinh doanh',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        9,
        'Trần Thị M',
        'Nữ',
        '1985-02-02',
        'Nội trợ',
        'Vợ',
        'Thuong tru'
    ),
    (
        9,
        'Nguyễn Văn N',
        'Nam',
        '2010-03-03',
        'Học sinh',
        'Con',
        'Thuong tru'
    ),
    (
        10,
        'Phạm Văn O',
        'Nam',
        '1990-04-04',
        'IT',
        'Chủ hộ',
        'Tam tru'
    ),
    (
        10,
        'Lê Thị P',
        'Nữ',
        '1992-05-05',
        'Thiết kế',
        'Vợ',
        'Tam tru'
    ),
    (
        11,
        'Hoàng Văn Q',
        'Nam',
        '1988-06-06',
        'Giáo viên',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        11,
        'Đặng Thị R',
        'Nữ',
        '1990-07-07',
        'Giáo viên',
        'Vợ',
        'Thuong tru'
    ),
    (
        12,
        'Ngô Văn S',
        'Nam',
        '1995-08-08',
        'Kỹ sư',
        'Chủ hộ',
        'Tam vang'
    ),
    (
        13,
        'Trần Văn T',
        'Nam',
        '1982-09-09',
        'Buôn bán',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        14,
        'Phan Thị U',
        'Nữ',
        '1993-10-10',
        'Nhân viên',
        'Chủ hộ',
        'Tam tru'
    ),
    (
        15,
        'Đỗ Văn V',
        'Nam',
        '1977-11-11',
        'Tài xế',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        16,
        'Lý Thị W',
        'Nữ',
        '2000-12-12',
        'Sinh viên',
        'Chủ hộ',
        'Tam tru'
    ),
    (
        17,
        'Vũ Văn X',
        'Nam',
        '1984-01-13',
        'Kế toán',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        18,
        'Nguyễn Thị Y',
        'Nữ',
        '1999-02-14',
        'Nhân viên',
        'Chủ hộ',
        'Tam vang'
    ),
    (
        19,
        'Trần Văn Z',
        'Nam',
        '1991-03-15',
        'Kỹ sư',
        'Chủ hộ',
        'Thuong tru'
    ),
    (
        20,
        'Phạm Thị AA',
        'Nữ',
        '1987-04-16',
        'Buôn bán',
        'Chủ hộ',
        'Thuong tru'
    );

INSERT INTO
    CANBO (HOTEN, CHUCVU, MAXAPHUONG)
VALUES ('Admin Tổng', 'Admin', 1),
    ('CB Kim Mã', 'Cán bộ', 2),
    ('CB Dịch Vọng', 'Cán bộ', 4);

INSERT INTO
    TAIKHOAN (
        MACANBO,
        TENDANGNHAP,
        MATKHAU,
        VAITRO,
        TRANGTHAI
    )
VALUES (
        1,
        'admin',
        '123',
        'ADMIN',
        'ACTIVE'
    );

INSERT INTO
    TAIKHOAN (
        MACANBO,
        TENDANGNHAP,
        MATKHAU,
        VAITRO,
        TRANGTHAI
    )
VALUES (
        2,
        'cb_kimma',
        '123',
        'CANBO',
        'ACTIVE'
    ),
    (
        3,
        'cb_dichvong',
        '123',
        'CANBO',
        'ACTIVE'
    );

INSERT INTO
    TAIKHOAN (
        MANHANKHAU,
        TENDANGNHAP,
        MATKHAU,
        VAITRO,
        TRANGTHAI
    )
VALUES (
        1,
        'nguyenvana',
        '123',
        'CONGDAN',
        'ACTIVE'
    ),
    (
        3,
        'levanc',
        '123',
        'CONGDAN',
        'ACTIVE'
    ),
    (
        6,
        'nguyenthif',
        '123',
        'CONGDAN',
        'ACTIVE'
    );

INSERT INTO
    BIENDONGNHANKHAU (
        MANHANKHAU,
        LOAIBIENDONG,
        NGAYBATDAU
    )
VALUES (3, 'Chuyển đến', '2024-01-01'),
    (4, 'Tạm vắng', '2024-06-01');

INSERT INTO
    TamTru (MaNhanKhau, NoiTamTru, TuNgay)
VALUES (
        3,
        'KTX Bách Khoa',
        '2024-01-01'
    );

INSERT INTO
    TamVang (MaNhanKhau, NoiDi, TuNgay)
VALUES (4, 'TP.HCM', '2024-06-01');

INSERT INTO
    LOAIPHI (TENLOAIPHI, BATBUOC, DINHMUC)
VALUES ('Vệ sinh', 1, 50000),
    ('An ninh', 1, 30000);

INSERT INTO
    DOTTHU (MALOAI, TENDOTTHU, NGAYBATDAU)
VALUES (
        1,
        'Tháng 1/2025',
        '2025-01-01'
    ),
    (
        2,
        'Tháng 1/2025',
        '2025-01-01'
    );

INSERT INTO
    THUPHI (
        SOHOKHAU,
        MADOTTHU,
        MALOAI,
        SOTIEN
    )
VALUES (1, 1, 1, 50000),
    (2, 2, 2, 30000);