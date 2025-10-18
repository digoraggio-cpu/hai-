# Pentest Autorizado — PLAYBOOK (Hacksystem)

> **Atenção:** só execute testes de segurança em ambientes que você possui ou para os quais tem autorização escrita. Este playbook é para **pentest autorizado**.

## 1) Escopo e Autorizações
- [ ] Definir domínios, subdomínios, IPs e apps-alvo
- [ ] Out-of-scope (ex.: serviços de terceiros, infra compartilhada, produção sem janela)
- [ ] Janela de teste e contatos de emergência
- [ ] Assinaturas: responsável técnico, responsável legal

## 2) Ameaças & Técnicas (OWASP Top 10 +)
- A01: Broken Access Control
- A02: Cryptographic Failures
- A03: Injection (SQLi, NoSQLi)
- A04: Insecure Design
- A05: Security Misconfiguration
- A07: Identification and Authentication Failures
- A08: Software and Data Integrity Failures
- A09: Security Logging and Monitoring Failures
- A10: SSRF

## 3) Ferramentas (baseline)
- OWASP ZAP (varredura passiva/ativa controlada)
- nmap (levantamento de portas/serviços)
- feroxbuster/dirsearch (enumeração de paths)
- nuclei (templates de segurança)

## 4) Execução — exemplos
### 4.1 ZAP baseline
```
./security/scripts/zap-baseline.sh https://seu-dominio.com
```
### 4.2 nmap rápido
```
./security/scripts/nmap-quick.sh alvo.com
```

## 5) Relato e Remediação
- Classificar achados por severidade (CVSS)
- Associar recomendações práticas (CSP, headers, rate-limit, patches)
- Retestes pós-correção

## 6) Política de Divulgação Responsável
- Prazos para correção, canais de contato, agradecimentos

