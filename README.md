<div align="center">

# 🛡️ ScamShield

**AI-powered scam detection engine for SMS, email, and chat messages.**

[![Python](https://img.shields.io/badge/Python-3.10+-3776ab?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)

> Paste any suspicious SMS, email snippet, or chat message — ScamShield instantly returns a **risk score**, **classification**, and **explainable reasons**.

</div>

---

## ✨ Features

| Layer | What it detects | Score boost |
|---|---|---|
| 🔍 Keyword Matching | Scam-specific words (`otp`, `winner`, `lottery`, etc.) | +5 per keyword |
| ⚡ Urgency Detection | Pressure language (`act now`, `verify immediately`) | +15 |
| 💸 Financial Manipulation | Money-transfer & payment demands | +25 |
| 🎰 Reward / Lottery | Prize claims & lucky draw language | +20 |
| 😱 Fear / Threat | Device infected, data loss threats | +20 |
| 🔗 URL Safety | Shortened links, blacklisted phishing domains | +15 / +40 |
| 🏦 Impersonation | Bank, Microsoft, PayPal, Government spoofing | +15 / +30 |
| 📊 Formatting Anomalies | Excessive caps, multiple `!!!` | +5 / +10 |
| ₿ Crypto Fraud | Guaranteed returns, investment programs | +35 |

### Risk Classifications

| Score | Label |
|---|---|
| 0 – 30 | ✅ **Safe** |
| 31 – 55 | ⚠️ **Suspicious** |
| 56 – 75 | 🟠 **Spam** |
| 76 – 100 | 🔴 **Scam / Phishing** |

---

## 🗂️ Project Structure

```
ScamShield/
├── backend/
│   ├── app.py            # Flask API + multi-layer detection engine
│   └── requirements.txt  # Python dependencies
└── frontend/
    ├── src/
    │   ├── components/   # RiskMeter, Layout, FloatingBackground
    │   ├── pages/        # LandingPage, AnalyzerPage, AboutPage
    │   └── App.tsx
    ├── package.json
    └── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+

### 1. Clone the repository

```bash
git clone https://github.com/inferno4670/ScamShield.git
cd ScamShield
```

### 2. Start the Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
```

The backend will be running at **http://localhost:5000**

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be running at **http://localhost:5173**

---

## 📡 API Reference

### `POST /api/analyze`

Analyze any text message for scam indicators.

**Request**
```json
{
  "message": "URGENT: Your bank account has been suspended. Verify now at http://secure-bank-login.com"
}
```

**Response**
```json
{
  "classification": "Scam",
  "risk_score": 100,
  "reasons": [
    "Scam keyword detected: 'urgent'",
    "Urgent or pressure language detected",
    "Suspicious phishing domain detected",
    "Institution impersonation with suspicious link"
  ]
}
```

---

## 🧪 Test Case Results

| Test | Score | Result |
|---|---|---|
| Classic Bank Phishing | 100 | 🔴 Scam |
| Lottery Scam | 95 | 🔴 Scam |
| Delivery Phishing | 95 | 🔴 Scam |
| Crypto Investment Scam | 100 | 🔴 Scam |
| OTP Theft | 90 | 🔴 Scam |
| Fake Tech Support | 85 | 🔴 Scam |
| Suspicious Tax Refund | 50 | ⚠️ Suspicious |
| Safe Message | 0 | ✅ Safe |

---

## 🛠️ Tech Stack

**Backend**
- [Flask](https://flask.palletsprojects.com) — lightweight REST API
- Python `re` — regex URL & pattern extraction
- Rule-based NLP pipeline (no external AI API required)

**Frontend**
- [React 19](https://react.dev) + [TypeScript](https://typescriptlang.org)
- [Vite 8](https://vitejs.dev) — blazing-fast dev server
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Lucide React](https://lucide.dev) — icons

---

## 🔒 Privacy

ScamShield **never stores your messages**. All analysis happens in-memory during the request and is discarded immediately after the response is returned.

---

## 📄 License

MIT © 2026 [inferno4670](https://github.com/inferno4670)
