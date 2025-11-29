import Header from "../headers/Header";
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PopulationDetail() {
  const { householdId } = useParams();
  const navigate = useNavigate();

  // Mock Data
  const householdData = {
    soHoKhau: householdId,
    chuHo: "Nguyễn Văn A",
  };

  const nhanKhau = useMemo(
    () => [
      {
        id: 1,
        hoTen: "Nguyễn Văn A",
        ngaySinh: "1975-02-10",
        noiSinh: "Hà Nội",
        nguyenQuan: "Nam Định",
        ngheNghiep: "Công nhân",
        noiLamViec: "Công ty CP ABC",
        cccd: "012345678901",
        ngayCap: "2016-03-01",
        noiCap: "CA Hà Nội",
        dangKyThuongTru: "2001-05-10",
        thuongTruTruoc: "Nam Định",
        quanHeChuHo: "Chủ hộ",
        gioiTinh: "Nam",

        // THÊM MỚI
        trangThai: "binhthuong", // binhthuong | chuyendi | quadoi
        ngayChuyenDi: "",
        noiChuyenDen: "",
        ghiChu: "",
      },
      {
        id: 2,
        hoTen: "Trần Thị B",
        ngaySinh: "1979-12-22",
        noiSinh: "Hà Đông",
        nguyenQuan: "Hà Nam",
        ngheNghiep: "Nội trợ",
        noiLamViec: "",
        cccd: "012345678900",
        ngayCap: "2017-08-15",
        noiCap: "CA Hà Nội",
        dangKyThuongTru: "2003-02-10",
        thuongTruTruoc: "Hà Nam",
        quanHeChuHo: "Vợ",
        gioiTinh: "Nữ",

        trangThai: "chuyendi",
        ngayChuyenDi: "2022-10-10",
        noiChuyenDen: "TP. Hồ Chí Minh",
        ghiChu: "Chuyển nơi công tác mới",
      },
      {
        id: 3,
        hoTen: "Nguyễn Văn C",
        ngaySinh: "2005-06-10",
        noiSinh: "Hà Đông",
        nguyenQuan: "Hà Nội",
        ngheNghiep: "Sinh viên",
        noiLamViec: "ĐH Bách Khoa",
        cccd: "",
        ngayCap: "",
        noiCap: "",
        dangKyThuongTru: "2005-06-12",
        thuongTruTruoc: "",
        quanHeChuHo: "Con trai",
        gioiTinh: "Nam",

        trangThai: "quadoi",
        ngayChuyenDi: "",
        noiChuyenDen: "",
        ghiChu: "Đã qua đời",
      },
    ],
    []
  );

  // -------------------------------------
  // STATE
  // -------------------------------------

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    gioiTinh: "",
    quanHe: "",
    ngheNghiep: "",
  });

  const [splitMode, setSplitMode] = useState(false);
  const [selectedForSplit, setSelectedForSplit] = useState([]);

  // Bubble modals
  const [showCreateBubble, setShowCreateBubble] = useState(false);
  const [showDetailBubble, setShowDetailBubble] = useState(null);
  const [showEditBubble, setShowEditBubble] = useState(null);

  // -------------------------------------
  // FILTER + SORT
  // -------------------------------------

  const filteredPopulation = useMemo(() => {
    let arr = [...nhanKhau];

    if (query) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (p) =>
          p.hoTen.toLowerCase().includes(q) ||
          (p.cccd && p.cccd.toLowerCase().includes(q))
      );
    }

    if (filters.gioiTinh)
      arr = arr.filter((p) => p.gioiTinh === filters.gioiTinh);
    if (filters.quanHe)
      arr = arr.filter((p) => p.quanHeChuHo === filters.quanHe);
    if (filters.ngheNghiep)
      arr = arr.filter((p) => p.ngheNghiep === filters.ngheNghiep);

    if (sortBy === "name")
      arr.sort((a, b) => a.hoTen.localeCompare(b.hoTen, "vi"));
    if (sortBy === "birthPlace")
      arr.sort((a, b) => a.noiSinh.localeCompare(b.noiSinh, "vi"));
    if (sortBy === "cccd")
      arr.sort((a, b) => (a.cccd || "").localeCompare(b.cccd || ""));

    return arr;
  }, [nhanKhau, query, sortBy, filters]);
  return (
    <>
      {/* BACKGROUND VIDEO */}
      <video
        className="fixed inset-0 w-full h-full object-cover pointer-events-none"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{ zIndex: 0 }}
      />

      {/* MAIN WRAPPER */}
      <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
        <div className="w-[195vh] h-[93vh] rounded-t-2xl shadow-2xl bg-sky-500/95 backdrop-blur-md flex flex-col overflow-visible">
          <Header />

          <div className="flex-1 overflow-hidden flex gap-6 p-6">
            {/* LEFT PANEL */}
            <div className="flex-1 overflow-y-auto space-y-6">
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-white/10 relative">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => navigate("/household-detail")}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                  >
                    ← Quay lại
                  </button>

                  <h2 className="text-2xl font-semibold">
                    Danh sách Nhân khẩu — {householdData.soHoKhau}
                  </h2>

                  <div />
                </div>

                {/* TOOLBAR */}
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  {/* SORT */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 text-sm">Sắp xếp:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-gray-800 text-gray-200 p-2 rounded"
                    >
                      <option value="">Mặc định</option>
                      <option value="name">Tên</option>
                      <option value="birthPlace">Nơi sinh</option>
                      <option value="cccd">CCCD</option>
                    </select>
                  </div>

                  {/* SEARCH */}
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
                        setFilters({
                          gioiTinh: "",
                          quanHe: "",
                          ngheNghiep: "",
                        });
                      }}
                      className="bg-gray-700 text-gray-200 px-3 py-2 rounded"
                    >
                      Reset
                    </button>
                  </div>

                  {/* FILTER */}
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                  >
                    Lọc
                  </button>

                  {/* ADD + SPLIT */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowCreateBubble(true);
                        setShowDetailBubble(null);
                        setShowEditBubble(null);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      + Thêm
                    </button>

                    <button
                      onClick={() => {
                        setSplitMode(!splitMode);
                        setSelectedForSplit([]);
                      }}
                      className={`px-4 py-2 rounded text-white ${
                        splitMode
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {splitMode ? "Hủy" : "Tách hộ"}
                    </button>
                  </div>
                </div>

                {/* FILTER PANEL */}
                {filterOpen && (
                  <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 mb-4">
                    <h3 className="text-white font-semibold mb-3">Bộ lọc</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* GIOI TINH */}
                      <div>
                        <label className="text-sm text-gray-300">
                          Giới tính
                        </label>
                        <select
                          value={filters.gioiTinh}
                          onChange={(e) =>
                            setFilters({ ...filters, gioiTinh: e.target.value })
                          }
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        >
                          <option value="">Tất cả</option>
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>

                      {/* Quan hệ */}
                      <div>
                        <label className="text-sm text-gray-300">
                          Quan hệ với chủ hộ
                        </label>
                        <select
                          value={filters.quanHe}
                          onChange={(e) =>
                            setFilters({ ...filters, quanHe: e.target.value })
                          }
                          className="bg-gray-700 text-white p-2 rounded w-full"
                        >
                          <option value="">Tất cả</option>
                          <option value="Chủ hộ">Chủ hộ</option>
                          <option value="Vợ">Vợ</option>
                          <option value="Con trai">Con trai</option>
                          <option value="Con gái">Con gái</option>
                        </select>
                      </div>

                      {/* Nghề nghiệp */}
                      <div>
                        <label className="text-sm text-gray-300">
                          Nghề nghiệp
                        </label>
                        <input
                          value={filters.ngheNghiep}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              ngheNghiep: e.target.value,
                            })
                          }
                          className="bg-gray-700 text-white p-2 rounded w-full"
                          placeholder="Nhập nghề nghiệp..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TABLE */}
                <div className="overflow-x-auto max-h-[55vh]">
                  <table className="w-full text-gray-200">
                    <thead className="sticky top-0 bg-gray-900">
                      <tr className="bg-gray-800 text-gray-300 text-sm uppercase">
                        {splitMode && <th className="p-3 text-center">Chọn</th>}
                        <th className="p-3 text-left">Họ tên</th>
                        <th className="p-3 text-left">Ngày sinh</th>
                        <th className="p-3 text-left">Nơi sinh</th>
                        <th className="p-3 text-left">CCCD</th>
                        <th className="p-3 text-left">Quan hệ</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredPopulation.map((p) => (
                        <tr
                          key={p.id}
                          className={`border-b border-gray-700 hover:bg-gray-800/70 transition cursor-pointer ${
                            selectedForSplit.includes(p.id)
                              ? "bg-blue-900/40"
                              : ""
                          }`}
                          onClick={() => {
                            if (!splitMode) {
                              setShowDetailBubble(p);
                              setShowCreateBubble(false);
                              setShowEditBubble(null);
                            }
                          }}
                        >
                          {splitMode && (
                            <td className="p-3 text-center">
                              <input
                                type="checkbox"
                                checked={selectedForSplit.includes(p.id)}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  if (e.target.checked)
                                    setSelectedForSplit([
                                      ...selectedForSplit,
                                      p.id,
                                    ]);
                                  else
                                    setSelectedForSplit(
                                      selectedForSplit.filter(
                                        (id) => id !== p.id
                                      )
                                    );
                                }}
                              />
                            </td>
                          )}

                          <td className="p-3 font-semibold">{p.hoTen}</td>
                          <td className="p-3">{p.ngaySinh}</td>
                          <td className="p-3">{p.noiSinh}</td>
                          <td className="p-3">{p.cccd || "—"}</td>
                          <td className="p-3">{p.quanHeChuHo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* OVERLAY + MODALS — CENTERED */}
                {(showCreateBubble || showDetailBubble || showEditBubble) && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[200]">
                    {/* BUBBLE — THÊM NHÂN KHẨU */}
                    {showCreateBubble && (
                      <div className="bg-gray-800 w-[420px] rounded-2xl p-6 border border-gray-700 shadow-2xl animate-fade">
                        <h2 className="text-white text-xl font-bold mb-4">
                          Thêm nhân khẩu mới
                        </h2>

                        <div className="space-y-3">
                          <input
                            className="bubble-input"
                            placeholder="Họ tên"
                          />
                          <input
                            className="bubble-input"
                            placeholder="Ngày sinh"
                          />
                          <input
                            className="bubble-input"
                            placeholder="Nơi sinh"
                          />
                          <input
                            className="bubble-input"
                            placeholder="Nguyên quán"
                          />
                          <input
                            className="bubble-input"
                            placeholder="Nghề nghiệp"
                          />
                          <input
                            className="bubble-input"
                            placeholder="Nơi làm việc"
                          />
                          <input className="bubble-input" placeholder="CCCD" />
                          <input
                            className="bubble-input"
                            placeholder="Ngày cấp"
                          />
                          <input
                            className="bubble-input"
                            placeholder="Nơi cấp"
                          />
                          <input
                            className="bubble-input"
                            placeholder="ĐK thường trú"
                          />
                          <input
                            className="bubble-input"
                            placeholder="Trước đó"
                          />
                          <input
                            className="bubble-input"
                            placeholder="Quan hệ chủ hộ"
                          />

                          <select className="bubble-input">
                            <option value="">Giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>

                          <div className="flex gap-3 pt-2">
                            <button className="bubble-btn-confirm">
                              ✔ Xác nhận
                            </button>
                            <button
                              className="bubble-btn-cancel"
                              onClick={() => setShowCreateBubble(false)}
                            >
                              Hủy
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* BUBBLE — CHI TIẾT NHÂN KHẨU */}
                    {showDetailBubble && (
                      <div className="bg-gray-800 w-[480px] rounded-2xl p-6 border border-gray-700 shadow-2xl animate-fade">
                        <h2 className="text-white text-xl font-bold mb-4">
                          Chi tiết nhân khẩu
                        </h2>

                        <div className="space-y-2 text-gray-200 max-h-[60vh] overflow-y-auto pr-2">
                          <p>
                            <strong>Họ tên:</strong> {showDetailBubble.hoTen}
                          </p>
                          <p>
                            <strong>Ngày sinh:</strong>{" "}
                            {showDetailBubble.ngaySinh}
                          </p>
                          <p>
                            <strong>Nơi sinh:</strong>{" "}
                            {showDetailBubble.noiSinh}
                          </p>
                          <p>
                            <strong>Nguyên quán:</strong>{" "}
                            {showDetailBubble.nguyenQuan}
                          </p>
                          <p>
                            <strong>Nghề nghiệp:</strong>{" "}
                            {showDetailBubble.ngheNghiep}
                          </p>
                          <p>
                            <strong>Nơi làm việc:</strong>{" "}
                            {showDetailBubble.noiLamViec}
                          </p>
                          <p>
                            <strong>CCCD:</strong>{" "}
                            {showDetailBubble.cccd || "—"}
                          </p>
                          <p>
                            <strong>Ngày cấp:</strong>{" "}
                            {showDetailBubble.ngayCap || "—"}
                          </p>
                          <p>
                            <strong>Nơi cấp:</strong>{" "}
                            {showDetailBubble.noiCap || "—"}
                          </p>
                          <p>
                            <strong>ĐK thường trú:</strong>{" "}
                            {showDetailBubble.dangKyThuongTru}
                          </p>
                          <p>
                            <strong>Trước đó:</strong>{" "}
                            {showDetailBubble.thuongTruTruoc}
                          </p>
                          <p>
                            <strong>Quan hệ chủ hộ:</strong>{" "}
                            {showDetailBubble.quanHeChuHo}
                          </p>

                          {/* TRẠNG THÁI */}
                          <p>
                            <strong>Trạng thái:</strong>{" "}
                            {showDetailBubble.trangThai}
                          </p>

                          {showDetailBubble.trangThai === "chuyendi" && (
                            <>
                              <p>
                                <strong>Ngày chuyển đi:</strong>{" "}
                                {showDetailBubble.ngayChuyenDi}
                              </p>
                              <p>
                                <strong>Nơi chuyển đến:</strong>{" "}
                                {showDetailBubble.noiChuyenDen}
                              </p>
                              <p>
                                <strong>Ghi chú:</strong>{" "}
                                {showDetailBubble.ghiChu}
                              </p>
                            </>
                          )}

                          {showDetailBubble.trangThai === "quadoi" && (
                            <p>
                              <strong>Ghi chú:</strong> Đã qua đời
                            </p>
                          )}
                        </div>

                        <div className="flex gap-3 mt-4">
                          <button
                            className="bubble-btn-confirm w-full"
                            onClick={() => {
                              setShowEditBubble(showDetailBubble);
                              setShowDetailBubble(null);
                            }}
                          >
                            ✎ Chỉnh sửa
                          </button>

                          <button
                            className="bubble-btn-cancel w-full"
                            onClick={() => setShowDetailBubble(null)}
                          >
                            Đóng
                          </button>
                        </div>
                      </div>
                    )}

                    {/* BUBBLE — CHỈNH SỬA NHÂN KHẨU */}
                    {showEditBubble && (
                      <div className="bg-gray-800 w-[480px] rounded-2xl p-6 border border-gray-700 shadow-2xl animate-fade">
                        <h2 className="text-white text-xl font-bold mb-4">
                          Chỉnh sửa nhân khẩu
                        </h2>

                        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.hoTen}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.ngaySinh}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.noiSinh}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.nguyenQuan}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.ngheNghiep}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.noiLamViec}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.cccd}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.ngayCap}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.noiCap}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.dangKyThuongTru}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.thuongTruTruoc}
                          />
                          <input
                            className="bubble-input"
                            defaultValue={showEditBubble.quanHeChuHo}
                          />

                          <select
                            className="bubble-input"
                            defaultValue={showEditBubble.gioiTinh}
                          >
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                          </select>

                          {/* Trạng thái */}
                          <select
                            className="bubble-input"
                            defaultValue={showEditBubble.trangThai}
                          >
                            <option value="binhthuong">Bình thường</option>
                            <option value="chuyendi">Chuyển đi</option>
                            <option value="quadoi">Qua đời</option>
                          </select>

                          {showEditBubble.trangThai === "chuyendi" && (
                            <>
                              <input
                                className="bubble-input"
                                placeholder="Ngày chuyển đi"
                              />
                              <input
                                className="bubble-input"
                                placeholder="Nơi chuyển đến"
                              />
                              <input
                                className="bubble-input"
                                placeholder="Ghi chú"
                              />
                            </>
                          )}

                          {showEditBubble.trangThai === "quadoi" && (
                            <input
                              className="bubble-input"
                              placeholder="Ghi chú: Đã qua đời"
                              disabled
                            />
                          )}
                        </div>

                        <div className="flex gap-3 mt-4">
                          <button className="bubble-btn-confirm w-full">
                            ✔ Lưu
                          </button>
                          <button
                            className="bubble-btn-cancel w-full"
                            onClick={() => setShowEditBubble(null)}
                          >
                            Hủy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-72 bg-gray-900 rounded-2xl shadow-xl p-6 border border-white/10 flex flex-col gap-4">
              <div className="bg-gray-800 rounded-xl p-4 flex items-center justify-center border border-gray-700">
                <div className="text-center">
                  <p className="text-white text-xs opacity-80">Nhân khẩu</p>
                  <p className="text-white text-3xl font-bold">
                    {nhanKhau.length}
                  </p>
                </div>
              </div>

              <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 overflow-y-auto">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Lịch sử biến động ({householdData.soHoKhau})
                </h3>

                <div className="space-y-2">
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600">
                    01/01/2024 – Thêm nhân khẩu
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600">
                    15/12/2023 – Xóa nhân khẩu
                  </div>
                  <div className="bg-gray-700 rounded-lg p-2 border border-gray-600">
                    10/11/2023 – Cập nhật thông tin
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GLOBAL STYLE FOR INPUT + BUTTONS */}
      <style>{`
        .bubble-input {
          width: 100%;
          padding: 10px;
          background: #374151;
          border-radius: 10px;
          color: white;
          outline: none;
        }
        .bubble-btn-confirm {
          background: #2563eb;
          padding: 10px;
          border-radius: 10px;
          color: white;
          font-weight: bold;
        }
        .bubble-btn-cancel {
          background: #6b7280;
          padding: 10px;
          border-radius: 10px;
          color: white;
        }
        .animate-fade {
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
