import React, { useState } from "react";
import { useFetch } from "../hooks/useApi";
import { nhanKhauService } from "../services";

/**
 * Example Component: Resident List
 * Demonstrates fetching and displaying data from the backend
 */
export default function ResidentListExample() {
  const {
    data: residents,
    loading,
    error,
    refetch,
  } = useFetch(nhanKhauService.getAll);
  const [selectedResident, setSelectedResident] = useState(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-gray-600">Đang tải danh sách nhân khẩu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Lỗi: {error}</p>
          <button
            onClick={refetch}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Quản lý Nhân Khẩu</h1>

        <div className="mb-6 flex gap-3">
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Tải lại
          </button>
        </div>

        {residents && residents.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Họ và tên
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Ngày sinh
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Giới tính
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Số CMT/CCCD
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {residents.map((resident) => (
                  <tr key={resident.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {resident.fullName || resident.tenDayDu || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {resident.dateOfBirth || resident.ngaySinh || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {resident.gender === "M"
                        ? "Nam"
                        : resident.gender === "F"
                        ? "Nữ"
                        : "-"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {resident.idNumber || resident.soChungMinhThu || "-"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => setSelectedResident(resident)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-gray-600">Không có dữ liệu nhân khẩu</p>
          </div>
        )}

        {/* Detail Modal */}
        {selectedResident && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Chi tiết nhân khẩu</h2>
                <div className="space-y-3">
                  <p>
                    <strong>Họ và tên:</strong>{" "}
                    {selectedResident.fullName || "-"}
                  </p>
                  <p>
                    <strong>Ngày sinh:</strong>{" "}
                    {selectedResident.dateOfBirth || "-"}
                  </p>
                  <p>
                    <strong>Giới tính:</strong>{" "}
                    {selectedResident.gender === "M" ? "Nam" : "Nữ"}
                  </p>
                  <p>
                    <strong>Số CMT/CCCD:</strong>{" "}
                    {selectedResident.idNumber || "-"}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedResident(null)}
                  className="mt-6 w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
