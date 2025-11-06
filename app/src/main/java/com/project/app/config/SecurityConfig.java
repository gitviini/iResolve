package com.project.app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import lombok.NonNull;

/*
 * Configuração de segurança [UH2]
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig{
    // url do frontend
    private String allowedUrl = "http://localhost:4200";
    // método permitidos na comunicação
    private @NonNull String[] allowedMethos = { "GET", "POST", "PUT", "DELETE" };
    // maxAge de uma hora
    private int maxAge = 3600;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        // dont use CSRF protection because the front-end stores JwtToken in localStorage
        // but should it use XSS protection
        http
            .csrf(
                csrf -> 
                csrf
                .disable()
            )
            .authorizeHttpRequests(
                authorize -> 
                authorize
                // TODO : Retirar em produção
                .anyRequest().permitAll()
                )
            .headers(
                headers ->
                headers
                // TODO : Retirar em produção
                .frameOptions(frameOptions -> frameOptions.sameOrigin())
            )
            ;
        return http.build();
    }

    /*
     * Codifica as senhas (BCrypt) [UH2]
     * use: (inject)
     * codificar: passwordEncoder.encode(String password) -> String;
     * comparar: passwordEncoder.matches(String rawPassword, String encondendPassword) -> boolean;
     */
    @Bean
    BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
}
