package com.irrigation.irrigation;


// import java.io.PrintWriter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.bind.annotation.RequestParam;


@SpringBootApplication
@RestController
public class IrrigationApplication  {
	String html ="<h1>Hello World</h1>";
	@GetMapping("/")
		public String check()
		{
			return html;
		}
		@GetMapping("/addition")
		public int addition()
		{
			return 3+1;
		}
	 
	

	public static void main(String[] args) {
		SpringApplication.run(IrrigationApplication.class, args);
		 
	}

}
