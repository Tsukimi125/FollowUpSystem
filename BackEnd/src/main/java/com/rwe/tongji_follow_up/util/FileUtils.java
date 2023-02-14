package com.rwe.tongji_follow_up.util;

import com.rwe.tongji_follow_up.exception.exec.ServerErrorException;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.UUID;

public class FileUtils {
    public static String saveFileToResourceWithFolderName(String folderName, MultipartFile file){
        String realPath=System.getProperty("user.dir")+"/resource/"+folderName;
        File folder=new File(realPath);
        if (!folder.exists()){
            boolean ok=folder.mkdirs();
            if(!ok){
                throw new ServerErrorException();
            }
        }
        String oldName=file.getOriginalFilename();
        if (oldName==null){
            throw new ServerErrorException();
        }
        String newName= UUID.randomUUID().toString() +oldName.substring(oldName.lastIndexOf("."));
        try{
            file.transferTo(new File(folder,newName));
        }catch (Exception e){
            throw new ServerErrorException();
        }
        return newName;
    }

    public static ResponseEntity<Resource> getDownloadFileResp(String path,String name,String type){
        String content= ContentDisposition.builder("attachment").filename(name).build().toString();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,content)
                .header(HttpHeaders.CONTENT_TYPE,type)
                .body(new FileSystemResource(path));
    }

    public static ResponseEntity<Resource> getDownloadFileResp(File file,String type){
        String content= ContentDisposition.builder("attachment").filename(file.getName()).build().toString();

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,content)
                .header(HttpHeaders.CONTENT_TYPE,type)
                .body(new FileSystemResource(file));
    }
}
