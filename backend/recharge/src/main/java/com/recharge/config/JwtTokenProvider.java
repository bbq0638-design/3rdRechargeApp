package com.recharge.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String secretKey;

    // 토큰 유효시간: 24시간 (원하면 변경 가능)
    private long tokenValidTime = 1000L * 60 * 60 * 24;

    /**
     * JWT 토큰 생성
     */
    public String createToken(String userId, String role) {
        Claims claims = Jwts.claims().setSubject(userId); // userId 저장
        claims.put("role", role); // 유저 권한 저장

        Date now = new Date();
        Date expiration = new Date(now.getTime() + tokenValidTime);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)         // 발급 시간
                .setExpiration(expiration) // 만료 시간
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    /**
     * 토큰에서 userId 가져오기
     */
    public String getUserId(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * 토큰 유효성 검사
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
