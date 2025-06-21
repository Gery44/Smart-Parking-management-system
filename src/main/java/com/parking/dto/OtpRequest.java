package com.parking.dto;

public class OtpRequest {
    private String userId;
    private String otp;

    // getters and setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }
}