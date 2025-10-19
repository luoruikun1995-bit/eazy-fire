# 配置文件说明

本目录包含了 Eazy FIRE Calculator 的所有配置数据。**我们欢迎开源贡献者添加更多城市和退休金数据！**

## 🚀 快速贡献指南

### 方式一：GitHub网页直接编辑（推荐，无需编程）
1. 在GitHub上找到要编辑的文件
2. 点击编辑按钮（铅笔图标）
3. 修改内容后提交Pull Request
4. 等待审核通过

### 方式二：创建新配置文件
1. 点击"Add file" → "Create new file"
2. 按照现有格式创建配置
3. 提交Pull Request

## 文件结构

```
config/
├── index.ts          # 主配置文件，导入所有配置（自动更新，贡献者无需修改）
├── types.ts          # 类型定义（无需修改）
├── pension.ts        # 全球退休金数据 ⭐ 贡献者重点关注
├── cities/           # 城市数据目录 ⭐ 贡献者重点关注  
│   ├── chiang-mai.ts # 清迈数据示例（包含AI指引）
│   └── vientiane.ts  # 万象数据示例
└── README.md         # 本说明文件
```

**贡献者只需要关注标有⭐的文件！**

## 添加新城市

### 1. 创建城市配置文件

在 `cities/` 目录下创建新文件，命名格式：`city-name.ts`

例如：`cities/lisbon.ts`

### 2. 文件内容结构

```typescript
import type { CityData } from '../types';

export const lisbonData: CityData = {
  name: { CN: "葡萄牙 · 里斯本", EN: "Portugal · Lisbon" },
  incomePercentiles: {
    // 3种生活状态的收入分位数数据
    single: { p10: 8000, p20: 12000, ... },
    dink: { p10: 20000, p20: 30000, ... },
    two_children: { p10: 35000, p20: 50000, ... }
  },
  wealthMapping: {
    // 每种生活状态下的财富等级描述（可灵活配置）
    single: {
      "99%+": { level: { CN: "富人", EN: "Wealthy" }, description: { CN: "豪华生活", EN: "Luxury lifestyle" } },
      "90%+": { level: { CN: "上层中产", EN: "Upper Middle" }, description: { CN: "舒适生活", EN: "Comfortable life" } },
      "70%+": { level: { CN: "中产", EN: "Middle Class" }, description: { CN: "稳定生活", EN: "Stable life" } },
      "default": { level: { CN: "工薪阶层", EN: "Working Class" }, description: { CN: "基础生活", EN: "Basic living" } }
    },
    // ... 其他生活状态
  },
  descriptions: [
    // 城市描述列表，多个贡献者可以添加不同的描述
    {
      author: "贡献者姓名",
      date: "2024-12-19",
      content: {
        CN: "中文描述：包含城市特色、生活体验、注意事项等",
        EN: "English description: including city features, living experience, considerations, etc."
      }
    }
  ]
};
```

### 3. 自动发现和加载

**好消息：无需任何额外配置！** 

系统会自动扫描 `cities/` 文件夹中的所有 `.ts` 文件并自动加载。你只需要：
1. 创建城市配置文件  
2. 提交Pull Request
3. 合并后立即可用！

完全零维护成本！🎉

## 数据要求

### 收入分位数 (incomePercentiles)
- 所有金额单位：美元 (USD) 年收入
- 必须包含 p10, p20, p30, p40, p50, p60, p70, p80, p90, p99
- 数据应基于当地实际收入分布

### 财富等级映射 (wealthMapping)
- 推荐包含的基础收入区间：99%+, 90%+, 70%+, default
- 可根据实际需要增加更细致的分段（如80%+, 60%+, 50%+等）
- 系统会自动适配任何百分位配置，支持灵活的细分等级
- 描述应该具体，包含住房、教育、生活方式等细节
- 考虑不同家庭结构的实际需求差异

### 生活状态类型
- `single`: 单身
- `dink`: 丁克夫妻
- `two_children`: 二孩家庭

### 城市描述 (descriptions)
- 每个城市可以包含多个描述，由不同的贡献者提供
- 每个描述包含：作者、日期、中英文内容
- 描述应该包含城市特色、生活体验、注意事项等实用信息
- 项目维护者会审核并选择优质的描述展示给用户

## 🔥 退休金数据贡献指南

### 添加新的退休金数据

编辑 `pension.ts` 文件，按以下格式添加：

```typescript
{ pensionType: { CN: "法国警察退休金", EN: "France Police Pension" }, annualPension: 28000 }
```

### 命名规范
- **国家层面**: "德国退休金均值" / "Germany Average Pension"  
- **职业层面**: "法国公务员退休金" / "France Civil Servant Pension"
- **具体群体**: "中国科级公务员退休金" / "China Division-Level Civil Servant Pension"

### 数据要求
- 单位：美元年收入 (USD/year)
- 基于最新可获得数据（标注年份）
- 提供数据来源链接

## 数据来源建议

- 官方统计局数据
- 当地薪资调查报告
- 房产和生活成本数据
- 教育费用统计
- 实地调研数据

## 🎯 贡献优先级

### 高优先级城市
- **亚洲金融中心**: 新加坡、香港、东京、首尔
- **欧洲主要城市**: 柏林、阿姆斯特丹、斯德哥尔摩、苏黎世
- **北美重点城市**: 多伦多、温哥华、奥斯汀、西雅图  
- **数字游民热点**: 里斯本、墨西哥城、迪拜、巴厘岛

### 高优先级退休金数据
- 各国公务员/公职人员退休金
- 大型企业退休金计划
- 专业人士退休金（医生、教师、律师等）
- 军警退休保障制度

## 📝 贡献检查清单

**提交前请确认：**
- [ ] 数据来源可靠（政府统计、官方报告等）
- [ ] 金额已转换为美元年收入
- [ ] 中英文翻译准确
- [ ] 在PR中说明了数据来源
- [ ] （城市）包含了真实的生活描述

## 🤖 AI生成提示

如果你使用AI工具生成配置，可以这样提示：

```
请基于清迈的配置模板，为[城市名]生成FIRE计算器的城市配置。
需要包含：收入分位数、财富等级描述、城市描述。
数据要求：美元年收入，基于2024年数据，描述要具体反映当地实际情况。
```

## 🛠️ 本地测试（可选）

如果你想在本地测试配置：

```bash
git clone https://github.com/your-username/eazy-fire.git
cd eazy-fire
npm install
npm run build  # 检查配置是否正确
```

## 📞 获取帮助

- 创建Issue提问
- 查看现有城市配置作为参考  
- 在PR中@维护者获取反馈

感谢您的贡献！每一个新的城市和退休金数据都让这个工具变得更有价值。