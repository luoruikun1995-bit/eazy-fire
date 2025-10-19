# Eazy FIRE Calculator

A modern, interactive FIRE (Financial Independence, Retire Early) calculator built with Next.js 14. **We welcome open source contributions!**

## Features

- 🧮 Interactive FIRE calculation with real-time updates
- 📊 Growth projection charts showing nominal vs inflation-adjusted values  
- 🌍 Income level analysis based on local city data
- 🌐 Multi-language support (English/Chinese)
- 📱 Responsive design with smooth animations
- 💾 Cookie-based data persistence
- 🏆 Dynamic pension comparison across 21 countries

## 🤝 Contributing (We Need Your Help!)

We're looking for contributors to expand our global coverage! You can help by:

### 1. 🏙️ Adding New Cities
- Add income and cost of living data for your city
- Just create a single config file, no coding required!
- Perfect for: Local residents, HR professionals, financial advisors

### 2. 💰 Adding Pension Data  
- Add retirement benefit data for different countries/professions
- Examples: "French Police Pension", "Singapore CPF", "Japanese Corporate Pension"
- Just edit one config file!

### 3. ✨ Sharing City Descriptions
- Add real-world living experiences for cities
- Help FIRE enthusiasts understand what life is really like

**👉 See our [Contribution Guide](#contribution-guide) below for step-by-step instructions.**

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript  
- **Styling**: CSS Modules
- **Charts**: Chart.js with react-chartjs-2
- **Animations**: Framer Motion
- **Data Storage**: Browser cookies

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/eazy-fire.git
cd eazy-fire
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📖 Contribution Guide

### 🎯 Super Easy: GitHub Web Interface (Recommended)

**No coding knowledge required! Just edit files directly on GitHub:**

#### Adding a New City
1. Go to `config/cities/` folder on GitHub
2. Click "Add file" → "Create new file" 
3. Name it `your-city.ts` (e.g., `singapore.ts`)
4. Copy the template from `chiang-mai.ts` and modify the data
5. Submit a Pull Request
6. **That's it!** Your city will be automatically available once merged! 🎉

#### Adding Pension Data
1. Go to `config/pension.ts` on GitHub
2. Click the edit (pencil) icon
3. Add your pension data following the existing format:
```typescript
{ pensionType: { CN: "新加坡公积金", EN: "Singapore CPF" }, annualPension: 15000 }
```
4. Submit a Pull Request

#### Adding City Descriptions  
1. Find your city file in `config/cities/`
2. Click edit and add to the `descriptions` array
3. Submit a Pull Request

### 🔧 Advanced: Local Development

If you want to test locally:

1. Fork the repository
2. Clone your fork
3. Make changes to config files
4. Test with `npm run build` 
5. Submit a Pull Request

### 📋 Data Requirements

- **Income Data**: Annual amounts in USD
- **Pension Data**: Annual benefits in USD
- **Sources**: Please mention your data sources in the PR
- **Accuracy**: We prioritize reliable, recent data

### 🌟 What We're Looking For

**High Priority Cities:**
- Major Asian financial hubs (Singapore, Hong Kong, Tokyo)
- European capitals (Berlin, Amsterdam, Stockholm)  
- North American cities (Toronto, Vancouver, Austin)
- Digital nomad hotspots (Lisbon, Mexico City, Dubai)

**High Priority Pension Data:**
- Public sector pensions by country
- Major corporate pension schemes
- Social security systems worldwide
- Professional pension plans (doctors, teachers, etc.)

## 📁 Project Structure

```
config/
├── cities/           # City-specific data
├── pension.ts        # Global pension data  
├── types.ts          # Type definitions
└── README.md         # Detailed config guide
```

## 🤖 AI-Friendly

This project is designed to work well with AI tools! The config files include detailed comments to help AI generate accurate configurations for new cities.

## 📄 License

MIT License - see LICENSE file for details.

---

**💡 Pro Tip**: Start by adding data for your own city or country - you'll have the best local knowledge!
