export const DEFAULT_INFLATION_RATE = 0.03;

export interface FireInput {
  target: number;
  current: number;
  monthlyContribution: number;
  annualBonus: number;
  annualReturnRate: number;
}

export interface ProjectionPoint {
  label: string;
  nominal: number;
  real: number;
  year: number;
}

export interface FireProjectionResult {
  monthsToTarget: number | null;
  projection: ProjectionPoint[];
}

export function calculateFireProjection(inputs: FireInput): FireProjectionResult {
  const { target, current, monthlyContribution, annualBonus, annualReturnRate } = inputs;

  const monthlyRate = Math.pow(1 + annualReturnRate, 1 / 12) - 1;
  const maxYears = 50;
  const totalMonths = maxYears * 12;

  let balance = current;
  let monthsToTarget: number | null = null;
  const projection: ProjectionPoint[] = [
    {
      label: "第0年",
      nominal: balance,
      real: balance,
      year: 0
    }
  ];

  for (let month = 1; month <= totalMonths; month += 1) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;

    if (month % 12 === 0) {
      balance += annualBonus;
    }

    if (monthsToTarget === null && balance >= target) {
      monthsToTarget = month;
    }

    if (month % 12 === 0) {
      const year = month / 12;
      const inflationFactor = Math.pow(1 + DEFAULT_INFLATION_RATE, year);
      projection.push({
        label: `第${year}年`,
        nominal: balance,
        real: balance / inflationFactor,
        year
      });
    }
  }

  return { monthsToTarget, projection };
}

export function formatDuration(months: number | null): string {
  if (months === null) {
    return "超过 50 年";
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) {
    return `${remainingMonths} 个月`;
  }

  if (remainingMonths === 0) {
    return `${years} 年`;
  }

  return `${years} 年 ${remainingMonths} 个月`;
}
