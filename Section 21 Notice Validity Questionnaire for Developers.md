# Section 21 Notice Validity Questionnaire for Developers

**Author:** Manus AI
**Date:** November 10, 2025

## Introduction

This document outlines the structured questionnaire for the "Can I Serve a Valid S21?" interactive tool. It is based on the provided `Section_21_Notice_Validity_Guide.docx` and is intended to serve as a specification for development.

Each question is presented in a table containing the following fields:

- **ID:** A unique identifier for the question.
- **Question Text:** The exact text to be displayed to the user.
- **Answer Options & Logic:** The available answers and the corresponding action (e.g., proceed to the next question, show a result).
- **Learning Point:** Explanatory text to educate the user. This includes notes, grey areas, and links to relevant legislation or articles. This section can be expanded with additional content.

---

## Questionnaire Structure

### Section 1: Preliminary Checks

| ID | Question Text | Answer Options & Logic | Learning Point |
| :--- | :--- | :--- | :--- |
| 1.1 | Was the Section 21 notice served on or after 1 October 2021? | **No:** Result -> INVALID (Expired)<br>**Yes:** Proceed to 1.2 | **Learning Point:** Notices served before this date have expired and are no longer valid for starting court proceedings. |
| 1.2 | Was the Section 21 notice served less than 4 months from the start of the initial tenancy? | **Yes:** Result -> INVALID<br>**No:** Proceed to 1.3 | **Learning Point:** A landlord cannot serve a Section 21 notice within the first four months of the original tenancy agreement. This is to prevent immediate evictions after a tenant moves in. |
| 1.3 | Does the notice give the tenant at least 2 months' notice from the date of service? | **No:** Result -> INVALID<br>**Yes:** Proceed to 1.4 | **Learning Point:** The statutory minimum notice period for a Section 21 is two full months. The notice is not valid if it provides less time. |
| 1.4 | Was the Section 21 notice served more than 6 months ago? | **Yes:** Result -> INVALID<br>**No:** Proceed to Section 2 | **Learning Point:** A Section 21 notice has a limited lifespan. If court proceedings are not started within 6 months of the notice being served, it expires and a new notice must be issued. |

---

### Section 2: Tenant Fees & Prohibited Payments

| ID | Question Text | Answer Options & Logic | Learning Point |
| :--- | :--- | :--- | :--- |
| 2.1 | Was the current tenancy agreement entered into **before** 1 June 2019? | **Yes:** Proceed to Section 3 (Deposit Protection)<br>**No:** Proceed to 2.2 | **Learning Point:** The Tenant Fees Act 2019 introduced new rules about what landlords can charge. Tenancies that started before this date are subject to different rules regarding fees and deposit caps. |
| 2.2 | Have you charged any fees or payments other than those on the permitted list, and not repaid them? | **Yes:** Result -> INVALID<br>**No:** Proceed to Section 3 | **Learning Point:** The Tenant Fees Act 2019 bans most upfront fees for tenancies signed on or after 1 June 2019. If you have taken a prohibited payment and not returned it, you cannot serve a valid Section 21 notice. Permitted payments include rent, deposits (capped), holding deposits (capped), and specific default fees. |

---

### Section 3: Deposit Protection

*This is the most complex area. The logic must be followed carefully.*

| ID | Question Text | Answer Options & Logic | Learning Point |
| :--- | :--- | :--- | :--- |
| 3.1 | Was a tenancy deposit taken for this tenancy? | **No:** Proceed to Section 4<br>**Yes:** Proceed to 3.2 | **Learning Point:** If no deposit was ever taken, the deposit protection rules do not apply. |
| 3.2 | Was the deposit protected in a government-approved scheme (TDP) within 30 days of receiving it? | **No:** Result -> INVALID<br>**Yes:** Proceed to 3.3 | **Learning Point:** For any tenancy starting or renewing after 6 April 2012, the deposit must be protected within 30 days. Failure to do so is a breach that must be remedied by returning the deposit in full before a Section 21 can be served. |
| 3.3 | Did you provide the tenant with the 'Prescribed Information' relating to their deposit protection? | **No:** Result -> INVALID<br>**Yes:** Proceed to Section 4 | **Learning Point:** Protecting the deposit is not enough. You must also provide the tenant with specific details about the scheme used, how to get their deposit back, and what to do in case of a dispute. This is a common point of failure for landlords. [See Prescribed Information Regulations](https://www.legislation.gov.uk/uksi/2007/797/contents/made). |

---

### Section 4: Mandatory Documentation

| ID | Question Text | Answer Options & Logic | Learning Point |
| :--- | :--- | :--- | :--- |
| 4.1 | Did the current tenancy agreement start on or after 1 October 2015? | **No:** Proceed to Section 5<br>**Yes:** Proceed to 4.2 | **Learning Point:** The requirement to provide the EPC, Gas Safety Certificate, and 'How to Rent' guide applies to tenancies that started or were renewed on or after this date. |
| 4.2 | Have you provided the tenant with a valid Gas Safety Certificate (if there is a gas supply)? | **No:** Result -> INVALID<br>**Yes:** Proceed to 4.3 | **Learning Point:** A valid Gas Safety Certificate must be given to the tenant before they occupy the property. While a late certificate can be remedied before serving the S21, failure to provide one at all is a fatal flaw. See the case of *Trecarrell House Limited v Rouncefield [2020]*. |
| 4.3 | Have you provided the tenant with a current Energy Performance Certificate (EPC)? | **No:** Result -> INVALID<br>**Yes:** Proceed to 4.4 | **Learning Point:** An EPC must be given to the tenant at the start of the tenancy. It is valid for 10 years. This is not required for a room in a shared HMO. |
| 4.4 | Have you provided the tenant with the government's 'How to Rent' guide? | **No:** Result -> INVALID<br>**Yes:** Proceed to Section 5 | **Learning Point:** You must provide the version of the guide that was most current when the tenancy started or was renewed. Failure to do so will invalidate your notice. |

---

### Section 5: Licensing and Property Condition

| ID | Question Text | Answer Options & Logic | Learning Point |
| :--- | :--- | :--- | :--- |
| 5.1 | Is the property a House in Multiple Occupation (HMO) that requires a license? | **No:** Proceed to 5.3<br>**Yes:** Proceed to 5.2 | **Learning Point:** This includes properties subject to mandatory national licensing or a local authority's additional or selective licensing scheme. Check with your local council if you are unsure. |
| 5.2 | Is the HMO licensed, or do you have a valid temporary exemption or pending application? | **No:** Result -> INVALID<br>**Yes:** Proceed to 5.3 | **Learning Point:** It is a criminal offence to operate a licensable HMO without a license. You cannot serve a valid Section 21 notice for an unlicensed HMO. |
| 5.3 | Has the local council served an Improvement Notice or Emergency Remedial Action notice in the last 6 months? | **Yes:** Result -> INVALID<br>**No:** Proceed to 5.4 | **Learning Point:** This is known as 'retaliatory eviction'. If a tenant complains about property conditions and the council agrees by serving a formal notice, any Section 21 served after the initial complaint becomes invalid. |

---

### Section 6: Form and Final Checks

| ID | Question Text | Answer Options & Logic | Learning Point |
| :--- | :--- | :--- | :--- |
| 6.1 | Did you use the correct 'Form 6A' for the Section 21 notice? | **No:** Result -> INVALID<br>**Yes:** Proceed to 6.2 | **Learning Point:** For all tenancies in England, the prescribed form for a Section 21 notice is Form 6A. Using an outdated or incorrect form will invalidate the notice. [Download Form 6A from GOV.UK](https://www.gov.uk/guidance/assured-tenancy-forms#form-6a). |
| 6.2 | Does the notice expire on or after the end of the fixed term of the tenancy? | **No:** Result -> INVALID<br>**Yes:** Result -> VALID | **Learning Point:** A Section 21 notice cannot be used to end a tenancy during its fixed term. The date of expiry specified in the notice must be after the fixed-term contract has ended. |

---

## Result Pages

- **VALID:** Your Section 21 notice appears to meet the statutory requirements. You may proceed with a possession claim if the tenant does not leave by the expiry date.
- **INVALID:** Your Section 21 notice is not valid. The reason for the invalidity has been highlighted. You must rectify the issue and serve a new, compliant notice.
- **GREY AREA:** The law is not fully settled on this point. While your notice may be valid, it could be challenged in court. We recommend seeking professional legal advice.
