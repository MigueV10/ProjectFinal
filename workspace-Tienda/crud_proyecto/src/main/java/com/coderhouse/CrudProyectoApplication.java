package com.coderhouse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication

public class CrudProyectoApplication {
	

	public static void main(String[] args) {
		SpringApplication.run(CrudProyectoApplication.class, args);
	}
	 @Bean
		RestTemplate restTemplate() {
			return new RestTemplate();
		}
	//  HABILITAR CORS PARA TODOS LOS ENDPOINTS
		@Bean
		public WebMvcConfigurer corsConfigurer() {
			return new WebMvcConfigurer() {
				@Override
				public void addCorsMappings(CorsRegistry registry) {
					registry.addMapping("/**") // permite todas las rutas
						.allowedOrigins("*")   // o usa "file://", aunque "*" es más general
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*");
				}
			};


		}
	}
