package com.rwe.tongji_follow_up.interceptors;

import com.auth0.jwt.interfaces.Claim;
import com.rwe.tongji_follow_up.exception.exec.ForbiddenException;
import com.rwe.tongji_follow_up.exception.exec.UnAuthenticatedException;
import com.rwe.tongji_follow_up.util.JwtToken;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@Component
public class PermissionInterceptor implements HandlerInterceptor {


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,Object handler) throws Exception{
        Optional<RBACScope> rbacScope=this.getRBACScope(handler);
        if (rbacScope.isEmpty()){
            return true;
        }

        // parse jwt token
        String bearerToken=request.getHeader("Authorization");

        if (!StringUtils.hasText(bearerToken)){
            throw new UnAuthenticatedException();
        }

        String[] jwtTokens = bearerToken.split(" ");

        if (jwtTokens.length != 2) {
            throw new UnAuthenticatedException();
        }
        String jwtToken = jwtTokens[1];
        Optional<Map<String, Claim>> optionalMap = JwtToken.getClaims(jwtToken);
        Map<String, Claim> map = optionalMap.orElseThrow(
                UnAuthenticatedException::new);

        List<String> scopes = map.get("scopes").asList(String.class);
        Integer userId = map.get("user_id").asInt();
        Integer projectId = map.get("project_id").asInt();


        // save payload info to request context
        request.setAttribute("jwtToken",jwtToken); // 请求外部接口，放在请求头
        request.setAttribute("userId",userId);
        request.setAttribute("scopes",scopes);
        request.setAttribute("projectId",projectId);

        String handlerRBACScope=rbacScope.get().scope();
        for(String auth:scopes){
            if (auth.equals(handlerRBACScope)){
                return true;
            }
        }
        throw new ForbiddenException();
    }

    private Optional<RBACScope> getRBACScope(Object handler){
        if (handler instanceof HandlerMethod){
            HandlerMethod handlerMethod=(HandlerMethod) handler;
            RBACScope rbacScope=handlerMethod.getMethod().getAnnotation(RBACScope.class);
            if (rbacScope==null)
                return Optional.empty();
            return Optional.of(rbacScope);
        }
        return Optional.empty();
    }

}
