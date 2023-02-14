package com.rwe.tongji_follow_up.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.Query;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.rwe.tongji_follow_up.exception.exec.NotFoundException;
import com.rwe.tongji_follow_up.mapper.*;
import com.rwe.tongji_follow_up.model.*;
import com.rwe.tongji_follow_up.resp.LabTestRespData;
import com.rwe.tongji_follow_up.service.LabTestService;
import com.rwe.tongji_follow_up.util.DaoUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class LabTestServiceImpl implements LabTestService {

    private final LabTestMapper labTestMapper;
    private final InflammationIndicatorsMapper inflammationIndicatorsMapper;
    private final BloodTestMapper bloodTestMapper;
    private final BloodBiochemistryMapper bloodBiochemistryMapper;
    private final CoagulationFunctionMapper coagulationFunctionMapper;
    private final ArterialBloodGasMapper arterialBloodGasMapper;
    private final SpecialInspectionMapper specialInspectionMapper;
    private final CellFactorMapper cellFactorMapper;
    private final GmTestMapper gmTestMapper;
    private final ImmuneMapper immuneMapper;
    private final LymphocyteSubsetsMapper lymphocyteSubsetsMapper;
    private final MicrobiomeMapper microbiomeMapper;
    private final MolecularMapper molecularMapper;
    private final Rheumatism14Mapper rheumatism14Mapper;
    private final SciResearchProjectMapper sciResearchProjectMapper;
    private final TuberculosisInfectionTCellTestMapper tuberculosisInfectionTCellTestMapper;

    public LabTestServiceImpl(LabTestMapper labTestMapper,
                              InflammationIndicatorsMapper inflammationIndicatorsMapper,
                              BloodTestMapper bloodTestMapper,
                              BloodBiochemistryMapper bloodBiochemistryMapper,
                              CoagulationFunctionMapper coagulationFunctionMapper,
                              ArterialBloodGasMapper arterialBloodGasMapper,
                              SpecialInspectionMapper specialInspectionMapper,
                              CellFactorMapper cellFactorMapper,
                              GmTestMapper gmTestMapper,
                              ImmuneMapper immuneMapper,
                              LymphocyteSubsetsMapper lymphocyteSubsetsMapper,
                              MicrobiomeMapper microbiomeMapper,
                              MolecularMapper molecularMapper,
                              Rheumatism14Mapper rheumatism14Mapper,
                              SciResearchProjectMapper sciResearchProjectMapper,
                              TuberculosisInfectionTCellTestMapper tuberculosisInfectionTCellTestMapper) {
        this.labTestMapper = labTestMapper;
        this.inflammationIndicatorsMapper = inflammationIndicatorsMapper;
        this.bloodTestMapper = bloodTestMapper;
        this.bloodBiochemistryMapper = bloodBiochemistryMapper;
        this.coagulationFunctionMapper = coagulationFunctionMapper;
        this.arterialBloodGasMapper = arterialBloodGasMapper;
        this.specialInspectionMapper = specialInspectionMapper;
        this.cellFactorMapper = cellFactorMapper;
        this.gmTestMapper = gmTestMapper;
        this.immuneMapper = immuneMapper;
        this.lymphocyteSubsetsMapper = lymphocyteSubsetsMapper;
        this.microbiomeMapper = microbiomeMapper;
        this.molecularMapper = molecularMapper;
        this.rheumatism14Mapper = rheumatism14Mapper;
        this.sciResearchProjectMapper = sciResearchProjectMapper;
        this.tuberculosisInfectionTCellTestMapper = tuberculosisInfectionTCellTestMapper;
    }

    @Override
    @Transactional
    public void createLabTest(int cycleId) {
        LabTest labTest=new LabTest();
        labTest.setCycleId(cycleId);
        DaoUtils.initCreateModel(labTest);
        labTestMapper.insert(labTest);

        InflammationIndicators inflammationIndicators=new InflammationIndicators();
        inflammationIndicators.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(inflammationIndicators);
        inflammationIndicatorsMapper.insert(inflammationIndicators);

        BloodTest bloodTest=new BloodTest();
        bloodTest.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(bloodTest);
        bloodTestMapper.insert(bloodTest);

        BloodBiochemistry bloodBiochemistry=new BloodBiochemistry();
        bloodBiochemistry.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(bloodBiochemistry);
        bloodBiochemistryMapper.insert(bloodBiochemistry);

        CoagulationFunction coagulationFunction=new CoagulationFunction();
        coagulationFunction.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(coagulationFunction);
        coagulationFunctionMapper.insert(coagulationFunction);

        ArterialBloodGas arterialBloodGas=new ArterialBloodGas();
        arterialBloodGas.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(arterialBloodGas);
        arterialBloodGasMapper.insert(arterialBloodGas);

        SpecialInspection specialInspection=new SpecialInspection();
        specialInspection.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(specialInspection);
        specialInspectionMapper.insert(specialInspection);

        CellFactor cellFactor=new CellFactor();
        cellFactor.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(cellFactor);
        cellFactorMapper.insert(cellFactor);

        GmTest gmTest=new GmTest();
        gmTest.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(gmTest);
        gmTestMapper.insert(gmTest);

        Immune immune=new Immune();
        immune.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(immune);
        immuneMapper.insert(immune);

        LymphocyteSubsets lymphocyteSubsets=new LymphocyteSubsets();
        lymphocyteSubsets.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(lymphocyteSubsets);
        lymphocyteSubsetsMapper.insert(lymphocyteSubsets);

        Microbiome microbiome=new Microbiome();
        microbiome.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(microbiome);
        microbiomeMapper.insert(microbiome);

        Molecular molecular=new Molecular();
        molecular.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(molecular);
        molecularMapper.insert(molecular);

        Rheumatism14 rheumatism14=new Rheumatism14();
        rheumatism14.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(rheumatism14);
        rheumatism14Mapper.insert(rheumatism14);

        SciResearchProject sciResearchProject=new SciResearchProject();
        sciResearchProject.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(sciResearchProject);
        sciResearchProjectMapper.insert(sciResearchProject);

        TuberculosisInfectionTCellTest tuberculosisInfectionTCellTest=new TuberculosisInfectionTCellTest();
        tuberculosisInfectionTCellTest.setLabTestId(labTest.getId());
        DaoUtils.initCreateModel(tuberculosisInfectionTCellTest);
        tuberculosisInfectionTCellTestMapper.insert(tuberculosisInfectionTCellTest);
    }

    @Override
    public LabTestRespData getLabTest(int labTestId) {
        LabTest labTest=labTestMapper.selectById(labTestId);
        if (labTest==null){
            throw new NotFoundException();
        }
        LabTestRespData resp=new LabTestRespData();

        resp.setId(labTestId);
        resp.setCycleId(labTest.getCycleId());

        Map<String,Object> whereMap=new HashMap<>();
        whereMap.put("lab_test_id",labTestId);

        resp.setInflammationIndicators(inflammationIndicatorsMapper.selectByMap(whereMap).get(0));
        resp.setBloodTest(bloodTestMapper.selectByMap(whereMap).get(0));
        resp.setBloodBiochemistry(bloodBiochemistryMapper.selectByMap(whereMap).get(0));
        resp.setCoagulationFunction(coagulationFunctionMapper.selectByMap(whereMap).get(0));
        resp.setArterialBloodGas(arterialBloodGasMapper.selectByMap(whereMap).get(0));
        resp.setSpecialInspection(specialInspectionMapper.selectByMap(whereMap).get(0));
        resp.setCellFactor(cellFactorMapper.selectByMap(whereMap).get(0));
        resp.setGmTest(gmTestMapper.selectByMap(whereMap).get(0));
        resp.setImmune(immuneMapper.selectByMap(whereMap).get(0));
        resp.setLymphocyteSubsets(lymphocyteSubsetsMapper.selectByMap(whereMap).get(0));
        resp.setMicrobiome(microbiomeMapper.selectByMap(whereMap).get(0));
        resp.setMolecular(molecularMapper.selectByMap(whereMap).get(0));
        resp.setRheumatism14(rheumatism14Mapper.selectByMap(whereMap).get(0));
        resp.setSciResearchProject(sciResearchProjectMapper.selectByMap(whereMap).get(0));
        resp.setTuberculosisInfectionTCellTest(tuberculosisInfectionTCellTestMapper.selectByMap(whereMap).get(0));
        return resp;
    }

    @Override
    public void updateInflammationIndicators(InflammationIndicators inflammationIndicators, int labTestId) {
        QueryWrapper<InflammationIndicators> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        InflammationIndicators exist=inflammationIndicatorsMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,inflammationIndicators);
        inflammationIndicators.setLabTestId(labTestId);

        inflammationIndicatorsMapper.updateById(inflammationIndicators);
    }

    @Override
    public void updateBloodTest(BloodTest bloodTest, int labTestId) {
        QueryWrapper<BloodTest> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        BloodTest exist=bloodTestMapper.selectOne(wrapper);
        if (exist == null) {
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,bloodTest);
        bloodTest.setLabTestId(labTestId);

        bloodTestMapper.updateById(bloodTest);
    }

    @Override
    public void updateBloodBiochemistry(BloodBiochemistry bloodBiochemistry, int labTestId) {
        QueryWrapper<BloodBiochemistry> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        BloodBiochemistry exist=bloodBiochemistryMapper.selectOne(wrapper);
        if (exist == null) {
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,bloodBiochemistry);
        bloodBiochemistry.setLabTestId(labTestId);

        bloodBiochemistryMapper.updateById(bloodBiochemistry);
    }

    @Override
    public void updateCoagulationFunction(CoagulationFunction coagulationFunction, int labTestId) {
        QueryWrapper<CoagulationFunction> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        CoagulationFunction exist=coagulationFunctionMapper.selectOne(wrapper);
        if (exist == null) {
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,coagulationFunction);
        coagulationFunction.setLabTestId(labTestId);

        coagulationFunctionMapper.updateById(coagulationFunction);
    }

    @Override
    public void updateArterialBloodGas(ArterialBloodGas arterialBloodGas, int labTestId) {
        QueryWrapper<ArterialBloodGas> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        ArterialBloodGas exist=arterialBloodGasMapper.selectOne(wrapper);
        if (exist == null) {
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,arterialBloodGas);
        arterialBloodGas.setLabTestId(labTestId);

        arterialBloodGasMapper.updateById(arterialBloodGas);
    }

    @Override
    public void updateSpecialInspection(SpecialInspection specialInspection, int labTestId) {
        QueryWrapper<SpecialInspection> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        SpecialInspection exist=specialInspectionMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,specialInspection);
        specialInspection.setLabTestId(labTestId);

        specialInspectionMapper.updateById(specialInspection);
    }

    @Override
    public void updateCellFactor(CellFactor cellFactor, int labTestId) {
        QueryWrapper<CellFactor> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        CellFactor exist=cellFactorMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,cellFactor);
        cellFactor.setLabTestId(labTestId);

        cellFactorMapper.updateById(cellFactor);
    }

    @Override
    public void updateGmTest(GmTest gmTest, int labTestId) {
        QueryWrapper<GmTest> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        GmTest exist=gmTestMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,gmTest);
        gmTest.setLabTestId(labTestId);

        gmTestMapper.updateById(gmTest);
    }

    @Override
    public void updateImmune(Immune immune, int labTestId) {
        QueryWrapper<Immune> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        Immune exist=immuneMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,immune);
        immune.setLabTestId(labTestId);

        immuneMapper.updateById(immune);
    }

    @Override
    public void updateLymphocyteSubsets(LymphocyteSubsets lymphocyteSubsets, int labTestId) {
        QueryWrapper<LymphocyteSubsets> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        LymphocyteSubsets exist=lymphocyteSubsetsMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,lymphocyteSubsets);
        lymphocyteSubsets.setLabTestId(labTestId);

        lymphocyteSubsetsMapper.updateById(lymphocyteSubsets);
    }

    @Override
    public void updateMicrobiome(Microbiome microbiome, int labTestId) {
        QueryWrapper<Microbiome> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        Microbiome exist=microbiomeMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,microbiome);
        microbiome.setLabTestId(labTestId);

        microbiomeMapper.updateById(microbiome);
    }

    @Override
    public void updateMolecular(Molecular molecular, int labTestId) {
        QueryWrapper<Molecular> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        Molecular exist=molecularMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,molecular);
        molecular.setLabTestId(labTestId);

        molecularMapper.updateById(molecular);
    }

    @Override
    public void updateRheumatism14(Rheumatism14 rheumatism14, int labTestId) {
        QueryWrapper<Rheumatism14> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        Rheumatism14 exist=rheumatism14Mapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,rheumatism14);
        rheumatism14.setLabTestId(labTestId);

        rheumatism14Mapper.updateById(rheumatism14);
    }

    @Override
    public void updateSciResearchProject(SciResearchProject sciResearchProject, int labTestId) {
        QueryWrapper<SciResearchProject> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        SciResearchProject exist=sciResearchProjectMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,sciResearchProject);
        sciResearchProject.setLabTestId(labTestId);

        sciResearchProjectMapper.updateById(sciResearchProject);
    }

    @Override
    public void updateTuberculosisInfectionTCellTest(TuberculosisInfectionTCellTest tuberculosisInfectionTCellTest, int labTestId) {
        QueryWrapper<TuberculosisInfectionTCellTest> wrapper=new QueryWrapper<>();
        wrapper.eq("lab_test_id",labTestId);

        TuberculosisInfectionTCellTest exist=tuberculosisInfectionTCellTestMapper.selectOne(wrapper);
        if (exist==null){
            throw new NotFoundException();
        }

        DaoUtils.initUpdateModel(exist,tuberculosisInfectionTCellTest);
        tuberculosisInfectionTCellTest.setLabTestId(labTestId);

        tuberculosisInfectionTCellTestMapper.updateById(tuberculosisInfectionTCellTest);
    }

}
