import { Test, TestingModule } from '@nestjs/testing';
import { TransitionsService } from './transitions.service';
import {COLOR} from '../enums'
import { BadRequestException } from '@nestjs/common';
describe('TransitionsService', () => {
  let service: TransitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransitionsService],
    }).compile();

    service = module.get<TransitionsService>(TransitionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return current color of the transition', () => {
    expect(service.get()).toEqual({color: COLOR.BLUE});
  });

  
  it('should return green color when move blue ---> green', () => {
    expect(service.goNext(COLOR.GREEN)).toEqual({color: COLOR.GREEN});
  });

  it('should return yellow color when move from blue ---> yellow', () => {
    expect(service.goNext(COLOR.YELLOW)).toEqual({color: COLOR.YELLOW});
  });

  it('should return blue color when move from yellow ---> blue', () => {
    service.goNext(COLOR.YELLOW)
    expect(service.goNext(COLOR.BLUE)).toEqual({color: COLOR.BLUE});
  });

  it('should return blue color when move from green ---> blue', () => {
    service.goNext(COLOR.GREEN);
    expect(service.goNext(COLOR.BLUE)).toEqual({color: COLOR.BLUE});
  });

  it('should throw error when input an color not in [BLUE, GREEN, YELLOW] in goNext method.', () => {
    try {
      service.goNext("Red");
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });


  it('should throw error when move from yellow --> green', () => {
    try {
      service.goNext(COLOR.YELLOW);
      service.goNext(COLOR.GREEN)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });


  it('should throw error when move from green --> yellow', () => {
    try {
      service.goNext(COLOR.GREEN);
      service.goNext(COLOR.YELLOW)
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });
});
