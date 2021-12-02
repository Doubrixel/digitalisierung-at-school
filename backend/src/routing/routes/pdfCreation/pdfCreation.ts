/* eslint-disable @typescript-eslint/ban-types */
import {getFirstResult} from '../../../db/dbAccessor';
import {Color, layoutMultilineText, PDFDocument, PDFFont, rgb, StandardFonts} from 'pdf-lib';

import fs from 'fs';
import path from 'path';

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
    tutor: string,
    updatedTutor: string
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




export async function makePdf(FormblattVersion: number, studentID: number):Promise<{ filePath: string, studentName: string }> {
    const pdfPath = '../../../../../data/';

    // Get abiturpruefungsdetails and check for details
    const abiturDetailsSql = 'SELECT * FROM abiturpruefungen WHERE studentID=?';
    const abiturDetailsArgs = [studentID];
    const abiturDetails:iAbiturDetails = await getFromDatabase(abiturDetailsSql, abiturDetailsArgs) as iAbiturDetails;

    // Get student name
    const studentNameSql = 'Select * FROM nutzer WHERE id=?';
    const studentNameArgs = [studentID];
    const studentName:iStudentName = await getFromDatabase(studentNameSql, studentNameArgs) as iStudentName;
    if (!studentName.name || !studentName.vorname || !studentName.nachname) {
        throw new Error('Unexpected null in nutzer table');
    }

    // Get submission date from DB
    const abiturYearSql = "SELECT * FROM komponenten WHERE name='fifthExam'";
    const transitionDates: iTransitionDates = await getFromDatabase(abiturYearSql, []) as iTransitionDates;
    transitionDates.transitionDate2 = new Date(transitionDates.transitionDate2).toISOString();
    transitionDates.transitionDate3 = new Date(transitionDates.transitionDate3).toISOString();

    let doc:PDFDocument;

    if (FormblattVersion == 1) {
        doc = await makeFormblatt1Pdf(pdfPath, abiturDetails, studentName, transitionDates);
    }
    else {
        doc = await makeFormblatt3Pdf(pdfPath, abiturDetails, studentName, transitionDates);
    }

    const filePath = path.join(__dirname, studentName.name+'.pdf');
    fs.writeFileSync(filePath, await doc.save());
    return {filePath, studentName: studentName.nachname};
}

async function makeFormblatt1Pdf(pdfPath: string, abiturDetails: iAbiturDetails, studentName: iStudentName, transitionDates: iTransitionDates):Promise<PDFDocument> {
    // distinguish between PP and BLL
    let formblatt1Path = undefined;
    if (abiturDetails.art == 'PP'){
        formblatt1Path = pdfPath + '5_PK_Formblatt1_PP.pdf';
    }
    else if (abiturDetails.art == 'BLL'){
        formblatt1Path = pdfPath + '5_PK_Formblatt1_BLL.pdf';
    }
    else {
        throw('Missing abiturDetails');
    }

    // Setup Submission Date
    const abiturYear:string = transitionDates.transitionDate2.substring(0, 4);
    const abiturDate:string = transitionDates.transitionDate2.substring(8,10) + '.' + transitionDates.transitionDate2.substring(5,7) + '.' + abiturYear;


    const doc = await loadAndInitPdf(formblatt1Path);
    const firstPage = doc.getPages()[0];

    // Embed the Helvetica fonts
    const helveticaFont = await doc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await doc.embedFont(StandardFonts.HelveticaBold);

    const drawText = (
        value: string,
        x:number,
        y:number,
        font:PDFFont=helveticaFont,
        size=14,
        color:Color=rgb(0.0, 0.0, 0.0)) =>
    {
        firstPage.drawText(value, {
            x,
            y,
            size,
            font,
            color
        });
    };

    const { partnerStudentName, referenzfach, examiner, bezugsfach, thema } = abiturDetails;
    drawText(abiturYear, 315, 703.2, helveticaBoldFont);
    drawText(studentName.name, 180, 578.2);
    drawText(partnerStudentName, 180, 538.2);
    drawText(referenzfach, 180, 471.2);
    drawText(examiner, 180, 433.2);
    drawText(bezugsfach, 180, 369.2);
    drawText(thema, 180, 299.2);
    drawText(abiturDate, 348, 236.8, helveticaBoldFont);

    return doc;
}

async function makeFormblatt3Pdf(pdfPath: string, abiturDetails: iAbiturDetails, studentName: iStudentName, transitionDates: iTransitionDates):Promise<PDFDocument> {
    // distinguish between PP and BLL
    let formblatt3Path = undefined;
    if (abiturDetails.art == 'PP'){
        formblatt3Path = pdfPath + '5_PK_Formblatt3_PP.pdf';
    }
    else if (abiturDetails.art == 'BLL'){
        formblatt3Path = pdfPath + '5_PK_Formblatt3_BLL.pdf';
    }
    else {
        throw('Missing abiturDetails');
    }

    const { problemQuestion, updatedProblemQuestion, referenzfach, updatedReferenzfach, bezugsfach, updatedBezugsfach, examiner, updatedExaminer, presentationForm, updatedPresentationForm, partnerStudentName, updatedPartnerStudentName, tutor, updatedTutor } = abiturDetails;

    const checkIfUpdated = (original:string|null, updated:string|null) => {
        if (updated) return updated;
        if (original) return original;
        return '';
    };
    const finalProblemQuestion = checkIfUpdated(problemQuestion, updatedProblemQuestion);
    const finalReferenzfach = checkIfUpdated(referenzfach, updatedReferenzfach);
    const finalBezugsfach = checkIfUpdated(bezugsfach, updatedBezugsfach);
    const finalExaminer = checkIfUpdated(examiner, updatedExaminer);
    const finalPresentationForm = checkIfUpdated(presentationForm, updatedPresentationForm);
    const finalPartnerStudentName = checkIfUpdated(partnerStudentName, updatedPartnerStudentName);
    const finalTutor = checkIfUpdated(tutor, updatedTutor);

    const abiturYear:string = transitionDates.transitionDate3.substring(0, 4);
    const abiturDate:string = transitionDates.transitionDate3.substring(8,10) + '.' + transitionDates.transitionDate3.substring(5,7) + '.' + abiturYear;
    const finalApprovalDate = new Date(transitionDates.transitionDate3);
    finalApprovalDate.setDate(finalApprovalDate.getDate()+7);
    const monthHelper = finalApprovalDate.getUTCMonth() + 1;
    const finalApprovalDateAsString = finalApprovalDate.getUTCDate() + '.' + monthHelper + '.' + finalApprovalDate.getFullYear();

    const doc = await loadAndInitPdf(formblatt3Path);
    const firstPage = doc.getPages()[0];
    const { width } = firstPage.getSize();

    // Embed the Helvetica fonts
    const helveticaFont = await doc.embedFont(StandardFonts.Helvetica);
    const helveticaBoldFont = await doc.embedFont(StandardFonts.HelveticaBold);

    const drawText = (
        value: string,
        x:number,
        y:number,
        font:PDFFont=helveticaFont,
        size=11,
        color:Color=rgb(0.0, 0.0, 0.0)) =>
    {
        firstPage.drawText(value, {
            x,
            y,
            size,
            font,
            color
        });
    };
    drawText(abiturYear, 318, 726, helveticaBoldFont, 14);
    drawText(abiturDate, 372, 692.8, helveticaBoldFont, 10);
    drawText(studentName.nachname, 125, 673.2);
    drawText(studentName.vorname, 375, 673.2);
    drawText(finalTutor, 125, 653.2);

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
    });

    for(let i = 0; i < multiText.lines.length; i++) {
        if (i > 2) {break;}
        firstPage.drawText(`${multiText.lines[i].text}`, {
            x: 75,
            y: 591.5 - i*20.2,
            size: 12,
            maxWidth: width - 100,
            font: helveticaFont
        });
    }
    drawText(finalReferenzfach, 217, 524.2);
    drawText(finalBezugsfach, 217, 502.2);
    drawText(finalExaminer, 217, 480.2);
    if (abiturDetails.art == 'PP') {
        drawText(finalPresentationForm, 75, 438.2);
        drawText(finalPartnerStudentName, 75, 397.2);
        drawText('xx.xx.xxxx', 482.2, 274.25, helveticaBoldFont,10.5);
        drawText(finalApprovalDateAsString, 390, 56.8, helveticaBoldFont, 10.5);
    }
    else if (abiturDetails.art == 'BLL') {
        drawText(finalPartnerStudentName, 75, 438.2);
        drawText('xx.xx.xxxx', 253, 350.9, helveticaBoldFont, 10.5);
        drawText(finalApprovalDateAsString, 390, 163.9, helveticaBoldFont, 10.5);
    }

    return doc;
}

async function getFromDatabase(sql: string, args: Array<string|number>){
    return new Promise<object>(resolve => {
        getFirstResult(sql, args, (obj, err) => {
            if (err) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
               // @ts-ignore
                resolve (undefined);
            } else {
                if (obj) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    resolve (obj);
                } else {
                    console.log('object not there');
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    resolve (undefined);
                }
            }
        });
    });
}

const loadAndInitPdf = async (sourceDocPath:string):Promise<PDFDocument> => {
    const sourceDoc = await PDFDocument.load(fs.readFileSync(path.join(__dirname, sourceDocPath)));

    // Init the new document
    const doc = await PDFDocument.create();
    const [mainPage] = await doc.copyPages(sourceDoc, [0]);
    doc.addPage(mainPage);
    return doc;
};

