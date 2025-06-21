// package com.parking.model;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Document(collection = "parking_slots")
// public class ParkingSlot {
//     @Id
//     private String id;
//     private String slotNumber;
//     private SlotStatus status = SlotStatus.AVAILABLE;
//     private String bookedBy;
//     private String startTime;
//     private String endTime;
//     private String createdAt;
//     private String updatedAt;
//     private double hourlyRate = 0.0; // Default hourly rate
    
//     public enum SlotStatus {
//         AVAILABLE,
//         OCCUPIED
//     }
// }

package com.parking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "parking_slots")
public class ParkingSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID) // Or GenerationType.IDENTITY for numeric ID
    private String id;

    @Column(nullable = false, unique = true)
    private String slotNumber;

    @Enumerated(EnumType.STRING)
    private SlotStatus status = SlotStatus.AVAILABLE;

    private String bookedBy;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private double hourlyRate = 0.0;

    public enum SlotStatus {
        AVAILABLE,
        OCCUPIED
    }
}
