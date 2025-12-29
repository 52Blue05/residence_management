import { useState, useRef, useEffect } from "react";

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "fee",
    title: "Thông báo đóng phí",
    message: "Phí dịch vụ tháng 12/2024 chưa được thanh toán",
    timestamp: "2 giờ trước",
    read: false,
  },
  {
    id: 2,
    type: "donation",
    title: "Chiến dịch quyên góp",
    message: "Chiến dịch quyên góp cho trường tiểu học Hoa Sen bắt đầu",
    timestamp: "1 ngày trước",
    read: false,
  },
  {
    id: 3,
    type: "admin",
    title: "Thông báo từ cán bộ",
    message: "Lưu ý: Cần cập nhật hộ khẩu trước 30/12/2024",
    timestamp: "3 ngày trước",
    read: true,
  },
  {
    id: 4,
    type: "fee",
    title: "Thanh toán thành công",
    message: "Phí dịch vụ tháng 11/2024 đã được xác nhận",
    timestamp: "1 tuần trước",
    read: true,
  },
  {
    id: 5,
    type: "admin",
    title: "Thông báo từ cán bộ",
    message: "Cuộc họp cư dân sẽ diễn ra vào 28/12/2024",
    timestamp: "2 tuần trước",
    read: true,
  },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const bellRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function onDocClick(e) {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleNotificationClick = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "fee":
        return "💳";
      case "donation":
        return "❤️";
      case "admin":
        return "📢";
      default:
        return "📌";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "fee":
        return "border-blue-200 bg-blue-50";
      case "donation":
        return "border-red-200 bg-red-50";
      case "admin":
        return "border-amber-200 bg-amber-50";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
        aria-label="Thông báo"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {/* Badge with unread count */}
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50 border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Thông báo</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Đánh dấu đã đọc
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                Chưa có thông báo nào
              </div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`px-4 py-3 cursor-pointer transition hover:bg-gray-50 ${
                      !notification.read ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className="text-2xl flex-shrink-0 pt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-gray-900 text-sm">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full mt-1.5"></span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">
                          {notification.message}
                        </p>
                        <p className="text-gray-400 text-xs mt-2">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="border-t border-gray-200 bg-gray-50 px-4 py-2">
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 py-2 font-medium">
                Xem tất cả thông báo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
