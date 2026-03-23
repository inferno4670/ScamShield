<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=00ffaa&height=200&section=header&text=ScamShield&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=AI-Powered%20Scam%20Detection%20Engine&descAlignY=60&descColor=aaffdd" />

<br/>

[![Python](https://img.shields.io/badge/Python-3.10+-3776ab?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-3.x-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

<br/>

> **Paste any suspicious SMS, email, or chat message.**  
> ScamShield returns an instant **risk score**, **threat classification**, and **human-readable reasons** — all without storing a single character of your data.

<br/>

[**🚀 Try It Live**](#-getting-started) · [**📡 API Docs**](#-api-reference) · [**🧪 Test Results**](#-test-case-results) · [**🛠️ Tech Stack**](#%EF%B8%8F-tech-stack)

</div>

---

## ✨ What ScamShield Detects

<table>
<thead>
<tr>
<th>Detection Layer</th>
<th>What It Catches</th>
<th>Score Impact</th>
</tr>
</thead>
<tbody>
<tr><td>🔍 <b>Keyword Matching</b></td><td>Scam-specific words like <code>otp</code>, <code>winner</code>, <code>lottery</code>, <code>claim</code></td><td>+5 per keyword</td></tr>
<tr><td>⚡ <b>Urgency Detection</b></td><td>Pressure language — <em>act now</em>, <em>verify immediately</em>, <em>last chance</em></td><td>+15</td></tr>
<tr><td>💸 <b>Financial Manipulation</b></td><td>Money-transfer demands, payment requests, wire fraud patterns</td><td>+25</td></tr>
<tr><td>🎰 <b>Reward / Lottery</b></td><td>Prize claims, lucky draws, "you've been selected" language</td><td>+20</td></tr>
<tr><td>😱 <b>Fear / Threat</b></td><td>Device infected, data deletion threats, legal action warnings</td><td>+20</td></tr>
<tr><td>🔗 <b>URL Safety</b></td><td>Shortened links & blacklisted phishing domains</td><td>+15 / +40</td></tr>
<tr><td>🏦 <b>Impersonation</b></td><td>Bank, Microsoft, PayPal, and Government spoofing</td><td>+15 / +30</td></tr>
<tr><td>📊 <b>Formatting Anomalies</b></td><td>Excessive CAPS, multiple <code>!!!</code>, suspicious formatting</td><td>+5 / +10</td></tr>
<tr><td>₿ <b>Crypto Fraud</b></td><td>Guaranteed returns, investment programs, wallet drains</td><td>+35</td></tr>
</tbody>
</table>

### 🎯 Risk Classifications

```
Score 0 – 30   ✅  SAFE         — Legitimate message
Score 31 – 55  ⚠️  SUSPICIOUS   — Proceed with caution
Score 56 – 75  🟠  SPAM         — Likely unwanted content
Score 76 – 100 🔴  SCAM         — High-confidence threat
```

---

## 📂 Project Structure

```
ScamShield/
│
├── 🐍 backend/
│   ├── app.py              # Flask REST API + multi-layer detection engine
│   └── requirements.txt    # Python dependencies
│
└── ⚛️  frontend/
    ├── src/
    │   ├── components/
    │   │   ├── landing/    # Navbar, Hero, Features, HowItWorks, ThreeModel
    │   │   ├── Layout.tsx
    │   │   ├── ResultCard.tsx
    │   │   └── UploadBox.tsx
    │   ├── pages/
    │   │   ├── LandingPage.tsx
    │   │   ├── AnalyzerPage.tsx
    │   │   ├── DeepfakePage.tsx
    │   │   └── AboutPage.tsx
    │   ├── App.tsx
    │   └── index.css       # Design tokens & global styles
    ├── package.json
    └── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.10+
- **Node.js** 18+

### 1 — Clone

```bash
git clone https://github.com/inferno4670/ScamShield.git
cd ScamShield
```

### 2 — Start the Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
python app.py
# ✅ Running at http://localhost:5000
```

### 3 — Start the Frontend

```bash
cd frontend
npm install
npm run dev
# ✅ Running at http://localhost:5173
```

---

## 📡 API Reference

### `POST /api/analyze`

Analyze any text for scam indicators.

**Request**
```json
{
  "message": "URGENT: Your bank account has been suspended. Verify now at http://secure-bank-login.xyz"
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

**Risk score is always clamped to `[0, 100]`.**

---

## 🧪 Test Case Results

| Message Type | Score | Result |
|---|:---:|---|
| Classic Bank Phishing | `100` | 🔴 Scam |
| Crypto Investment Scam | `100` | 🔴 Scam |
| Lottery / Prize Scam | `95` | 🔴 Scam |
| Delivery Phishing | `95` | 🔴 Scam |
| OTP Theft Attempt | `90` | 🔴 Scam |
| Fake Tech Support | `85` | 🔴 Scam |
| Suspicious Tax Refund | `50` | ⚠️ Suspicious |
| Normal Personal Message | `0` | ✅ Safe |

---

## 🛠️ Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Backend**
- 🐍 [Flask 3](https://flask.palletsprojects.com) — lightweight REST API
- 🔍 Python `re` — regex URL & pattern extraction
- 🧠 Rule-based NLP pipeline — no external AI API needed
- 🔒 Zero data persistence — all analysis is in-memory

</td>
<td valign="top" width="50%">

**Frontend**
- ⚛️ [React 19](https://react.dev) + [TypeScript 5](https://typescriptlang.org)
- ⚡ [Vite 8](https://vitejs.dev) — blazing-fast dev server
- 🎨 [Tailwind CSS v4](https://tailwindcss.com) — utility-first styling
- 🌀 [Framer Motion](https://www.framer.com/motion/) — fluid animations
- 🔮 [Three.js / R3F](https://docs.pmnd.rs/react-three-fiber) — 3D hero scene
- 🎯 [Lucide React](https://lucide.dev) — crisp icon set

</td>
</tr>
</table>

---

## 🔒 Privacy First

ScamShield **never stores your messages**. All analysis happens in-memory during the HTTP request and is discarded immediately after the response is sent. No logs, no databases, no third-party calls.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

```bash
# Fork → Clone → Create feature branch → Commit → PR
git checkout -b feature/amazing-detection
git commit -m "feat: add amazing detection layer"
git push origin feature/amazing-detection
```

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=00ffaa&height=100&section=footer" />

**MIT © 2026 [inferno4670](https://github.com/inferno4670)**

*Built to keep people safe online.* 🛡️

</div>
