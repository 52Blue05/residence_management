import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  CheckCircle,
  XCircle,
  BellRing,
  DollarSign,
  Calendar,
  Pencil,
  Plus,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";

import { feeTypes } from "../data/feeTypes";
import { feeRecords } from "../data/feeRecords";

export default function FeeCollectionByType() {
  const { typeId } = useParams();
  const feeType = feeTypes.find((f) => f.id === Number(typeId));

  const [search, setSearch] = useState("");
  const [area, setArea] = useState("all");
  const [status, setStatus] = useState("all");
  const [selected, setSelected] = useState(null);

  const areas = Array.from({ length: 7 }, (_, i) => i + 1);

  // --- FILTERED LIST ---
  const filtered = useMemo(() => {
    return feeRecords
      .filter((rec) => rec.feeTypeId === Number(typeId))
      .filter((rec) =>
        rec.headName.toLowerCase().includes(search.toLowerCase())
      )
      .filter((rec) => (area === "all" ? true : rec.area === Number(area)))
      .filter((rec) =>
        status === "all"
          ? true
          : status === "paid"
          ? rec.paid >= rec.mustPay
          : rec.paid < rec.mustPay
      );
  }, [search, area, status, typeId]);

  const unpaidList = filtered.filter((rec) => rec.paid < rec.mustPay);

  const totalMustPay = filtered.reduce((a, b) => a + b.mustPay, 0);
  const totalPaid = filtered.reduce((a, b) => a + b.paid, 0);

  const sendNotification = () => {
    if (feeType.id !== 1) {
      alert("Chỉ phí vệ sinh có tính năng gửi thông báo!");
      return;
    }
    alert(`Đã gửi thông báo đến ${unpaidList.length} hộ chưa nộp phí.`);
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      {/* Video background */}
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
              {/* Header Section */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                    Module Thu phí
                  </p>
                  <h1 className="text-3xl font-semibold text-white">
                    {feeType.name}
                  </h1>
                  <p className="text-gray-300 mt-1 max-w-2xl">
                    Theo dõi và quản lý danh sách hộ gia đình phải nộp phí theo
                    năm.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={sendNotification}
                    className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium flex items-center gap-2"
                  >
                    <BellRing className="w-5 h-5" /> Gửi nhắc nộp phí
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    label: "Tổng số hộ",
                    value: filtered.length,
                    desc: "Thuộc loại phí này",
                  },
                  {
                    label: "Đã thu",
                    value: totalPaid.toLocaleString() + " VNĐ",
                    desc: "Tổng thu hiện tại",
                  },
                  {
                    label: "Còn thiếu",
                    value: (totalMustPay - totalPaid).toLocaleString() + " VNĐ",
                    desc: "Số tiền chưa thu",
                  },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="bg-gray-900/80 border border-white/5 rounded-2xl p-6 shadow-lg shadow-black/30"
                  >
                    <p className="text-sm text-gray-400 uppercase tracking-wide">
                      {c.label}
                    </p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {c.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{c.desc}</p>
                  </div>
                ))}
              </section>

              {/* MAIN TABLE */}
              <section className="bg-gray-900/80 border border-white/5 rounded-3xl shadow-2xl">
                {/* Filters */}
                <div className="p-6 border-b border-white/5 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-800/80 flex-1 min-w-60">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Tìm theo tên chủ hộ..."
                      className="bg-transparent text-sm focus:outline-none flex-1"
                    />
                  </div>

                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="px-3 py-2 text-sm bg-gray-800/80 border border-gray-700 rounded-xl"
                  >
                    <option value="all">Tất cả tổ</option>
                    {areas.map((a) => (
                      <option key={a} value={a}>
                        Tổ dân phố {a}
                      </option>
                    ))}
                  </select>

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-3 py-2 text-sm bg-gray-800/80 border border-gray-700 rounded-xl"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="paid">Đã nộp</option>
                    <option value="unpaid">Chưa nộp</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-white/5 text-gray-400 uppercase">
                      <tr>
                        <th className="px-6 py-4 text-left">Chủ hộ</th>
                        <th className="px-6 py-4 text-left">Tổ</th>
                        <th className="px-6 py-4 text-left">Phải thu</th>
                        <th className="px-6 py-4 text-left">Đã thu</th>
                        <th className="px-6 py-4 text-center">Trạng thái</th>
                        <th className="px-6 py-4 text-center">Thao tác</th>
                      </tr>
                    </thead>

                    <tbody>
                      {filtered.length ? (
                        filtered.map((rec) => {
                          const paidEnough = rec.paid >= rec.mustPay;

                          return (
                            <tr
                              key={rec.householdId}
                              className="border-b border-white/5 hover:bg-white/5 transition"
                            >
                              <td className="px-6 py-4 text-white font-semibold">
                                {rec.headName}
                              </td>

                              <td className="px-6 py-4 text-gray-300">
                                <MapPin className="w-4 h-4 inline-block text-blue-300 mr-1" />
                                Tổ {rec.area}
                              </td>

                              <td className="px-6 py-4 text-gray-300">
                                {rec.mustPay.toLocaleString()} VNĐ
                              </td>

                              <td className="px-6 py-4 text-gray-300">
                                {rec.paid.toLocaleString()} VNĐ
                              </td>

                              <td className="px-6 py-4 text-center">
                                {paidEnough ? (
                                  <span className="inline-flex items-center gap-1 text-emerald-300">
                                    <CheckCircle className="w-4 h-4" />
                                    Đã nộp
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-red-300">
                                    <XCircle className="w-4 h-4" />
                                    Chưa nộp
                                  </span>
                                )}
                              </td>

                              <td className="px-6 py-4">
                                <div className="flex justify-center gap-2">
                                  <button
                                    className="px-3 py-2 rounded-lg bg-blue-500/10 text-blue-200 border border-blue-400/30"
                                    onClick={() => setSelected(rec)}
                                  >
                                    Xem
                                  </button>

                                  <button className="px-3 py-2 rounded-lg bg-yellow-500/10 text-yellow-200 border border-yellow-400/30">
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-10 text-center text-gray-400"
                          >
                            Không có dữ liệu phù hợp
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/5 text-sm text-gray-400">
                  Tổng tiền phải thu: <b>{totalMustPay.toLocaleString()} VNĐ</b>{" "}
                  • Đã thu: <b>{totalPaid.toLocaleString()} VNĐ</b> • Còn thiếu:{" "}
                  <b>{(totalMustPay - totalPaid).toLocaleString()} VNĐ</b>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      {/* Slide-over Detail */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelected(null)}
          />

          <div className="relative w-full max-w-md bg-gray-950 border-l border-white/10 h-full overflow-y-auto p-8">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  Chi tiết thu phí
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  {selected.headName}
                </h3>
                <p className="text-xs text-gray-400">
                  Hộ khẩu: {selected.householdId}
                </p>
              </div>

              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="space-y-4 text-sm">
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-xs text-gray-400 uppercase">Phải thu</p>
                <p className="text-white font-semibold mt-1">
                  {selected.mustPay.toLocaleString()} VNĐ
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-xs text-gray-400 uppercase">Đã thu</p>
                <p className="text-emerald-300 font-semibold mt-1">
                  {selected.paid.toLocaleString()} VNĐ
                </p>
              </div>

              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl flex items-center justify-center gap-2">
                <DollarSign className="w-5 h-5" />
                Ghi nhận nộp tiền
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
