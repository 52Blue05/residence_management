import { useState, useMemo } from "react";
import { Filter, Search, PlusCircle, Cog, Pencil, Trash2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";
import { feeTypes } from "../data/feeTypes";

export default function FeeTypeList() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return feeTypes.filter((fee) =>
      fee.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const viewDetail = (fee) => setSelected(fee);

  const deleteFee = (fee) => {
    if (confirm(`Bạn muốn xoá loại phí: ${fee.name}?`)) {
      alert("Đã xoá (mô phỏng).");
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <video
        className="fixed inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
      />

      <div className="flex h-screen w-screen relative z-10 bg-black/35 backdrop-blur-sm">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-auto">
            <div className="w-full h-full p-6 md:p-8 space-y-8">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                    Module
                  </p>
                  <h1 className="text-3xl font-semibold text-white">
                    Danh sách loại phí
                  </h1>
                  <p className="text-gray-300 mt-1 max-w-2xl">
                    Quản lý các loại phí áp dụng theo từng năm: phí vệ sinh, an
                    ninh, chiếu sáng,...
                  </p>
                </div>

                <button
                  onClick={() => alert("Thêm mới (mô phỏng)")}
                  className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2"
                >
                  <PlusCircle className="w-5 h-5" /> Thêm loại phí
                </button>
              </div>

              {/* Stats */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    label: "Tổng loại phí",
                    value: feeTypes.length,
                    desc: "Các loại phí đang áp dụng",
                  },
                  {
                    label: "Phí bắt buộc",
                    value: feeTypes.filter((f) => f.mandatory).length,
                    desc: "Ví dụ: phí vệ sinh",
                  },
                  {
                    label: "Phí tự nguyện",
                    value: feeTypes.filter((f) => !f.mandatory).length,
                    desc: "An ninh, chiếu sáng...",
                  },
                ].map((card) => (
                  <div
                    key={card.label}
                    className="bg-gray-900/80 border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/30"
                  >
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      {card.label}
                    </p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{card.desc}</p>
                  </div>
                ))}
              </section>

              {/* Table */}
              <section className="bg-gray-900/80 border border-white/5 rounded-3xl shadow-2xl shadow-black/40">
                {/* Filters */}
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-800/80 px-3 py-2 rounded-xl flex-1">
                    <Search className="w-4 h-4 text-gray-500" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Tìm theo tên phí..."
                      className="bg-transparent text-sm focus:outline-none flex-1"
                    />
                  </div>
                </div>

                {/* Table Content */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-gray-400 uppercase">
                      <tr>
                        <th className="px-6 py-4 text-left">Tên phí</th>
                        <th className="px-6 py-4 text-left">Bắt buộc</th>
                        <th className="px-6 py-4 text-left">Cách tính</th>
                        <th className="px-6 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.length ? (
                        filtered.map((fee) => (
                          <tr
                            key={fee.id}
                            className="border-b border-white/5 hover:bg-white/5 transition"
                          >
                            <td className="px-6 py-4 text-white font-semibold">
                              {fee.name}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {fee.mandatory ? "Bắt buộc" : "Tự nguyện"}
                            </td>
                            <td className="px-6 py-4 text-gray-300">
                              {fee.calculation === "per_person" &&
                                "Theo nhân khẩu"}
                              {fee.calculation === "per_household" && "Theo hộ"}
                              {fee.calculation === "manual" && "Tự nhập"}
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex justify-center gap-2">
                                <button
                                  className="px-3 py-2 rounded-lg bg-blue-500/10 text-blue-200 border border-blue-400/30"
                                  onClick={() => viewDetail(fee)}
                                >
                                  Xem
                                </button>

                                <button className="px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-200 border border-yellow-400/30">
                                  <Pencil className="w-4 h-4" />
                                </button>

                                <button
                                  className="px-3 py-2 rounded-lg bg-red-500/10 text-red-300 border border-red-400/30"
                                  onClick={() => deleteFee(fee)}
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
                            colSpan={4}
                            className="px-6 py-10 text-center text-gray-400"
                          >
                            Không có loại phí phù hợp
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* Slide-over detail */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
          />
          <div className="relative w-full max-w-md bg-gray-950 border-l border-white/10 h-full overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                  Chi tiết loại phí
                </p>
                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Cog className="w-6 h-6 text-blue-300" />
                  {selected.name}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-xs uppercase text-gray-400">Tên phí</p>
                <p className="text-white font-semibold mt-1">{selected.name}</p>
              </div>

              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-xs uppercase text-gray-400">Bắt buộc</p>
                <p className="text-white font-semibold mt-1">
                  {selected.mandatory ? "Có" : "Không"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-xs uppercase text-gray-400">Cách tính</p>
                <p className="text-white font-semibold mt-1">
                  {selected.calculation === "per_person" && "Theo nhân khẩu"}
                  {selected.calculation === "per_household" && "Theo hộ"}
                  {selected.calculation === "manual" && "Tự nhập"}
                </p>
              </div>

              {selected.rate && (
                <div className="rounded-2xl border border-white/10 p-4">
                  <p className="text-xs uppercase text-gray-400">Định mức</p>
                  <p className="text-white font-semibold mt-1">
                    {selected.rate.toLocaleString()} VNĐ
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
