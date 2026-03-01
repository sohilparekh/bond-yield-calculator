import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { Server } from 'http';
import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { BondController } from './bond.controller';
import { BondService } from './bond.service';

describe('BondController (e2e)', () => {
  let app: INestApplication;
  let server: Server;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [BondController],
      providers: [BondService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterEach(async () => {
    await app.close();
  });

  describe('POST /bond/calculate', () => {
    it('should calculate bond yields and return 200', async () => {
      const bondData = {
        faceValue: 1000,
        annualCouponRate: 5,
        marketPrice: 950,
        yearsToMaturity: 10,
        couponFrequency: 'annual',
      };

      const response = await request(server)
        .post('/bond/calculate')
        .send(bondData)
        .expect(200);

      expect(response.body).toHaveProperty('currentYield');
      expect(response.body).toHaveProperty('yieldToMaturity');
      expect(response.body).toHaveProperty('totalInterestEarned');
      expect(response.body).toHaveProperty('premiumOrDiscount');
      expect(response.body).toHaveProperty('cashFlowSchedule');

      expect(typeof response.body.currentYield).toBe('number');
      expect(typeof response.body.yieldToMaturity).toBe('number');
      expect(typeof response.body.totalInterestEarned).toBe('number');
      expect(typeof response.body.premiumOrDiscount).toBe('string');
      expect(Array.isArray(response.body.cashFlowSchedule)).toBe(true);

      // Verify specific values
      expect(response.body.currentYield).toBeCloseTo(5.263, 2);
      expect(response.body.yieldToMaturity).toBeCloseTo(5.669, 2);
      expect(response.body.totalInterestEarned).toBeCloseTo(500, 2);
      expect(response.body.premiumOrDiscount).toBe('discount');
    });

    it('should return 400 for invalid face value', async () => {
      const invalidData = {
        faceValue: -1000,
        annualCouponRate: 5,
        marketPrice: 950,
        yearsToMaturity: 10,
        couponFrequency: 'annual',
      };

      const response = await request(server)
        .post('/bond/calculate')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain('Face value must be positive');
    });

    it('should return 400 for missing required fields', async () => {
      const incompleteData = {
        annualCouponRate: 5,
        marketPrice: 950,
        yearsToMaturity: 10,
        // Missing faceValue and couponFrequency
      };

      const response = await request(server)
        .post('/bond/calculate')
        .send(incompleteData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toContain(
        'Coupon frequency must be either \"annual\" or \"semi-annual\"',
      );
    });

    it('should handle semi-annual coupon frequency', async () => {
      const semiAnnualData = {
        faceValue: 1000,
        annualCouponRate: 5,
        marketPrice: 950,
        yearsToMaturity: 10,
        couponFrequency: 'semi-annual',
      };

      const response = await request(server)
        .post('/bond/calculate')
        .send(semiAnnualData)
        .expect(200);

      expect(response.body).toHaveProperty('currentYield');
      expect(response.body).toHaveProperty('yieldToMaturity');

      // Verify cash flow schedule has 20 periods for semi-annual
      if (
        response.body.cashFlowSchedule &&
        Array.isArray(response.body.cashFlowSchedule)
      ) {
        expect(response.body.cashFlowSchedule.length).toBe(20);
      }
    });
  });

  describe('GET /bond/calculate', () => {
    it('should return 404 for GET requests', async () => {
      const response = await request(server).get('/bond/calculate').expect(404);
    });
  });
});
