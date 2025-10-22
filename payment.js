// Payment page: generate QR and fake verification
document.addEventListener('DOMContentLoaded', function () {
  const upiId = document.getElementById('upi-id')?.textContent || 'skilluprise@upi';
  const qrEl = document.getElementById('qr-code');
  const verifyBtn = document.getElementById('verify-payment');

  if (qrEl && window.QRCode) {
    // Build a UPI intent-ish string for scanning (basic)
    const upiUrl = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=Skilluprise&tr=TXN${Date.now()}&am=5&cu=INR`;
    // If qrcode lib is present, generate
    try {
      QRCode.toCanvas(qrEl, upiUrl, { width: 200 }, function (err) {
        if (err) {
          // fallback: create image
          console.error(err);
          qrEl.textContent = 'QR generation failed';
        }
      });
    } catch (e) {
      // fallback text
      qrEl.textContent = upiUrl;
    }
  } else if (qrEl) {
    qrEl.textContent = upiId;
  }

  if (verifyBtn) {
    verifyBtn.addEventListener('click', function () {
      // In a real app you'd verify with a backend/payment provider.
      // For demo: assume payment successful, store result and go to certificate
      const last = JSON.parse(sessionStorage.getItem('lastResult') || '{}');
      // mark as paid -> pass to certificate
      sessionStorage.setItem('paidResult', JSON.stringify({ ...last, paid: true }));
      // go to certificate
      location.href = 'certificate.html';
    });
  }
});