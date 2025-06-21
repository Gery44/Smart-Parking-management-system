// package com.parking;

// import org.springframework.boot.SpringApplication;
// import org.springframework.boot.autoconfigure.SpringBootApplication;

// @SpringBootApplication
// public class ParkingManagementSystemApplication {

//     public static void main(String[] args) {
//         SpringApplication.run(ParkingManagementSystemApplication.class, args);
//     }
// }

package com.parking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = {"com.parking.model"})
@EnableJpaRepositories(basePackages = {"com.parking.repository"})
public class ParkingManagementSystemApplication {
    public static void main(String[] args) {
        SpringApplication.run(ParkingManagementSystemApplication.class, args);
    }
}