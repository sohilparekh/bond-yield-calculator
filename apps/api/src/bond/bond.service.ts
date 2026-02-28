import { Injectable } from '@nestjs/common';
import {
  BondInputDto,
  BondCalculationResultDto,
  CashFlowItemDto,
} from '@repo/api';

@Injectable()
export class BondService {
  calculateBondYield(input: BondInputDto): BondCalculationResultDto {
    const {
      faceValue,
      annualCouponRate,
      marketPrice,
      yearsToMaturity,
      couponFrequency,
    } = input;

    // Calculate current yield
    const annualCouponPayment = faceValue * (annualCouponRate / 100);
    const currentYield = (annualCouponPayment / marketPrice) * 100;

    // Calculate YTM using Newton-Raphson method
    const periodsPerYear = couponFrequency === 'annual' ? 1 : 2;
    const totalPeriods = yearsToMaturity * periodsPerYear;
    const couponPayment = annualCouponPayment / periodsPerYear;

    const yieldToMaturity =
      this.calculateYTM(marketPrice, faceValue, couponPayment, totalPeriods) *
      100;

    // Calculate total interest earned
    const totalInterestEarned = annualCouponPayment * yearsToMaturity;

    // Determine premium or discount
    let premiumOrDiscount: 'premium' | 'discount' | 'par';
    if (marketPrice > faceValue) {
      premiumOrDiscount = 'premium';
    } else if (marketPrice < faceValue) {
      premiumOrDiscount = 'discount';
    } else {
      premiumOrDiscount = 'par';
    }

    // Generate cash flow schedule
    const cashFlowSchedule = this.generateCashFlowSchedule(
      faceValue,
      annualCouponPayment,
      yearsToMaturity,
      couponFrequency,
    );

    return {
      currentYield: Math.round(currentYield * 1000) / 1000,
      yieldToMaturity: Math.round(yieldToMaturity * 1000) / 1000,
      totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
      premiumOrDiscount,
      cashFlowSchedule,
    };
  }

  private calculateYTM(
    price: number,
    faceValue: number,
    couponPayment: number,
    periods: number,
  ): number {
    // Newton-Raphson method for YTM calculation
    let ytm = 0.05; // Initial guess
    const tolerance = 1e-8;
    const maxIterations = 100;

    for (let i = 0; i < maxIterations; i++) {
      const priceFunction = this.priceFunction(
        ytm,
        faceValue,
        couponPayment,
        periods,
      );
      const derivativeFunction = this.priceDerivative(
        ytm,
        faceValue,
        couponPayment,
        periods,
      );

      const newYtm = ytm - (priceFunction - price) / derivativeFunction;

      if (Math.abs(newYtm - ytm) < tolerance) {
        return newYtm;
      }

      ytm = newYtm;
    }

    return ytm;
  }

  private priceFunction(
    rate: number,
    faceValue: number,
    couponPayment: number,
    periods: number,
  ): number {
    let price = 0;

    // Present value of coupon payments
    for (let t = 1; t <= periods; t++) {
      price += couponPayment / Math.pow(1 + rate, t);
    }

    // Present value of face value
    price += faceValue / Math.pow(1 + rate, periods);

    return price;
  }

  private priceDerivative(
    rate: number,
    faceValue: number,
    couponPayment: number,
    periods: number,
  ): number {
    let derivative = 0;

    // Derivative of coupon payments
    for (let t = 1; t <= periods; t++) {
      derivative -= (t * couponPayment) / Math.pow(1 + rate, t + 1);
    }

    // Derivative of face value
    derivative -= (periods * faceValue) / Math.pow(1 + rate, periods + 1);

    return derivative;
  }

  private generateCashFlowSchedule(
    faceValue: number,
    annualCouponPayment: number,
    yearsToMaturity: number,
    couponFrequency: 'annual' | 'semi-annual',
  ): CashFlowItemDto[] {
    const schedule: CashFlowItemDto[] = [];
    const periodsPerYear = couponFrequency === 'annual' ? 1 : 2;
    const totalPeriods = yearsToMaturity * periodsPerYear;
    const couponPayment = annualCouponPayment / periodsPerYear;

    const startDate = new Date();
    let cumulativeInterest = 0;

    for (let period = 1; period <= totalPeriods; period++) {
      const monthsToAdd = (12 / periodsPerYear) * (period - 1);
      const paymentDate = new Date(startDate);
      paymentDate.setMonth(startDate.getMonth() + monthsToAdd);

      cumulativeInterest += couponPayment;
      const remainingPrincipal = period === totalPeriods ? 0 : faceValue;

      schedule.push({
        period,
        paymentDate: paymentDate.toISOString().split('T')[0],
        couponPayment: Math.round(couponPayment * 100) / 100,
        cumulativeInterest: Math.round(cumulativeInterest * 100) / 100,
        remainingPrincipal: Math.round(remainingPrincipal * 100) / 100,
      });
    }

    return schedule;
  }
}
