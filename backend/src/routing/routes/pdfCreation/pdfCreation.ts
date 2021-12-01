/* eslint-disable */

import {getFirstResult} from "../../../db/dbAccessor";
import {layoutMultilineText} from "pdf-lib";

const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

interface iAbiturDetails {
    id: number,
    art: string,
    partnerStudentName: string,
    updatedPartnerStudentName: string,
    referenzfach: string,
    updatedReferenzfach: string,
    bezugsfach: string,
    updatedBezugsfach: string,
    examiner: string,
    updatedExaminer: string,
    thema: string,
    updatedThema: string,
    problemQuestion: string,
    updatedProblemQuestion: string,
    presentationForm: string,
    updatedPresentationForm: string,
    genehmigt: boolean,
    ablehnungsgrund: string,
    studentID: number,
    secondStepSubmitted: number,
    tutor: string
}

interface iStudentName {
    vorname:string,
    nachname:string,
    name:string
}

interface iTransitionDates {
    transitionDate2:string,
    transitionDate3:string
}




export async function makePdf(isFormblatt1: boolean, studentID: string):Promise<string> {
    const pdfPath = '../../../../../data/'

    //Get abiturpruefungsdetails and check for details
    let abiturDetailsSql = "SELECT * FROM abiturpruefungen WHERE studentID='" + studentID + "'";
    const abiturDetails:iAbiturDetails = await getFromDatabase(abiturDetailsSql) as iAbiturDetails;

    //Get student name
    let studentNameSql = "Select * FROM nutzer WHERE id='" + studentID + "'";
    const studentName:iStudentName = await getFromDatabase(studentNameSql) as iStudentName;

    //Get submission date from DB
    let abiturYearSql = "SELECT * FROM komponenten WHERE name='5pk'";
    const transitionDates: iTransitionDates = await getFromDatabase(abiturYearSql) as iTransitionDates;


    if (isFormblatt1) {
        return makeFormblatt1Pdf(pdfPath, studentID, abiturDetails, studentName, transitionDates) //return davorsetzen später, denke ich...
    }
    else {
        return makeFormblatt3Pdf(pdfPath, studentID, abiturDetails, studentName, transitionDates) //return davorsetzen später, denke ich...
    }
}

async function makeFormblatt1Pdf(pdfPath: string, studentID: string, abiturDetails: iAbiturDetails, studentName: iStudentName, transitionDates: iTransitionDates):Promise<string> {
    //distinguish between PP and BLL
    let formblatt1Path = undefined;
    if (abiturDetails.art == "PP"){
        formblatt1Path = pdfPath + '5_PK_Formblatt1_PP.pdf';
    }
    else if (abiturDetails.art == "BLL"){
        formblatt1Path = pdfPath + '5_PK_Formblatt1_BLL.pdf';
    }
    else {
        throw("Missing abiturDetails")
    }

    const filename = 'testBLL';

    //Setup Submission Date
    const abiturYear:string = transitionDates.transitionDate2.substring(0, 4);
    const abiturDate:string = transitionDates.transitionDate2.substring(8,10) + "." + transitionDates.transitionDate2.substring(5,7) + "." + abiturYear;


    // Load source pdf
    const sourceDoc = await PDFDocument.load(fs.readFileSync(path.join(__dirname, formblatt1Path)));

    // Init the new document
    const doc = await PDFDocument.create();
    const [mainPage] = await doc.copyPages(sourceDoc, [0]);
    doc.addPage(mainPage);
    const pages = doc.getPages()
    const firstPage = pages[0]

    // Embed the Helvetica fonts
    const helveticaFont = await doc.embedFont(StandardFonts.Helvetica)
    const helveticaBoldFont = await doc.embedFont(StandardFonts.HelveticaBold)

    firstPage.drawText(abiturYear, {
        x: 315,
        y: 703.2,
        size: 14,
        font: helveticaBoldFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(studentName.name, {
        x: 180,
        y: 578.2,
        size: 14,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(abiturDetails.partnerStudentName, {
        x: 180,
        y: 538.2,
        size: 14,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(abiturDetails.referenzfach, {
        x: 180,
        y: 471.2,
        size: 14,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(abiturDetails.examiner, {
        x: 180,
        y: 433.2,
        size: 14,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(abiturDetails.bezugsfach, {
        x: 180,
        y: 369.2,
        size: 14,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(abiturDetails.thema, {
        x: 180,
        y: 299.2,
        size: 14,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(abiturDate, {
        x: 348,
        y: 236.8,
        size: 14,
        font: helveticaBoldFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    // Write the PDF to a file
    const file = path.join(__dirname, filename + '.pdf');
    fs.writeFileSync(file, await doc.save());
    return file;
}

async function makeFormblatt3Pdf(pdfPath: string, studentID: string, abiturDetails: iAbiturDetails, studentName: iStudentName, transitionDates: iTransitionDates):Promise<string> {
    //distinguish between PP and BLL
    let formblatt3Path = undefined;
    let filename = undefined;
    if (abiturDetails.art == "PP"){
        formblatt3Path = pdfPath + '5_PK_Formblatt3_PP.pdf';
        filename = 'DreiertestPP';
    }
    else if (abiturDetails.art == "BLL"){
        formblatt3Path = pdfPath + '5_PK_Formblatt3_BLL.pdf';
        filename = 'DreiertestBLL';
    }
    else {
        throw("Missing abiturDetails")
    }

    //check for updatedValues
    //problemQuestion, referenzfach, bezugsfach, examiner, presentationForm, partnerStudentName
    let finalProblemQuestion;
    let finalReferenzfach;
    let finalBezugsfach;
    let finalExaminer;
    let finalPresentationForm;
    let finalPartnerStudentName;

    if (abiturDetails.updatedProblemQuestion) {
        finalProblemQuestion = abiturDetails.updatedProblemQuestion;
    }
    else {
        finalProblemQuestion = abiturDetails.problemQuestion;
    }

    if (abiturDetails.updatedReferenzfach) {
        finalReferenzfach = abiturDetails.updatedReferenzfach;
    }
    else {
        finalReferenzfach = abiturDetails.referenzfach;
    }

    if (abiturDetails.updatedBezugsfach) {
        finalBezugsfach = abiturDetails.updatedBezugsfach;
    }
    else {
        finalBezugsfach = abiturDetails.bezugsfach;
    }

    if (abiturDetails.updatedExaminer) {
        finalExaminer = abiturDetails.updatedExaminer;
    }
    else {
        finalExaminer = abiturDetails.examiner;
    }

    if (abiturDetails.updatedPresentationForm) {
        finalPresentationForm = abiturDetails.updatedPresentationForm;
    }
    else {
        finalPresentationForm = abiturDetails.presentationForm;
    }

    if (abiturDetails.updatedPartnerStudentName) {
        finalPartnerStudentName = abiturDetails.updatedPartnerStudentName;
    }
    else {
        finalPartnerStudentName = abiturDetails.partnerStudentName;
    }

    console.log(finalProblemQuestion);
    console.log(finalReferenzfach);
    console.log(finalBezugsfach);
    console.log(finalExaminer);
    console.log(finalPresentationForm);
    console.log(finalPartnerStudentName);

    const abiturYear:string = transitionDates.transitionDate3.substring(0, 4);
    const abiturDate:string = transitionDates.transitionDate3.substring(8,10) + "." + transitionDates.transitionDate3.substring(5,7) + "." + abiturYear;
    let finalApprovalDate = new Date(transitionDates.transitionDate3);
    finalApprovalDate.setDate(finalApprovalDate.getDate()+7);
    let monthHelper = finalApprovalDate.getUTCMonth() + 1;
    const finalApprovalDateAsString = finalApprovalDate.getUTCDate() + '.' + monthHelper + '.' + finalApprovalDate.getFullYear();


    // Load source pdf
    const sourceDoc = await PDFDocument.load(fs.readFileSync(path.join(__dirname, formblatt3Path)));

    // Init the new document
    const doc = await PDFDocument.create();
    const [mainPage] = await doc.copyPages(sourceDoc, [0]);
    doc.addPage(mainPage);
    const pages = doc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    console.log(width);
    console.log(height);

    // Embed the Helvetica fonts
    const helveticaFont = await doc.embedFont(StandardFonts.Helvetica)
    const helveticaBoldFont = await doc.embedFont(StandardFonts.HelveticaBold)

    firstPage.drawText(abiturYear, {
        x: 318,
        y: 726,
        size: 14,
        font: helveticaBoldFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(abiturDate, {
        x: 372,
        y: 692.8,
        size: 10,
        font: helveticaBoldFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(studentName.nachname, {
        x: 125,
        y: 673.2,
        size: 11,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(studentName.vorname, {
        x: 375,
        y: 673.2,
        size: 11,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(abiturDetails.tutor, {
        x: 125,
        y: 653.2,
        size: 11,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    const multiText = layoutMultilineText(finalProblemQuestion, {
        alignment: 0,
        font: helveticaFont,
        fontSize: 12,
        bounds: {
            width: 595.32 - 155,
            height: 10000,
            x: 200,
            y: 100
        }
    })

    for(let i = 0; i < multiText.lines.length; i++) {
        if (i > 2) {break}
        firstPage.drawText(`${multiText.lines[i].text}`, {
            x: 75,
            y: 591.5 - i*20.2,
            size: 12,
            maxWidth: width - 100,
            font: helveticaFont
        })
    }

    firstPage.drawText(finalReferenzfach, {
        x: 217,
        y: 524.2,
        size: 11,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(finalBezugsfach, {
        x: 217,
        y: 502.2,
        size: 11,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    firstPage.drawText(finalExaminer, {
        x: 217,
        y: 480.2,
        size: 11,
        font: helveticaFont,
        color: rgb(0.0, 0.0, 0.0),
    })

    if (abiturDetails.art == "BLL") {
        firstPage.drawText(finalPresentationForm, {
            x: 75,
            y: 438.2,
            size: 11,
            font: helveticaFont,
            color: rgb(0.0, 0.0, 0.0),
        })

        firstPage.drawText(finalPartnerStudentName, {
            x: 75,
            y: 397.2,
            size: 11,
            font: helveticaFont,
            color: rgb(0.0, 0.0, 0.0),
        })

        firstPage.drawText('xx.xx.xxxx', {
            x: 482.2,
            y: 274.25,
            size: 10.5,
            font: helveticaBoldFont,
            color: rgb(0.0, 0.0, 0.0),
        })

        firstPage.drawText(finalApprovalDateAsString, {
            x: 393.2,
            y: 56.8,
            size: 10.5,
            font: helveticaBoldFont,
            color: rgb(0.0, 0.0, 0.0),
        })
    }
    else if (abiturDetails.art == "PP") {
        firstPage.drawText(finalPartnerStudentName, {
            x: 75,
            y: 438.2,
            size: 11,
            font: helveticaFont,
            color: rgb(0.0, 0.0, 0.0),
        })

        firstPage.drawText('xx.xx.xxxx', {
            x: 253,
            y: 350.9,
            size: 10.5,
            font: helveticaBoldFont,
            color: rgb(0.0, 0.0, 0.0),
        })

        firstPage.drawText(finalApprovalDateAsString, {
            x: 393.2,
            y: 163.9,
            size: 10.5,
            font: helveticaBoldFont,
            color: rgb(0.0, 0.0, 0.0),
        })
    }



    // Write the PDF to a file
    const file = path.join(__dirname, filename + '.pdf');
    fs.writeFileSync(file, await doc.save());
    return file;
}

async function getFromDatabase(sql: string){
    return new Promise<object>(resolve => {
        getFirstResult(sql, [], (obj, err) => {
            if (err) {
               // @ts-ignore
                resolve (undefined)
            } else {
                if (obj) {
                    // @ts-ignore
                    resolve (obj);
                } else {
                    console.log('object not there')
                    // @ts-ignore
                    resolve (undefined)
                }
            }
        });
    });

}

