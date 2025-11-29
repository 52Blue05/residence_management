import Header from "../headers/Header";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function HouseholdDetail() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const household = useMemo(
    () => [
      {
        soHoKhau: "HK123456",
        chuHo: "Nguyễn Văn A",
        soNha: "25",
        duongPho: "Tố Hữu",
        phuong: "La Khê",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK654321",
        chuHo: "Trần Thị B",
        soNha: "10",
        duongPho: "Lê Văn Lương",
        phuong: "Mộ Lao",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK112233",
        chuHo: "Lê Văn C",
        soNha: "5",
        duongPho: "Quang Trung",
        phuong: "Văn Quán",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK445566",
        chuHo: "Phạm Thị D",
        soNha: "15",
        duongPho: "Trần Phú",
        phuong: "Yên Nghĩa",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK778899",
        chuHo: "Hoàng Văn E",
        soNha: "30",
        duongPho: "Nguyễn Trãi",
        phuong: "Hà Cầu",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK998877",
        chuHo: "Đỗ Thị F",
        soNha: "12",
        duongPho: "Phùng Hưng",
        phuong: "Phú Lãm",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK334455",
        chuHo: "Vũ Văn G",
        soNha: "8",
        duongPho: "Bà Triệu",
        phuong: "Kiến Hưng",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK556677",
        chuHo: "Trịnh Thị H",
        soNha: "20",
        duongPho: "Lý Thường Kiệt",
        phuong: "Dương Nội",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK221133",
        chuHo: "Lý Văn I",
        soNha: "18",
        duongPho: "Hà Trì",
        phuong: "Hà Cầu",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK887766",
        chuHo: "Phan Thị J",
        soNha: "22",
        duongPho: "Tô Hiệu",
        phuong: "La Khê",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK445577",
        chuHo: "Trần Văn K",
        soNha: "28",
        duongPho: "Quốc lộ 6",
        phuong: "Mộ Lao",
        quan: "Hà Đông",
      },
      {
        soHoKhau: "HK667788",
        chuHo: "Ngô Thị L",
        soNha: "14",
        duongPho: "Văn Phú",
        phuong: "Phú Lãm",
        quan: "Hà Đông",
      },
    ],
    []
  );

  const nhanKhau = [
    {
      id: 1,
      hoTen: "Nguyễn Văn A",
      biDanh: "",
      ngaySinh: "1975-02-10",
      noiSinh: "Hà Nội",
      nguyenQuan: "Nam Định",
      danToc: "Kinh",
      ngheNghiep: "Công nhân",
      noiLamViec: "Công ty CP ABC",
      cccd: "012345678901",
      ngayCap: "2016-03-01",
      noiCap: "CA Hà Nội",
      dangKyThuongTru: "2001-05-10",
      thuongTruTruoc: "Nam Định",
      quanHeChuHo: "Chủ hộ",
    },
    {
      id: 2,
      hoTen: "Trần Thị B",
      biDanh: "",
      ngaySinh: "1979-12-22",
      noiSinh: "Hà Đông",
      nguyenQuan: "Hà Nam",
      danToc: "Kinh",
      ngheNghiep: "Nội trợ",
      noiLamViec: "",
      cccd: "012345678900",
      ngayCap: "2017-08-15",
      noiCap: "CA Hà Nội",
      dangKyThuongTru: "2003-02-10",
      thuongTruTruoc: "Hà Nam",
      quanHeChuHo: "Vợ",
    },
    {
      id: 3,
      hoTen: "Nguyễn Văn C",
      biDanh: "",
      ngaySinh: "2005-06-10",
      noiSinh: "Hà Đông",
      nguyenQuan: "Hà Nội",
      danToc: "Kinh",
      ngheNghiep: "Sinh viên",
      noiLamViec: "ĐH Bách Khoa",
      cccd: "",
      ngayCap: "",
      noiCap: "",
      dangKyThuongTru: "2005-06-12",
      thuongTruTruoc: "",
      quanHeChuHo: "Con trai",
    },
  ];

  // Search & sort state for household list
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState(""); // '', 'name', 'soHoKhau'
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    phuong: "",
    quan: "",
    duongPho: "",
    chuHo: "",
  });

  const filteredHouseholds = useMemo(() => {
    let arr = [...household];
    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (h) =>
          h.soHoKhau.toLowerCase().includes(q) ||
          h.chuHo.toLowerCase().includes(q)
      );
    }
    // Apply filters
    if (filters.phuong) {
      arr = arr.filter((h) => h.phuong === filters.phuong);
    }
    if (filters.quan) {
      arr = arr.filter((h) => h.quan === filters.quan);
    }
    if (filters.duongPho) {
      arr = arr.filter((h) => h.duongPho === filters.duongPho);
    }
    if (filters.chuHo) {
      arr = arr.filter((h) =>
        h.chuHo.toLowerCase().includes(filters.chuHo.toLowerCase())
      );
    }
    if (sortBy === "name") {
      arr.sort((a, b) => a.chuHo.localeCompare(b.chuHo, "vi"));
    } else if (sortBy === "soHoKhau") {
      arr.sort((a, b) => a.soHoKhau.localeCompare(b.soHoKhau));
    }
    return arr;
  }, [household, query, sortBy, filters]);

  return (
    <>
      {/* Video nền */}
      <video
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ zIndex: 0 }}
      />

      {/* Card chính ở giữa màn hình */}
      <div className="min-h-screen rounded-t-2xl flex items-center justify-center p-6 relative z-10">
        <div className="w-[195vh] h-[93vh] max-h-screen rounded-t-2xl shadow-2xl bg-sky-500/95 backdrop-blur-md flex flex-col overflow-visible">
          {/* HEADER chạy ngang full card - overflow-visible để dropdown ra ngoài */}
          <div className="overflow-visible z-50">
            <Header />
          </div>
          {/* THÂN: scroll trong khung */}
          <div className="flex-1 overflow-hidden flex gap-6 p-6 md:p-8 rounded-b-2xl">
            {/* Sidebar: Menu mở rộng/thu gọn */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                sidebarOpen ? "w-64" : "w-20"
              } shrink-0 bg-gray-900 rounded-2xl shadow-xl p-4 border border-white/10 flex flex-col items-center gap-6 h-fit max-h-[80vh] overflow-y-auto`}
            >
              {/* Menu Toggle Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition"
                title={sidebarOpen ? "Thu gọn" : "Mở rộng"}
              >
                <span className="text-xl">☰</span>
              </button>

              {/* House Icon */}
              <div className="flex items-center justify-center">
                <img
                  src="/images/house.png"
                  alt="House Icon"
                  className="w-12 h-12"
                />
              </div>

              {/* Menu Items */}
              {sidebarOpen && (
                <div className="w-full space-y-3 text-left">
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition text-sm flex items-center gap-2">
                    <span>📋</span> Danh sách hộ khẩu
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition text-sm flex items-center gap-2">
                    <span>👥</span> Quản lý nhân khẩu
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition text-sm flex items-center gap-2">
                    <span>📊</span> Báo cáo thống kê
                  </button>
                  <button className="w-full bg-gray-800 hover:bg-gray-700 text-white p-3 rounded-lg transition text-sm flex items-center gap-2">
                    <span>⚙️</span> Cài đặt
                  </button>
                </div>
              )}
            </div>

            {/* Nửa trái: Danh sách hộ khẩu + Nhân khẩu (scroll) */}
            <div className="flex-1 overflow-y-auto space-y-6">
              {/* Danh sách Nhân khẩu */}
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-white/10 flex flex-col h-fit max-h-full">
                <h2 className="text-2xl font-semibold mb-6">
                  Danh sách Hộ khẩu
                </h2>

                {/* Taskbar: sort + search + create + filter */}
                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-300">Sắp xếp:</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-gray-800 text-gray-200 p-2 rounded"
                    >
                      <option value="">Mặc định</option>
                      <option value="name">Tên chủ hộ</option>
                      <option value="soHoKhau">Số hộ khẩu</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Tìm kiếm..."
                      className="bg-gray-800 text-gray-200 p-2 rounded w-48"
                    />
                    <button
                      onClick={() => {
                        setQuery("");
                        setSortBy("");
                      }}
                      className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-2 rounded transition"
                    >
                      Reset
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowFilterModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition flex items-center gap-2"
                    >
                      <span>🔍</span> Lọc
                    </button>
                    <button
                      onClick={() => alert("Tạo mới hộ khẩu")}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition flex items-center gap-2"
                    >
                      <span>➕</span> Tạo mới
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto flex-1 overflow-y-auto">
                  <table className="w-full text-gray-200 border-collapse">
                    <thead className="sticky top-0 bg-gray-900">
                      <tr className="bg-gray-800 text-gray-300 uppercase text-sm">
                        <th className="p-3 text-left">Số hộ khẩu</th>
                        <th className="p-3 text-left">Họ tên chủ hộ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredHouseholds.map((nk) => (
                        <tr
                          key={nk.soHoKhau}
                          onClick={() =>
                            navigate(`/population-detail/${nk.soHoKhau}`)
                          }
                          className={`border-b border-gray-700 hover:bg-gray-800/70 transition cursor-pointer`}
                        >
                          <td className="p-3 font-medium">{nk.soHoKhau}</td>
                          <td className="p-3 font-medium">{nk.chuHo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Nửa phải: 1 khung to chứa 2 khung nhỏ */}
            <div className="w-72 shrink-0 bg-gray-900 rounded-2xl shadow-xl p-6 border border-white/10 flex flex-col gap-4 overflow-hidden">
              {/* Khung nhỏ trên: Hình tròn - Số nhân khẩu */}
              <div className="flex-1 bg-gray-800 rounded-xl p-4 flex items-center justify-center border border-gray-700">
                <div className="flex flex-col items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-white-600 to-yellow-600 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <p className="text-white text-xs opacity-80">Nhân khẩu</p>
                      <p className="text-white text-3xl font-bold">
                        {nhanKhau.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Khung nhỏ dưới: Lịch sử biến động */}
              <div className="flex-1 bg-gray-800 rounded-xl p-4 border border-gray-700 flex flex-col overflow-hidden">
                <h3 className="text-lg font-semibold mb-3 text-white shrink-0">
                  Lịch sử biến động
                </h3>
                <div className="flex-1 overflow-y-auto space-y-2 pr-2">
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">01/01/2024</p>
                    <p className="text-white text-sm font-medium">
                      Thêm nhân khẩu
                    </p>
                    <p className="text-xs text-gray-500">Nguyễn Văn D</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">15/12/2023</p>
                    <p className="text-white text-sm font-medium">
                      Xóa nhân khẩu
                    </p>
                    <p className="text-xs text-gray-500">Trần Thị E</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">10/11/2023</p>
                    <p className="text-white text-sm font-medium">
                      Cập nhật thông tin
                    </p>
                    <p className="text-xs text-gray-500">Nguyễn Văn A</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">15/12/2023</p>
                    <p className="text-white text-sm font-medium">
                      Xóa nhân khẩu
                    </p>
                    <p className="text-xs text-gray-500">Trần Thị E</p>
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600 hover:border-purple-500 transition">
                    <p className="text-xs text-gray-400">15/12/2023</p>
                    <p className="text-white text-sm font-medium">
                      Xóa nhân khẩu
                    </p>
                    <p className="text-xs text-gray-500">Trần Thị E</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-96 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Lọc hộ khẩu</h3>

            <div className="space-y-4 mb-6">
              {/* Lọc theo Phường */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Phường:
                </label>
                <select
                  value={filters.phuong}
                  onChange={(e) =>
                    setFilters({ ...filters, phuong: e.target.value })
                  }
                  className="w-full bg-gray-800 text-gray-200 p-2 rounded border border-gray-700 focus:border-blue-500"
                >
                  <option value="">-- Tất cả --</option>
                  <option value="La Khê">La Khê</option>
                  <option value="Mộ Lao">Mộ Lao</option>
                  <option value="Văn Quán">Văn Quán</option>
                  <option value="Yên Nghĩa">Yên Nghĩa</option>
                  <option value="Hà Cầu">Hà Cầu</option>
                  <option value="Phú Lãm">Phú Lãm</option>
                  <option value="Kiến Hưng">Kiến Hưng</option>
                  <option value="Dương Nội">Dương Nội</option>
                </select>
              </div>

              {/* Lọc theo Quận */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Quận:
                </label>
                <select
                  value={filters.quan}
                  onChange={(e) =>
                    setFilters({ ...filters, quan: e.target.value })
                  }
                  className="w-full bg-gray-800 text-gray-200 p-2 rounded border border-gray-700 focus:border-blue-500"
                >
                  <option value="">-- Tất cả --</option>
                  <option value="Hà Đông">Hà Đông</option>
                </select>
              </div>

              {/* Lọc theo Đường */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Đường phố:
                </label>
                <select
                  value={filters.duongPho}
                  onChange={(e) =>
                    setFilters({ ...filters, duongPho: e.target.value })
                  }
                  className="w-full bg-gray-800 text-gray-200 p-2 rounded border border-gray-700 focus:border-blue-500"
                >
                  <option value="">-- Tất cả --</option>
                  <option value="Tố Hữu">Tố Hữu</option>
                  <option value="Lê Văn Lương">Lê Văn Lương</option>
                  <option value="Quang Trung">Quang Trung</option>
                  <option value="Trần Phú">Trần Phú</option>
                  <option value="Nguyễn Trãi">Nguyễn Trãi</option>
                  <option value="Phùng Hưng">Phùng Hưng</option>
                  <option value="Bà Triệu">Bà Triệu</option>
                  <option value="Lý Thường Kiệt">Lý Thường Kiệt</option>
                  <option value="Hà Trì">Hà Trì</option>
                  <option value="Tô Hiệu">Tô Hiệu</option>
                  <option value="Quốc lộ 6">Quốc lộ 6</option>
                  <option value="Văn Phú">Văn Phú</option>
                </select>
              </div>

              {/* Lọc theo Tên chủ hộ */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  Tên chủ hộ:
                </label>
                <input
                  type="text"
                  value={filters.chuHo}
                  onChange={(e) =>
                    setFilters({ ...filters, chuHo: e.target.value })
                  }
                  placeholder="Nhập tên chủ hộ..."
                  className="w-full bg-gray-800 text-gray-200 p-2 rounded border border-gray-700 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setFilters({ phuong: "", quan: "", duongPho: "", chuHo: "" });
                  setShowFilterModal(false);
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setFilters({ phuong: "", quan: "", duongPho: "", chuHo: "" });
                }}
                className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition"
              >
                Reset lọc
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
