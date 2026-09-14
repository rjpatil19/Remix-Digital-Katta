/**
 * Realistic Indian Credit Bureau HTML Sample Reports
 * Formatted matching TransUnion CIBIL, Experian India, and Equifax consumer CIR exports.
 */

export const EXPERIAN_SAMPLE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Experian Credit Information Report (CIR)</title>
  <style>
    body { font-family: Arial, sans-serif; color: #333; margin: 20px; }
    .header { border-bottom: 3px solid #005A9C; padding-bottom: 10px; margin-bottom: 20px; }
    .bureau-title { color: #005A9C; font-size: 24px; font-weight: bold; margin: 0; }
    .sub-title { font-size: 14px; color: #666; margin: 5px 0 0 0; }
    .score-card { background: #f0f7fc; border: 2px solid #005A9C; border-radius: 8px; padding: 15px; margin-bottom: 20px; display: inline-block; min-width: 300px; }
    .score-value { font-size: 42px; font-weight: bold; color: #005A9C; margin: 0; }
    .score-desc { font-size: 14px; color: #333; font-weight: bold; }
    .section-title { background: #005A9C; color: white; padding: 8px 12px; font-size: 16px; margin-top: 25px; border-radius: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background: #f2f2f2; font-weight: bold; }
    .dpd-bad { background-color: #ffcccc; color: #990000; font-weight: bold; }
    .status-open { color: #008800; font-weight: bold; }
    .status-closed { color: #666666; }
    .status-settled { color: #cc0000; font-weight: bold; }
  </style>
</head>
<body>
  <div class="header">
    <h1 class="bureau-title">EXPERIAN INDIA CREDIT REPORT</h1>
    <p class="sub-title">Confidential Consumer Credit Information Report (CIR) • Generated under CICRA 2005</p>
    <p><strong>Report Reference Number:</strong> <span id="report-number">EXP-2025-IND-8849201</span> | <strong>Report Date:</strong> <span id="report-date">12-Jan-2025</span></p>
  </div>

  <div class="score-card">
    <div class="score-desc">Experian Credit Score</div>
    <div class="score-value" id="credit-score">688</div>
    <div class="score-desc">Rating: <span id="score-category">Fair</span> (Percentile: <span id="percentile">68%</span>)</div>
    <small style="color: #666;">Scoring Range: 300 - 900</small>
  </div>

  <div class="section-title">1. CONSUMER IDENTIFICATION & PERSONAL DETAILS</div>
  <table id="personal-info-table">
    <tr>
      <th>Full Name</th>
      <td id="full-name">Rajesh V. Kulkarni</td>
      <th>Date of Birth</th>
      <td id="dob">14/08/1986</td>
    </tr>
    <tr>
      <th>PAN Number</th>
      <td id="pan-number">BKLPR8831K</td>
      <th>Gender</th>
      <td id="gender">Male</td>
    </tr>
    <tr>
      <th>Mobile Number</th>
      <td id="mobile-number">+91 98220 44921</td>
      <th>Email Address</th>
      <td id="email-address">rajesh.kulkarni@example.com</td>
    </tr>
    <tr>
      <th>Current Address</th>
      <td colspan="3" id="current-address">Flat 402, Shivshanti Heights, Baner Road, Pune, Maharashtra - 411045</td>
    </tr>
    <tr>
      <th>Permanent Address</th>
      <td colspan="3" id="permanent-address">House No. 18, Ward 4, Old Khed Road, Satara, Maharashtra - 415002</td>
    </tr>
  </table>

  <div class="section-title">2. ACCOUNT SUMMARY & TRADELINES</div>
  <table id="accounts-table">
    <thead>
      <tr>
        <th>Subscriber / Bank</th>
        <th>Account Type</th>
        <th>Account Number</th>
        <th>Ownership</th>
        <th>Date Opened</th>
        <th>Sanctioned / Limit</th>
        <th>Current Balance</th>
        <th>Overdue Amount</th>
        <th>Account Status</th>
        <th>DPD History (Last 12 Months)</th>
      </tr>
    </thead>
    <tbody>
      <tr class="account-row">
        <td class="bank-name">HDFC Bank Ltd</td>
        <td class="account-type">Credit Card</td>
        <td class="account-number">XXXX-XXXX-XXXX-4921</td>
        <td class="ownership">Individual</td>
        <td class="date-opened">15-Mar-2021</td>
        <td class="sanctioned-amount">₹ 2,00,000</td>
        <td class="current-balance">₹ 1,56,400</td>
        <td class="overdue-amount">₹ 0</td>
        <td class="account-status status-open">Open</td>
        <td class="dpd-history">000 000 000 000 000 000 000 000 000 000 000 000</td>
      </tr>
      <tr class="account-row">
        <td class="bank-name">State Bank of India</td>
        <td class="account-type">Personal Loan</td>
        <td class="account-number">PL-9812-4410</td>
        <td class="ownership">Individual</td>
        <td class="date-opened">10-Jun-2022</td>
        <td class="sanctioned-amount">₹ 3,50,000</td>
        <td class="current-balance">₹ 1,12,000</td>
        <td class="overdue-amount">₹ 12,450</td>
        <td class="account-status status-open">Open</td>
        <td class="dpd-history">000 000 <span class="dpd-bad">060</span> 000 000 000 000 000 000 000 000 000</td>
      </tr>
      <tr class="account-row">
        <td class="bank-name">Bajaj Finance Ltd</td>
        <td class="account-type">Consumer Loan</td>
        <td class="account-number">CD-8831-5021</td>
        <td class="ownership">Joint</td>
        <td class="date-opened">05-Sep-2023</td>
        <td class="sanctioned-amount">₹ 45,000</td>
        <td class="current-balance">₹ 45,000</td>
        <td class="overdue-amount">₹ 0</td>
        <td class="account-status status-open">Open</td>
        <td class="dpd-history">000 000 000 000 000 000 000 000 000 000 000 000</td>
      </tr>
      <tr class="account-row">
        <td class="bank-name">Axis Bank Ltd</td>
        <td class="account-type">Auto Loan</td>
        <td class="account-number">TW-2201-9981</td>
        <td class="ownership">Individual</td>
        <td class="date-opened">12-Jan-2020</td>
        <td class="sanctioned-amount">₹ 1,20,000</td>
        <td class="current-balance">₹ 0</td>
        <td class="overdue-amount">₹ 0</td>
        <td class="account-status status-open">Open</td>
        <td class="dpd-history">000 000 000 000 000 000 000 000 000 000 000 000</td>
      </tr>
      <tr class="account-row">
        <td class="bank-name">ICICI Bank Ltd</td>
        <td class="account-type">Home Loan</td>
        <td class="account-number">HL-0019-3382</td>
        <td class="ownership">Joint</td>
        <td class="date-opened">18-Feb-2018</td>
        <td class="sanctioned-amount">₹ 45,00,000</td>
        <td class="current-balance">₹ 32,15,000</td>
        <td class="overdue-amount">₹ 0</td>
        <td class="account-status status-open">Open</td>
        <td class="dpd-history">000 000 000 000 000 000 000 000 000 000 000 000</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">3. ENQUIRY INFORMATION (LAST 24 MONTHS)</div>
  <table id="enquiries-table">
    <thead>
      <tr>
        <th>Enquiring Member</th>
        <th>Date of Enquiry</th>
        <th>Enquiry Purpose</th>
        <th>Enquiry Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="enq-member">HDFC Bank Ltd</td>
        <td class="enq-date">02-Jan-2025</td>
        <td class="enq-purpose">Credit Card</td>
        <td class="enq-amount">₹ 1,50,000</td>
      </tr>
      <tr>
        <td class="enq-member">SBI Cards</td>
        <td class="enq-date">18-Dec-2024</td>
        <td class="enq-purpose">Credit Card</td>
        <td class="enq-amount">₹ 1,00,000</td>
      </tr>
      <tr>
        <td class="enq-member">Bajaj Housing Finance</td>
        <td class="enq-date">05-Nov-2024</td>
        <td class="enq-purpose">Personal Loan</td>
        <td class="enq-amount">₹ 5,00,000</td>
      </tr>
      <tr>
        <td class="enq-member">Tata Capital Financial</td>
        <td class="enq-date">22-Oct-2024</td>
        <td class="enq-purpose">Personal Loan</td>
        <td class="enq-amount">₹ 3,00,000</td>
      </tr>
      <tr>
        <td class="enq-member">ICICI Bank Ltd</td>
        <td class="enq-date">15-Oct-2024</td>
        <td class="enq-purpose">Auto Loan</td>
        <td class="enq-amount">₹ 8,00,000</td>
      </tr>
    </tbody>
  </table>

  <div style="margin-top: 30px; font-size: 11px; color: #888; text-align: center; border-top: 1px solid #ccc; padding-top: 10px;">
    End of Experian Credit Information Report • Digital verification hash: 4f89a812e9b0123d45f7
  </div>
</body>
</html>`;

export const CIBIL_SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>TransUnion CIBIL CIR</title>
</head>
<body style="font-family: Arial, sans-serif; margin: 20px; color: #222;">
  <div style="border-bottom: 2px solid #E46C0A; padding-bottom: 10px;">
    <h2 style="color: #002060; margin: 0;">TransUnion CIBIL™ Consumer Credit Information Report</h2>
    <p style="margin: 4px 0; font-size: 13px;"><strong>Control Number (ECN):</strong> <span class="cibil-ecn">ECN-9048172901</span> | <strong>Date:</strong> <span class="cibil-date">18-Jan-2025</span></p>
  </div>

  <div style="margin: 20px 0; padding: 15px; background: #FEF7F0; border-left: 5px solid #E46C0A;">
    <span style="font-size: 14px; font-weight: bold; color: #002060;">CIBIL TRANSUNION SCORE 2.0</span>
    <h1 style="font-size: 48px; color: #E46C0A; margin: 5px 0;" class="cibil-score">712</h1>
    <p style="margin: 0; font-size: 12px; font-weight: bold;">Category: <span class="cibil-category">Fair</span> (Percentile: 74%)</p>
  </div>

  <h3>CONSUMER DETAILS</h3>
  <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%; font-size: 12px;">
    <tr>
      <td bgcolor="#f4f4f4"><strong>Name</strong></td>
      <td class="cibil-name">Rahul S. Deshmukh</td>
      <td bgcolor="#f4f4f4"><strong>Date of Birth</strong></td>
      <td class="cibil-dob">22/11/1990</td>
    </tr>
    <tr>
      <td bgcolor="#f4f4f4"><strong>Income Tax PAN</strong></td>
      <td class="cibil-pan">APWRP9921E</td>
      <td bgcolor="#f4f4f4"><strong>Mobile</strong></td>
      <td class="cibil-mobile">+91 98221 00812</td>
    </tr>
    <tr>
      <td bgcolor="#f4f4f4"><strong>Current Address</strong></td>
      <td colspan="3" class="cibil-address">Plot 12, Swapnanagari, Paud Road, Kothrud, Pune - 411038</td>
    </tr>
    <tr>
      <td bgcolor="#f4f4f4"><strong>Permanent Address</strong></td>
      <td colspan="3" class="cibil-permanent-address">Gat No 45, Post Wadki, Taluka Haveli, Pune, Maharashtra - 412308</td>
    </tr>
  </table>

  <h3>ACCOUNTS / TRADELINES</h3>
  <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%; font-size: 12px;">
    <tr bgcolor="#002060" style="color: white;">
      <th>Member</th>
      <th>Type</th>
      <th>Account No</th>
      <th>Ownership</th>
      <th>Sanctioned</th>
      <th>Balance</th>
      <th>Status</th>
      <th>DPD</th>
    </tr>
    <tr class="tradeline">
      <td class="bank">State Bank of India</td>
      <td class="type">Credit Card</td>
      <td class="acc-no">XXXX-XXXX-XXXX-3312</td>
      <td class="ownership">Individual</td>
      <td class="limit">₹ 1,50,000</td>
      <td class="balance">₹ 58,000</td>
      <td class="status" style="color: green; font-weight: bold;">Open</td>
      <td class="dpd">000 000 000 000</td>
    </tr>
    <tr class="tradeline">
      <td class="bank">Kotak Mahindra Bank</td>
      <td class="type">Personal Loan</td>
      <td class="acc-no">PL-KTK-10928</td>
      <td class="ownership">Individual</td>
      <td class="limit">₹ 2,00,000</td>
      <td class="balance">₹ 0</td>
      <td class="status" style="color: red; font-weight: bold;">Settled</td>
      <td class="dpd">000 000 030 000</td>
    </tr>
    <tr class="tradeline">
      <td class="bank">HDFC Bank Ltd</td>
      <td class="type">Auto Loan</td>
      <td class="acc-no">AL-HDFC-99120</td>
      <td class="ownership">Joint</td>
      <td class="limit">₹ 6,50,000</td>
      <td class="balance">₹ 3,40,000</td>
      <td class="status" style="color: green; font-weight: bold;">Open</td>
      <td class="dpd">000 000 000 000</td>
    </tr>
  </table>

  <h3>RECENT ENQUIRIES</h3>
  <table border="1" cellpadding="6" style="border-collapse: collapse; width: 100%; font-size: 12px;">
    <tr bgcolor="#f4f4f4">
      <th>Bank</th>
      <th>Date</th>
      <th>Purpose</th>
      <th>Amount</th>
    </tr>
    <tr>
      <td>Axis Bank Ltd</td>
      <td>10-Jan-2025</td>
      <td>Personal Loan</td>
      <td>₹ 3,00,000</td>
    </tr>
    <tr>
      <td>Bajaj Finance Ltd</td>
      <td>02-Jan-2025</td>
      <td>Credit Card</td>
      <td>₹ 1,00,000</td>
    </tr>
  </table>
</body>
</html>`;

export const EQUIFAX_SAMPLE_HTML = `<!DOCTYPE html>
<html>
<head><title>Equifax Credit Report</title></head>
<body style="font-family: sans-serif; font-size: 13px;">
  <h2>EQUIFAX CREDIT INFORMATION REPORT</h2>
  <p>Reference: <span id="eq-ref">EQ-IND-2025-99210</span> | Date: 15-Jan-2025</p>
  <div style="background: #eef; padding: 10px; border-radius: 6px;">
    <h3>Equifax Score: <span id="eq-score" style="color: #33a; font-size: 32px;">695</span></h3>
    <p>Risk Band: Fair</p>
  </div>
  <h4>Consumer Identity</h4>
  <p>Name: <span id="eq-name">Sanjay M. Deshmukh</span></p>
  <p>PAN: <span id="eq-pan">DSKPS1029A</span></p>
  <p>DOB: <span id="eq-dob">05/04/1988</span></p>
  <p>Current Address: <span id="eq-addr">Flat 101, Om Residency, Hadapsar, Pune - 411028</span></p>
  <p>Permanent Address: <span id="eq-perm-addr">At Post Baramati, Taluka Baramati, Dist Pune - 413102</span></p>
  <h4>Accounts</h4>
  <table border="1" cellpadding="5">
    <tr><th>Institution</th><th>Type</th><th>Account</th><th>Limit</th><th>Balance</th><th>Status</th></tr>
    <tr><td>ICICI Bank</td><td>Credit Card</td><td>XXXX-8821</td><td>1,00,000</td><td>82,000</td><td>Open</td></tr>
    <tr><td>Fullerton India</td><td>Personal Loan</td><td>PL-9921</td><td>1,50,000</td><td>45,000</td><td>Open</td></tr>
  </table>
</body>
</html>`;
