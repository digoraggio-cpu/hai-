#!/usr/bin/env bash
set -euo pipefail
TARGET="${1:-http://localhost:3000}"
docker run --rm -t owasp/zap2docker-stable zap-baseline.py -t "$TARGET" -m 5 -r zap_report.html
echo "Relatório gerado: zap_report.html"
