const Book = require('../Models/Books');
const ErrorHandler = require('../utils/errorHandeler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures');
const nodemailer = require('nodemailer');
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const http = require('http');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '203266.main@sasi.edu.in',
        pass: '8185MP88'
    }
});

async function generatePdfContent(user, fine, book,date1,date2,date3) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 20;

    const imageBytes = fs.readFileSync(
    path.resolve(__dirname+"/logo.jpg")).toString("base64"); 
    const image = await pdfDoc.embedJpg(imageBytes);
    const imageSize = image.scale(0.04);

    page.drawImage(image, {
        x: width/2-100-imageSize.width,
        y: height-90,
        width: imageSize.width,
        height: imageSize.height,
    });
    
    page.drawText(`LIBRARY`, {
        x: width/2-100+10,
        y: height - 70,
        size: fontSize + 20,
        color: rgb(0, 0, 0), 
    });

    page.drawText(`Indian Institute of Technology,Kharaghpur`, {
        x: width/2-100+3,
        y: height - 90,
        size: fontSize - 10,
        color: rgb(1, 0, 0),
    });
    
    page.drawText(`Date: ${date2}`, {
        x: width-235,
        y: height - 120,
        size: fontSize,
        color: rgb(0, 0, 0), 
    });
    
    page.drawText(`Name: ${user.FirstName} ${user.LastName}`, {
        x: 50,
        y: height - 180,
        size: fontSize,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Email: ${user.EmailId}`, {
        x: 50,
        y: height - 210,
        size: fontSize,
        color: rgb(0, 0, 0),
    });

    page.drawText("Returned Book: "+book.title.substring(0,35)+"...", {
        x: 50,
        y: height - 240,
        size: fontSize,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Issue Date: ${date1}`, {
        x: 50,
        y: height - 270,
        size: fontSize,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Return Date: ${date2}`, {
        x: 50,
        y: height - 300,
        size: fontSize,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Due Date: ${date3}`, {
        x: 50,
        y: height - 330,
        size: fontSize,
        color: rgb(0, 0, 0),
    });

    page.drawText(`Fine: Rs. ${fine}`, {
        x: 50,
        y: height - 360,
        size: fontSize,
        color: rgb(1, 0, 0),
    });

    page.drawText(`With Regards,`, {
        x: 50,
        y: height - 410,
        size: fontSize,
        color: rgb(0.5, 0.5, 0.5),
    });

    page.drawText(`Librarian`, {
        x: 50,
        y: height - 440,
        size: fontSize,
        color: rgb(0.5, 0.5, 0.5),
    });

    page.drawText(`Signature`, {
        x: width-250,
        y: height - 440,
        size: fontSize,
        color: rgb(0.7, 0.7, 0.7),
    });

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('./output.pdf', pdfBytes);
    return pdfBytes;
}

//create new book 
exports.newBook = catchAsyncErrors(async(req,res,next)=>{
    const book = await Book.create(req.body);

    res.status(201).json({
        success:true,
        book
    })
})

//get all Books
exports.getBooks = catchAsyncErrors(async(req,res,next)=>
{
    const resPerPage = 10;
    const booksCount = await Book.countDocuments();
    
    const apiFeatures = new APIFeatures(Book.find(),req.query).search().searchAuth().pagination(resPerPage);
    const books = await apiFeatures.query;

    // const apiFeatures1 = new APIFeatures(Book.find(),req.query).search();
    // const books1 = await apiFeatures1.query;

    res.status(200).json({
        success : true,
        count : books.length,
        // booksCount : books1.length,
        booksCount,
        books
    })
})

// exports.getBooks = catchAsyncErrors(async(req, res, next) => {
//     const resPerPage = 10;
//     const booksCount = await Book.countDocuments();

//     // Initialize APIFeatures object with the Book model and request query parameters
//     const apiFeatures = new APIFeatures(Book.find(), req.query)
//         .search()
//         .pagination(resPerPage)
//         .filter();

//     // Check if genre filter criteria is provided in the request
//     if (req.query.genre && Array.isArray(req.query.genre)) {
//         // Assuming genre is passed as an array of strings in the query parameters
//         apiFeatures.query.where('genre').in(req.query.genre);
//     } else if (req.query.genre) {
//         // Assuming genre is passed as a single string in the query parameters
//         apiFeatures.query.where('genre').equals(req.query.genre);
//     }

//     // Execute the query
//     const books = await apiFeatures.query;

//     // Send response
//     res.status(200).json({
//         success: true,
//         count: books.length,
//         booksCount,
//         books
//     });
// });


exports.getAdminBooks = catchAsyncErrors(async(req,res,next)=>
{
    const books  = await Book.find();
    res.status(200).json({
        success : true,
        books
    })
})

// get single Books
exports.getSingleBook = catchAsyncErrors(async(req,res,next)=>
{
    try{
        const books = await Book.findById(req.params.id);
        if(!books){
            return next(new ErrorHandler('Product Not Found',404));
        }
        res.status(200).json({
            success : true,
            books
        })
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.addUsertoBook = catchAsyncErrors(async(req,res,next)=>{
    try{
        let books = await Book.findById(req.params.id);

        if(!books){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        books.acopies = books.acopies - 1; 
        books.LastAllotedDate = Date.now();
        books = await books.save();
        books = await Book.findByIdAndUpdate(req.params.id,{
            $addToSet: {
                takenById: req.body._id
            },
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        books = await Book.findByIdAndUpdate(req.params.id,{
            $set:{
                reservedById : []
            },
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        res.status(200).json({
            success : true,
            books
        })
        
    }catch (error){
        console.error(error); 
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.updateAvailability = catchAsyncErrors(async(req,res,next)=>{
    try{
        let book = await Book.findById(req.params.id);

        if(!book){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        book.acopies = book.acopies + 1;

        book = await book.save();
        book = await Book.findByIdAndUpdate(req.params.id,{
            $pull: {
                takenById: req.body._id
            }
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        book = await Book.findById(req.params.id);
        generatePdfContent(req.body.user, req.body.fine,book,req.body.element,req.body.currentDate,req.body.endDate)
        .then(pdfData => {
            let mailOptions = {
                from: '"Library IIT KGP" <203266.main@sasi.edu.in>',
                to: `${req.body.user.EmailId}`,
                subject: 'Slip of Returing Book',
                html: `<body style="color: black;">
                    <p>Dear ${req.body.user.FirstName},</p>
                    <p>You have successfully returned the Book ${book.title}.</p>
                    <p>Your Fine is <span style="color: red;">Rs. ${req.body.fine}</span>.</p>
                    <p>You can see the complete details in the attached PDF.</p>
                    <br/>
                    <p style="color: grey;">Thank You</p>
                    <p style="color: grey;">Library IIT KGP</p>
                </body>`,
                attachments: [
                    {
                        filename: 'Receipt.pdf', 
                        content: pdfData, 
                        encoding: 'base64'
                    }
                ]};
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('Error occurred: ' + error.message);
                    return;
                }
                console.log('Email sent: ' + info.response);
            });
            http.createServer((req, res) => {
                const pdfPath = './output.pdf';
                const pdfStream = fs.createReadStream(pdfPath);
                res.setHeader('Content-Type', 'application/pdf');
                pdfStream.pipe(res);
            }).listen(3500, () => {
                console.log('Server running on port 3500');
            });
            // openPdf()
            //     .then(() => console.log('PDF viewer closed'))
            //     .catch(error => console.error('Error opening PDF:', error));
        }).catch(err => {console.log('Error occurred while generating PDF: ' + error.message);
        });

        res.status(200).json({
            success : true,
            book
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.reserveUsertoBook = catchAsyncErrors(async(req,res,next)=>{
    try{
        let books = await Book.findById(req.params.id);

        if(!books){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        books = await Book.findByIdAndUpdate(req.params.id,{
            $addToSet: {
                reservedById: req.body._id
            }
        },{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });
        res.status(200).json({
            success : true,
            books
        })
        
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.updateBook = catchAsyncErrors(async(req,res,next)=>{
    try{
        let books = await Book.findById(req.params.id);

        if(!books){
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            })
        }
        books = await Book.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidatiors :true,
            useFindAndModify :false
        });

        res.status(200).json({
            success : true,
            books
        })
    }catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})

exports.deleteBook= catchAsyncErrors(async(req,res,next)=>{
    try{
    const books = await Book.findByIdAndDelete(req.params.id);
    if(!books) {
        return res.status(404).json({
            success: false,
            message: 'Book not found'
        })
    }

    res.status(200).json({
        success : true,
        books
    })}catch (error){
        console.error(error);
        res.status(500).json({
            success: false,
            message:"Server Error"
        })
    }
})