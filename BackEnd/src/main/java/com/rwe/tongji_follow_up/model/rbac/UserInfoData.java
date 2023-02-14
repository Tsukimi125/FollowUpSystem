package com.rwe.tongji_follow_up.model.rbac;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoData{
    private String account;
    private String department;
    private String email;
    private int id;
    private String id_card;
    private int is_super;
    private String name;
    private String office;
    private String phone;
    private int research_center_id;
    private String research_center_name;
    private String title;
}
