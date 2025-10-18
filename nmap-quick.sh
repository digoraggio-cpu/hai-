#!/usr/bin/env bash
set -euo pipefail
TARGET="${1:-localhost}"
nmap -sC -sV -T4 -Pn "$TARGET" -oA nmap_quick
echo "Resultados salvos: nmap_quick.*"
