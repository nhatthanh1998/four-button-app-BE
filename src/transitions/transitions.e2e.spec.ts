import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TransitionsController } from './transitions.controller';
import { TransitionsService } from './transitions.service';
import * as request from 'supertest';
import { COLOR } from '../enums';

describe('TransitionsController', () => {
  let controller: TransitionsController;
  let service: TransitionsService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransitionsController],
      providers: [TransitionsService],
    }).compile();
    app = module.createNestApplication();
    await app.init();
    controller = module.get<TransitionsController>(TransitionsController);
    service = module.get<TransitionsService>(TransitionsService);
  });

  it(`/GET testing GET /transitions should return blue color`, () => {
    return request(app.getHttpServer())
      .get('/transitions')
      .expect(200)
      .expect({
        color: COLOR.BLUE
      });
  });

  it(`testing POST /transitions should return blue color`, () => {
    return request(app.getHttpServer())
      .post('/transitions')
      .expect(201)
      .expect({
        color: COLOR.BLUE
      });
  });

  it(`testing PUT /transitions/YELLOW should return yellow color`, () => {
    return request(app.getHttpServer())
      .put('/transitions/YELLOW')
      .expect(200)
      .expect({
        color: COLOR.YELLOW
      });
  });


  it(`testing PUT /transitions/GREEN should return green color`, () => {
    return request(app.getHttpServer())
      .put('/transitions/GREEN')
      .expect(200)
      .expect({
        color: COLOR.GREEN
      });
  });

  it(`testing PUT /transitions/RED should throw bad request error`, () => {
    return request(app.getHttpServer())
      .put('/transitions/RED')
      .expect(400)
  });

  it(`testing PUT /transitions/YELLOW should throw bad request error`, () => {
    controller.goNext(COLOR.GREEN)

    return request(app.getHttpServer())
      .put('/transitions/YELLOW')
      .expect(400)
  });
  
  it(`testing PUT /transitions/GREEN should throw bad request error`, () => {
    controller.goNext(COLOR.YELLOW)

    return request(app.getHttpServer())
      .put('/transitions/GREEN')
      .expect(400)
  });
  

afterAll(async () => {
    await app.close();
  });
});
