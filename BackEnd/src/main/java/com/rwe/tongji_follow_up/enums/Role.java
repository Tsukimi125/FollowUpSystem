package com.rwe.tongji_follow_up.enums;

import lombok.Getter;

@Getter
public enum Role {
    ADMIN("管理员"),
    PI("分中心PI"),
    SI("分中心SI");

    private final String name;

    Role(String name){
        this.name=name;
    }
}
