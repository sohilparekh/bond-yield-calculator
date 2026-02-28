export class BondInputDto {
  faceValue: number;
  annualCouponRate: number;
  marketPrice: number;
  yearsToMaturity: number;
  couponFrequency: 'annual' | 'semi-annual';
}
