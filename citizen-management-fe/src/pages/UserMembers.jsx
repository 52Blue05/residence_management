import { useAuth } from "../context/AuthContext";
import { residentRecords } from "../data/residents";
import UserLayout from "../components/UserLayout";

export default function UserMembers() {
  const { user } = useAuth();

  const members = residentRecords.filter(
    (r) => r.household === user?.householdId
  );

  return (
    <UserLayout
      title="Nhân khẩu trong hộ"
      subtitle="Danh sách các nhân khẩu thuộc hộ khẩu gắn với tài khoản hiện tại"
    >
      <div className="space-y-4">

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
                    className="border-b border-gray-100 hover:bg-gray-50"
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
      </div>
    </UserLayout>
  );
}


