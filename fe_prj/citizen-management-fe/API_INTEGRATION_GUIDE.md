/\*\*

- Example README for API Integration
- This file provides documentation on how to use the API services
  \*/

# API Integration Guide

## Overview

This frontend application integrates with a Spring Boot backend API. All API communication is handled through a centralized service layer.

## Project Structure

```
src/
├── services/
│   ├── api.config.js         # API configuration and endpoints
│   ├── http.client.js        # HTTP client with interceptors
│   ├── auth.service.js       # Authentication service
│   ├── taikhoan.service.js   # Account management
│   ├── nhankhau.service.js   # Resident management
│   ├── tamtru.service.js     # Temporary resident management
│   ├── loaiphi.service.js    # Fee type management
│   ├── dotthu.service.js     # Collection period management
│   ├── thuphi.service.js     # Fee collection management
│   ├── phivesingh.service.js # Sanitation fee management
│   ├── donggop.service.js    # Donation campaign management
│   ├── thongke.service.js    # Statistics and reports
│   ├── error.handler.js      # Error handling utilities
│   └── index.js              # Service exports
├── hooks/
│   └── useApi.js             # Custom React hook for API calls
└── pages/
    └── AccountInfo.jsx       # Example usage
```

## Setup

### 1. Environment Configuration

Create a `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_ENABLE_LOGGING=true
VITE_ENABLE_MOCK_DATA=false
```

### 2. Backend Requirements

The backend should have CORS enabled for the frontend URL:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("http://localhost:5173")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

## Usage Examples

### Example 1: Using Service Directly

```jsx
import { taiKhoanService } from "@/services";
import { useEffect, useState } from "react";

function MyComponent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    taiKhoanService
      .getById(1)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error.message}</div>;

  return <div>{user?.fullName}</div>;
}
```

### Example 2: Using useApi Hook

```jsx
import { useApi } from "@/hooks/useApi";
import { nhanKhauService } from "@/services";

function ResidentList() {
  const { data, loading, error, execute } = useApi(nhanKhauService.getAll);

  useEffect(() => {
    execute();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <ul>
      {data?.map((resident) => (
        <li key={resident.id}>{resident.name}</li>
      ))}
    </ul>
  );
}
```

### Example 3: Using useFetch Hook

```jsx
import { useFetch } from "@/hooks/useApi";
import { nhanKhauService } from "@/services";

function ResidentList() {
  const { data, loading, error, refetch } = useFetch(nhanKhauService.getAll);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <>
      <button onClick={refetch}>Tải lại</button>
      <ul>
        {data?.map((resident) => (
          <li key={resident.id}>{resident.name}</li>
        ))}
      </ul>
    </>
  );
}
```

### Example 4: Authentication

```jsx
import authService from "@/services/auth.service";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      // Token is automatically stored
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Đăng nhập</button>
    </form>
  );
}
```

## API Endpoints

### Account Management (Tài Khoản)

- `GET /api/taikhoan` - Get all accounts
- `GET /api/taikhoan/{id}` - Get account by ID
- `POST /api/taikhoan` - Create account
- `PUT /api/taikhoan/{id}` - Update account
- `DELETE /api/taikhoan/{id}` - Delete account

### Resident Management (Nhân Khẩu)

- `GET /api/nhankhau` - Get all residents
- `GET /api/nhankhau/{id}` - Get resident by ID
- `GET /api/nhankhau/ho-khau/{hoKhauId}` - Get residents by household
- `POST /api/nhankhau/them-moi` - Add new resident
- `PUT /api/nhankhau/thay-doi` - Update resident
- `PUT /api/nhankhau/thay-doi-chu-ho` - Change household head
- `DELETE /api/nhankhau/{id}` - Delete resident

### Fee Collection (Thu Phí)

- `GET /api/thuphi` - Get all fee collections
- `GET /api/thuphi/{id}` - Get fee collection by ID
- `GET /api/thuphi/ho-khau/{hoKhauId}` - Get fees by household
- `POST /api/thuphi` - Create fee collection
- `PUT /api/thuphi/{id}` - Update fee collection
- `DELETE /api/thuphi/{id}` - Delete fee collection

### Statistics (Thống Kê)

- `GET /api/thongke/thuphi` - Fee collection report
- `GET /api/thongke/donggop` - Donation campaign report
- `GET /api/thongke/nhankhau` - Population statistics

## Error Handling

All services include error handling. Errors are logged to console and can be caught in the calling code:

```jsx
try {
  const data = await nhanKhauService.getAll();
} catch (error) {
  console.error("Error:", error.message);
  // Display error to user
}
```

## Authentication

Authentication is handled through JWT tokens stored in localStorage. The `httpClient` automatically includes the token in the `Authorization` header for all requests.

To check authentication status:

```jsx
import authService from "@/services/auth.service";

if (authService.isAuthenticated()) {
  // User is logged in
}
```

## Notes

- All API calls use the base URL from environment configuration
- Requests timeout after 30 seconds by default
- Authentication token is automatically included in all requests
- Errors are caught and logged to console
