package com.rwe.tongji_follow_up.service;

import com.rwe.tongji_follow_up.model.*;
import com.rwe.tongji_follow_up.resp.LabTestRespData;

public interface LabTestService {
    void createLabTest(int cycleId);
    LabTestRespData getLabTest(int labTestId);
    void updateInflammationIndicators(InflammationIndicators inflammationIndicators,int labTestId);
    void updateBloodTest(BloodTest bloodTest,int labTestId);
    void updateBloodBiochemistry(BloodBiochemistry bloodBiochemistry,int labTestId);
    void updateCoagulationFunction(CoagulationFunction coagulationFunction,int labTestId);
    void updateArterialBloodGas(ArterialBloodGas arterialBloodGas,int labTestId);
    void updateSpecialInspection(SpecialInspection specialInspection,int labTestId);
    void updateCellFactor(CellFactor cellFactor,int labTestId);
    void updateGmTest(GmTest gmTest,int labTestId);
    void updateImmune(Immune immune,int labTestId);
    void updateLymphocyteSubsets(LymphocyteSubsets lymphocyteSubsets,int labTestId);
    void updateMicrobiome(Microbiome microbiome,int labTestId);
    void updateMolecular(Molecular molecular,int labTestId);
    void updateRheumatism14(Rheumatism14 rheumatism14,int labTestId);
    void updateSciResearchProject(SciResearchProject sciResearchProject,int labTestId);
    void updateTuberculosisInfectionTCellTest(TuberculosisInfectionTCellTest tuberculosisInfectionTCellTest,int labTestId);
}
