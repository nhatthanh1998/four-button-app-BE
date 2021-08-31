import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { COLOR } from '../enums';
import { TransitionsController } from './transitions.controller';
import { TransitionsService } from './transitions.service';

describe('TransitionsController', () => {
  let controller: TransitionsController;
  let service: TransitionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransitionsController],
      providers: [TransitionsService],
    }).compile();

    controller = module.get<TransitionsController>(TransitionsController);
    service = module.get<TransitionsService>(TransitionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return current color of the transition [BLUE]', () => {
    expect(controller.get()).toEqual({color: COLOR.BLUE});
  });

  
  it('should return current color of the transition [GREEN]', () => {
    controller.goNext(COLOR.GREEN);
    expect(controller.get()).toEqual({color: COLOR.GREEN});
  });

  
  it('should return current color of the transition [YELLOW]', () => {
    controller.goNext(COLOR.YELLOW);
    expect(controller.get()).toEqual({color: COLOR.YELLOW});
  });

  it('should return GREEN color when move from blue ---> green', () => {
    controller.goNext(COLOR.GREEN);
    expect(controller.get()).toEqual({color: COLOR.GREEN});
  });

  it('should return YELLOW color when move from blue ---> yellow', () => {
    controller.goNext(COLOR.YELLOW);
    expect(controller.get()).toEqual({color: COLOR.YELLOW});
  });

  it('should throw bad request when move with color not in [BLUE, GREEN, YELLOW]', () => {
    try {
      controller.goNext("RED");
    } catch(error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('should throw bad request when move from green --> yellow', () => {
    try {
      controller.goNext(COLOR.GREEN);
      controller.goNext(COLOR.YELLOW)
    } catch(error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('should throw bad request when move from yellow --> green', () => {
    try {
      controller.goNext(COLOR.YELLOW);
      controller.goNext(COLOR.GREEN)
    } catch(error) {
      expect(error).toBeInstanceOf(BadRequestException);
    }
  });

  it('should return blue when reset the transition', () => {
    expect(controller.post()).toEqual({color: COLOR.BLUE})
  });
});
