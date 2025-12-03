import { useParams } from "react-router-dom";
import { useState } from "react";
import { Search, Plus, Users, DollarSign } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";
import { contributionCampaigns } from "../data/contributionCampaigns";

export default function ContributionDetail() {
  const { campaignId } = useParams();

  const campaign = contributionCampaigns.find(
    (c) => c.id === Number(campaignId)
  );
  const [search, setSearch] = useState("");

  const contributions = [
    { householdId: "HK001", name: "Nguyễn Văn A", amount: 50000 },
    { householdId: "HK017", name: "Phạm Thị D", amount: 30000 },
  ];

  const filtered = contributions.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100">
      <video
        className="fixed inset-0 w-full h-full object-cover opacity-30"
        src="/videos/background.mp4"
        autoPlay
        loop
        muted
      />

      <div className="flex h-screen relative z-10 bg-black/35 backdrop-blur-sm">
        <Sidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />

          <main className="flex-1 p-8 space-y-8 overflow-auto">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-semibold text-white">
                {campaign.title}
              </h1>
              <p className="text-gray-300">{campaign.description}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card
                label="Tổng thu"
                value={campaign.totalCollected.toLocaleString() + " VNĐ"}
              />
              <Card
                label="Số hộ tham gia"
                value={`${campaign.participants}/${campaign.totalHouseholds}`}
              />
              <Card
                label="Ngày bắt đầu"
                value={new Date(campaign.dateStart).toLocaleDateString("vi-VN")}
              />
            </div>

            {/* Search & Add */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-gray-800/80 px-3 py-2 rounded-xl flex-1 md:w-80">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm theo tên hộ..."
                  className="bg-transparent text-sm focus:outline-none flex-1"
                />
              </div>

              <button className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 flex items-center gap-2">
                <Plus className="w-4 h-4" /> Thêm đóng góp
              </button>
            </div>

            {/* Table */}
            <section className="bg-gray-900/80 border border-white/5 rounded-3xl shadow p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-white/5 text-gray-400 uppercase">
                    <th className="px-6 py-3 text-left">Hộ khẩu</th>
                    <th className="px-6 py-3 text-left">Chủ hộ</th>
                    <th className="px-6 py-3 text-left">Đóng góp</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.householdId}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-3 text-white">{c.householdId}</td>
                      <td className="px-6 py-3 text-gray-300">{c.name}</td>
                      <td className="px-6 py-3 text-gray-300">
                        {c.amount.toLocaleString()} VNĐ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-6 shadow-lg">
      <p className="text-sm text-gray-400 uppercase">{label}</p>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}
