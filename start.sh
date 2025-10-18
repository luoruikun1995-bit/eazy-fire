#!/bin/bash

# Eazy FIRE Calculator - 本地测试脚本

echo "🔥 Eazy FIRE Calculator"
echo "======================="

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 快速检查
echo "🔍 代码检查..."
npm run lint

if [ $? -eq 0 ]; then
    echo "✅ 检查通过"
    echo "🚀 启动服务器..."
    echo "   访问: http://localhost:3000"
    echo "   停止: Ctrl+C"
    echo ""
    npm run dev
else
    echo "❌ 检查失败"
fi