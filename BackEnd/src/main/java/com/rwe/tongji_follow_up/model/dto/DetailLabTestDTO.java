package com.rwe.tongji_follow_up.model.dto;

import com.rwe.tongji_follow_up.model.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetailLabTestDTO {
    private Integer cycleId;
    private InflammationIndicators inflammationIndicators;
    private BloodTest bloodTest;
    private BloodBiochemistry bloodBiochemistry;
    private CoagulationFunction coagulationFunction;
    private ArterialBloodGas arterialBloodGas;
    private SpecialInspection specialInspection;
    private Microbiome microbiome;
    private Rheumatism14 rheumatism14;
    private LymphocyteSubsets lymphocyteSubsets;
    private CellFactor cellFactor;
    private Immune immune;
    private GmTest gmTest;
    private TuberculosisInfectionTCellTest tuberculosisInfectionTCellTest;
    private Molecular molecular;
    private SciResearchProject sciResearchProject;
}
