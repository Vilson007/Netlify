const puppeteer = require('puppeteer');

exports.handler = async function(event, context) {
    const { htmlContent } = JSON.parse(event.body);

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/pdf' },
            body: pdfBuffer.toString('base64'),
            isBase64Encoded: true,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: `Error: ${error.message}`,
        };
    }
};
