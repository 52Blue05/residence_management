import { useMemo, useState } from "react";
import { Filter, Pencil, Trash2, Users } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";
import { feeRecords } from "../data/fees"; // Dữ liệu thu phí, bạn cần thêm dữ liệu giả vào đây.

export default function QuanLiThuPhi() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ area: "all" });
  const [selected, setSelected] = useState(null);
  const [detailMode, setDetailMode] = useState("view");

  const filteredFees = useMemo(() => {
    return feeRecords.filter((fee) => {
      const matchesSearch =
        fee.householdId.toLowerCase().includes(search.toLowerCase()) ||
        fee.householderName.toLowerCase().includes(search.toLowerCase());
      const matchesArea =
        filters.area === "all" ? true : Number(filters.area) === fee.area;
      return matchesSearch && matchesArea;
    });
  }, [search, filters]);

  const openDetail = (fee, mode = "view") => {
    setSelected(fee);
    setDetailMode(mode);
  };

  const closeDetail = () => {
    setSelected(null);
  };

  const handleDelete = (fee) => {
    if (confirm(`Bạn chắc chắn muốn xoá thu phí của hộ ${fee.householdId}?`)) {
      alert("Đã xoá (mô phỏng).");
    }
  };

  const handleUpdate = () => {
    alert("Đã lưu thay đổi (mô phỏng).");
    setDetailMode("view");
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <div className="flex h-screen w-screen relative z-10 bg-black/35 backdrop-blur-sm">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            <div className="w-full h-full p-6 md:p-8 space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                    Module
                  </p>
                  <h1 className="text-3xl font-semibold text-white">
                    Danh sách thu phí
                  </h1>
                  <p className="text-gray-300 mt-1 max-w-2xl">
                    Quản lý thu phí vệ sinh hàng năm và các khoản đóng góp khác
                    của các hộ gia đình trong phường.
                  </p>
                </div>
              </div>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Hiển thị thống kê tổng hợp nếu cần */}
              </section>

              <section className="bg-gray-900/80 border border-white/5 rounded-3xl shadow-2xl shadow-black/40">
                <div className="p-6 border-b border-white/5 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-2 rounded-xl flex-1 min-w-[220px]">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Tìm số hộ khẩu, chủ hộ..."
                        className="bg-transparent text-sm focus:outline-none flex-1"
                      />
                    </div>
                    <select
                      className="bg-gray-800/80 text-sm px-3 py-2 rounded-xl border border-gray-700 text-gray-100"
                      value={filters.area}
                      onChange={(e) =>
                        setFilters({ ...filters, area: e.target.value })
                      }
                    >
                      <option value="all">Tất cả tổ dân phố</option>
                      {/* Tạo các tổ dân phố nếu có */}
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-gray-400 uppercase">
                      <tr>
                        <th className="px-6 py-4 text-left">Số hộ khẩu</th>
                        <th className="px-6 py-4 text-left">Chủ hộ</th>
                        <th className="px-6 py-4 text-left">Tổ / Địa chỉ</th>
                        <th className="px-6 py-4 text-left">Số tiền thu</th>
                        <th className="px-6 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFees.length ? (
                        filteredFees.map((fee) => (
                          <tr
                            key={fee.householdId}
                            className="border-b border-white/5 hover:bg-white/5 transition"
                          >
                            <td className="px-6 py-4 font-semibold text-white">
                              {fee.householdId}
                            </td>
                            <td className="px-6 py-4 text-gray-200">
                              {fee.householderName}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              <p className="flex items-center gap-2">
                                {/* Tổ dân phố */}
                              </p>
                              <p className="text-xs text-gray-500">
                                {fee.address}
                              </p>
                            </td>
                            <td className="px-6 py-4">{fee.amount} VNĐ</td>
                            <td className="px-6 py-4">
                              <div className="flex justify-center gap-2">
                                <button
                                  className="px-3 py-2 rounded-lg bg-blue-500/10 text-blue-200 border border-blue-400/30"
                                  onClick={() => openDetail(fee, "view")}
                                >
                                  Xem
                                </button>
                                <button
                                  className="px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-200 border border-yellow-400/30"
                                  onClick={() => openDetail(fee, "edit")}
                                >
                                  <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                  className="px-3 py-2 rounded-lg bg-red-500/10 text-red-300 border border-red-400/30"
                                  onClick={() => handleDelete(fee)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-10 text-center text-gray-400"
                          >
                            Không có dữ liệu thu phí
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="px-6 py-4 text-sm text-gray-400 border-t border-white/5">
                  Hiển thị {filteredFees.length} trên {feeRecords.length} hộ
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={closeDetail} />
          <div className="relative w-full max-w-md bg-gray-950 border-l border-white/10 h-full overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                  Chi tiết thu phí
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  {selected.householderName}
                </h3>
                <p className="text-xs text-gray-400">
                  {selected.householdId} • Tổ dân phố {selected.area}
                </p>
              </div>
              <button
                onClick={closeDetail}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-gray-400 text-xs uppercase">Địa chỉ</p>
                <p className="text-white font-semibold mt-1">
                  {selected.address}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-gray-400 text-xs uppercase">Số tiền thu</p>
                <p className="text-white font-semibold mt-1">
                  {selected.amount} VNĐ
                </p>
              </div>

              {/* Các thông tin khác */}
            </div>

            <div className="mt-6 flex gap-3">
              {detailMode === "edit" ? (
                <>
                  <button
                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl font-semibold"
                    onClick={handleUpdate}
                  >
                    Lưu thay đổi
                  </button>
                  <button
                    className="flex-1 bg-gray-800 text-gray-300 border border-gray-700 py-3 rounded-2xl"
                    onClick={() => setDetailMode("view")}
                  >
                    Huỷ
                  </button>
                </>
              ) : (
                <button
                  className="flex-1 bg-gray-800 text-gray-200 border border-gray-700 py-3 rounded-2xl"
                  onClick={() => setDetailMode("edit")}
                >
                  Chỉnh sửa
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
