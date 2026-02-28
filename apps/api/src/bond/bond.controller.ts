import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BondService } from './bond.service';
import { BondInputDto, BondCalculationResultDto } from '@repo/api';

@Controller('bond')
export class BondController {
  constructor(private readonly bondService: BondService) {}

  @Post('calculate')
  calculate(@Body() request: BondInputDto): BondCalculationResultDto {
    try {
      // Validate input
      this.validateInput(request);

      return this.bondService.calculateBondYield(request);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Internal server error during bond calculation',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private validateInput(input: BondInputDto): void {
    const {
      faceValue,
      annualCouponRate,
      marketPrice,
      yearsToMaturity,
      couponFrequency,
    } = input;

    if (faceValue <= 0) {
      throw new HttpException(
        'Face value must be positive',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (annualCouponRate < 0 || annualCouponRate > 100) {
      throw new HttpException(
        'Annual coupon rate must be between 0 and 100',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (marketPrice <= 0) {
      throw new HttpException(
        'Market price must be positive',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (yearsToMaturity <= 0) {
      throw new HttpException(
        'Years to maturity must be positive',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!['annual', 'semi-annual'].includes(couponFrequency)) {
      throw new HttpException(
        'Coupon frequency must be either "annual" or "semi-annual"',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
