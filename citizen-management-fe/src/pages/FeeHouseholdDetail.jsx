import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";
import { feeRecords } from "../data/feeRecords";
import { feeTypes } from "../data/feeTypes";
import { DollarSign, Calendar, User } from "lucide-react";

export default function FeeHouseholdDetail() {
  const { typeId, householdId } = useParams();

  const feeType = feeTypes.find((f) => f.id === Number(typeId));
  const household = feeRecords.find(
    (r) => r.householdId === householdId && r.feeTypeId === Number(typeId)
  );

  if (!household) {
    return <div className="text-white p-10">Không tìm thấy dữ liệu.</div>;
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <video
        className="fixed inset-0 w-full h-full object-cover opacity-30"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
      />

      <div className="flex h-screen w-screen relative z-10 bg-black/35 backdrop-blur-sm">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 overflow-auto p-8 space-y-8">
            {/* Header */}
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                Chi tiết thu phí
              </p>
              <h1 className="text-3xl font-semibold text-white">
                {household.headName}
              </h1>
              <p className="text-gray-300 mt-1">
                Hộ khẩu: {household.householdId} — Tổ {household.area}
              </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card label="Loại phí" value={feeType.name} icon={<User />} />
              <Card
                label="Phải thu"
                value={household.mustPay.toLocaleString() + " VNĐ"}
                icon={<DollarSign />}
              />
              <Card
                label="Đã thu"
                value={household.paid.toLocaleString() + " VNĐ"}
                icon={<DollarSign />}
              />
            </div>

            {/* Record Section */}
            <div className="bg-gray-900/80 border border-white/5 rounded-3xl p-6">
              <h2 className="text-xl font-semibold mb-4">Lịch sử thu</h2>

              {household.lastPaidDate ? (
                <div className="p-4 border border-white/10 rounded-xl">
                  <div className="text-gray-300 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-300" />
                    Ngày thu gần nhất:{" "}
                    {new Date(household.lastPaidDate).toLocaleDateString(
                      "vi-VN"
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">Chưa có giao dịch.</p>
              )}

              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl flex items-center justify-center gap-2">
                <DollarSign className="w-5 h-5" />
                Ghi nhận nộp tiền
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function Card({ label, value, icon }) {
  return (
    <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-6 shadow-lg">
      <p className="text-sm text-gray-400 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
      <div className="text-blue-300 mt-2">{icon}</div>
    </div>
  );
}
