const { chromium } = require("playwright");

async function generatePDF() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport size to match A4 dimensions
  await page.setViewportSize({
    width: 794, // A4 width in pixels at 96 DPI
    height: 1123, // A4 height in pixels at 96 DPI
  });

  // Load your HTML file
  await page.goto(`file://${__dirname}/index.html`, {
    waitUntil: "networkidle0",
  });

  // Add custom styles for PDF generation
  await page.addStyleTag({
    content: `
      @media print {
        body {
          font-size: 9pt;
          line-height: 1.1;
          margin: 4mm;
          padding: 0;
          background: white;
        }
        .max-w-5xl {
          max-width: 100% !important;
        }
        .grid {
          display: grid !important;
          grid-template-columns: 2fr 1fr !important;
          gap: 0.5rem !important;
        }
        .md\\:col-span-2 {
          grid-column: 1 !important;
        }
        .md\\:col-span-1 {
          grid-column: 2 !important;
        }
        .bg-slate-800 {
          background-color: rgb(30, 41, 59) !important;
        }
        .text-4xl {
          font-size: 1.4rem !important;
        }
        .text-xl {
          font-size: 1rem !important;
        }
        .text-base {
          font-size: 0.75rem !important;
        }
        .text-sm {
          font-size: 0.65rem !important;
        }
        .mb-7 {
          margin-bottom: 0.75rem !important;
        }
        .mb-5 {
          margin-bottom: 0.5rem !important;
        }
        .mb-4 {
          margin-bottom: 0.375rem !important;
        }
        .mb-3 {
          margin-bottom: 0.25rem !important;
        }
        .mb-2 {
          margin-bottom: 0.2rem !important;
        }
        .gap-4 {
          gap: 0.375rem !important;
        }
        .gap-2 {
          gap: 0.2rem !important;
        }
        .p-6 {
          padding: 0.5rem !important;
        }
        .p-5 {
          padding: 1rem !important;
        }
        .pb-4 {
          padding-bottom: 0.25rem !important;
        }
        .mt-2 {
          margin-top: 0.2rem !important;
        }
        .list-disc {
          padding-left: 1rem !important;
        }
      }
    `,
  });

  // Generate PDF with specific settings
  await page.pdf({
    path: "Julian_Kaiser_Resume.pdf",
    format: "A4",
    printBackground: true,
    margin: {
      top: "4mm",
      right: "4mm",
      bottom: "4mm",
      left: "4mm",
    },
    preferCSSPageSize: true,
  });

  await browser.close();
}

generatePDF();
