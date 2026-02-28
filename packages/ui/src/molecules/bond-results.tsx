'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/card';
import { BondCalculationResult } from '../types';

interface BondResultsProps {
  results: BondCalculationResult;
}

export function BondResults({ results }: BondResultsProps) {
  const getPremiumDiscountColor = (status: string) => {
    switch (status) {
      case 'premium':
        return 'ui:text-green-600';
      case 'discount':
        return 'ui:text-red-600';
      default:
        return 'ui:text-gray-600';
    }
  };

  const getPremiumDiscountIcon = (status: string) => {
    switch (status) {
      case 'premium':
        return '▲';
      case 'discount':
        return '▼';
      default:
        return '●';
    }
  };

  return (
    <div className="ui:space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Yield Calculations</CardTitle>
          <CardDescription>
            Key metrics for bond performance analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="ui:grid ui:grid-cols-1 ui:md:grid-cols-2 ui:lg:grid-cols-4 ui:gap-6">
            <div className="ui:space-y-2">
              <h3 className="ui:text-sm ui:font-medium ui:text-gray-500 ui:dark:text-gray-400">
                Current Yield
              </h3>
              <p className="ui:text-2xl ui:font-bold ui:text-blue-600 ui:dark:text-blue-400">
                {results.currentYield}%
              </p>
              <p className="ui:text-xs ui:text-gray-500 ui:dark:text-gray-400">
                Annual coupon payment ÷ Current market price
              </p>
            </div>

            <div className="ui:space-y-2">
              <h3 className="ui:text-sm ui:font-medium ui:text-gray-500 ui:dark:text-gray-400">
                Yield to Maturity
              </h3>
              <p className="ui:text-2xl ui:font-bold ui:text-purple-600 ui:dark:text-purple-400">
                {results.yieldToMaturity}%
              </p>
              <p className="ui:text-xs ui:text-gray-500 ui:dark:text-gray-400">
                Total return if held to maturity
              </p>
            </div>

            <div className="ui:space-y-2">
              <h3 className="ui:text-sm ui:font-medium ui:text-gray-500 ui:dark:text-gray-400">
                Total Interest Earned
              </h3>
              <p className="ui:text-2xl ui:font-bold ui:text-green-600 ui:dark:text-green-400">
                ${results.totalInterestEarned.toLocaleString()}
              </p>
              <p className="ui:text-xs ui:text-gray-500 ui:dark:text-gray-400">
                Over the life of the bond
              </p>
            </div>

            <div className="ui:space-y-2">
              <h3 className="ui:text-sm ui:font-medium ui:text-gray-500 ui:dark:text-gray-400">
                Price Status
              </h3>
              <div className="ui:flex ui:items-center ui:space-x-2">
                <span
                  className={`ui:text-2xl ui:font-bold ui:dark:text-white ${getPremiumDiscountColor(results.premiumOrDiscount)}`}
                >
                  {getPremiumDiscountIcon(results.premiumOrDiscount)}
                </span>
                <span
                  className={`ui:text-lg ui:font-semibold ui:capitalize ui:dark:text-white ${getPremiumDiscountColor(results.premiumOrDiscount)}`}
                >
                  {results.premiumOrDiscount}
                </span>
              </div>
              <p className="ui:text-xs ui:text-gray-500 ui:dark:text-gray-400">
                {results.premiumOrDiscount === 'premium' &&
                  'Trading above face value'}
                {results.premiumOrDiscount === 'discount' &&
                  'Trading below face value'}
                {results.premiumOrDiscount === 'par' && 'Trading at face value'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
