import { CashFlowItemDto } from './cash-flow-item.dto';

export class BondCalculationResultDto {
  currentYield: number;
  yieldToMaturity: number;
  totalInterestEarned: number;
  premiumOrDiscount: 'premium' | 'discount' | 'par';
  cashFlowSchedule: CashFlowItemDto[];
}
