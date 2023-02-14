package com.rwe.tongji_follow_up.config;

import com.rwe.tongji_follow_up.interceptors.PermissionInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Component
public class InterceptionConfiguration implements WebMvcConfigurer {

    private final PermissionInterceptor permissionInterceptor;

    @Autowired
    public InterceptionConfiguration(PermissionInterceptor permissionInterceptor) {
        this.permissionInterceptor = permissionInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(permissionInterceptor);
    }
}
