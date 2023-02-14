package com.rwe.tongji_follow_up.resp;

import com.rwe.tongji_follow_up.model.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LabTestRespData extends LabTest {
    private InflammationIndicators inflammationIndicators;
    private BloodTest bloodTest;
    private BloodBiochemistry bloodBiochemistry;
    private CoagulationFunction coagulationFunction;
    private ArterialBloodGas arterialBloodGas;
    private SpecialInspection specialInspection;
    private CellFactor cellFactor;
    private GmTest gmTest;
    private Immune immune;
    private LymphocyteSubsets lymphocyteSubsets;
    private Microbiome microbiome;
    private Molecular molecular;
    private Rheumatism14 rheumatism14;
    private SciResearchProject sciResearchProject;
    private TuberculosisInfectionTCellTest tuberculosisInfectionTCellTest;
}
