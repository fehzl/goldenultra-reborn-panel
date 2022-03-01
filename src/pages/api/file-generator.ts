import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

const handle = async (request: NextApiRequest, res: NextApiResponse) => {
  const code = request.query.code as string;
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: [`--no-sandbox`, `--disable-setuid-sandbox`],
    });
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000/painel/pedidos/i/${code}`);
    const pdf = await page.pdf({
      format: `a4`,
      printBackground: true,
    });
    res.setHeader(`Content-Type`, `application/pdf`);
    res.setHeader(`Content-Filename`, `${code}.pdf`);
    res.setHeader(`Content-Disposition`, `attachment; filename="${code}.pdf"`);
    res.send(pdf);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

export default handle;
