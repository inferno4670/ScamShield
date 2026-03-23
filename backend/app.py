import re
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# ─────────────────────────────────────────────
# Step 2: Keyword Pattern Detection  (+5 each)
# ─────────────────────────────────────────────
SCAM_KEYWORDS = [
    'urgent', 'verify', 'click here', 'limited time', 'winner',
    'lottery', 'claim prize', 'bank alert', 'account suspended',
    'gift card', 'otp', 'tax refund', 'crypto investment',
    'contact our agent', 'selected as the winner',
    'guaranteed profit', 'weekly profit', 'investment program',
    'kyc update', 'kyc verification', 'data loss', 'virus detected',
    'device infected', 'tech support', 'shipping information',
    'package delivery failed', 'incomplete address',
    'pending refund', 'submit your details', 'claim your refund',
    'professional trader', 'guaranteed returns',
    'professional crypto trader', 'earn guaranteed',
    'security support', 'infected with a virus', 'reply with the otp',
    'account suspension', 'avoid account suspension',
    'call microsoft', 'call apple', 'prevent data loss',
]

# ──────────────────────────────────────────────────
# Step 3: Urgency / Pressure Detection  (+15)
# ──────────────────────────────────────────────────
URGENCY_WORDS = [
    'act now', 'immediately', 'final warning', 'limited time',
    'verify now', 'last chance', 'contact our agent immediately',
    'avoid permanent closure', 'prevent data loss',
    'limited slots', 'avoid account suspension',
    'receive your refund today',
]

# ──────────────────────────────────────────────────
# Step 4: Financial Manipulation Detection  (+25)
# ──────────────────────────────────────────────────
FINANCIAL_WORDS = [
    'send money', 'transfer funds', 'bank verification',
    'gift card payment', 'crypto payment', 'tax refund claim',
    'claim your reward now', 'earn guaranteed', 'weekly profit',
    'investment program', 'earn profit', 'guaranteed returns',
    'submit your details', 'claim your refund',
    'reply with the otp', 'share your otp', 'kyc verification',
    'complete your kyc',
]

# ────────────────────────────────────────────────
# Step 5: Reward / Lottery Scam Detection  (+20)
# ────────────────────────────────────────────────
REWARD_WORDS = [
    'you won', 'congratulations winner', 'claim reward',
    'free prize', 'jackpot', 'lottery winner', 'national lucky draw',
    'selected as the winner', 'claim your prize',
    'guaranteed weekly profit', 'guaranteed 40', 'guaranteed returns',
]

# High-confidence Crypto Fraud Phrases (+35 on match)
CRYPTO_FRAUD_PHRASES = [
    'guaranteed profit', 'guaranteed weekly', 'earn guaranteed',
    'professional crypto trader', 'investment program',
    'weekly profit', '40% weekly', '40 percent weekly',
]

# ─────────────────────────────────────────────────
# Step 7: Impersonated Institutions
# ─────────────────────────────────────────────────
INSTITUTIONS = [
    'bank', 'government', 'amazon', 'delivery service',
    'tax department', 'paypal', 'national', 'microsoft',
    'apple', 'google', 'customs', 'police', 'irs',
]

# ─────────────────────────────────────────────────
# Fear / Threat Manipulation Detection  (+20)
# ─────────────────────────────────────────────────
FEAR_WORDS = [
    'your device has been infected', 'virus detected',
    'call support immediately', 'your account will be blocked',
    'avoid permanent closure', 'data loss', 'unauthorized access',
    'hacked', 'malware', 'security breach',
    'infected with a virus', 'device has been infected',
    'infected with', 'security support immediately',
    'prevent data loss',
]

# ─────────────────────────────────────────────────
# Step 6: URL Detection and Safety Checks
# ─────────────────────────────────────────────────
SHORTENED_DOMAINS = [
    'bit.ly', 'tinyurl.com', 'cutt.ly', 'is.gd', 't.co',
    'ow.ly', 'buff.ly', 'rebrand.ly',
]
BLACKLISTED_PATTERNS = [
    'free-login', 'verify-account', 'secure-bank', 'login-verification',
    'bank-login', 'account-update', 'parcel-update', 'track-parcel',
    'secured-update', 'phishing', 'support-microsoft',
]


# ──────────────────────────────────────────────────────────────────
# Step 1: Preprocessing
# ──────────────────────────────────────────────────────────────────
def preprocess_message(text):
    text_lower = text.lower()

    # Extract raw URLs before stripping punctuation
    url_pattern = re.compile(r'https?://[^\s]+')
    urls = url_pattern.findall(text_lower)

    # Also detect bare domains like  track-parcel-update.com
    bare_domain_pattern = re.compile(r'(?<!\w)([\w\-]+\.(?:com|net|org|io|xyz|info|co|in|uk)(?:/[^\s]*)?)')
    bare_domains = bare_domain_pattern.findall(text_lower)

    all_urls = urls + bare_domains

    # Remove punctuation for keyword matching
    text_no_punct = re.sub(r'[^\w\s]', ' ', text_lower)
    tokens = text_no_punct.split()
    processed_text = ' '.join(tokens)

    return processed_text, tokens, all_urls


# ──────────────────────────────────────────────────────────────────
# Step 12: Core analysis function
# ──────────────────────────────────────────────────────────────────
def analyze_message(text):
    processed_text, tokens, urls = preprocess_message(text)

    risk_score = 0
    reasons = []

    # ── Step 2: Keyword Detection (+5 per unique match) ──
    for keyword in SCAM_KEYWORDS:
        if keyword in processed_text:
            risk_score += 5
            reasons.append(f"Scam keyword detected: '{keyword}'")

    # ── Step 3: Urgency Detection (+15) ──
    for phrase in URGENCY_WORDS:
        if phrase in processed_text:
            risk_score += 15
            if 'Urgent or pressure language detected' not in reasons:
                reasons.append('Urgent or pressure language detected')
            break

    # ── Step 4: Financial Manipulation (+25) ──
    for phrase in FINANCIAL_WORDS:
        if phrase in processed_text:
            risk_score += 25
            if 'Financial manipulation language detected' not in reasons:
                reasons.append('Financial manipulation language detected')
            break

    # ── Step 5: Reward / Lottery (+20) ──
    for phrase in REWARD_WORDS:
        if phrase in processed_text:
            risk_score += 20
            if 'Reward or lottery scam language detected' not in reasons:
                reasons.append('Reward or lottery scam language detected')
            break

    # ── Fear / Threat Manipulation (+20) ──
    for phrase in FEAR_WORDS:
        if phrase in processed_text:
            risk_score += 20
            if 'Fear/threat manipulation detected' not in reasons:
                reasons.append('Fear/threat manipulation detected')
            break

    # ── Crypto Investment Fraud Detection (+35) ──
    for phrase in CRYPTO_FRAUD_PHRASES:
        if phrase in processed_text:
            risk_score += 35
            if 'Crypto investment fraud language detected' not in reasons:
                reasons.append('Crypto investment fraud language detected')
            break

    # ── Step 6: URL Safety ──
    has_suspicious_link = False
    for url in urls:
        if any(d in url for d in SHORTENED_DOMAINS):
            risk_score += 15
            has_suspicious_link = True
            if 'Suspicious shortened link detected' not in reasons:
                reasons.append('Suspicious shortened link detected')
        if any(p in url for p in BLACKLISTED_PATTERNS):
            risk_score += 40
            has_suspicious_link = True
            if 'Suspicious phishing domain detected' not in reasons:
                reasons.append('Suspicious phishing domain detected')

    # ── Step 7: Impersonation (+30 if institution + suspicious context) ──
    has_institution = any(inst in processed_text for inst in INSTITUTIONS)
    if has_institution:
        # High confidence if link is present
        if has_suspicious_link:
            risk_score += 30
            reasons.append('Institution impersonation with suspicious link')
        # Medium-high confidence if multiple other signals already triggered
        elif risk_score >= 50:
            risk_score += 25
            reasons.append('Likely institution impersonation'
                           )
        elif risk_score >= 25:
            risk_score += 15
            reasons.append('Possible institution impersonation')

    # ── Step 8: Structure Anomaly ──
    caps_count = sum(1 for c in text if c.isupper())
    alpha_count = sum(1 for c in text if c.isalpha())
    caps_ratio = caps_count / alpha_count if alpha_count > 0 else 0

    if caps_ratio > 0.3:
        risk_score += 10
        reasons.append('Excessive use of capital letters')

    punct_count = text.count('!')
    if punct_count >= 2:
        risk_score += 5
        reasons.append('Multiple exclamation marks detected')

    # ── Normalize ──
    risk_score = min(100, risk_score)

    # ── Step 10: Classify ──
    if risk_score <= 30:
        classification = 'Safe'
    elif risk_score <= 55:
        classification = 'Suspicious'
    elif risk_score <= 75:
        classification = 'Spam'
    else:
        classification = 'Scam'

    return {
        'classification': classification,
        'risk_score': risk_score,
        'reasons': reasons,
    }


# ── Step 13: API Endpoint ──
@app.route('/api/analyze', methods=['POST'])
def analyze():
    data = request.json
    if not data or 'message' not in data:
        return jsonify({'error': 'No message provided'}), 400
    result = analyze_message(data['message'])
    return jsonify(result)


@app.route('/api/analyze-media', methods=['POST'])
def analyze_media():
    """
    Accepts a multipart file upload (field name: 'file').
    Returns a deterministic mock deepfake-detection result so the
    frontend ResultCard can render without a real ML model.
    The score is seeded on the file's byte-length so the same file
    always returns the same result during demo sessions.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    f = request.files['file']
    data = f.read()
    file_size = len(data)

    # Deterministic pseudo-score based on file size
    score = (file_size * 31 + 7) % 101          # 0-100
    confidence = (file_size * 17 + 41) % 21 + 75  # 75-95

    if score > 70:
        level = 'danger'
    elif score > 30:
        level = 'suspicious'
    else:
        level = 'safe'

    return jsonify({
        'score': score,
        'confidence': confidence,
        'level': level,
    })


if __name__ == '__main__':
    app.run(port=5000, debug=True)
