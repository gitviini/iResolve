package com.project.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * Configurar backend para receber requests do frontend [UH2]
*/

/* @Configuration */
public class WebConfig implements WebMvcConfigurer {
    /* // url do frontend
    private String allowedUrl = "http://localhost:4200";
    // método permitidos na comunicação
    private @NonNull String[] allowedMethos = { "GET", "POST", "PUT", "DELETE" };
    // maxAge de uma hora
    private int maxAge = 3600;

    // permite request (frontend -> backend)
    @Override
    public void addCorsMappings(@NonNull CorsRegistry corsRegistry) {
        corsRegistry.addMapping("/**")
                .allowedOriginPatterns(allowedUrl)
                .allowedMethods(allowedMethos)
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(maxAge);
    } */
}
