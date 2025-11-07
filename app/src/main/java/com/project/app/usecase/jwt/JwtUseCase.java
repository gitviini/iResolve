package com.project.app.usecase.jwt;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;

/*
 * REGRAS DE NEGÓCIO DE JWT
 */

@Service
public class JwtUseCase {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    // get subject token (cpf)
    public String extractCpf(String token) {
        return this.extractClaim(token, Claims::getSubject);
    }

    // get expiration date
    private Date extractExpiration(String token) {
        return this.extractClaim(token, Claims::getExpiration);
    }

    // extrai token expecifico a partir de função de filtro
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    // extrai todos os claims sem aplicar função de filtro
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(this.getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // gera token sem extra claims
    public String generateToken(String userCpf) {
        return this.generateToken(new HashMap<>(), userCpf);
    }

    // gera token jwt
    public String generateToken(Map<String, Object> extraClaims, String userCpf) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userCpf)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + this.jwtExpiration))
                .signWith(this.getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // verifica se o token a válido
    public boolean isTokenValid(String token, String userCpf) {
        final String username = this.extractCpf(token);
        return (username.equals(userCpf)) && !isTokenExpired(token);
    }

    // verifica se o token expirou
    public boolean isTokenExpired(String token){
        // verifica se o tempo do token é anterior ao atual
        return this.extractExpiration(token).before(new Date());
    }

    // decodifica secret key
    public Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
