package com.rwe.tongji_follow_up.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class JwtToken {

    private static String jwtKey;
    private static Integer expiredTimeIn;

    @Value("${jwt.secret}")
    public void setJwtKey(String jwtKey) {
        JwtToken.jwtKey = jwtKey;
    }

    @Value("${jwt.expired}")
    public void setExpiredTimeIn(Integer expiredTimeIn) {
        JwtToken.expiredTimeIn = expiredTimeIn;
    }

    //从token中获取数据，如果返回null说明token不合法
    public static Optional<Map<String, Claim>> getClaims(String token) {
        Algorithm algorithm = Algorithm.HMAC512(JwtToken.jwtKey);
        JWTVerifier jwtVerifier = JWT.require(algorithm).build();

        //System.out.println("jwtVerifier "+jwtVerifier);

        DecodedJWT decodedJWT;
        try {
            //System.out.println("+++++++++++++++");
            decodedJWT = jwtVerifier.verify(token);
            //System.out.println(decodedJWT);

        } catch (JWTVerificationException e) {
            //这里进行令牌错误分类：令牌不合法，令牌过期是没意义的。
            //前端只需要知道这个令牌非法即可
            //也没必要记录日志，一般用户输入的错误都没必要记录日志
            //System.out.println("捕获异常");
            return Optional.empty();
        }
        return Optional.of(decodedJWT.getClaims());
    }

    public static Boolean verifyToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC512(JwtToken.jwtKey);
            JWTVerifier jwtVerifier = JWT.require(algorithm).build();
            jwtVerifier.verify(token);
        } catch (JWTVerificationException e) {
            return false;
        }
        return true;

    }


    private static String getToken(Long uid,String[] scope) {
        //auth0
        Algorithm algorithm = Algorithm.HMAC512(JwtToken.jwtKey);
        Map<String, Date> map = JwtToken.calculateExpiredIssues();
        String token = JWT.create()
                .withClaim("uid",uid) //写入的数据
                .withArrayClaim("scope",scope)
                .withExpiresAt(map.get("expiredTime"))
                .withIssuedAt(map.get("now")) //"签发时间其实要不要无所谓"
                .sign(algorithm);
        System.out.println("token"+token);
        return token;
    }

    private static Map<String, Date> calculateExpiredIssues() {
        Map<String,Date> map = new HashMap<>();
        Calendar calendar = Calendar.getInstance();
        Date now = calendar.getTime();
        calendar.add(Calendar.SECOND, JwtToken.expiredTimeIn);
        map.put("now",now);
        map.put("expiredTime",calendar.getTime());
        return map;
    }

}
