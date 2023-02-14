package com.rwe.tongji_follow_up.util;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rwe.tongji_follow_up.model.rbac.RoleInfoData;
import com.rwe.tongji_follow_up.model.rbac.RoleInfoResp;
import com.rwe.tongji_follow_up.model.rbac.UserInfoData;
import com.rwe.tongji_follow_up.model.rbac.UserInfoResp;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class RBACUtils {

    private static String host;
    private static String scheme;
    private static String projectId;

    @Value("${rbac.host}")
    public void setHost(String host){
        RBACUtils.host=host;
    }

    @Value("${rbac.scheme}")
    public void setScheme(String scheme){
        RBACUtils.scheme=scheme;
    }

    @Value("${rbac.project-id}")
    public void setProjectId(String projectId) {
        RBACUtils.projectId = projectId;
    }

    private final OkHttpClient client=new OkHttpClient().newBuilder().build();

    public UserInfoData getUserInfo(int userId) {
        Request request = new Request.Builder()
                .url(RBACUtils.scheme+"://"+RBACUtils.host+"/v1/user?user_id="+userId)
                .method("GET",null)
                .build();
        try{
            Response response = client.newCall(request).execute();
            ObjectMapper objectMapper=new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
            String jsonStr=response.body().string();
            UserInfoResp resp=objectMapper.readValue(jsonStr, UserInfoResp.class);
            return resp.getData();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public RoleInfoData getUserRole(int userId){
        Request request=new Request.Builder()
                .url(RBACUtils.scheme+"://"+RBACUtils.host+"/v1/role/getOne?project_id="+RBACUtils.projectId+"&user_id="+userId)
                .method("GET",null)
                .build();
        try{
            Response response=client.newCall(request).execute();
            ObjectMapper objectMapper=new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
            String jsonStr=response.body().string();
            RoleInfoResp resp=objectMapper.readValue(jsonStr,RoleInfoResp.class);
            return resp.getData();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
