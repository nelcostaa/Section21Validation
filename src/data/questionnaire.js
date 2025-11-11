export const questionnaire = {
  sections: [
    {
      id: 1,
      name: "Preliminary Checks",
      description: "Basic date and notice period validation"
    },
    {
      id: 2,
      name: "Tenant Fees & Prohibited Payments",
      description: "Compliance with Tenant Fees Act 2019"
    },
    {
      id: 3,
      name: "Deposit Protection",
      description: "Tenancy Deposit Protection scheme requirements"
    },
    {
      id: 4,
      name: "Mandatory Documentation",
      description: "EPC, Gas Safety Certificate, and 'How to Rent' guide"
    },
    {
      id: 5,
      name: "Licensing and Property Condition",
      description: "HMO licensing and retaliatory eviction protections"
    },
    {
      id: 6,
      name: "Form and Final Checks",
      description: "Form 6A compliance and fixed-term requirements"
    }
  ],
  questions: [
    {
      id: "1.1",
      sectionId: 1,
      questionText: "Was the Section 21 notice served on or after 1 October 2021?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "Notices served before 1 October 2021 have expired and are no longer valid for starting court proceedings." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "1.2" }
        }
      ],
      learningPoint: "Notices served before this date have expired and are no longer valid for starting court proceedings."
    },
    {
      id: "1.2",
      sectionId: 1,
      questionText: "Was the Section 21 notice served less than 4 months from the start of the initial tenancy?",
      answers: [
        {
          text: "Yes",
          value: true,
          action: { type: "result", result: "INVALID", reason: "A landlord cannot serve a Section 21 notice within the first four months of the original tenancy agreement. This is to prevent immediate evictions after a tenant moves in." }
        },
        {
          text: "No",
          value: false,
          action: { type: "next", questionId: "1.3" }
        }
      ],
      learningPoint: "A landlord cannot serve a Section 21 notice within the first four months of the original tenancy agreement. This is to prevent immediate evictions after a tenant moves in."
    },
    {
      id: "1.3",
      sectionId: 1,
      questionText: "Does the notice give the tenant at least 2 months' notice from the date of service?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "The statutory minimum notice period for a Section 21 is two full months. The notice is not valid if it provides less time." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "1.4" }
        }
      ],
      learningPoint: "The statutory minimum notice period for a Section 21 is two full months. The notice is not valid if it provides less time."
    },
    {
      id: "1.4",
      sectionId: 1,
      questionText: "Was the Section 21 notice served more than 6 months ago?",
      answers: [
        {
          text: "Yes",
          value: true,
          action: { type: "result", result: "INVALID", reason: "A Section 21 notice has a limited lifespan. If court proceedings are not started within 6 months of the notice being served, it expires and a new notice must be issued." }
        },
        {
          text: "No",
          value: false,
          action: { type: "next", questionId: "2.1" }
        }
      ],
      learningPoint: "A Section 21 notice has a limited lifespan. If court proceedings are not started within 6 months of the notice being served, it expires and a new notice must be issued."
    },
    {
      id: "2.1",
      sectionId: 2,
      questionText: "Was the current tenancy agreement entered into **before** 1 June 2019?",
      answers: [
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "3.1" }
        },
        {
          text: "No",
          value: false,
          action: { type: "next", questionId: "2.2" }
        }
      ],
      learningPoint: "The Tenant Fees Act 2019 introduced new rules about what landlords can charge. Tenancies that started before this date are subject to different rules regarding fees and deposit caps."
    },
    {
      id: "2.2",
      sectionId: 2,
      questionText: "Have you charged any fees or payments other than those on the permitted list, and not repaid them?",
      answers: [
        {
          text: "Yes",
          value: true,
          action: { type: "result", result: "INVALID", reason: "The Tenant Fees Act 2019 bans most upfront fees for tenancies signed on or after 1 June 2019. If you have taken a prohibited payment and not returned it, you cannot serve a valid Section 21 notice." }
        },
        {
          text: "No",
          value: false,
          action: { type: "next", questionId: "3.1" }
        }
      ],
      learningPoint: "The Tenant Fees Act 2019 bans most upfront fees for tenancies signed on or after 1 June 2019. If you have taken a prohibited payment and not returned it, you cannot serve a valid Section 21 notice. Permitted payments include rent, deposits (capped), holding deposits (capped), and specific default fees."
    },
    {
      id: "3.1",
      sectionId: 3,
      questionText: "Was a tenancy deposit taken for this tenancy?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "next", questionId: "4.1" }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "3.2" }
        }
      ],
      learningPoint: "If no deposit was ever taken, the deposit protection rules do not apply."
    },
    {
      id: "3.2",
      sectionId: 3,
      questionText: "Was the deposit protected in a government-approved scheme (TDP) within 30 days of receiving it?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "For any tenancy starting or renewing after 6 April 2012, the deposit must be protected within 30 days. Failure to do so is a breach that must be remedied by returning the deposit in full before a Section 21 can be served." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "3.3" }
        }
      ],
      learningPoint: "For any tenancy starting or renewing after 6 April 2012, the deposit must be protected within 30 days. Failure to do so is a breach that must be remedied by returning the deposit in full before a Section 21 can be served."
    },
    {
      id: "3.3",
      sectionId: 3,
      questionText: "Did you provide the tenant with the 'Prescribed Information' relating to their deposit protection?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "Protecting the deposit is not enough. You must also provide the tenant with specific details about the scheme used, how to get their deposit back, and what to do in case of a dispute. This is a common point of failure for landlords." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "4.1" }
        }
      ],
      learningPoint: "Protecting the deposit is not enough. You must also provide the tenant with specific details about the scheme used, how to get their deposit back, and what to do in case of a dispute. This is a common point of failure for landlords. See Prescribed Information Regulations: https://www.legislation.gov.uk/uksi/2007/797/contents/made"
    },
    {
      id: "4.1",
      sectionId: 4,
      questionText: "Did the current tenancy agreement start on or after 1 October 2015?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "next", questionId: "5.1" }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "4.2" }
        }
      ],
      learningPoint: "The requirement to provide the EPC, Gas Safety Certificate, and 'How to Rent' guide applies to tenancies that started or were renewed on or after this date."
    },
    {
      id: "4.2",
      sectionId: 4,
      questionText: "Have you provided the tenant with a valid Gas Safety Certificate (if there is a gas supply)?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "A valid Gas Safety Certificate must be given to the tenant before they occupy the property. While a late certificate can be remedied before serving the S21, failure to provide one at all is a fatal flaw. See the case of Trecarrell House Limited v Rouncefield [2020]." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "4.3" }
        }
      ],
      learningPoint: "A valid Gas Safety Certificate must be given to the tenant before they occupy the property. While a late certificate can be remedied before serving the S21, failure to provide one at all is a fatal flaw. See the case of Trecarrell House Limited v Rouncefield [2020]."
    },
    {
      id: "4.3",
      sectionId: 4,
      questionText: "Have you provided the tenant with a current Energy Performance Certificate (EPC)?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "An EPC must be given to the tenant at the start of the tenancy. It is valid for 10 years. This is not required for a room in a shared HMO." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "4.4" }
        }
      ],
      learningPoint: "An EPC must be given to the tenant at the start of the tenancy. It is valid for 10 years. This is not required for a room in a shared HMO."
    },
    {
      id: "4.4",
      sectionId: 4,
      questionText: "Have you provided the tenant with the government's 'How to Rent' guide?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "You must provide the version of the guide that was most current when the tenancy started or was renewed. Failure to do so will invalidate your notice." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "5.1" }
        }
      ],
      learningPoint: "You must provide the version of the guide that was most current when the tenancy started or was renewed. Failure to do so will invalidate your notice."
    },
    {
      id: "5.1",
      sectionId: 5,
      questionText: "Is the property a House in Multiple Occupation (HMO) that requires a license?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "next", questionId: "5.3" }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "5.2" }
        }
      ],
      learningPoint: "This includes properties subject to mandatory national licensing or a local authority's additional or selective licensing scheme. Check with your local council if you are unsure."
    },
    {
      id: "5.2",
      sectionId: 5,
      questionText: "Is the HMO licensed, or do you have a valid temporary exemption or pending application?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "It is a criminal offence to operate a licensable HMO without a license. You cannot serve a valid Section 21 notice for an unlicensed HMO." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "5.3" }
        }
      ],
      learningPoint: "It is a criminal offence to operate a licensable HMO without a license. You cannot serve a valid Section 21 notice for an unlicensed HMO."
    },
    {
      id: "5.3",
      sectionId: 5,
      questionText: "Has the local council served an Improvement Notice or Emergency Remedial Action notice in the last 6 months?",
      answers: [
        {
          text: "Yes",
          value: true,
          action: { type: "result", result: "INVALID", reason: "This is known as 'retaliatory eviction'. If a tenant complains about property conditions and the council agrees by serving a formal notice, any Section 21 served after the initial complaint becomes invalid." }
        },
        {
          text: "No",
          value: false,
          action: { type: "next", questionId: "6.1" }
        }
      ],
      learningPoint: "This is known as 'retaliatory eviction'. If a tenant complains about property conditions and the council agrees by serving a formal notice, any Section 21 served after the initial complaint becomes invalid."
    },
    {
      id: "6.1",
      sectionId: 6,
      questionText: "Did you use the correct 'Form 6A' for the Section 21 notice?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "For all tenancies in England, the prescribed form for a Section 21 notice is Form 6A. Using an outdated or incorrect form will invalidate the notice." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "next", questionId: "6.2" }
        }
      ],
      learningPoint: "For all tenancies in England, the prescribed form for a Section 21 notice is Form 6A. Using an outdated or incorrect form will invalidate the notice. Download Form 6A from GOV.UK: https://www.gov.uk/guidance/assured-tenancy-forms#form-6a"
    },
    {
      id: "6.2",
      sectionId: 6,
      questionText: "Does the notice expire on or after the end of the fixed term of the tenancy?",
      answers: [
        {
          text: "No",
          value: false,
          action: { type: "result", result: "INVALID", reason: "A Section 21 notice cannot be used to end a tenancy during its fixed term. The date of expiry specified in the notice must be after the fixed-term contract has ended." }
        },
        {
          text: "Yes",
          value: true,
          action: { type: "result", result: "VALID", reason: "Your Section 21 notice appears to meet the statutory requirements. You may proceed with a possession claim if the tenant does not leave by the expiry date." }
        }
      ],
      learningPoint: "A Section 21 notice cannot be used to end a tenancy during its fixed term. The date of expiry specified in the notice must be after the fixed-term contract has ended."
    }
  ]
}

// Helper function to get question by ID
export const getQuestionById = (questionId) => {
  return questionnaire.questions.find(q => q.id === questionId)
}

// Helper function to get section by ID
export const getSectionById = (sectionId) => {
  return questionnaire.sections.find(s => s.id === sectionId)
}

// Helper function to get all questions in a section
export const getQuestionsBySection = (sectionId) => {
  return questionnaire.questions.filter(q => q.sectionId === sectionId)
}

