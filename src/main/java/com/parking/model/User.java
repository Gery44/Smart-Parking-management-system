// package com.parking.model;

// import java.util.HashSet;
// import java.util.Set;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Document(collection = "users")
// public class User {
//     @Id
//     private String id;
//     private String username;
//     private String password;
//     private String email;
//     private Set<String> roles = new HashSet<>();
//     private boolean active = true;
//     private String createdAt;
//     private String updatedAt;
// }

// package com.parking.model;

// import jakarta.persistence.*;
// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// import java.util.HashSet;
// import java.util.Set;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Entity
// @Table(name = "users")
// public class User {

//     @Id
//     @GeneratedValue(strategy = GenerationType.UUID) // Or AUTO/IDENTITY depending on DB setup
//     private String id;

//     @Column(nullable = false, unique = true)
//     private String username;

//     private String password;

//     @Column(nullable = false, unique = true)
//     private String email;

//     @ElementCollection(fetch = FetchType.EAGER)
//     @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
//     @Column(name = "role")
//     private Set<String> roles = new HashSet<>();

//     private boolean active = true;

//     private String createdAt;

//     private String updatedAt;
// }


package com.parking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false, unique = true)
    private String username;

    private String password;
        // OTP fields
    private String otp;
    private LocalDateTime otpExpiry;

    @Column(nullable = false, unique = true)
    private String email;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role")
    private Set<String> roles = new HashSet<>();

    private boolean active = true;

    private String createdAt;

    private String updatedAt;

    // --- Password reset support ---
    private String resetToken;

    private LocalDateTime tokenExpiry;
        // OTP Getters/Setters
    public String getOtp() { return otp; }
    public void setOtp(String otp) { this.otp = otp; }

    public LocalDateTime getOtpExpiry() { return otpExpiry; }
    public void setOtpExpiry(LocalDateTime otpExpiry) { this.otpExpiry = otpExpiry; }
    
}
