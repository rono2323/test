// Certificate download using html2canvas + jsPDF
document.addEventListener('DOMContentLoaded', function () {
  // Pre-fill certificate with session data if present
  const paid = JSON.parse(sessionStorage.getItem('paidResult') || 'null');
  if (paid) {
    document.getElementById('cert-test').textContent = (paid.test || 'Skill Test').toUpperCase();
    document.getElementById('cert-score').textContent = `Score: ${paid.score || 'N/A'}%`;
    document.getElementById('cert-date').textContent = new Date().toLocaleDateString();
    // You could set name dynamically from user input or login
  }

  const downloadBtn = document.getElementById('download-cert');
  const certEl = document.getElementById('certificate');

  if (downloadBtn && certEl && window.html2canvas && window.jspdf) {
    downloadBtn.addEventListener('click', async function () {
      downloadBtn.disabled = true;
      downloadBtn.textContent = 'Preparing...';

      try {
        const canvas = await html2canvas(certEl, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('certificate.pdf');
      } catch (err) {
        console.error(err);
        alert('Failed to generate PDF.');
      } finally {
        downloadBtn.disabled = false;
        downloadBtn.textContent = 'Download PDF';
      }
    });
  }
});