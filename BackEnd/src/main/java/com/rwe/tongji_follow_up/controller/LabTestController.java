package com.rwe.tongji_follow_up.controller;

import com.rwe.tongji_follow_up.exception.handler.Success;
import com.rwe.tongji_follow_up.model.*;
import com.rwe.tongji_follow_up.service.LabTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/labTest")
public class LabTestController {

    private final LabTestService labTestService;

    @Autowired
    public LabTestController(LabTestService labTestService) {
        this.labTestService = labTestService;
    }

    @GetMapping("/get")
    Success getLabTest(@RequestParam(value = "labTestId") int labTestId) {
        return new Success(labTestService.getLabTest(labTestId));
    }

    @PostMapping("/inflammationIndicators/update")
    Success updateInflammationIndicators(@RequestBody InflammationIndicators inflammationIndicators,
                                         @RequestParam(value = "labTestId") int labTestId) {
        labTestService.updateInflammationIndicators(inflammationIndicators, labTestId);
        return new Success();
    }

    @PostMapping("/bloodTest/update")
    Success updateBloodTest(@RequestBody BloodTest bloodTest, @RequestParam(value = "labTestId") int labTestId) {
        labTestService.updateBloodTest(bloodTest, labTestId);
        return new Success();
    }

    @PostMapping("/bloodBiochemistry/update")
    Success updateBloodBiochemistry(@RequestBody BloodBiochemistry bloodBiochemistry,
                                    @RequestParam(value = "labTestId") int labTestId) {
        labTestService.updateBloodBiochemistry(bloodBiochemistry, labTestId);
        return new Success();
    }

    @PostMapping("/coagulationFunction/update")
    Success updateCoagulationFunction(@RequestBody CoagulationFunction coagulationFunction,
                                      @RequestParam(value = "labTestId") int labTestId) {
        labTestService.updateCoagulationFunction(coagulationFunction, labTestId);
        return new Success();
    }

    @PostMapping("/arterialBloodGas/update")
    Success updateArterialBloodGas(@RequestBody ArterialBloodGas arterialBloodGas,
                                   @RequestParam(value = "labTestId") int labTestId) {
        labTestService.updateArterialBloodGas(arterialBloodGas, labTestId);
        return new Success();
    }

    @PostMapping("/specialInspection/update")
    Success updateSpecialInspection(@RequestBody SpecialInspection specialInspection,
                                    @RequestParam(value = "labTestId") int labTestId) {
        labTestService.updateSpecialInspection(specialInspection, labTestId);
        return new Success();
    }

    @PostMapping("/cellFactor/update")
    Success updateCellFactor(@RequestBody CellFactor cellFactor,@RequestParam(value = "labTestId") int labTestId){
        labTestService.updateCellFactor(cellFactor,labTestId);
        return new Success();
    }

    @PostMapping("/gmTest/update")
    Success updateGmTest(@RequestBody GmTest gmTest,@RequestParam(value = "labTestId") int labTestId){
        labTestService.updateGmTest(gmTest,labTestId);
        return new Success();
    }

    @PostMapping("/immune/update")
    Success updateImmune(@RequestBody Immune immune,@RequestParam(value = "labTestId") int labTestId){
        labTestService.updateImmune(immune,labTestId);
        return new Success();
    }

    @PostMapping("/lymphocyteSubsets/update")
    Success updateLymphocyteSubsets(@RequestBody LymphocyteSubsets lymphocyteSubsets,
                                    @RequestParam(value = "labTestId") int labTestId){
        labTestService.updateLymphocyteSubsets(lymphocyteSubsets,labTestId);
        return new Success();
    }

    @PostMapping("/microbiome/update")
    Success updateMicrobiome(@RequestBody Microbiome microbiome,@RequestParam(value = "labTestId") int labTestId){
        labTestService.updateMicrobiome(microbiome,labTestId);
        return new Success();
    }

    @PostMapping("/molecular/update")
    Success updateMolecular(@RequestBody Molecular molecular,@RequestParam(value = "labTestId")int labTestId){
        labTestService.updateMolecular(molecular,labTestId);
        return new Success();
    }

    @PostMapping("/rheumatism14/update")
    Success updateRheumatism14(@RequestBody Rheumatism14 rheumatism14,@RequestParam(value = "labTestId")int labTestId){
        labTestService.updateRheumatism14(rheumatism14, labTestId);
        return new Success();
    }

    @PostMapping("/sciResearchProject/update")
    Success updateSciResearchProject(@RequestBody SciResearchProject sciResearchProject,
                                     @RequestParam(value = "labTestId")int labTestId){
        labTestService.updateSciResearchProject(sciResearchProject,labTestId);
        return new Success();
    }

    @PostMapping("/tuberculosisInfectionTCellTest/update")
    Success updateTuberculosisInfectionTCellTest(@RequestBody TuberculosisInfectionTCellTest tuberculosisInfectionTCellTest,
                                                 @RequestParam(value = "labTestId") int labTestId){
        labTestService.updateTuberculosisInfectionTCellTest(tuberculosisInfectionTCellTest,labTestId);
        return new Success();
    }
}
