// Professional A4 Quotation (print / save as PDF) — Amaravati Solar Solutions
/* eslint-disable @typescript-eslint/no-explicit-any */

function escapeHtml(v: unknown): string {
  return String(v ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inr(n: number): string {
  return "&#8377;" + (Number(n) || 0).toLocaleString("en-IN");
}

export function numberToIndianWords(num: number): string {
  num = Math.round(Number(num) || 0);
  if (num === 0) return "Zero";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const two = (n: number) => (n < 20 ? a[n] : `${b[Math.floor(n / 10)]}${n % 10 ? " " + a[n % 10] : ""}`);
  const three = (n: number) =>
    n >= 100 ? `${a[Math.floor(n / 100)]} Hundred${n % 100 ? " " + two(n % 100) : ""}` : two(n);
  const parts: (string | undefined)[] = [];
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num % 10000000) / 100000);
  const thousand = Math.floor((num % 100000) / 1000);
  const rest = num % 1000;
  if (crore) parts.push(`${two(crore)} Crore`);
  if (lakh) parts.push(`${two(lakh)} Lakh`);
  if (thousand) parts.push(`${two(thousand)} Thousand`);
  if (rest) parts.push(three(rest));
  return parts.join(" ");
}

export function buildQuotationPrintHtml(q: any, logoUrl: string): string {
  const e = escapeHtml;
  const total = q.totalPrice || q.totalAmount;
  const discount = q.discount || 0;
  const finalPrice = q.finalPrice || q.totalAmount;
  const subsidy = q.subsidyAmount || 0;
  const fromHand = q.fromHand || finalPrice - subsidy;
  const overhang = q.overhangPossibility === "Yes" ? `Yes (${q.overhangSide || "South"} side)` : "No";
  const terms: string[] = q.terms || [];

  const kv = (k: string, v: unknown) => `<tr><td class="k">${k}</td><td class="v">${e(v)}</td></tr>`;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>
<title>Quotation ${e(q.quotationNo)} - ${e(q.customerName)}</title>
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; background: #e5e7eb; font-family: "Segoe UI", Roboto, Arial, sans-serif; color: #1f2937; font-size: 11px; }
  .page { width: 210mm; height: 297mm; margin: 10mm auto; background: #fff; position: relative; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,.15); page-break-after: always; }
  .page:last-child { page-break-after: auto; }
  .topbar { height: 5mm; background: linear-gradient(90deg, #E8590C 0%, #F59E0B 100%); flex-shrink: 0; }
  .inner { padding: 8mm 14mm 0; flex: 1; }
  .head { display: flex; justify-content: space-between; align-items: center; padding-bottom: 4mm; border-bottom: 2px solid #E8590C; }
  .head img { height: 18mm; width: auto; }
  .co { text-align: right; line-height: 1.5; font-size: 10px; color: #4b5563; }
  .co h1 { margin: 0 0 1mm; font-size: 17px; letter-spacing: .5px; color: #E8590C; font-weight: 800; }
  .title { display: flex; justify-content: space-between; align-items: flex-end; margin: 5mm 0 4mm; }
  .title h2 { margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 3px; color: #111827; }
  .title h2 span { color: #E8590C; }
  .meta { border: 1px solid #fed7aa; border-collapse: collapse; }
  .meta td { padding: 1.4mm 3mm; font-size: 10.5px; border-bottom: 1px solid #ffedd5; }
  .meta td:first-child { background: #fff7ed; color: #9a3412; font-weight: 700; }
  .meta td:last-child { font-weight: 700; text-align: right; }
  .grid2 { display: grid; grid-template-columns: 1.3fr 1fr; gap: 4mm; }
  .grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4mm; margin-top: 4mm; }
  .box { border: 1px solid #e5e7eb; border-radius: 6px; padding: 3mm 4mm; }
  .box h3 { margin: 0 0 2mm; font-size: 9.5px; letter-spacing: 1.2px; color: #E8590C; text-transform: uppercase; font-weight: 800; }
  .cust b { font-size: 14px; color: #111827; }
  .cust p { margin: 1mm 0 0; color: #4b5563; }
  .sys { background: #fff7ed; border-color: #fed7aa; }
  .sys .cap { font-size: 18px; font-weight: 800; color: #111827; margin-top: 1mm; }
  .pill { display: inline-block; margin-top: 2mm; padding: .6mm 2.5mm; border-radius: 20px; background: #E8590C; color: #fff; font-size: 9px; font-weight: 700; letter-spacing: .5px; }
  .kv { width: 100%; border-collapse: collapse; }
  .kv td { padding: .8mm 0; border-bottom: 1px dashed #f1f5f9; font-size: 10px; }
  .kv .k { color: #6b7280; } .kv .v { text-align: right; font-weight: 700; color: #111827; }
  .invest { margin-top: 6mm; border: 1px solid #fed7aa; border-radius: 8px; overflow: hidden; }
  .inv-head { display: flex; justify-content: space-between; align-items: center; background: #E8590C; color: #fff; padding: 2.6mm 5mm; }
  .inv-head .t { font-size: 11px; font-weight: 800; letter-spacing: 1.6px; text-transform: uppercase; }
  .inv-head .m { font-size: 9.5px; font-weight: 700; background: rgba(255,255,255,.18); border: 1px solid rgba(255,255,255,.35); padding: .7mm 2.5mm; border-radius: 20px; letter-spacing: .5px; }
  .inv-body { display: grid; grid-template-columns: 1.15fr 1fr; }
  .inv-rows { padding: 3mm 5mm; }
  .inv-row { display: flex; justify-content: space-between; align-items: baseline; padding: 2.4mm 0; border-bottom: 1px dashed #fde3cc; font-size: 12px; color: #374151; }
  .inv-row:last-child { border-bottom: 0; }
  .inv-row .v { font-weight: 700; color: #111827; }
  .inv-row.g, .inv-row.g .v { color: #15803d; }
  .inv-row.b { font-weight: 800; color: #111827; border-top: 1.5px solid #111827; border-bottom-style: solid; margin-top: 1mm; }
  .inv-row.b .v { font-size: 13px; }
  .inv-row small { display: block; font-size: 9px; color: #6b7280; font-weight: 500; margin-top: .4mm; }
  .inv-net { background: linear-gradient(135deg, #E8590C 0%, #F59E0B 100%); color: #fff; padding: 5mm 6mm; display: flex; flex-direction: column; justify-content: center; }
  .inv-net .l { font-size: 9.5px; font-weight: 800; letter-spacing: 1.4px; text-transform: uppercase; opacity: .92; }
  .inv-net .a { font-size: 30px; font-weight: 800; letter-spacing: .5px; margin: 1.5mm 0 2mm; line-height: 1.1; }
  .inv-net .w { font-size: 10px; font-weight: 600; line-height: 1.45; border-top: 1px solid rgba(255,255,255,.4); padding-top: 2mm; }
  .inv-note { background: #fff7ed; border-top: 1px solid #fed7aa; padding: 2.4mm 5mm; font-size: 9.5px; color: #7c2d12; }
  .sec { margin-top: 6mm; }
  .sec h3 { font-size: 11px; letter-spacing: 1.2px; color: #E8590C; text-transform: uppercase; margin: 0 0 2mm; padding-bottom: 1.5mm; border-bottom: 1px solid #fed7aa; }
  ol { margin: 0; padding-left: 5mm; line-height: 1.7; color: #374151; }
  .sign { display: flex; justify-content: space-between; margin-top: 20mm; }
  .sign div { width: 65mm; text-align: center; border-top: 1px solid #9ca3af; padding-top: 2mm; font-weight: 700; font-size: 10px; color: #374151; }
  .foot { background: #1f2937; color: #e5e7eb; padding: 3mm 14mm; font-size: 9px; display: flex; justify-content: space-between; flex-shrink: 0; }
  .foot b { color: #F59E0B; }
  .toolbar { position: fixed; top: 10px; right: 10px; z-index: 9; }
  .toolbar button { background: #E8590C; color: #fff; border: 0; padding: 10px 18px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px; }
  @media print { body { background: #fff; } .page { margin: 0; box-shadow: none; } .toolbar { display: none; } }
</style></head><body>
<div class="toolbar"><button onclick="window.print()">Print / Save as PDF</button></div>

<div class="page">
  <div class="topbar"></div>
  <div class="inner">
    <div class="head">
      <img src="${e(logoUrl)}" alt="Amaravati Solar Solutions"/>
      <div class="co">
        <h1>AMARAVATI SOLAR SOLUTIONS</h1>
        Roof Top Solar EPC &bull; On-Grid &bull; Off-Grid &bull; Hybrid<br/>
        74-12/1-12/5, Electricity Colony, 9th Line, Opp. Auto Nagar Gate,<br/>Patamata, Vijayawada &ndash; 520010, Andhra Pradesh<br/>
        +91 96768 88487 / +91 96768 88407 &nbsp;|&nbsp; sales@amaravatisolarsolutions.com
      </div>
    </div>

    <div class="title">
      <h2>SOLAR <span>QUOTATION</span></h2>
      <table class="meta">
        <tr><td>Quotation No</td><td>${e(q.quotationNo)}</td></tr>
        <tr><td>Date</td><td>${e(q.date)}</td></tr>
        <tr><td>Valid Upto</td><td>${e(q.validUpto)}</td></tr>
      </table>
    </div>

    <div class="grid2">
      <div class="box cust">
        <h3>Quotation To</h3>
        <b>${e(q.customerName)}</b>
        <p>Mobile: ${e(q.customerPhone)}</p>
        <p>Site Address: ${e(q.customerAddress)}</p>
      </div>
      <div class="box sys">
        <h3>Proposed Solar System</h3>
        <div class="cap">${e(q.systemCapacity)}</div>
        <span class="pill">${e(q.subsidyType || "Subsidy National DBT")}</span>
      </div>
    </div>

    <div class="grid3">
      <div class="box"><h3>Site Details</h3><table class="kv">
        ${kv("Housing Type", q.housingType || "Independent")}
        ${kv("Floors", q.noOfFloors || "G+1")}
        ${kv("Phase", q.sanctionedPhase || "Single Phase")}
        ${kv("Sanctioned Load", q.sanctionedLoad || "3 kW")}
        ${kv("DISCOM", q.discom || "APCPDCL")}
        ${kv("Cluster", q.cluster || "Urban")}
      </table></div>
      <div class="box"><h3>Structure &amp; Technical</h3><table class="kv">
        ${kv("Roof Type", q.roofType || "RCC")}
        ${kv("Structure", q.structureType || "Pre fab - 6ft")}
        ${q.moduleType ? kv("Module Type", q.moduleType) : ""}
        ${kv("No. of Modules", `${q.noOfModules || 6} Panels`)}
        ${q.projectSize ? kv("Project Size", q.projectSize) : ""}
        ${kv("Overhang", overhang)}
        ${kv("AMC", q.amc || "Included")}
      </table></div>
      <div class="box"><h3>Bill Corrections</h3><table class="kv">
        ${kv("Load Change", q.loadChange || "No")}
        ${kv("Phase Change", q.phaseChange || "No")}
        ${kv("Name Change", q.nameChange || "No")}
        ${kv("Payment Mode", q.paymentMode || "Direct")}
      </table></div>
    </div>

    <div class="invest">
      <div class="inv-head">
        <span class="t">Investment Summary</span>
        <span class="m">Payment Mode: ${e(q.paymentMode || "Direct")}</span>
      </div>
      <div class="inv-body">
        <div class="inv-rows">
          <div class="inv-row"><span>Total System Price<small>Supply, installation &amp; commissioning</small></span><span class="v">${inr(total)}</span></div>
          ${discount > 0 ? `<div class="inv-row g"><span>Special Discount</span><span class="v">&minus; ${inr(discount)}</span></div>` : ""}
          <div class="inv-row b"><span>Final Price</span><span class="v">${inr(finalPrice)}</span></div>
          ${subsidy > 0 ? `<div class="inv-row g"><span>Govt. DBT Subsidy<small>PM Surya Ghar &ndash; National DBT</small></span><span class="v">&minus; ${inr(subsidy)}</span></div>` : ""}
        </div>
        <div class="inv-net">
          <span class="l">Net Investment (From the Hand)</span>
          <span class="a">${inr(fromHand)}</span>
          <span class="w">Rupees ${numberToIndianWords(fromHand)} Only</span>
        </div>
      </div>
      ${subsidy > 0 ? `<div class="inv-note">Govt. subsidy is credited directly to the customer&#39;s bank account after commissioning &amp; DISCOM inspection.</div>` : ""}
    </div>
  </div>
  <div class="foot"><span><b>Amaravati Solar Solutions</b> &mdash; Clean &bull; Sustainable &bull; Reliable Energy</span><span>Page 1 of 2</span></div>
</div>

<div class="page">
  <div class="topbar"></div>
  <div class="inner">
    <div class="head">
      <img src="${e(logoUrl)}" alt="Amaravati Solar Solutions" style="height:14mm"/>
      <div class="co"><b style="color:#111827">Quotation No: ${e(q.quotationNo)}</b><br/>Customer: ${e(q.customerName)}</div>
    </div>

    <div class="sec"><h3>Terms &amp; Conditions</h3>
      <ol>${terms.map((t) => `<li>${e(/^Payment Mode:/i.test(t) ? "Payment Mode: Direct or EMI." : t)}</li>`).join("")}</ol>
    </div>

    <div class="sec"><h3>Payment Schedule</h3>
      <ol>
        <li>Advance along with order confirmation &amp; document submission.</li>
        <li>Balance on material delivery to site, before installation.</li>
        <li>All payments via cheque / NEFT / UPI in favour of <b>Amaravati Solar Solutions</b>.</li>
      </ol>
    </div>

    <div class="sec"><h3>Warranty</h3>
      <ol>
        <li>Solar modules: 25 to 30 years performance warranty (as per manufacturer).</li>
        <li>Inverter: as per manufacturer warranty (typically 7&ndash;10 years).</li>
        <li>Installation workmanship &amp; structure: 5 years.</li>
      </ol>
    </div>

    <div class="sec"><h3>Documents Required</h3>
      <ol>
        <li>Latest electricity bill &amp; Aadhaar card of the consumer.</li>
        <li>Bank passbook / cancelled cheque (for subsidy credit) and passport size photo.</li>
        <li>Property tax receipt / ownership proof.</li>
      </ol>
    </div>

    <div class="sign">
      <div>Customer Acceptance Signature</div>
      <div>For AMARAVATI SOLAR SOLUTIONS<br/><span style="font-weight:500">Authorized Signatory</span></div>
    </div>
  </div>
  <div class="foot"><span>This is a system generated quotation &nbsp;|&nbsp; www.amaravatisolarsolutions.com</span><span>Page 2 of 2</span></div>
</div>

<script>window.onload = function(){ setTimeout(function(){ window.print(); }, 500); };</script>
</body></html>`;
}
