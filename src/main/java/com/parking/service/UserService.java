// package com.parking.service;

// import java.time.LocalDateTime;
// import java.time.format.DateTimeFormatter;
// import java.util.HashSet;
// import java.util.List;
// import java.util.Optional;
// import java.util.Set;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.parking.model.User;
// import com.parking.repository.UserRepository;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;
    
//     @Autowired
//     private PasswordEncoder passwordEncoder;
    
//     private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }
    
//     public Optional<User> getUserById(String id) {
//         return userRepository.findById(id);
//     }
    
//     public Optional<User> getUserByUsername(String username) {
//         return userRepository.findByUsername(username);
//     }
    
//     public User createUser(User user) {
//         // Set default role if not provided
//         if (user.getRoles() == null || user.getRoles().isEmpty()) {
//             Set<String> roles = new HashSet<>();
//             roles.add("ROLE_USER");
//             user.setRoles(roles);
//         }
        
//         // Encode password
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
        
//         // Set timestamps
//         LocalDateTime now = LocalDateTime.now();
//         user.setCreatedAt(now.format(DATE_FORMATTER));
//         user.setUpdatedAt(now.format(DATE_FORMATTER));
        
//         return userRepository.save(user);
//     }
    
//     public User updateUser(String id, User userDetails) {
//         return userRepository.findById(id)
//                 .map(existingUser -> {
//                     // Update fields
//                     if (userDetails.getUsername() != null) {
//                         existingUser.setUsername(userDetails.getUsername());
//                     }
                    
//                     if (userDetails.getEmail() != null) {
//                         existingUser.setEmail(userDetails.getEmail());
//                     }
                    
//                     if (userDetails.getPassword() != null) {
//                         existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
//                     }
                    
//                     if (userDetails.getRoles() != null && !userDetails.getRoles().isEmpty()) {
//                         existingUser.setRoles(userDetails.getRoles());
//                     }
                    
//                     // Update timestamp
//                     existingUser.setUpdatedAt(LocalDateTime.now().format(DATE_FORMATTER));
                    
//                     return userRepository.save(existingUser);
//                 })
//                 .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//     }
    
//     public void deleteUser(String id) {
//         userRepository.deleteById(id);
//     }
    
//     public boolean existsByUsername(String username) {
//         return userRepository.existsByUsername(username);
//     }
    
//     public boolean existsByEmail(String email) {
//         return userRepository.existsByEmail(email);
//     }
// }


// package com.parking.service;

// import java.security.SecureRandom;
// import java.time.LocalDateTime;
// import java.time.format.DateTimeFormatter;
// import java.util.Base64;
// import java.util.HashSet;
// import java.util.List;
// import java.util.Optional;
// import java.util.Set;
// import java.util.Random;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// import com.parking.model.User;
// import com.parking.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Value;
// import org.springframework.beans.factory.annotation.Autowired;

// @Service
// public class UserService {

//     @Autowired
//     private UserRepository userRepository;
    
//     @Autowired
//     private PasswordEncoder passwordEncoder;
    
//     private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

//     @Autowired
//     private EmailService emailService;

//     @Value("${app.frontend.url:http://localhost:3000}") // Set your frontend URL here
//     private String frontendUrl;

//     public List<User> getAllUsers() {
//         return userRepository.findAll();
//     }
    
//     public Optional<User> getUserById(String id) {
//         return userRepository.findById(id);
//     }
    
//     public Optional<User> getUserByUsername(String username) {
//         return userRepository.findByUsername(username);
//     }
    
//     public User createUser(User user) {
//         // Set default role if not provided
//         if (user.getRoles() == null || user.getRoles().isEmpty()) {
//             Set<String> roles = new HashSet<>();
//             roles.add("ROLE_USER");
//             user.setRoles(roles);
//         }
        
//         // Encode password
//         user.setPassword(passwordEncoder.encode(user.getPassword()));
        
//         // Set timestamps
//         LocalDateTime now = LocalDateTime.now();
//         user.setCreatedAt(now.format(DATE_FORMATTER));
//         user.setUpdatedAt(now.format(DATE_FORMATTER));
        
//         return userRepository.save(user);
//     }
    
//     public User updateUser(String id, User userDetails) {
//         return userRepository.findById(id)
//                 .map(existingUser -> {
//                     // Update fields
//                     if (userDetails.getUsername() != null) {
//                         existingUser.setUsername(userDetails.getUsername());
//                     }
                    
//                     if (userDetails.getEmail() != null) {
//                         existingUser.setEmail(userDetails.getEmail());
//                     }
                    
//                     if (userDetails.getPassword() != null) {
//                         existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
//                     }
                    
//                     if (userDetails.getRoles() != null && !userDetails.getRoles().isEmpty()) {
//                         existingUser.setRoles(userDetails.getRoles());
//                     }
                    
//                     // Update timestamp
//                     existingUser.setUpdatedAt(LocalDateTime.now().format(DATE_FORMATTER));
                    
//                     return userRepository.save(existingUser);
//                 })
//                 .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
//     }
    
//     public void deleteUser(String id) {
//         userRepository.deleteById(id);
//     }
    
//     public boolean existsByUsername(String username) {
//         return userRepository.existsByUsername(username);
//     }
    
//     public boolean existsByEmail(String email) {
//         return userRepository.existsByEmail(email);
//     }

//     // --- Password reset token logic ---

//      public void createPasswordResetToken(String email) {
//         Optional<User> userOpt = userRepository.findByEmail(email);
//         if (userOpt.isPresent()) {
//             User user = userOpt.get();

//             // Generate secure random token (same as before)
//             SecureRandom random = new SecureRandom();
//             byte[] tokenBytes = new byte[32];
//             random.nextBytes(tokenBytes);
//             String token = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);

//             user.setResetToken(token);
//             user.setTokenExpiry(LocalDateTime.now().plusHours(1));
//             userRepository.save(user);

//             // Compose email
//             String resetLink = frontendUrl + "/reset-password?token=" + token;
//             String subject = "Password Reset Request";
//             String text = "To reset your password, click the link below:\n" + resetLink +
//                           "\n\nIf you did not request this, please ignore this email.";

//             emailService.sendSimpleMessage(user.getEmail(), subject, text);
//         }
//     }
//     // public void createPasswordResetToken(String email) {
//     //     Optional<User> userOpt = userRepository.findByEmail(email);
//     //     if (userOpt.isPresent()) {
//     //         User user = userOpt.get();

//     //         // Generate secure random token
//     //         SecureRandom random = new SecureRandom();
//     //         byte[] tokenBytes = new byte[32];
//     //         random.nextBytes(tokenBytes);
//     //         String token = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);

//     //         user.setResetToken(token);
//     //         user.setTokenExpiry(LocalDateTime.now().plusHours(1)); // 1 hour expiry

//     //         userRepository.save(user);

//     //         // For now, just print the token (replace with email logic later)
//     //         System.out.println("Password reset token for " + email + ": " + token);
//     //     }
//     //     // If not present, do nothing (for security, don't reveal if email exists)
//     // }

//     public boolean resetPassword(String token, String newPassword) {
//     Optional<User> userOpt = userRepository.findByResetToken(token);
//     if (userOpt.isEmpty()) {
//         return false;
//     }
//     User user = userOpt.get();

//     if (user.getTokenExpiry() == null || user.getTokenExpiry().isBefore(LocalDateTime.now())) {
//         return false; // Token expired
//     }

//     // Hash the new password (assuming you use BCryptPasswordEncoder)
//     user.setPassword(passwordEncoder.encode(newPassword));
//     user.setResetToken(null);
//     user.setTokenExpiry(null);
//     userRepository.save(user);
//     return true;
// }
   


// }

package com.parking.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

import com.parking.model.User;
import com.parking.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private EmailService emailService;

    @Value("${app.frontend.url:http://localhost:3000}") // Set your frontend URL here
    private String frontendUrl;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public User createUser(User user) {
        // Set default role if not provided
        if (user.getRoles() == null || user.getRoles().isEmpty()) {
            Set<String> roles = new HashSet<>();
            roles.add("ROLE_USER");
            user.setRoles(roles);
        }
        
        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        
        // Set timestamps
        LocalDateTime now = LocalDateTime.now();
        user.setCreatedAt(now.format(DATE_FORMATTER));
        user.setUpdatedAt(now.format(DATE_FORMATTER));
        
        return userRepository.save(user);
    }
    
    public User updateUser(String id, User userDetails) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // Update fields
                    if (userDetails.getUsername() != null) {
                        existingUser.setUsername(userDetails.getUsername());
                    }
                    
                    if (userDetails.getEmail() != null) {
                        existingUser.setEmail(userDetails.getEmail());
                    }
                    
                    if (userDetails.getPassword() != null) {
                        existingUser.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                    }
                    
                    if (userDetails.getRoles() != null && !userDetails.getRoles().isEmpty()) {
                        existingUser.setRoles(userDetails.getRoles());
                    }
                    
                    // Update timestamp
                    existingUser.setUpdatedAt(LocalDateTime.now().format(DATE_FORMATTER));
                    
                    return userRepository.save(existingUser);
                })
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }
    
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    // --- Password reset token logic ---

    public void createPasswordResetToken(String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();

            // Generate secure random token (same as before)
            SecureRandom random = new SecureRandom();
            byte[] tokenBytes = new byte[32];
            random.nextBytes(tokenBytes);
            String token = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);

            user.setResetToken(token);
            user.setTokenExpiry(LocalDateTime.now().plusHours(1));
            userRepository.save(user);

            // Compose email
            String resetLink = frontendUrl + "/reset-password?token=" + token;
            String subject = "Password Reset Request";
            String text = "To reset your password, click the link below:\n" + resetLink +
                          "\n\nIf you did not request this, please ignore this email.";

            emailService.sendSimpleMessage(user.getEmail(), subject, text);
        }
    }

    public boolean resetPassword(String token, String newPassword) {
        Optional<User> userOpt = userRepository.findByResetToken(token);
        if (userOpt.isEmpty()) {
            return false;
        }
        User user = userOpt.get();

        if (user.getTokenExpiry() == null || user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            return false; // Token expired
        }

        // Hash the new password (assuming you use BCryptPasswordEncoder)
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null);
        user.setTokenExpiry(null);
        userRepository.save(user);
        return true;
    }

    // --- Two-Factor Authentication (2FA) Email OTP logic ---

    /**
     * Generates a 6-digit OTP, stores it and its expiry in the user, and sends it via email.
     * Returns the OTP expiry time.
     */
    public LocalDateTime generateAndSendOtp(User user) {
        String otp = String.format("%06d", new Random().nextInt(1000000));
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(5);
        user.setOtp(otp);
        user.setOtpExpiry(expiry);
        userRepository.save(user);

        // Compose and send OTP email
        String subject = "Your Login OTP Code";
        String text = "Your one-time password (OTP) is: " + otp + "\n\n" +
                      "This code will expire in 5 minutes. " +
                      "If you did not attempt to log in, please ignore this email.";
        emailService.sendSimpleMessage(user.getEmail(), subject, text);

        return expiry;
    }

    /**
     * Verifies the OTP for a user. Returns true if valid, false if invalid/expired.
     * If valid, clears the OTP from the user.
     */
    public boolean verifyOtp(User user, String otp) {
        if (user.getOtp() == null || user.getOtpExpiry() == null) return false;
        if (user.getOtpExpiry().isBefore(LocalDateTime.now())) return false;
        if (!user.getOtp().equals(otp)) return false;
        // Clear OTP after use
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
        return true;
    }

    /**
     * Optional: Clears OTP (e.g. after failed attempts, logout, or for security).
     */
    public void clearOtp(User user) {
        user.setOtp(null);
        user.setOtpExpiry(null);
        userRepository.save(user);
    }
}