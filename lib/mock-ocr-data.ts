// Mock OCR data for demonstration purposes
// This simulates what Tesseract.js would extract from document images

export const mockOCRResults: Record<string, string> = {
  "nursing-license.jpg": `BOARD OF NURSING
PROFESSIONAL LICENSE

License Number: NL-2023-45678
Name: SARAH JOHNSON
License Type: Registered Nurse (RN)
Issue Date: January 15, 2025
Expiration Date: January 15, 2027
Status: ACTIVE

This license authorizes the holder to practice as a Registered Nurse
in accordance with the Nursing Practice Act and regulations.

VERIFICATION CODE: NK-8473-2025-VF
Board of Nursing Official Seal

This document is issued by the State Board of Nursing and verifies
that the holder has met all requirements for licensure including:
- Completion of approved nursing program
- Passing NCLEX-RN examination
- Background check clearance
- Continuing education requirements`,

  "cpr-certification.pdf": `AMERICAN RED CROSS
CPR/AED FOR PROFESSIONAL RESCUERS AND HEALTH CARE PROVIDERS

CERTIFICATE OF COMPLETION

This certifies that: SARAH JOHNSON
Has successfully completed the training and testing requirements for:

CPR/AED for Professional Rescuers and Health Care Providers

Course Completion Date: December 10, 2024
Certificate Valid Until: December 10, 2026

Course Includes:
- Adult, Child, and Infant CPR
- Automated External Defibrillator (AED)
- Professional-level skills and techniques
- Emergency oxygen administration

Instructor: Michael Chen, RN
Instructor ID: RC-78945
Training Center: City Medical Training Center

Certificate ID: CPR-2024-89234
American Red Cross Official Certification`,

  "background-check.jpg": `NATIONAL CRIMINAL BACKGROUND CHECK
COMPREHENSIVE SCREENING REPORT

Subject Name: Sarah Johnson
Date of Birth: [REDACTED]
SSN: XXX-XX-[REDACTED]
Report Date: January 5, 2025
Valid Through: January 5, 2026

CRIMINAL HISTORY CHECK: CLEAR
- County Records: No records found
- State Records: No records found
- Federal Records: No records found
- Sex Offender Registry: Not listed

EMPLOYMENT VERIFICATION: VERIFIED
- Previous employers contacted and verified
- All employment dates confirmed
- Professional references checked

EDUCATION VERIFICATION: VERIFIED
- Nursing degree confirmed
- Licensure credentials verified

RESULT: APPROVED FOR EMPLOYMENT
Risk Level: LOW
Recommended Action: CLEARED FOR HIRE

Report ID: BGC-2025-34567
Bureau Seal: National Bureau of Investigation`,

  "tb-test.jpg": `CITY HEALTH CLINIC
TUBERCULOSIS SCREENING REPORT

Patient Name: Sarah Johnson
Date of Birth: [REDACTED]
Test Date: January 8, 2025
Valid Until: January 8, 2026

TEST TYPE: Tuberculin Skin Test (TST)
Method: Mantoux Test - PPD
Administered by: Dr. Patricia Williams, MD
Reading Date: January 10, 2025 (48-72 hours post-administration)

RESULTS:
Induration: 0 mm
Interpretation: NEGATIVE

The patient shows no evidence of tuberculosis infection.
Cleared for employment in healthcare settings.

Additional Notes:
- No risk factors identified
- No symptoms of active TB
- Annual testing recommended for healthcare workers

Physician Signature: Dr. Patricia Williams
License: MD-456789
Clinic: City Health Clinic
Phone: (555) 123-4567

Report ID: TB-2025-12345`,

  "hepatitis-b.jpg": `CITY HEALTH CLINIC
IMMUNIZATION RECORD

Patient: Sarah Johnson
DOB: [REDACTED]
Record Date: November 20, 2024

HEPATITIS B VACCINATION SERIES - COMPLETE

Dose 1: March 15, 2020
Dose 2: April 15, 2020
Dose 3: September 15, 2020

Vaccine Type: Recombinant Hepatitis B Vaccine
Manufacturer: MedVax Pharmaceuticals
Route: Intramuscular injection

ANTIBODY TITER TEST RESULTS:
Date: October 10, 2024
Anti-HBs Level: 125 mIU/mL
Interpretation: IMMUNE (Adequate Protection)

Status: LIFETIME IMMUNITY CONFIRMED
No booster doses required

Healthcare Provider: Dr. Patricia Williams, MD
License Number: MD-456789
Clinic Phone: (555) 123-4567

Verification Code: HEP-B-2024-67890
Official CDC Immunization Record`,

  "professional-references.jpg": `PROFESSIONAL REFERENCE VERIFICATION REPORT

Candidate: Sarah Johnson
Position Applied: Healthcare Professional
Verification Date: January 3, 2025

REFERENCE 1:
Name: Dr. Michael Anderson, Chief of Nursing
Organization: Metropolitan General Hospital
Relationship: Direct Supervisor (2020-2024)
Contact: (555) 234-5678
Status: ✓ VERIFIED - POSITIVE FEEDBACK

Comments: "Sarah is an exceptional nurse with outstanding clinical skills
and compassionate patient care. Highly recommend for any healthcare position."

REFERENCE 2:
Name: Jennifer Martinez, RN, MSN
Organization: Sunrise Care Facility
Relationship: Colleague and Mentor
Contact: (555) 345-6789
Status: ✓ VERIFIED - POSITIVE FEEDBACK

Comments: "Professional, reliable, and skilled. Sarah demonstrates excellent
judgment and works well in team environments. Outstanding caregiver."

REFERENCE 3:
Name: Robert Thompson, Facility Director
Organization: City Wellness Center
Relationship: Former Employer (2018-2020)
Contact: (555) 456-7890
Status: ✓ VERIFIED - POSITIVE FEEDBACK

Comments: "Sarah was an asset to our team. Excellent attendance, strong work
ethic, and exceptional patient relationships. Would rehire without hesitation."

OVERALL ASSESSMENT: HIGHLY RECOMMENDED
All references contacted and verified
Consistent positive feedback across all evaluations

Verification Conducted By: CareLink Verification Services
Report ID: REF-2025-45678`,
}

// Function to simulate OCR processing with realistic delay
export function simulateOCR(fileName: string): Promise<string> {
  return new Promise((resolve) => {
    // Find matching mock data (case-insensitive, partial match)
    const normalizedFileName = fileName.toLowerCase()
    let result = ""

    if (normalizedFileName.includes("nursing") || normalizedFileName.includes("license")) {
      result = mockOCRResults["nursing-license.jpg"]
    } else if (normalizedFileName.includes("cpr")) {
      result = mockOCRResults["cpr-certification.pdf"]
    } else if (normalizedFileName.includes("background") || normalizedFileName.includes("check")) {
      result = mockOCRResults["background-check.jpg"]
    } else if (normalizedFileName.includes("tb") || normalizedFileName.includes("tuberculosis")) {
      result = mockOCRResults["tb-test.jpg"]
    } else if (normalizedFileName.includes("hepatitis") || normalizedFileName.includes("vaccination")) {
      result = mockOCRResults["hepatitis-b.jpg"]
    } else if (normalizedFileName.includes("reference")) {
      result = mockOCRResults["professional-references.jpg"]
    } else {
      // Default generic document text
      result = `MEDICAL CERTIFICATE

Document Name: ${fileName}
Date Issued: ${new Date().toLocaleDateString()}
Status: VERIFIED

This document has been processed and verified.
All information has been extracted successfully.

Certificate Number: DOC-${Math.random().toString(36).substring(2, 11).toUpperCase()}
Verification Status: APPROVED

Thank you for using our OCR document processing system.`
    }

    // Simulate realistic processing time (2-4 seconds)
    const delay = 2000 + Math.random() * 2000
    setTimeout(() => resolve(result), delay)
  })
}

// Function to get progress updates during simulation
export function* simulateProgressUpdates() {
  const stages = [
    { progress: 0, status: "Initializing OCR engine..." },
    { progress: 15, status: "Loading document..." },
    { progress: 30, status: "Detecting text regions..." },
    { progress: 50, status: "Recognizing text..." },
    { progress: 70, status: "Processing characters..." },
    { progress: 85, status: "Analyzing document structure..." },
    { progress: 95, status: "Finalizing extraction..." },
    { progress: 100, status: "Complete!" },
  ]

  for (const stage of stages) {
    yield stage
  }
}
