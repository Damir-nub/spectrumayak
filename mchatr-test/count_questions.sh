#!/bin/bash
echo "Анализ методик в index-all.html:"
echo

# M-CHAT-R + FAST (из methods-data.js)
mchr=$(grep -c '"num":' methods-data.js 2>/dev/null || echo "0")
echo "M-CHAT-R + FAST (methods-data.js): $mchr вопросов"

# QABF
qabf=$(awk '/id: "qabf"/,/id: "mas"/' index-all.html | grep -c '"num":')
echo "QABF: $qabf вопросов"

# MAS
mas=$(awk '/id: "mas"/,/id: "scq"/' index-all.html | grep -c '"num":')
echo "MAS: $mas вопросов"

# SCQ
scq=$(awk '/id: "scq"/,/id: "sensory"/' index-all.html | grep -c '"num":')
echo "SCQ: $scq вопросов"

# Sensory
sensory=$(awk '/id: "sensory"/,/id: "milestones"/' index-all.html | grep -c '"num":')
echo "Сенсорный профиль: $sensory вопросов"

# Milestones
milestones=$(awk '/id: "milestones"/,/id: "brief"/' index-all.html | grep -c '"num":')
echo "Milestones: $milestones вопросов"

# BRIEF
brief=$(awk '/id: "brief"/,/id: "conners"/' index-all.html | grep -c '"num":')
echo "BRIEF-2: $brief вопросов"

# Conners
conners=$(awk '/id: "conners"/,/}\s*]\s*;/' index-all.html | grep -c '"num":')
echo "Conners-3: $conners вопросов"

echo
total=$((mchr + qabf + mas + scq + sensory + milestones + brief + conners))
echo "ИТОГО: $total вопросов"
