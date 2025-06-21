// package com.parking.controller;

// import java.util.HashSet;
// import java.util.List;
// import java.util.Optional;
// import java.util.Set;
// import java.util.stream.Collectors;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.parking.dto.AuthRequest;
// import com.parking.dto.AuthResponse;
// import com.parking.dto.RegisterRequest;
// import com.parking.model.User;
// import com.parking.repository.UserRepository;
// import com.parking.security.JwtUtils;
// import com.parking.security.UserDetailsImpl;

// import jakarta.validation.Valid;

// @CrossOrigin(origins = "*", maxAge = 3600)
// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {
//     @Autowired
//     private AuthenticationManager authenticationManager;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder encoder;

//     @Autowired
//     private JwtUtils jwtUtils;

//     @PostMapping("/signin")
//     public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {
//         String usernameOrEmail = loginRequest.getUsername();
//         String username;
        
//         try {
//             // Check if input is email or username
//             if (usernameOrEmail.contains("@")) {
//                 // Input is email, find the corresponding username
//                 if (!userRepository.existsByEmail(usernameOrEmail)) {
//                     return ResponseEntity.badRequest().body("Error: User not found with this email!");
//                 }
//                 Optional<User> user = userRepository.findByEmail(usernameOrEmail);
//                 if (!user.isPresent()) {
//                     return ResponseEntity.badRequest().body("Error: User not found!");
//                 }
//                 username = user.get().getUsername();
//             } else {
//                 // Input is username
//                 username = usernameOrEmail;
//                 if (!userRepository.existsByUsername(username)) {
//                     return ResponseEntity.badRequest().body("Error: User not found with this username!");
//                 }
//             }
            
//             Authentication authentication = authenticationManager.authenticate(
//                     new UsernamePasswordAuthenticationToken(username, loginRequest.getPassword()));

//             SecurityContextHolder.getContext().setAuthentication(authentication);
//             String jwt = jwtUtils.generateJwtToken(authentication);

//             UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//             List<String> roles = userDetails.getAuthorities().stream()
//                     .map(item -> item.getAuthority())
//                     .collect(Collectors.toList());

//             return ResponseEntity.ok(new AuthResponse(
//                     jwt,
//                     "Bearer",
//                     userDetails.getId(),
//                     userDetails.getUsername(),
//                     userDetails.getEmail(),
//                     roles));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body("Error: Invalid username or password! " + e.getMessage());
//         }
//     }

//     @PostMapping("/signup")
//     public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
//         if (userRepository.existsByUsername(signUpRequest.getUsername())) {
//             return ResponseEntity.badRequest().body("Error: Username is already taken!");
//         }

//         if (userRepository.existsByEmail(signUpRequest.getEmail())) {
//             return ResponseEntity.badRequest().body("Error: Email is already in use!");
//         }

//         // Create new user's account
//         User user = new User();
//         user.setUsername(signUpRequest.getUsername());
//         user.setEmail(signUpRequest.getEmail());
//         user.setPassword(encoder.encode(signUpRequest.getPassword()));
        
//         Set<String> strRoles = signUpRequest.getRoles();
//         Set<String> roles = new HashSet<>();

//         if (strRoles == null || strRoles.isEmpty()) {
//             roles.add("ROLE_USER");
//         } else {
//             strRoles.forEach(role -> {
//                 switch (role) {
//                 case "admin":
//                     roles.add("ROLE_ADMIN");
//                     break;
//                 default:
//                     roles.add("ROLE_USER");
//                 }
//             });
//         }

//         user.setRoles(roles);
//         userRepository.save(user);

//         return ResponseEntity.ok("User registered successfully!");
//     }
// }


// package com.parking.controller;

// import java.util.HashSet;
// import java.util.List;
// import java.util.Optional;
// import java.util.Set;
// import java.util.stream.Collectors;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.parking.dto.AuthRequest;
// import com.parking.dto.AuthResponse;
// import com.parking.dto.RegisterRequest;
// import com.parking.dto.PasswordResetRequest;
// import com.parking.model.User;
// import com.parking.repository.UserRepository;
// import com.parking.security.JwtUtils;
// import com.parking.security.UserDetailsImpl;
// import com.parking.service.UserService;
// import com.parking.dto.ResetPasswordRequest;
// import jakarta.validation.Valid;

// @CrossOrigin(origins = "*", maxAge = 3600)
// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {
//     @Autowired
//     private AuthenticationManager authenticationManager;

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder encoder;

//     @Autowired
//     private JwtUtils jwtUtils;

//     @Autowired
//     private UserService userService;

//     @PostMapping("/signin")
//     public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {
//         String usernameOrEmail = loginRequest.getUsername();
//         String username;
        
//         try {
//             // Check if input is email or username
//             if (usernameOrEmail.contains("@")) {
//                 // Input is email, find the corresponding username
//                 if (!userRepository.existsByEmail(usernameOrEmail)) {
//                     return ResponseEntity.badRequest().body("Error: User not found with this email!");
//                 }
//                 Optional<User> user = userRepository.findByEmail(usernameOrEmail);
//                 if (!user.isPresent()) {
//                     return ResponseEntity.badRequest().body("Error: User not found!");
//                 }
//                 username = user.get().getUsername();
//             } else {
//                 // Input is username
//                 username = usernameOrEmail;
//                 if (!userRepository.existsByUsername(username)) {
//                     return ResponseEntity.badRequest().body("Error: User not found with this username!");
//                 }
//             }
            
//             Authentication authentication = authenticationManager.authenticate(
//                     new UsernamePasswordAuthenticationToken(username, loginRequest.getPassword()));

//             SecurityContextHolder.getContext().setAuthentication(authentication);
//             String jwt = jwtUtils.generateJwtToken(authentication);

//             UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//             List<String> roles = userDetails.getAuthorities().stream()
//                     .map(item -> item.getAuthority())
//                     .collect(Collectors.toList());

//             return ResponseEntity.ok(new AuthResponse(
//                     jwt,
//                     "Bearer",
//                     userDetails.getId(),
//                     userDetails.getUsername(),
//                     userDetails.getEmail(),
//                     roles));
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body("Error: Invalid username or password! " + e.getMessage());
//         }
//     }

//     @PostMapping("/signup")
//     public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
//         if (userRepository.existsByUsername(signUpRequest.getUsername())) {
//             return ResponseEntity.badRequest().body("Error: Username is already taken!");
//         }

//         if (userRepository.existsByEmail(signUpRequest.getEmail())) {
//             return ResponseEntity.badRequest().body("Error: Email is already in use!");
//         }

//         // Create new user's account
//         User user = new User();
//         user.setUsername(signUpRequest.getUsername());
//         user.setEmail(signUpRequest.getEmail());
//         user.setPassword(encoder.encode(signUpRequest.getPassword()));
        
//         Set<String> strRoles = signUpRequest.getRoles();
//         Set<String> roles = new HashSet<>();

//         if (strRoles == null || strRoles.isEmpty()) {
//             roles.add("ROLE_USER");
//         } else {
//             strRoles.forEach(role -> {
//                 switch (role) {
//                 case "admin":
//                     roles.add("ROLE_ADMIN");
//                     break;
//                 default:
//                     roles.add("ROLE_USER");
//                 }
//             });
//         }

//         user.setRoles(roles);
//         userRepository.save(user);

//         return ResponseEntity.ok("User registered successfully!");
//     }

//     // --- Password reset request endpoint ---
//     @PostMapping("/reset-password-request")
//     public ResponseEntity<?> requestPasswordReset(@RequestBody PasswordResetRequest request) {
//         userService.createPasswordResetToken(request.getEmail());
//         // Always return success (to avoid revealing if email exists)
//         return ResponseEntity.ok("If this email exists, a password reset link will be sent.");
//     }

//     @PostMapping("/reset-password")
//     public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
//     boolean result = userService.resetPassword(request.getToken(), request.getNewPassword());
//     if (result) {
//         return ResponseEntity.ok().body("Password has been reset successfully.");
//     } else {
//         return ResponseEntity.badRequest().body("Invalid or expired token.");
//     }
// }
// }


package com.parking.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.parking.dto.AuthRequest;
import com.parking.dto.AuthResponse;
import com.parking.dto.RegisterRequest;
import com.parking.dto.PasswordResetRequest;
import com.parking.dto.ResetPasswordRequest;
import com.parking.dto.OtpRequest;
import com.parking.model.User;
import com.parking.repository.UserRepository;
import com.parking.security.JwtUtils;
import com.parking.security.UserDetailsImpl;
import com.parking.service.UserService;
import jakarta.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserService userService;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {
        String usernameOrEmail = loginRequest.getUsername();
        String username;

        try {
            // Check if input is email or username
            if (usernameOrEmail.contains("@")) {
                // Input is email, find the corresponding username
                if (!userRepository.existsByEmail(usernameOrEmail)) {
                    return ResponseEntity.badRequest().body("Error: User not found with this email!");
                }
                Optional<User> user = userRepository.findByEmail(usernameOrEmail);
                if (!user.isPresent()) {
                    return ResponseEntity.badRequest().body("Error: User not found!");
                }
                username = user.get().getUsername();
            } else {
                // Input is username
                username = usernameOrEmail;
                if (!userRepository.existsByUsername(username)) {
                    return ResponseEntity.badRequest().body("Error: User not found with this username!");
                }
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // OTP 2FA step: send OTP, do not return JWT yet
            Optional<User> userOpt = userRepository.findByUsername(username);
            if (userOpt.isEmpty()) {
                return ResponseEntity.badRequest().body("Error: User not found!");
            }
            User user = userOpt.get();
            userService.generateAndSendOtp(user);

            return ResponseEntity.ok().body(
                // return userId for step 2, do NOT return JWT yet
                new java.util.HashMap<String, Object>() {{
                    put("twoFactorRequired", true);
                    put("userId", user.getId());
                    put("message", "OTP sent to your email.");
                }}
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: Invalid username or password! " + e.getMessage());
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody OtpRequest otpRequest) {
        // OtpRequest: { userId, otp }
        Optional<User> userOpt = userRepository.findById(otpRequest.getUserId());
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: User not found!");
        }
        User user = userOpt.get();

        if (!userService.verifyOtp(user, otpRequest.getOtp())) {
            return ResponseEntity.badRequest().body("Error: Invalid or expired OTP!");
        }

        // On OTP success, generate JWT and return full AuthResponse
        // UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        // String jwt = jwtUtils.generateJwtToken(userDetails);

        UserDetailsImpl userDetails = UserDetailsImpl.build(user);
        Authentication authentication =
        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        String jwt = jwtUtils.generateJwtToken(authentication);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new AuthResponse(
                jwt,
                "Bearer",
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles
        ));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already taken!");
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<String> roles = new HashSet<>();

        if (strRoles == null || strRoles.isEmpty()) {
            roles.add("ROLE_USER");
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                case "admin":
                    roles.add("ROLE_ADMIN");
                    break;
                default:
                    roles.add("ROLE_USER");
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    // --- Password reset request endpoint ---
    @PostMapping("/reset-password-request")
    public ResponseEntity<?> requestPasswordReset(@RequestBody PasswordResetRequest request) {
        userService.createPasswordResetToken(request.getEmail());
        // Always return success (to avoid revealing if email exists)
        return ResponseEntity.ok("If this email exists, a password reset link will be sent.");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        boolean result = userService.resetPassword(request.getToken(), request.getNewPassword());
        if (result) {
            return ResponseEntity.ok().body("Password has been reset successfully.");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }
    }
}