import React, { useState } from "react";
import { useApi } from "../hooks/useApi";
import { thuPhiService } from "../services";

/**
 * Example Component: Fee Management
 * Demonstrates creating, updating, and deleting data via API
 */
export default function FeeManagementExample() {
  const {
    data: fees,
    loading,
    error,
    execute: fetchFees,
    reset,
  } = useApi(thuPhiService.getAll);
  const [formData, setFormData] = useState({
    hoKhauId: "",
    loaiPhiId: "",
    amount: "",
    status: "PENDING",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  React.useEffect(() => {
    fetchFees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      await thuPhiService.create(formData);
      setSubmitSuccess("Thêm khoản thu phí thành công!");
      setFormData({
        hoKhauId: "",
        loaiPhiId: "",
        amount: "",
        status: "PENDING",
      });
      // Refresh the list
      await fetchFees();
    } catch (err) {
      setSubmitError(err.message || "Thêm khoản thu phí thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteFee = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khoản thu phí này?")) {
      try {
        await thuPhiService.delete(id);
        // Refresh the list
        await fetchFees();
      } catch (err) {
        alert("Xóa khoản thu phí thất bại: " + err.message);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Quản lý Thu Phí</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">Thêm khoản thu phí</h2>

              {submitError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                  {submitError}
                </div>
              )}

              {submitSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded text-green-600 text-sm">
                  {submitSuccess}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    ID Hộ khẩu
                  </label>
                  <input
                    type="text"
                    name="hoKhauId"
                    value={formData.hoKhauId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    ID Loại phí
                  </label>
                  <input
                    type="text"
                    name="loaiPhiId"
                    value={formData.loaiPhiId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Số tiền
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                  >
                    <option value="PENDING">Chưa thanh toán</option>
                    <option value="PAID">Đã thanh toán</option>
                    <option value="OVERDUE">Quá hạn</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {isSubmitting ? "Đang xử lý..." : "Thêm mới"}
                </button>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold mb-4">
                Danh sách khoản thu phí
              </h2>

              {loading && <p className="text-gray-600">Đang tải dữ liệu...</p>}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <p className="text-red-600">Lỗi: {error}</p>
                </div>
              )}

              {fees && fees.length > 0 ? (
                <div className="space-y-2">
                  {fees.map((fee) => (
                    <div
                      key={fee.id}
                      className="flex items-center justify-between p-3 border rounded"
                    >
                      <div>
                        <p className="font-semibold">Hộ khẩu: {fee.hoKhauId}</p>
                        <p className="text-sm text-gray-600">
                          Số tiền: {fee.amount?.toLocaleString("vi-VN")} VND
                        </p>
                        <p className="text-sm text-gray-600">
                          Trạng thái: {fee.status}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteFee(fee.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Xóa
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Chưa có khoản thu phí</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
