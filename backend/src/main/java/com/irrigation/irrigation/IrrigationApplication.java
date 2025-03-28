package com.irrigation.irrigation;


// import java.io.PrintWriter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.RequestParam;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class, ManagementWebSecurityAutoConfiguration.class })
// @SpringBootApplication
@RestController
public class IrrigationApplication  {
	public static void main(String[] args) {
		SpringApplication.run(IrrigationApplication.class, args);
		 
	}
}
