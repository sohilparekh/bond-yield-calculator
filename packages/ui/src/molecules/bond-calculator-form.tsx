'use client';

import { useState } from 'react';
import { Button } from '../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/card';
import { Input } from '../components/input';
import { Label } from '../components/label';
import { BondInput, BondCalculationResult, BondInputError } from '../types';

interface BondCalculatorFormProps {
  onCalculate: (input: BondInput) => Promise<BondCalculationResult>;
  isLoading?: boolean;
}

export function BondCalculatorForm({
  onCalculate,
  isLoading = false,
}: BondCalculatorFormProps) {
  const [formData, setFormData] = useState<BondInput>({
    faceValue: 1000,
    annualCouponRate: 5,
    marketPrice: 950,
    yearsToMaturity: 10,
    couponFrequency: 'annual',
  });

  const [errors, setErrors] = useState<BondInputError>({});

  const handleInputChange = (
    field: keyof BondInput,
    value: string | number,
  ) => {
    setFormData((prev: BondInput) => ({
      ...prev,
      [field]: field === 'couponFrequency' ? value : Number(value),
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev: BondInputError) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof BondInput, string>> = {};

    if (formData.faceValue <= 0) {
      newErrors.faceValue = 'Face value must be positive';
    }

    if (formData.annualCouponRate < 0 || formData.annualCouponRate > 100) {
      newErrors.annualCouponRate = 'Coupon rate must be between 0 and 100';
    }

    if (formData.marketPrice <= 0) {
      newErrors.marketPrice = 'Market price must be positive';
    }

    if (formData.yearsToMaturity <= 0) {
      newErrors.yearsToMaturity = 'Years to maturity must be positive';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onCalculate(formData);
    } catch (error) {
      console.error('Calculation failed:', error);
    }
  };

  return (
    <Card className="ui:w-full ui:max-w-2xl ui:mx-auto">
      <CardHeader>
        <CardTitle>Bond Yield Calculator</CardTitle>
        <CardDescription>
          Enter bond details to calculate yield metrics and cash flow schedule
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="ui:space-y-6">
          <div className="ui:grid ui:grid-cols-1 ui:md:grid-cols-2 ui:gap-4">
            <div className="ui:space-y-2">
              <Label htmlFor="faceValue">Face Value ($)</Label>
              <Input
                id="faceValue"
                type="number"
                step="0.01"
                value={formData.faceValue}
                onChange={(e) => handleInputChange('faceValue', e.target.value)}
                className={errors.faceValue ? 'ui:border-red-500' : ''}
              />
              {errors.faceValue && (
                <p className="ui:text-sm ui:text-red-500 ui:dark:text-red-400">
                  {errors.faceValue}
                </p>
              )}
            </div>

            <div className="ui:space-y-2">
              <Label htmlFor="annualCouponRate">Annual Coupon Rate (%)</Label>
              <Input
                id="annualCouponRate"
                type="number"
                step="0.01"
                value={formData.annualCouponRate}
                onChange={(e) =>
                  handleInputChange('annualCouponRate', e.target.value)
                }
                className={errors.annualCouponRate ? 'ui:border-red-500' : ''}
              />
              {errors.annualCouponRate && (
                <p className="ui:text-sm ui:text-red-500 ui:dark:text-red-400">
                  {errors.annualCouponRate}
                </p>
              )}
            </div>

            <div className="ui:space-y-2">
              <Label htmlFor="marketPrice">Market Price ($)</Label>
              <Input
                id="marketPrice"
                type="number"
                step="0.01"
                value={formData.marketPrice}
                onChange={(e) =>
                  handleInputChange('marketPrice', e.target.value)
                }
                className={errors.marketPrice ? 'ui:border-red-500' : ''}
              />
              {errors.marketPrice && (
                <p className="ui:text-sm ui:text-red-500 ui:dark:text-red-400">
                  {errors.marketPrice}
                </p>
              )}
            </div>

            <div className="ui:space-y-2">
              <Label htmlFor="yearsToMaturity">Years to Maturity</Label>
              <Input
                id="yearsToMaturity"
                type="number"
                step="0.1"
                value={formData.yearsToMaturity}
                onChange={(e) =>
                  handleInputChange('yearsToMaturity', e.target.value)
                }
                className={errors.yearsToMaturity ? 'ui:border-red-500' : ''}
              />
              {errors.yearsToMaturity && (
                <p className="ui:text-sm ui:text-red-500 ui:dark:text-red-400">
                  {errors.yearsToMaturity}
                </p>
              )}
            </div>

            <div className="ui:space-y-2">
              <Label htmlFor="couponFrequency">Coupon Frequency</Label>
              <select
                id="couponFrequency"
                value={formData.couponFrequency}
                onChange={(e) =>
                  handleInputChange('couponFrequency', e.target.value)
                }
                className="ui:flex ui:h-10 ui:w-full ui:rounded-md ui:border ui:border-input ui:bg-background ui:px-3 ui:py-2 ui:text-sm ui:ring-offset-background ui:dark:border-gray-700 ui:dark:bg-gray-800 ui:dark:text-gray-100 ui:focus-visible:outline-none ui:focus-visible:ring-2 ui:focus-visible:ring-ring ui:focus-visible:ring-offset-2"
              >
                <option value="annual">Annual</option>
                <option value="semi-annual">Semi-Annual</option>
              </select>
            </div>
          </div>

          <Button type="submit" className="ui:w-full" disabled={isLoading}>
            {isLoading ? 'Calculating...' : 'Calculate Yield'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
