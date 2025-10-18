export type Language = "CN" | "EN";

export interface Translations {
  // 页面标题和主要内容
  fireGoalSetting: string;
  targetSavingsAmount: string;
  currentSavings: string;
  monthlyContribution: string;
  annualBonusContribution: string;
  expectedAnnualReturn: string;
  fireLifestyleRatio: string;
  
  // 现金流与收益
  cashflowAndReturn: string;
  
  // 预计达成时间
  estimatedTimeToTarget: string;
  assumingAnnualReturn: string;
  inflation: string;
  
  // 图表相关
  assetGrowthTrajectory: string;
  toYear: string;
  postFireGrowth: string;
  nominalAmount: string;
  realPurchasingPower: string;
  inflationAssumption: string;
  
  // 预算相关
  fireBudget: string;
  monthlyExpenses: string;
  
  // 参考数据
  dataLastUpdated: string;
  europeanPensionMedians: string;
  fireCityCivilServiceIncome: string;
  popularFireCitiesCivilServiceIncome: string;
  perYear: string;
  
  // 图表标签
  nominalAssets: string;
  inflationAdjusted: string;
  time: string;
  inflationImpact: string;
  
  // 单位
  currency: string;
  percentage: string;
}

export const translations: Record<Language, Translations> = {
  CN: {
    fireGoalSetting: "FIRE 目标设定",
    targetSavingsAmount: "目标存款规模",
    currentSavings: "现有存款",
    monthlyContribution: "每月定存",
    annualBonusContribution: "年终奖定存",
    expectedAnnualReturn: "预期年回报率（%）",
    fireLifestyleRatio: "FIRE 生活支出占比（%）",
    
    cashflowAndReturn: "现金流与收益假设",
    
    estimatedTimeToTarget: "预计达成时间",
    assumingAnnualReturn: "假设年化收益",
    inflation: "通胀",
    
    assetGrowthTrajectory: "FIRE后资产增长轨迹（至",
    toYear: "）",
    postFireGrowth: "FIRE后资产增长",
    nominalAmount: "名义金额",
    realPurchasingPower: "真实购买力",
    inflationAssumption: "通胀假设 3%",
    
    fireBudget: "FIRE 生活预算",
    monthlyExpenses: "月度支出",
    
    dataLastUpdated: "数据更新时间：",
    europeanPensionMedians: "欧洲主要国家退休金中位数",
    fireCityCivilServiceIncome: "热门 FIRE 城市中级公务员收入",
    popularFireCitiesCivilServiceIncome: "热门 FIRE 城市中级公务员收入",
    perYear: " / 年",
    
    nominalAssets: "名义资产",
    inflationAdjusted: "经通胀调整",
    time: "时间: ",
    inflationImpact: "通胀影响: ",
    
    currency: "",
    percentage: "%"
  },
  
  EN: {
    fireGoalSetting: "FIRE Goal Setting",
    targetSavingsAmount: "Target Savings Amount",
    currentSavings: "Current Savings",
    monthlyContribution: "Monthly Contribution",
    annualBonusContribution: "Annual Bonus Contribution",
    expectedAnnualReturn: "Expected Annual Return (%)",
    fireLifestyleRatio: "FIRE Lifestyle Ratio (%)",
    
    cashflowAndReturn: "Cashflow & Return Assumptions",
    
    estimatedTimeToTarget: "Estimated Time to Target",
    assumingAnnualReturn: "Assuming annual return",
    inflation: "inflation",
    
    assetGrowthTrajectory: "Post-FIRE Asset Growth (to",
    toYear: ")",
    postFireGrowth: "Post-FIRE Asset Growth",
    nominalAmount: "Nominal Amount",
    realPurchasingPower: "Real Purchasing Power",
    inflationAssumption: "3% Inflation Assumed",
    
    fireBudget: "FIRE Budget",
    monthlyExpenses: "Monthly expenses",
    
    dataLastUpdated: "Data last updated: ",
    europeanPensionMedians: "European Pension Medians",
    fireCityCivilServiceIncome: "Popular FIRE Cities Civil Service Income",
    popularFireCitiesCivilServiceIncome: "Popular FIRE Cities Civil Service Income",
    perYear: " / year",
    
    nominalAssets: "Nominal Assets",
    inflationAdjusted: "Inflation Adjusted",
    time: "Time: ",
    inflationImpact: "Inflation Impact: ",
    
    currency: "",
    percentage: "%"
  }
};

export function getTranslation(language: Language, key: keyof Translations): string {
  return translations[language][key];
}