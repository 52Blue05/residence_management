# API Integration - Summary

## ✅ Files Created

### Core Services Layer

1. **src/services/api.config.js** - API configuration and endpoint definitions
2. **src/services/http.client.js** - HTTP client with request/response handling
3. **src/services/auth.service.js** - Authentication and token management
4. **src/services/taikhoan.service.js** - Account management
5. **src/services/nhankhau.service.js** - Resident management
6. **src/services/tamtru.service.js** - Temporary resident management
7. **src/services/loaiphi.service.js** - Fee type management
8. **src/services/dotthu.service.js** - Collection period management
9. **src/services/thuphi.service.js** - Fee collection management
10. **src/services/phivesingh.service.js** - Sanitation fee management
11. **src/services/donggop.service.js** - Donation campaign management
12. **src/services/thongke.service.js** - Statistics and reports
13. **src/services/error.handler.js** - Error handling utilities
14. **src/services/index.js** - Service exports (updated)

### Hooks & Utilities

15. **src/hooks/useApi.js** - Custom React hooks for API calls
    - `useApi()` - General API hook with execute function
    - `useFetch()` - Auto-fetch on mount hook

### Example Components

16. **src/components/examples/ResidentListExample.jsx** - Resident list example
17. **src/components/examples/FeeManagementExample.jsx** - Fee management example

### Updated Components

18. **src/pages/AccountInfo.jsx** - Updated to use API service

### Configuration & Documentation

19. **.env.example** - Environment configuration template
20. **API_INTEGRATION_GUIDE.md** - Complete integration documentation

---

## 📋 Key Features

### HTTP Client (http.client.js)

- ✅ Automatic authentication token handling
- ✅ Request timeout (30 seconds)
- ✅ Error handling and transformation
- ✅ Support for GET, POST, PUT, PATCH, DELETE
- ✅ Query parameters support
- ✅ JSON request/response handling

### Service Pattern

- ✅ Centralized API endpoints
- ✅ Error handling in each service
- ✅ Consistent method naming
- ✅ Easy to extend for new modules

### Custom Hooks

- ✅ `useApi()` - Manual execution with loading/error states
- ✅ `useFetch()` - Auto-fetch on component mount
- ✅ Reset functionality
- ✅ Refetch capability

### Error Handling

- ✅ HTTP status code mapping
- ✅ Timeout handling
- ✅ Network error handling
- ✅ Retry mechanism with exponential backoff
- ✅ Custom ApiError class

---

## 🚀 Quick Start

### 1. Setup Environment

Create `.env` file:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

### 2. Use Services

```jsx
import { nhanKhauService } from "@/services";

// Fetch data
const residents = await nhanKhauService.getAll();

// Create
const newResident = await nhanKhauService.addNew(data);

// Update
await nhanKhauService.update(data);

// Delete
await nhanKhauService.delete(id);
```

### 3. Use Hooks

```jsx
import { useFetch } from "@/hooks/useApi";
import { nhanKhauService } from "@/services";

function MyComponent() {
  const { data, loading, error, refetch } = useFetch(nhanKhauService.getAll);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && data.map((item) => <div key={item.id}>{item.name}</div>)}
    </>
  );
}
```

---

## 📦 Service Methods

### Auth Service

- `login(username, password)` - User login
- `logout()` - User logout
- `refreshToken()` - Refresh JWT token
- `getCurrentUser()` - Get current user info
- `changePassword(oldPassword, newPassword)` - Change password
- `isAuthenticated()` - Check auth status
- `getUserRole()` - Get user role

### Account Service (Tài Khoản)

- `getAll()` - Get all accounts
- `getById(id)` - Get account by ID
- `create(data)` - Create account
- `update(id, data)` - Update account
- `delete(id)` - Delete account
- `changePassword(id, oldPassword, newPassword)` - Change password

### Resident Service (Nhân Khẩu)

- `getAll()` - Get all residents
- `getById(id)` - Get resident by ID
- `getByHousehold(hoKhauId)` - Get by household
- `addNew(data)` - Add new resident
- `update(data)` - Update resident
- `changeHead(data)` - Change household head
- `delete(id)` - Delete resident

### Fee Service (Thu Phí)

- `getAll()` - Get all fees
- `getById(id)` - Get fee by ID
- `getByHousehold(hoKhauId)` - Get by household
- `create(data)` - Create fee
- `update(id, data)` - Update fee
- `delete(id)` - Delete fee
- `getReport(filters)` - Get fee report

---

## 🔄 API Endpoints

All endpoints are prefixed with `http://localhost:8080/api`

**Account** - `/taikhoan`
**Resident** - `/nhankhau`
**Temporary Resident** - `/tamtru`
**Fee Type** - `/loaiphi`
**Collection Period** - `/dotthu`
**Fee Collection** - `/thuphi`
**Sanitation Fee** - `/phivesingh`
**Donation** - `/donggop`
**Statistics** - `/thongke`

---

## ⚙️ Configuration

### API Config

```javascript
import { API_CONFIG, API_ENDPOINTS } from "@/services";

// Access base URL
console.log(API_CONFIG.BASE_URL);

// Access endpoint
const url = API_ENDPOINTS.NHANKHAU.GET_ALL;
```

---

## 🔐 Authentication

Token is automatically managed:

1. Login stores token in localStorage
2. Token automatically included in all requests
3. Logout clears token
4. Supports token refresh

```jsx
import authService from "@/services/auth.service";

// Login
await authService.login("username", "password");

// Check auth
if (authService.isAuthenticated()) {
  // User is logged in
}

// Logout
await authService.logout();
```

---

## 📝 Notes

- All services use singleton pattern (single instance per service)
- Services are fully self-contained and can be used independently
- Error messages are in Vietnamese for user display
- All requests include Authorization header when token exists
- Timeout is 30 seconds for all requests
- CORS must be configured on backend

---

## 🔗 Backend CORS Setup Required

Add this to your Spring Boot backend:

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

---

## 📚 Examples

See full examples in:

- [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)
- [src/components/examples/ResidentListExample.jsx](./src/components/examples/ResidentListExample.jsx)
- [src/components/examples/FeeManagementExample.jsx](./src/components/examples/FeeManagementExample.jsx)
- [src/pages/AccountInfo.jsx](./src/pages/AccountInfo.jsx)
