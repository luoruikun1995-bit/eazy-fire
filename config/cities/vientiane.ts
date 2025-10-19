import type { CityData } from '../types';

/**
 * 万象城市数据配置 - 基于2024年实际数据
 * 
 * 万象（Vientiane）是老挝人民民主共和国的首都和最大城市，位于湄公河畔。
 * 
 * 城市特色：
 * - 人口：约100万（含周边地区），市区约70万
 * - 气候：热带季风气候，全年平均28°C
 * - 经济：服务业为主，政府部门集中，旅游业重要
 * - 人均年收入：约3,000美元（首都地区）
 * - 数字游民月预算：约700-900美元
 * 
 * 生活特点：
 * - 极低生活成本，适合预算有限的FIRE人士
 * - 湄公河沿岸风光，法式殖民建筑
 * - 佛教文化浓厚，生活节奏缓慢
 * - 外籍人士社区较小但紧密
 * - 网络基础设施相对落后
 * 
 * 注意事项：
 * - 互联网速度慢且不稳定，不适合需要高网络质量的远程工作
 * - 医疗设施有限，重病需要到泰国治疗
 * - 经济正面临债务危机，货币贬值严重
 * - 雨季（5-10月）洪水风险较高
 * 
 * 数据来源：世界银行、NomadList、老挝统计局、IMF报告
 */
export const vientianeData: CityData = {
  name: { CN: "老挝 · 万象", EN: "Laos · Vientiane" },
  incomePercentiles: {
    // 基于万象实际人均收入3,000美元和当地工资水平调整
    single: { p10: 1200, p20: 1800, p30: 2400, p40: 3000, p50: 3600, p60: 4500, p70: 5700, p80: 7200, p90: 9600, p99: 18000 },
    dink: { p10: 3000, p20: 4500, p30: 6000, p40: 7500, p50: 9000, p60: 11000, p70: 13500, p80: 17000, p90: 22000, p99: 40000 },
    two_children: { p10: 5000, p20: 7500, p30: 10000, p40: 12500, p50: 15000, p60: 18000, p70: 22000, p80: 27000, p90: 35000, p99: 65000 }
  },
  wealthMapping: {
    single: {
      "99%+": { 
        level: { CN: "富人", EN: "Wealthy" }, 
        description: { 
          CN: "湄公河畔别墅，私人花园和泳池。享受法式餐厅，私人司机，定期去泰国购物和医疗。在老挝属于绝对富裕阶层，生活品质接近西方标准", 
          EN: "Mekong riverside villa with private garden and pool. French restaurant dining, private driver, regular Thailand trips for shopping and healthcare. Absolute wealth in Laos, Western-standard lifestyle" 
        } 
      },
      "90%+": { 
        level: { CN: "上层中产", EN: "Upper Middle" }, 
        description: { 
          CN: "市中心现代公寓，摩托车或小车代步。每周法式餐厅，定期去泰国旅行。生活舒适，有足够储蓄，享受万象最好的生活水准", 
          EN: "Central modern apartment, motorbike or small car transport. Weekly French dining, regular Thailand travel. Comfortable living, good savings, enjoying Vientiane's best lifestyle" 
        } 
      },
      "70%+": { 
        level: { CN: "中产", EN: "Middle Class" }, 
        description: { 
          CN: "不错的公寓，摩托车出行，偶尔外出就餐。有基本储蓄，每年几次短途旅行，享受万象相对舒适的中产生活", 
          EN: "Decent apartment, motorbike transport, occasional dining out. Basic savings, few short trips per year, enjoying relatively comfortable middle-class life in Vientiane" 
        } 
      },
      "default": { 
        level: { CN: "工薪阶层", EN: "Working Class" }, 
        description: { 
          CN: "简单住房，步行或自行车出行，主要吃本地菜。精打细算，偶尔去寺庙和公园，体验万象朴素的佛教文化生活", 
          EN: "Simple housing, walking or bicycle transport, mainly local cuisine. Budget-conscious, occasional temple and park visits, experiencing Vientiane's modest Buddhist cultural life" 
        } 
      }
    },
    dink: {
      "99%+": { 
        level: { CN: "富人", EN: "Wealthy" }, 
        description: { 
          CN: "豪华别墅，双车配置，私人泳池。雇佣保姆和厨师，频繁去泰国和越南度假。在老挝属于顶级富豪，享受超出本地标准的奢华生活", 
          EN: "Luxury villa, dual car setup, private pool. Employ housekeeper and chef, frequent Thailand and Vietnam vacations. Top-tier wealth in Laos, luxury far beyond local standards" 
        } 
      },
      "90%+": { 
        level: { CN: "上层中产", EN: "Upper Middle" }, 
        description: { 
          CN: "高档公寓或小别墅，汽车代步，经常外出就餐。双收入稳定，定期去邻国旅行，生活品质在万象属于上层水平", 
          EN: "Upscale apartment or small villa, car transport, frequent dining out. Stable dual income, regular neighboring country travel, upper-tier lifestyle in Vientiane" 
        } 
      },
      "70%+": { 
        level: { CN: "中产", EN: "Middle Class" }, 
        description: { 
          CN: "现代公寓，摩托车或小车，混合本地和国际餐饮。双收入家庭，有储蓄和投资，生活稳定舒适", 
          EN: "Modern apartment, motorbike or small car, mix of local and international dining. Dual-income household, savings and investments, stable comfortable living" 
        } 
      },
      "default": { 
        level: { CN: "工薪阶层", EN: "Working Class" }, 
        description: { 
          CN: "基础住房，摩托车出行，主要家庭烹饪。收入一般，偶尔小额储蓄，主要享受万象低廉的生活成本优势", 
          EN: "Basic housing, motorbike transport, mainly home cooking. Modest income, occasional small savings, mainly enjoying Vientiane's low cost of living advantage" 
        } 
      }
    },
    two_children: {
      "99%+": { 
        level: { CN: "富人", EN: "Wealthy" }, 
        description: { 
          CN: "最豪华的别墅区，私人泳池花园，保姆和司机。孩子就读国际学校或直接送到泰国读书，享受老挝最顶级的家庭生活水准", 
          EN: "Most luxurious villa district, private pool and garden, nanny and driver. Children in international schools or sent to Thailand for education, top-tier family lifestyle in Laos" 
        } 
      },
      "90%+": { 
        level: { CN: "上层中产", EN: "Upper Middle" }, 
        description: { 
          CN: "大户型公寓或别墅，有车，孩子上当地最好的学校。家庭收入稳定，经常全家去泰国或越南旅行，享受高品质家庭生活", 
          EN: "Large apartment or villa, car ownership, children in best local schools. Stable family income, frequent family trips to Thailand or Vietnam, high-quality family life" 
        } 
      },
      "70%+": { 
        level: { CN: "中产", EN: "Middle Class" }, 
        description: { 
          CN: "三房公寓，摩托车或小车，孩子上私立学校。家庭收入中等，有教育储蓄，偶尔全家短途旅行", 
          EN: "3-bedroom apartment, motorbike or small car, children in private schools. Middle family income, education savings, occasional family short trips" 
        } 
      },
      "default": { 
        level: { CN: "工薪阶层", EN: "Working Class" }, 
        description: { 
          CN: "基础家庭住房，摩托车出行，孩子上公立学校。收入有限，精打细算，主要依靠万象的低生活成本抚养家庭", 
          EN: "Basic family housing, motorbike transport, children in public schools. Limited income, budget-conscious, relying on Vientiane's low living costs for family raising" 
        } 
      }
    }
  },
  descriptions: [
    {
      author: "项目维护者",
      date: "2024-12-19",
      content: {
        CN: "万象是老挝的首都，生活成本极低，适合预算有限的FIRE人士。湄公河沿岸风光优美，佛教文化浓厚，但网络基础设施相对落后，不太适合需要高网络质量的远程工作。医疗资源有限，重病需要到泰国治疗。",
        EN: "Vientiane is the capital of Laos with extremely low cost of living, suitable for budget-conscious FIRE practitioners. Beautiful Mekong riverside scenery and rich Buddhist culture, but internet infrastructure is relatively poor, not ideal for remote work requiring high-quality connectivity. Limited medical resources, serious illnesses require treatment in Thailand."
      }
    }
  ]
};