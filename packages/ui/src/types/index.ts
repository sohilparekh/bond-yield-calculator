// Re-export bond types from @repo/api for UI components
import type {
  BondInputDto,
  BondCalculationResultDto,
  CashFlowItemDto,
} from '@repo/api';

// Create type aliases for easier usage
export type BondInput = BondInputDto;
export type BondCalculationResult = BondCalculationResultDto;
export type CashFlowItem = CashFlowItemDto;
export type BondCalculationRequest = BondInputDto;
export type BondCalculationResponse = BondCalculationResultDto;
export type BondInputError = Partial<Record<keyof BondInput, string>>;

// Also export the original DTOs
export type { BondInputDto, BondCalculationResultDto, CashFlowItemDto };
