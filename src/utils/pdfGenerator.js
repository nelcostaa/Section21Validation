import jsPDF from 'jspdf'
import { getSectionById } from '../data/questionnaire'

/**
 * Generates a PDF document with the assessment results
 * @param {Object} result - The result object from QuestionWizard
 */
export const generateAssessmentPDF = (result) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const maxWidth = pageWidth - (margin * 2)
  let yPosition = margin

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredSpace = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
      return true
    }
    return false
  }

  // Helper function to add text with word wrapping
  const addWrappedText = (text, x, y, maxWidth, fontSize = 10, fontStyle = 'normal') => {
    if (!text) return 0
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', fontStyle)
    const lines = doc.splitTextToSize(String(text), maxWidth)
    doc.text(lines, x, y)
    // Calculate line height: fontSize * line height factor (typically 1.15-1.2)
    return lines.length * (fontSize * 0.5)
  }

  // Title
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('Section 21 Notice Validity Assessment', margin, yPosition)
  yPosition += 15

  // Date
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const date = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
  doc.text(`Assessment Date: ${date}`, margin, yPosition)
  yPosition += 10

  // Result Status
  checkPageBreak(30)
  const resultStatus = result.result
  let statusColor = [0, 0, 0]
  let statusText = ''
  
  if (resultStatus === 'VALID') {
    statusColor = [34, 197, 94] // green-600
    statusText = 'VALID - Your Section 21 notice appears to meet the statutory requirements.'
  } else if (resultStatus === 'INVALID') {
    statusColor = [220, 38, 38] // red-600
    statusText = 'INVALID - Your Section 21 notice is not valid.'
  } else {
    statusColor = [234, 179, 8] // yellow-600
    statusText = 'GREY AREA - The law is not fully settled on this point.'
  }

  doc.setFillColor(...statusColor)
  doc.roundedRect(margin, yPosition, maxWidth, 15, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text(resultStatus, margin + 5, yPosition + 10)
  doc.setTextColor(0, 0, 0)
  yPosition += 20

  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  yPosition += addWrappedText(statusText, margin, yPosition, maxWidth, 11)
  yPosition += 10

  // Summary Statistics
  checkPageBreak(30)
  const invalids = result.reasons ? result.reasons.filter(r => r.type === 'INVALID') : []
  const greys = result.reasons ? result.reasons.filter(r => r.type === 'GREY_AREA') : []
  const valids = result.reasons ? result.reasons.filter(r => r.type === 'VALID') : []

  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary', margin, yPosition)
  yPosition += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  if (valids.length > 0) {
    doc.setTextColor(34, 197, 94)
    doc.text(`✓ ${valids.length} Items Compliant`, margin, yPosition)
    doc.setTextColor(0, 0, 0)
    yPosition += 7
  }
  if (invalids.length > 0) {
    doc.setTextColor(220, 38, 38)
    doc.text(`✗ ${invalids.length} Items Invalid`, margin, yPosition)
    doc.setTextColor(0, 0, 0)
    yPosition += 7
  }
  if (greys.length > 0) {
    doc.setTextColor(234, 179, 8)
    doc.text(`⚠ ${greys.length} Items Uncertain`, margin, yPosition)
    doc.setTextColor(0, 0, 0)
    yPosition += 7
  }
  yPosition += 5

  // Invalid Questions Section
  if (invalids.length > 0) {
    checkPageBreak(40)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(220, 38, 38)
    doc.text('Invalid Questions', margin, yPosition)
    doc.setTextColor(0, 0, 0)
    yPosition += 10

    invalids.forEach((item, index) => {
      checkPageBreak(50)
      
      const section = getSectionById(item.sectionId)
      const sectionName = section ? section.name : `Section ${item.sectionId}`
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`${index + 1}. ${sectionName} - Question ${item.questionId}`, margin, yPosition)
      yPosition += 7

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      yPosition += addWrappedText(item.questionText, margin, yPosition, maxWidth, 10)
      yPosition += 5

      doc.setFont('helvetica', 'bold')
      doc.text('Answer:', margin, yPosition)
      doc.setFont('helvetica', 'normal')
      yPosition += 6
      yPosition += addWrappedText(item.answer, margin + 10, yPosition, maxWidth - 10, 10)
      yPosition += 5

      doc.setFont('helvetica', 'bold')
      doc.setTextColor(220, 38, 38)
      doc.text('Invalid Reason:', margin, yPosition)
      doc.setTextColor(0, 0, 0)
      doc.setFont('helvetica', 'normal')
      yPosition += 6
      yPosition += addWrappedText(item.reason || 'No reason provided', margin + 10, yPosition, maxWidth - 10, 10)
      yPosition += 5

      if (item.actionToTake) {
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(37, 99, 235)
        doc.text('Action to Take:', margin, yPosition)
        doc.setTextColor(0, 0, 0)
        doc.setFont('helvetica', 'normal')
        yPosition += 6
        yPosition += addWrappedText(item.actionToTake, margin + 10, yPosition, maxWidth - 10, 10)
        yPosition += 5
      }

      yPosition += 5
    })
  }

  // Passed / Notes Section
  if (greys.length > 0 || valids.length > 0) {
    checkPageBreak(40)
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(34, 197, 94)
    doc.text('Passed / Notes', margin, yPosition)
    doc.setTextColor(0, 0, 0)
    yPosition += 10

    // Grey Area items
    greys.forEach((item, index) => {
      checkPageBreak(40)
      
      const section = getSectionById(item.sectionId)
      const sectionName = section ? section.name : `Section ${item.sectionId}`
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`${index + 1}. ${sectionName} - Question ${item.questionId}`, margin, yPosition)
      yPosition += 7

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      yPosition += addWrappedText(item.questionText, margin, yPosition, maxWidth, 10)
      yPosition += 5

      doc.setFont('helvetica', 'bold')
      doc.text('Answer:', margin, yPosition)
      doc.setFont('helvetica', 'normal')
      yPosition += 6
      yPosition += addWrappedText(item.answer, margin + 10, yPosition, maxWidth - 10, 10)
      yPosition += 5

      doc.setFont('helvetica', 'bold')
      doc.setTextColor(234, 179, 8)
      doc.text('Note:', margin, yPosition)
      doc.setTextColor(0, 0, 0)
      doc.setFont('helvetica', 'normal')
      yPosition += 6
      yPosition += addWrappedText(item.reason || 'No note provided', margin + 10, yPosition, maxWidth - 10, 10)
      yPosition += 8
    })

    // Valid items
    valids.forEach((item, index) => {
      checkPageBreak(40)
      
      const section = getSectionById(item.sectionId)
      const sectionName = section ? section.name : `Section ${item.sectionId}`
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text(`${greys.length + index + 1}. ${sectionName} - Question ${item.questionId}`, margin, yPosition)
      yPosition += 7

      doc.setFontSize(10)
      doc.setFont('helvetica', 'normal')
      yPosition += addWrappedText(item.questionText, margin, yPosition, maxWidth, 10)
      yPosition += 5

      doc.setFont('helvetica', 'bold')
      doc.text('Answer:', margin, yPosition)
      doc.setFont('helvetica', 'normal')
      yPosition += 6
      yPosition += addWrappedText(item.answer, margin + 10, yPosition, maxWidth - 10, 10)
      yPosition += 5

      if (item.reason) {
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(34, 197, 94)
        doc.text('Passed:', margin, yPosition)
        doc.setTextColor(0, 0, 0)
        doc.setFont('helvetica', 'normal')
        yPosition += 6
        yPosition += addWrappedText(item.reason, margin + 10, yPosition, maxWidth - 10, 10)
        yPosition += 5
      }

      yPosition += 5
    })
  }

  // Next Steps / Recommendations
  checkPageBreak(30)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Next Steps', margin, yPosition)
  yPosition += 10

  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  
  if (resultStatus === 'INVALID') {
    yPosition += addWrappedText(
      'You must rectify the issue and serve a new, compliant notice before proceeding with a possession claim.',
      margin,
      yPosition,
      maxWidth,
      10
    )
  } else if (resultStatus === 'GREY_AREA') {
    yPosition += addWrappedText(
      'While your notice may be valid, it could be challenged in court. We recommend seeking professional legal advice.',
      margin,
      yPosition,
      maxWidth,
      10
    )
  } else {
    yPosition += addWrappedText(
      'You may proceed with a possession claim if the tenant does not leave by the expiry date.',
      margin,
      yPosition,
      maxWidth,
      10
    )
  }

  yPosition += 15

  // Disclaimer
  checkPageBreak(20)
  doc.setFontSize(8)
  doc.setTextColor(128, 128, 128)
  doc.setFont('helvetica', 'italic')
  yPosition += addWrappedText(
    'This assessment is for informational purposes only and is not a substitute for professional legal advice.',
    margin,
    yPosition,
    maxWidth,
    8
  )

  // Generate filename with date
  const filename = `Section21-Assessment-${new Date().toISOString().split('T')[0]}.pdf`
  
  // Save the PDF
  doc.save(filename)
}

