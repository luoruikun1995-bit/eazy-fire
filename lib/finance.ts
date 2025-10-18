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

  // 首先计算达到FIRE目标需要多少时间
  for (let month = 1; month <= totalMonths; month += 1) {
    balance = balance * (1 + monthlyRate) + monthlyContribution;

    if (month % 12 === 0) {
      balance += annualBonus;
    }

    if (monthsToTarget === null && balance >= target) {
      monthsToTarget = month;
      break;
    }
  }

  // 如果无法在50年内达到目标，返回空投影
  if (monthsToTarget === null) {
    return { monthsToTarget, projection: [] };
  }

  // 从FIRE达成时间点开始计算后续增长
  const fireYears = monthsToTarget / 12;
  const fireInflationFactor = Math.pow(1 + DEFAULT_INFLATION_RATE, fireYears);
  
  const projection: ProjectionPoint[] = [
    {
      label: "0",
      nominal: target,
      real: target / fireInflationFactor,
      year: 0
    }
  ];

  // 从FIRE达成后开始，只有投资回报，不再有新的储蓄投入
  let postFireBalance = target;
  const projectionYears = 40; // 显示FIRE后40年的增长

  for (let year = 1; year <= projectionYears; year++) {
    // FIRE后只有投资回报，不再投入新资金
    postFireBalance = postFireBalance * (1 + annualReturnRate);
    
    const totalYearsFromStart = fireYears + year;
    const inflationFactor = Math.pow(1 + DEFAULT_INFLATION_RATE, totalYearsFromStart);
    
    projection.push({
      label: year.toString(),
      nominal: postFireBalance,
      real: postFireBalance / inflationFactor,
      year
    });
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
