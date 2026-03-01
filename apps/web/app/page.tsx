'use client';

import { useState } from 'react';
import {
  BondCalculationResult,
  BondCalculatorForm,
  BondInput,
  BondResults,
  CashFlowTable,
} from '@repo/ui/index';

export default function Home() {
  const [results, setResults] = useState<BondCalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (
    input: BondInput,
  ): Promise<BondCalculationResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

      const response = await fetch(`${apiUrl}/bond/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`,
        );
      }

      const result = await response.json();
      setResults(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to calculate bond yield';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Bond Yield Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate bond yields, current yield, yield to maturity, and
            generate detailed cash flow schedules. Perfect for investment
            analysis and financial planning.
          </p>
        </div>

        <div className="space-y-8">
          <BondCalculatorForm
            onCalculate={handleCalculate}
            isLoading={isLoading}
          />

          {error && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
                <div className="flex">
                  <div className="shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                      Calculation Error
                    </h3>
                    <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {results && (
            <>
              <BondResults results={results} />
              <CashFlowTable cashFlowSchedule={results.cashFlowSchedule} />
            </>
          )}
        </div>

        <div className="mt-16 text-center text-gray-500 text-sm dark:text-gray-400">
          <p>
            Built with Next.js, NestJS, TypeScript, and shadcn/ui components
          </p>
        </div>
      </div>
    </div>
  );
}
