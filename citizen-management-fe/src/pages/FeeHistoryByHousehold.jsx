import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";
import { feeRecords } from "../data/feeRecords";
import { feeTypes } from "../data/feeTypes";
import { useParams } from "react-router-dom";
import { DollarSign, Calendar } from "lucide-react";

export default function FeeHistoryByHousehold() {
  const { householdId } = useParams();

  const records = feeRecords.filter((rec) => rec.householdId === householdId);

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <video
        className="fixed inset-0 w-full h-full object-cover opacity-30"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
      />

      <div className="flex h-screen bg-black/35 backdrop-blur-sm relative z-10">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-auto p-8 space-y-8">
            <div>
              <h1 className="text-3xl font-semibold text-white">
                Lịch sử thu phí
              </h1>
              <p className="text-gray-300">Hộ khẩu: {householdId}</p>
            </div>

            {/* Table */}
            <section className="bg-gray-900/80 border border-white/5 rounded-3xl shadow p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-gray-400 uppercase">
                    <th className="px-6 py-3 text-left">Loại phí</th>
                    <th className="px-6 py-3 text-left">Phải thu</th>
                    <th className="px-6 py-3 text-left">Đã thu</th>
                    <th className="px-6 py-3 text-left">Ngày thu gần nhất</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((rec) => {
                    const type = feeTypes.find((f) => f.id === rec.feeTypeId);

                    return (
                      <tr
                        key={rec.feeTypeId}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="px-6 py-3 text-white">{type.name}</td>
                        <td className="px-6 py-3 text-gray-300">
                          {rec.mustPay.toLocaleString()} VNĐ
                        </td>
                        <td className="px-6 py-3 text-gray-300">
                          {rec.paid.toLocaleString()} VNĐ
                        </td>
                        <td className="px-6 py-3 text-gray-300">
                          {rec.lastPaidDate
                            ? new Date(rec.lastPaidDate).toLocaleDateString(
                                "vi-VN"
                              )
                            : "—"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
