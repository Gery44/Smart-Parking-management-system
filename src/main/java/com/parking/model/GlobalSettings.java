// package com.parking.model;

// import org.springframework.data.annotation.Id;
// import org.springframework.data.mongodb.core.mapping.Document;

// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// @Document(collection = "global_settings")
// public class GlobalSettings {
//     @Id
//     private String id;
//     private double defaultPenaltyAmount = 50.0; // Default penalty amount
//     private double defaultHourlyRate = 10.0;    // Default hourly rate for new slots
//     private String updatedAt;
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
@Table(name = "global_settings")
public class GlobalSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private double defaultPenaltyAmount = 50.0;

    @Column(nullable = false)
    private double defaultHourlyRate = 10.0;

    private LocalDateTime updatedAt;
}
