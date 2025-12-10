package com.project.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.project.app.config.filter.JwtFilter;

/*
 * Configuração de segurança [UH2]
 */

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // public urls
    /* private String publicUrl = "/auth/**"; */
    private String publicUrl = "/**";

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // dont use CSRF protection because the front-end stores JwtToken in
        // localStorage
        // but should it use XSS protection
        http
                // TODO: remove in production
                .headers(headers -> headers.frameOptions(frame-> frame.disable()))
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(publicUrl)
                        .permitAll()
                        .anyRequest()
                        .authenticated());
        return http.build();
    }

    /*
     * Codifica as senhas (BCrypt) [UH2]
     * use: (inject)
     * codificar: passwordEncoder.encode(String password) -> String;
     * comparar: passwordEncoder.matches(String rawPassword, String
     * encondendPassword) -> boolean;
     */
    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
