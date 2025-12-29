import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { residentRecords } from "../data/residents";
import UserLayout from "../components/UserLayout";
import ResidentDetailModal from "../components/ResidentDetailModal";
import AddResidentModal from "../components/AddResidentModal";
import { householdRecords } from "../data/households";

export default function UserMembers() {
  const { user } = useAuth();
  const [members, setMembers] = useState(
    residentRecords.filter((r) => r.household === user?.householdId)
  );
  const [selectedResident, setSelectedResident] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Check if user is household head
  const household = householdRecords.find((h) => h.id === user?.householdId);
  const isHouseholdHead = household && household.headName === user?.fullName;

  const handleAddResident = (newResident) => {
    setMembers((prev) => [...prev, newResident]);
  };

  const handleOpenDetail = (resident) => {
    setSelectedResident(resident);
    setIsDetailOpen(true);
  };

  return (
    <UserLayout
      title="Nhân khẩu trong hộ"
      subtitle="Danh sách các nhân khẩu thuộc hộ khẩu gắn với tài khoản hiện tại"
    >
      <div className="space-y-4">
        {/* Add button - only show if user is household head */}
        {isHouseholdHead && (
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddOpen(true)}
              className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 font-medium transition flex items-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Thêm nhân khẩu mới
            </button>
          </div>
        )}

        {members.length === 0 ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Chưa tìm thấy nhân khẩu nào cho hộ khẩu{" "}
            <span className="font-semibold">{user?.householdId || "—"}</span>.
            Khi kết nối backend, hãy trả về dữ liệu nhân khẩu lọc theo
            <code className="bg-amber-100 px-1 rounded ml-1">householdId</code>.
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 border-b border-gray-200">
                  <th className="text-left py-2 font-medium">Họ tên</th>
                  <th className="text-left py-2 font-medium">CCCD</th>
                  <th className="text-left py-2 font-medium hidden sm:table-cell">
                    Năm sinh
                  </th>
                  <th className="text-left py-2 font-medium hidden sm:table-cell">
                    Nghề nghiệp
                  </th>
                  <th className="text-left py-2 font-medium">Loại cư trú</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleOpenDetail(m)}
                  >
                    <td className="py-2 text-gray-900">{m.name}</td>
                    <td className="py-2 text-gray-700">{m.cccd}</td>
                    <td className="py-2 text-gray-600 hidden sm:table-cell">
                      {m.birthDate}
                    </td>
                    <td className="py-2 text-gray-600 hidden sm:table-cell">
                      {m.occupation || "—"}
                    </td>
                    <td className="py-2">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 border border-blue-300">
                        {m.residenceType === "thuong-tru"
                          ? "Thường trú"
                          : m.residenceType === "tam-tru"
                          ? "Tạm trú"
                          : "Khác"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modals */}
        <ResidentDetailModal
          resident={selectedResident}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
        <AddResidentModal
          householdId={user?.householdId}
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAddResident}
        />
      </div>
    </UserLayout>
  );
}
