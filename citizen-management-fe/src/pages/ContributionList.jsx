import { useState, useMemo } from "react";
import { Search, PlusCircle, Users, Calendar } from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../headers/Header";
import { contributionCampaigns } from "../data/contributionCampaigns";

export default function ContributionList() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return contributionCampaigns.filter((c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-blue-200">
                  Đóng góp
                </p>
                <h1 className="text-3xl font-semibold text-white">
                  Các đợt vận động
                </h1>
                <p className="text-gray-300">
                  Theo dõi danh sách các chiến dịch đóng góp trong năm.
                </p>
              </div>

              <button className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 flex items-center gap-2">
                <PlusCircle className="w-5 h-5" /> Tạo đợt mới
              </button>
            </div>

            {/* Search */}
            <div className="bg-gray-800/80 px-4 py-2 rounded-xl flex items-center gap-2 w-full md:w-96">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên đợt..."
                className="bg-transparent text-sm focus:outline-none flex-1"
              />
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((camp) => (
                <div
                  key={camp.id}
                  className="bg-gray-900/80 border border-white/5 p-6 rounded-2xl shadow-lg hover:bg-gray-900/60 transition"
                >
                  <h2 className="text-xl font-semibold text-white">
                    {camp.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    {camp.description}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-gray-300 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-300" />
                      {new Date(camp.dateStart).toLocaleDateString("vi-VN")}
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-300" />
                      {camp.participants}/{camp.totalHouseholds} hộ
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      (window.location.href = `/fee-management/contribute/${camp.id}`)
                    }
                    className="mt-4 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl text-sm"
                  >
                    Xem chi tiết
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
