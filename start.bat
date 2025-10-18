@echo off
:: Eazy FIRE Calculator - 本地测试脚本 (Windows版本)

echo 🔥 Eazy FIRE Calculator
echo =======================

:: 检查依赖
if not exist "node_modules" (
    echo 📦 安装依赖...
    npm install
)

:: 快速检查
echo 🔍 代码检查...
npm run lint

if %errorlevel% equ 0 (
    echo ✅ 检查通过
    echo 🚀 启动服务器...
    echo    访问: http://localhost:3000
    echo    停止: Ctrl+C
    echo.
    npm run dev
) else (
    echo ❌ 检查失败
)