import { useAuth } from "../context/AuthContext";
import { householdRecords } from "../data/households";
import UserLayout from "../components/UserLayout";

export default function UserHousehold() {
  const { user } = useAuth();

  const household =
    householdRecords.find((h) => h.id === user?.householdId) || null;

  return (
    <UserLayout
      title="Hộ khẩu đang ở"
      subtitle="Thông tin hộ khẩu gắn với tài khoản hiện tại"
    >
      <div className="space-y-4">

        {!household ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Chưa tìm thấy hộ khẩu gắn với tài khoản này (householdId:
            {user?.householdId || "—"}). Khi tích hợp với backend, hãy trả về{" "}
            <code className="bg-amber-100 px-1 rounded">
              householdId
            </code>{" "}
            tương ứng để màn hình này hiển thị chính xác.
          </div>
        ) : (
          <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Sổ hộ khẩu
                </p>
                <p className="text-xl font-semibold text-gray-900">{household.id}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs bg-emerald-100 text-emerald-700 border border-emerald-300">
                {household.type === "thuong-tru"
                  ? "Thường trú"
                  : household.type === "tam-tru"
                  ? "Tạm trú"
                  : "Khác"}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="text-gray-500 text-xs mb-1">Chủ hộ</p>
                <p className="font-medium text-gray-900">{household.headName}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Số điện thoại</p>
                <p className="text-gray-900">{household.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-gray-500 text-xs mb-1">Địa chỉ</p>
                <p className="text-gray-900">
                  {household.address} - {household.ward}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Số nhân khẩu</p>
                <p className="text-gray-900">{household.members}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Khu vực</p>
                <p className="text-gray-900">Tổ {household.area}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs mb-1">Ngày đăng ký</p>
                <p className="text-gray-900">{household.registeredAt}</p>
              </div>
              {household.note && (
                <div className="sm:col-span-2">
                  <p className="text-gray-500 text-xs mb-1">Ghi chú</p>
                  <p className="text-gray-900">{household.note}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
}


