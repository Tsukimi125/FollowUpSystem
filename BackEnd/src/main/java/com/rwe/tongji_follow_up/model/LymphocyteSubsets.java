package com.rwe.tongji_follow_up.model;


import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class LymphocyteSubsets extends BaseModel {
    private Double tLymphocytesP;
    private Double tLymphocytesC;
    private Double bLymphocytesP;
    private Double bLymphocytesC;
    private Double inducibleTLymphocytesP;
    private Double inducibleTLymphocytesC;
    private Double cytotoxicTLymphocytesP;
    private Double cytotoxicTLymphocytesC;
    private Double nkCellP;
    private Double nkCellC;
    private Double nkTCellP;
    private Double nkTCellC;
    private Double tBNkCellP;
    private Double tBNkCellC;
    private Double thTs;
    private Integer labTestId;
}
