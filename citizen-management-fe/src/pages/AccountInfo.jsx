import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AccountInfo() {
  const profile = {
    name: "Nguyễn Văn A",
    role: "Cán bộ kế toán",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    address: "Phường La Khê, Hà Đông, Hà Nội",
    avatar: "/images/avatar.jpg", // Chèn đường dẫn đến ảnh đại diện
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm shrink-0 border-b border-gray-200">
          <div className="px-6 md:px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Thông tin tài khoản
              </h1>
              <p className="text-gray-600 mt-1 text-sm">
                Xem và chỉnh sửa thông tin cá nhân
              </p>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto">
          <div className="w-full h-full p-6 md:p-8">
            <div className="flex flex-col items-center gap-6 mb-8">
              {/* Profile Info */}
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={profile.avatar}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full border-4 border-blue-500"
                  />
                  <h2 className="text-2xl font-semibold text-gray-900 mt-4">
                    {profile.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{profile.role}</p>
                  <div className="mt-4 space-y-2 w-full">
                    <div className="flex justify-between text-gray-800">
                      <span>Email:</span>
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex justify-between text-gray-800">
                      <span>Điện thoại:</span>
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex justify-between text-gray-800">
                      <span>Địa chỉ:</span>
                      <span>{profile.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="flex justify-center w-full">
                <Link
                  to="/account/edit"
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                >
                  Chỉnh sửa thông tin
                </Link>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Hoạt động gần đây
              </h3>
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    Cập nhật thông tin tài khoản
                  </p>
                  <span className="text-xs text-gray-500">1 ngày trước</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Thêm ảnh đại diện</p>
                  <span className="text-xs text-gray-500">3 ngày trước</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Thay đổi mật khẩu</p>
                  <span className="text-xs text-gray-500">1 tuần trước</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
