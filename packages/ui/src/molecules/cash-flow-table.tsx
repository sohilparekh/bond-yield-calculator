'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../components/card';
import { CashFlowItem } from '../types';

interface CashFlowTableProps {
  cashFlowSchedule: CashFlowItem[];
}

export function CashFlowTable({ cashFlowSchedule }: CashFlowTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Schedule</CardTitle>
        <CardDescription>
          Payment schedule showing coupon payments and cumulative interest over
          bond&apos;s life
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="ui:overflow-x-auto">
          <table className="ui:w-full ui:border-collapse">
            <thead>
              <tr className="ui:border-b">
                <th className="ui:text-left ui:p-3 ui:font-semibold ui:text-gray-700 ui:dark:text-gray-300">
                  Period
                </th>
                <th className="ui:text-left ui:p-3 ui:font-semibold ui:text-gray-700 ui:dark:text-gray-300">
                  Payment Date
                </th>
                <th className="ui:text-right ui:p-3 ui:font-semibold ui:text-gray-700 ui:dark:text-gray-300">
                  Coupon Payment
                </th>
                <th className="ui:text-right ui:p-3 ui:font-semibold ui:text-gray-700 ui:dark:text-gray-300">
                  Cumulative Interest
                </th>
                <th className="ui:text-right ui:p-3 ui:font-semibold ui:text-gray-700 ui:dark:text-gray-300">
                  Remaining Principal
                </th>
              </tr>
            </thead>
            <tbody>
              {cashFlowSchedule.map((item: CashFlowItem, index: number) => (
                <tr
                  key={item.period}
                  className={`ui:border-b ${index % 2 === 0 ? 'ui:bg-gray-50' : 'ui:bg-white'} ui:dark:bg-gray-800 ui:dark:hover:bg-blue-900/20 ui:transition-colors`}
                >
                  <td className="ui:p-3 ui:font-medium ui:text-gray-900 ui:dark:text-gray-100">
                    {item.period}
                  </td>
                  <td className="ui:p-3 ui:text-gray-700 ui:dark:text-gray-300">
                    {formatDate(item.paymentDate)}
                  </td>
                  <td className="ui:p-3 ui:text-right ui:font-mono ui:text-green-600 ui:dark:text-green-400">
                    {formatCurrency(item.couponPayment)}
                  </td>
                  <td className="ui:p-3 ui:text-right ui:font-mono ui:text-blue-600 ui:dark:text-blue-400">
                    {formatCurrency(item.cumulativeInterest)}
                  </td>
                  <td className="ui:p-3 ui:text-right ui:font-mono ui:text-gray-700 ui:dark:text-gray-300">
                    {formatCurrency(item.remainingPrincipal)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="ui:bg-gray-100 ui:font-semibold ui:dark:bg-gray-800 ui:dark:hover:bg-blue-900/20">
                <td
                  colSpan={2}
                  className="ui:p-3 ui:text-gray-700 ui:dark:text-gray-300"
                >
                  Total
                </td>
                <td className="ui:p-3 ui:text-right ui:font-mono ui:text-green-600 ui:dark:text-green-400">
                  {formatCurrency(
                    cashFlowSchedule.reduce(
                      (sum: number, item: CashFlowItem) =>
                        sum + item.couponPayment,
                      0,
                    ),
                  )}
                </td>
                <td className="ui:p-3 ui:text-right ui:font-mono ui:text-blue-600 ui:dark:text-blue-400">
                  {formatCurrency(
                    cashFlowSchedule[cashFlowSchedule.length - 1]
                      ?.cumulativeInterest || 0,
                  )}
                </td>
                <td className="ui:p-3 ui:text-right ui:font-mono ui:text-gray-700 ui:dark:text-gray-300">
                  {formatCurrency(0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {cashFlowSchedule.length > 0 && (
          <div className="ui:mt-4 ui:p-4 ui:bg-blue-50 ui:dark:bg-blue-900/20 ui:rounded-lg">
            <h4 className="ui:font-semibold ui:text-blue-900 ui:dark:text-blue-100 ui:mb-2">
              Summary
            </h4>
            <div className="ui:grid ui:grid-cols-1 ui:md:grid-cols-3 ui:gap-4 ui:text-sm">
              <div>
                <span className="ui:text-gray-600 ui:dark:text-gray-400">
                  Total Periods:
                </span>
                <span className="ui:ml-2 ui:font-semibold ui:text-blue-900 ui:dark:text-blue-100">
                  {cashFlowSchedule.length}
                </span>
              </div>
              <div>
                <span className="ui:text-gray-600 ui:dark:text-gray-400">
                  Total Coupon Payments:
                </span>
                <span className="ui:ml-2 ui:font-semibold ui:text-green-700 ui:dark:text-green-400">
                  {formatCurrency(
                    cashFlowSchedule.reduce(
                      (sum: number, item: CashFlowItem) =>
                        sum + item.couponPayment,
                      0,
                    ),
                  )}
                </span>
              </div>
              <div>
                <span className="ui:text-gray-600 ui:dark:text-gray-400">
                  Final Payment Date:
                </span>
                <span className="ui:ml-2 ui:font-semibold ui:text-blue-900 ui:dark:text-blue-100">
                  {formatDate(
                    cashFlowSchedule[cashFlowSchedule.length - 1]
                      ?.paymentDate || '',
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
