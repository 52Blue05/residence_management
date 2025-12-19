import { useAuth } from "../context/AuthContext";
import UserLayout from "../components/UserLayout";

// Dữ liệu mock cho lịch sử biến động nhân khẩu/hộ khẩu
const mockHistory = [
  {
    id: 1,
    date: "2024-03-05",
    type: "tam-tru",
    title: "Đăng ký tạm trú tại tổ dân phố 7",
    detail: "Đăng ký tạm trú 12 tháng tại địa chỉ hiện tại.",
  },
  {
    id: 2,
    date: "2023-10-12",
    type: "chuyen-den",
    title: "Chuyển đến phường La Khê",
    detail: "Từ địa chỉ cũ tại phường Hà Cầu sang phường La Khê.",
  },
  {
    id: 3,
    date: "2022-05-20",
    type: "cap-cccd",
    title: "Cập nhật thông tin CCCD",
    detail: "Cấp đổi CCCD gắn chip, cập nhật vào hồ sơ cư trú.",
  },
];

export default function UserHistory() {
  const { user } = useAuth();

  return (
    <UserLayout
      title="Lịch sử biến động nhân khẩu"
      subtitle="Các lần thay đổi liên quan đến cư trú của bạn"
    >
      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 border-b border-gray-200 last:border-none pb-3 last:pb-0"
            >
              <div className="mt-1">
                <span className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold text-white">
                  {user?.fullName?.[0] || "U"}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {item.date} •{" "}
                  {item.type === "tam-tru"
                    ? "Tạm trú"
                    : item.type === "chuyen-den"
                    ? "Chuyển đến"
                    : "Cập nhật giấy tờ"}
                </p>
                <p className="text-sm text-gray-700 mt-1">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500">
          Khi nối với backend, màn hình này sẽ lấy danh sách biến động từ bảng
          lịch sử (ví dụ: bảng{" "}
          <code className="bg-gray-100 px-1 rounded">bien_dong_nhan_khau</code>
          ) lọc theo mã nhân khẩu hoặc hộ khẩu gắn với tài khoản.
        </p>
      </div>
    </UserLayout>
  );
}


