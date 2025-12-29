package com.example.householdmanagement.dto;

/**
 * Login Response DTO
 */
public class LoginResponse {
    private String token;
    private UserInfo user;

    public LoginResponse() {
    }

    public LoginResponse(String token, UserInfo user) {
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserInfo getUser() {
        return user;
    }

    public void setUser(UserInfo user) {
        this.user = user;
    }

    /**
     * User Information DTO
     */
    public static class UserInfo {
        private Long id;
        private String email;
        private String tenDangNhap;
        private String vaiTro;
        private String maCanBo;
        private String hoTen;

        public UserInfo() {
        }

        public UserInfo(Long id, String email, String tenDangNhap, String vaiTro, String maCanBo, String hoTen) {
            this.id = id;
            this.email = email;
            this.tenDangNhap = tenDangNhap;
            this.vaiTro = vaiTro;
            this.maCanBo = maCanBo;
            this.hoTen = hoTen;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getTenDangNhap() {
            return tenDangNhap;
        }

        public void setTenDangNhap(String tenDangNhap) {
            this.tenDangNhap = tenDangNhap;
        }

        public String getVaiTro() {
            return vaiTro;
        }

        public void setVaiTro(String vaiTro) {
            this.vaiTro = vaiTro;
        }

        public String getMaCanBo() {
            return maCanBo;
        }

        public void setMaCanBo(String maCanBo) {
            this.maCanBo = maCanBo;
        }

        public String getHoTen() {
            return hoTen;
        }

        public void setHoTen(String hoTen) {
            this.hoTen = hoTen;
        }
    }
}
