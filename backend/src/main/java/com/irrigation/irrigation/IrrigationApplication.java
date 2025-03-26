package com.irrigation.irrigation;


// import java.io.PrintWriter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.RequestParam;


@SpringBootApplication
@RestController
public class IrrigationApplication  {
	public static void main(String[] args) {
		SpringApplication.run(IrrigationApplication.class, args);
		 
	}
}
