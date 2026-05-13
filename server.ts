import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API ROUTES ---

  // Health
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // PDF Generation - Member Badge
  app.post('/api/generate-badge', async (req, res) => {
    const { socioName, socioNumber } = req.body;
    try {
      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([300, 450]);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      page.drawRectangle({ x: 0, y: 350, width: 300, height: 100, color: rgb(0.01, 0.29, 0.45) });
      page.drawText('CMEC', { x: 20, y: 400, size: 28, font, color: rgb(1, 1, 1) });
      page.drawText('SOCIO ACTIVO', { x: 20, y: 375, size: 12, font, color: rgb(0.1, 0.8, 0.5) });
      page.drawText(socioName || 'SOCIO CMEC', { x: 20, y: 250, size: 18, font, color: rgb(0, 0, 0) });
      page.drawText(`NÚMERO: ${socioNumber || 'N/A'}`, { x: 20, y: 220, size: 14, font, color: rgb(0.4, 0.4, 0.4) });
      const pdfBytes = await pdfDoc.save();
      res.contentType("application/pdf");
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate PDF' });
    }
  });

  // Mercado Pago
  app.post('/api/create-payment', async (req, res) => {
    res.json({ id: 'pref_12345', init_point: '#' });
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CMEC Server running at http://localhost:${PORT}`);
  });
}

startServer();
