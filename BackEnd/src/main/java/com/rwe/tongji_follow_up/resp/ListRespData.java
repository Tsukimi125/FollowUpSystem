package com.rwe.tongji_follow_up.resp;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ListRespData {
    private int limit;
    private int offset;
    private int total;
    private List list;

    public ListRespData(int limit, int offset, int total, List list){
        this.limit=limit;
        this.offset=offset;
        this.total=total;
        this.list=list;
    }
}
