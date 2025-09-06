const nodemailer = require('nodemailer');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// Function to generate a colorful PDF
async function generateColorfulPDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 20;

    const imageBytes = fs.readFileSync(
    path.resolve(__dirname+"/logo.jpg")).toString("base64"); // Assuming the image is in JPEG format
    const image = await pdfDoc.embedJpg(imageBytes);
    const imageSize = image.scale(0.04);
    
    // Draw the image on the page
    page.drawImage(image, {
        x: width/2-100-imageSize.width,
        y: height-90,
        width: imageSize.width,
        height: imageSize.height,
    });

    // Delete the temporary image file
    // fs.unlinkSync(imageName);
    
    page.drawText(`LIBRARY`, {
        x: width/2-100+10,
        y: height - 70,
        size: fontSize + 20,
        color: rgb(0, 0, 0), // Black color
    });

    page.drawText(`Indian Institute of Technology,Kharaghpur`, {
        x: width/2-100+3,
        y: height - 90,
        size: fontSize - 10,
        color: rgb(0, 0, 0), // Black color
    });
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

// Function to send email with colorful PDF attachment
async function sendEmailWithPDF(pdfAttachment) {
  // Create a transporter object using SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '203266.main@sasi.edu.in',
      pass: '8185MP88'
    }
  });

  let mailOptions = {
    from: '203266.main@sasi.edu.in',
    to: 'prabhashgolla2004@gmail.com',
    subject: 'Colorful PDF',
    text: 'Please find the colorful PDF attached.',
    attachments: [
      {
        filename: 'colorful_pdf.pdf',
        content: pdfAttachment,
        contentType: 'application/pdf'
      }
    ]
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error occurred while sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

// Generate colorful PDF and send email with it attached
async function main() {
  try {
    const pdfBytes = await generateColorfulPDF();
    await sendEmailWithPDF(pdfBytes);
    console.log('Email with colorful PDF sent successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
