import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: "en",
    detection: {
      order: [
        "localStorage",
        "cookie",
        "navigator",
        "htmlTag",
        "path",
        "subdomain",
      ],
      caches: ["localStorage"],
    },
    resources: {
      en: {
        translation: {
          // navbar
          home: "Home",
          aboutUs: "About Us",
          legalIssues: "Legal Issues",
          applyForLegalAidNav: "Apply for Legal Aid",
          trackApplication: "Track Application",
          logout: "Logout",
          login: "Login",

          //footer
          applyForLegalAidFooter: "Apply for Legal Aid",
          getHelpToday: "Get Help Today",
          eligibility: "Eligibility",
          bhutanLegalAidCenter: "Bhutan Legal Aid Center",

          // home
          mainHerobannerText: "UPHOLDING RIGHTS AND STRENGTHENING FAIRNESS.",
          accessibleLegalAssistance: "ACCESSIBLE LEGAL ASSISTANCE FOR ALL.",
          whatWeDo: "What We Do",
          provideExpertAid:
            "We provide accessible expert legal aid to ensure justice and equality for all.",
          application: "Application",
          lawyerAssignments: "Lawyer Assignment",
          caseTitle: "Case Proceedings",
          applicationProcess:
            "We efficiently review and approve applications at the Legal Aid Centre and coordinate the issuance of grants to the Bar Council to secure funding for legal aid services.",
          lawyerAssignment:
            "We manage the assignment of lawyers through the Bar Council ensuring detailed case notifications and lawyer appointments are communicated back to the Legal Aid Centre for smooth coordination.",
          caseProceedings:
            "We oversee case disclosures and proceedings ensuring all steps are handled with transparency and efficiency. Upon case resolution, we generate comprehensive reports on case outcomes and demographic data for thorough analysis and record-keeping.",
          ourProcess: "Our Process",
          step1: "Step 1",
          step2: "Step 2",
          step3: "Step 3",
          clientApplication: "Client application for legal aid",
          caseReviewAssignment:
            "We carefully review each case and assign the most suitable lawyer through the Bar Council. Detailed notifications and appointment confirmations are communicated back to the Legal Aid Centre to ensure smooth coordination.",
          trustUs:
            "Trust us to handle your case with care and precision. Together we'll work toward a successful resolution. Start your path to justice with confidence—we're here to support you every step of the way.",
          caseReview: "Case Review and Lawyer Assignment",
          caseReviewAndLawyer: "Case Review and Lawyer Assignment",
          clientAppDesc:
            "We guide clients through the application process to ensure they receive the legal aid they need. Our team reviews each application thoroughly to determine eligibility and facilitate timely approval.",
          caseReviewDesc:
            "We carefully review each case and assign the most suitable lawyer through the Bar Council. Detailed notifications and appointment confirmations are communicated back to the Legal Aid Centre to ensure smooth coordination.",
          caseReviewAndLawyerDesc:
            "We oversee every aspect of case proceedings with a focus on transparency and thoroughness. After the case is resolved, we prepare detailed reports on case outcomes and demographic data for in-depth analysis and accurate record-keeping.",

          // AboutUs
          aboutUsHeadline:
            "THE MOST PROMINENT AND IMPACTFUL LAW FIRM IN BHUTAN",
          aboutUsSubHeadline: "DEDICATED TO SOCIAL JUSTICE.",
          motto:
            "“The Legal Aid Society operates on a straightforward yet compelling principle: every individual deserves the right to equal justice.”",
          journeyTitle: "Our Journey Through Time",
          journeyDescription1:
            "The Bhutan Legal Aid Center was established on October 19, 2022, following a Royal Command. The inauguration ceremony was graced by the President of BNLI, Her Royal Highness Princess Sonam Dechan Wangchuck, and Chief Justice Chogyal Dago Rigdzin. During the ceremony, the Legal Aid Inception Document and the Legal Aid Rules 2022 were also launched.",
          journeyDescription2:
            "The Center aims to strengthen the rule of law and the justice system by ensuring that all people have access to the courts and the legal process, as enshrined in Article 9.6 of the Constitution. Legal aid is particularly crucial for indigent individuals, enabling them to access fair and full justice.",
          journeyDescription3:
            "Legal Aid is available exclusively to indigent persons, defined as individuals who cannot afford basic necessities such as food, clothing, and decent shelter, or those without sufficient means to hire a lawyer. Children in conflict with the law (CICL) and persons with permanent physical, mental, or social disabilities are also eligible for legal advice and assistance, regardless of their financial capacity, if the interest of justice so requires.",
          journeyDescription4:
            "To qualify for legal aid, applicants must pass both a means test and a merits test. The means test assesses an applicant's financial capacity by examining income and disposable capital, with eligibility determined based on the per capita poverty line set by the National Statistics Bureau of Bhutan (NSB). The merits test evaluates whether the applicant has reasonable grounds to bring or defend a case in court, ensuring that only cases with reasonable prospects of success receive legal aid.",
          trackRecord: "Track Record",
          trackRecordDescription:
            "Legal Aid Center has provided legal assistance to countless clients, ensuring that justice remains accessible to all. We have successfully managed and resolved numerous cases, reflecting our commitment to upholding the rule of law. These accomplishments underscore our unwavering dedication to safeguarding the rights and well-being of our citizens.",
          yearsExperience: "YEARS OF EXPERIENCE",
          casesHelped: "CASES HELPED",

          //track your application
          EnterAppId:"Enter Application Id",
          applicationTrack: "Track your application",
          justice:
            "We provide accessible, expert legal aid to ensure justice and equality for all.",
          enterId: "Enter Application ID...",
          applicationDetails: "Application Details",
          pending: "PENDING",
          applicationId: "Application ID",
          userCid: "CID",
          userName: "Name",
          caseType: "Case Type",
          contactNumber: "Contact Number",
          assignedLawyer: "Assigned Lawyer",
          copyRight: "2024 Bhutan Legal Aid Center",
          invalidId: "Invalid ID. ID should begin with APPID.",
          validId: "Please enter a valid Application ID.",
          errorThrow: "Error fetching case details. Please try again.",
          noApplication: "No application found with the applicationID",

          //Apply for Legal Aid Apply1
          applyTitleMain: "Application form for legal aid.",
          applySub:
            "We provide accessible, expert legal aid to ensure justice and equality.",
          tabCurrent: "Applicant Information and Details",
          midTab: "Institutions facilitating legal aid applications",
          lastTab: "Check List of Documents",

          applyTitle: "Personal Information and Details of Applicant",
          legalLabelApplicationDetails: "Applicant Details",
          legalLabelCurrentAddress: "Current Address",
          legalLabelPermanentAddress: "Permanent Address",
          legalLabelHouseholdDetails: "Household Details",
          proceed: "Proceed",

          cidPlaceholder: "CID Number",
          namePlaceholder: "Name",
          occupationPlaceholder: "Occupation",
          contactNumberPlaceholder: "Contact Number",
          selectDzongkhag: "Select Dzongkhag",
          selectGewog: "Select Gewog",
          selectVillage: "Select Village",
          totalHouseholdIncomePlaceholder: "Total Household Income (Nu.)",
          totalHouseholdMemberPlaceholder: "Total Household Member",

          //Apply for Legal Aid Apply2
          applyTitle2:
            "Public institutions and other relevant institutions, which facilitates the application for legal aid (if any)",
          legalLabelInstitution: "Institution & Dealing Official/Staff Details",

          institutionNamePlaceholder: "Institution Name",
          officialNamePlaceholder: "Name of dealing officer",
          emailPlaceholder: "Email",

          //Apply for Legal Aid Apply3
          requiredDocument: "Required Documents",
          cidorValidPassport: "CID or Valid Passport",
          detailsofHouse: "Details of household members",
          attachmentforHouse: "Attachment for household income",
          attachmentofDisposable: "Attachment for household disposable capital",
          briefBackgroundCase: "Brief Background of the Case",
          evidenceofDisability: "Evidence of any form of disability",
          apply3apply: "Apply",

          browseFiles: "Browse Files",
          applicationSubmittedTitle: "Application Submitted",
          applicationSubmittedText:
            "Your application has been successfully submitted.",
          submissionFailedTitle: "Submission Failed",
          submissionFailedText:
            "There was an error submitting your application. Please try again.",

          // Terms and policy
          termsAndPolicies: "Terms & Policies",
          terms1: "I, the undersigned applicant, do hereby declare and affirm that the information provided in this application for legal aid is true, accurate, and complete to the best of my knowledge and belief. I understand that any false statement, omission, or misrepresentation of facts may result in the immediate termination of any legal aid granted, and could also lead to legal proceedings against me.",
          terms2:"acknowledge that if any information provided is later found to be false, misleading, or incomplete, I may be held liable for any charges or legal fees incurred by the legal aid center as a result of this application, and I may be subject to civil or criminal penalties as provided by law.",
          terms3:"I further understand that this declaration and any documents provided as part of this application may be used in any investigation or proceeding related to my eligibility for legal aid.",
          oath:"By ticking the checkbox, acknowledge that I have read, understood, and agree to the terms and conditions outlined above.",

          // LegalIssues page
          legalAidAndSupport: "Legal aid and support",
          comprehensiveLegalAssistance:
            "Providing comprehensive legal assistance for all your needs",
          applyForLegalAid: "Apply for legal aid",
          ourLegalServices: "Our Legal Services",
          tailoredLegalSolutions:
            "Comprehensive and Tailored Legal Solutions for Every Unique Need",
          legalAdvice: "Legal Advice",
          expertLegalAdvice:
            "Get expert legal advice from an experienced lawyer.",
          consultationsHelp:
            "Our service offers consultations to help you understand your rights, obligations, and potential courses of action.",
          legalAssistance: "Legal Assistance",
          helpDraftingDocuments:
            "Get help drafting legal documents and filling out judicial forms.",
          paperworkCompliance:
            "Our service ensures all paperwork is accurately prepared and compliant with legal requirements, reducing the risk of errors affecting your case.",
          legalRepresentation: "Legal Representation",
          fullLegalRepresentation:
            "Get full legal representation in court, including advice and assistance.",
          handleYourCase:
            "Your representative will handle your case from consultation to court appearances, providing comprehensive support throughout the legal process.",
          whoIsEligible: "Who is Eligible?",
          legalAidEligibility:
            "Legal Aid is only available to indigent person. It is not available to companies or groups of people.",
          indigentPerson:
            "An indigent person is someone who cannot provide the necessities of life (food, clothing, decent shelter) for themselves.",
          cannotProvideNecessities:
            "Cannot provide the necessities of life (food, clothing, decent shelter) for themselves. Does not have sufficient means to afford a lawyer.",
          specialCases: "Special Cases",
          childrenInConflict: "Children in Conflict with the Law (CICL)",
          providedLegalAdvice:
            "Provided with legal advice and assistance regardless of financial capacity if the interest of justice requires it.",
          personsWithDisabilities:
            "Persons with Permanent Physical or Mental and Social Disabilities",
          eligibleForLegalAdvice:
            "Eligible for legal advice and assistance regardless of financial capacity if the interest of justice requires it.",
          variousLegalChallenges: "Various Legal Challenges",
          commonLegalIssues: "Common Legal Issues",
          contractDisputes: "Contract Disputes",
          helpClientsResolveConflicts:
            "We help clients resolve conflicts over contract obligations, negotiate settlements, and, if necessary, represent them in court to enforce or defend their contractual rights.",
          familyLawMatters: "Family Law Matters",
          servicesIncludeMediation:
            "Our services include mediation and representation in divorce proceedings, child custody and visitation disputes, spousal and child support arrangements, and adoption processes.",
          criminalDefense: "Criminal Defense",
          legalTeamProvidesDefense:
            "Our legal team provides defense strategies, represents clients in court, negotiates plea bargains, and works to protect the rights of the accused at all stages of the criminal justice process.",
          employmentLaborIssues: "Employment/Labor Issues",
          handlingWrongfulTermination:
            "Handling wrongful termination, discrimination, wage disputes, and contract issues.",
          personalInjuryClaims: "Personal Injury Claims",
          representClientsObtainingCompensation:
            "We represent clients in obtaining compensation for medical expenses, lost wages, pain and suffering, and other damages resulting from car accidents, slip and falls, medical malpractice, and other personal injury cases.",
          consumerProtectionIssues: "Consumer Protection Issues",
          addressFraudulentTransactions:
            "Addressing fraudulent transactions, defective products, and legal violations.",
          estatePlanningProbate: "Estate Planning/Probate",
          draftingWillsEstablishingTrusts:
            "Drafting wills, establishing trusts, and navigating probate.",
        },
      },
      dz: {
        translation: {
          // navbar
          home: "གདོང་ཤོག",
          aboutUs: "ང་བཅས་ཀྱི་སྐོར",
          legalIssues: "ཁྲིམས་ལུགས་ཀྱི་གནད་དོན",
          applyForLegalAidNav: "ཁྲིམས་གྱི་རོགས་རམ་ཞུ་བ",
          trackApplication: "ཞུ་ཚིག་གནས་ཚད་བརྟག་དཔྱད",
          logout: "ཕྱིར་ཐོན",
          login: "ནང་བསྐྱོད",

          //footer
          getHelpToday: "གྲོགས་རམ་ཐོབ།",
          eligibility: "འོས་ཆོས་ཆ་རྐྱེན།",
          bhutanLegalAidCenter: "འབྲུག་ཁྲིམས་དོན་གྲོགས་རམ་ལྟེ་བ།",
          applyForLegalAidFooter: "ཁྲིམས་དོན་རོགས་སྐྱོར་གྱི་ཞུ་ཡིག།",

          // home
          mainHerobannerText:
            "ཐོབ་དབང་བདག་འཛིན་འཐབ་ནི་དང་ དྲང་བདེན་སྒྲིང་སྒྲིང་བཟོ་ནི།",
          accessibleLegalAssistance:
            "ག་ར་ལུ་འཐོབ་ཚུགས་པའི་ཁྲིམས་དོན་གྱི་རོགས་རམ།",
          whatWeDo: "ང་བཅས་ཀྱིས་ག་ཅི་འབདཝ་སྨོ?",
          application: "ལག་ལེན་ཚུ།",
          lawyerAssignments: "ཁྲིམས་རྩོད་པའི་ལས་འགན།",
          caseTitle: "གྱོད་དོན་གྱི་གོ་རིམ།",
          provideExpertAid:
            "ང་བཅས་ཀྱིས་ མི་ཆ་མཉམ་ལུ་ དྲང་བདེན་དང་འདྲ་མཉམ་གྱི་དོན་ལུ་ འཐོབ་ཚུགས་པའི་ མཁས་མཆོག་ཁྲིམས་དོན་གྱི་གྲོགས་རམ་བྱིནམ་ཨིན།",
          applicationProcess:
            "ང་བཅས་ཀྱིས་ ཁྲིམས་དོན་གྲོགས་རམ་ལྟེ་བའི་ནང་ ཞུ་ཡིག་ཚུ་ འཇོན་ཐངས་ཅན་སྦེ་ བསྐྱར་ཞིབ་དང་ ཆ་འཇོག་འབདཝ་མ་ཚད་ ཁྲིམས་དོན་གྲོགས་རམ་ཞབས་ཏོག་ཚུ་གི་དོན་ལུ་ མ་དངུལ་ཐོབ་ནིའི་དོན་ལུ་ ཁྲིམས་རྩོདཔ་ཚོགས་སྡེ་ལུ་ གྲོགས་རམ་བྱིན་ནི་ཚུ་ མཉམ་འབྲེལ་འབདཝ་ཨིན།",
          lawyerAssignment:
            "ང་བཅས་ཀྱིས་ ཁྲིམས་རྩོདཔ་ཚུ་གི་ལས་འགན་ཚུ་ ཁྲིམས་རྩོདཔ་ཚོགས་སྡེ་བརྒྱུད་དེ་ འཛིན་སྐྱོང་འཐབ་སྟེ་ རྩོད་གཞི་ཁ་གསལ་གྱི་ བརྡ་དོན་དང་ ཁྲིམས་རྩོདཔ་བསྐོ་བཞག་ཚུ་ ཁྲིམས་དོན་གྲོགས་རམ་ལྟེ་བ་ལུ་ མཉམ་འབྲེལ་ལེགས་ཤོམ་སྦེ་ འབད་ཚུགས་ནིའི་དོན་ལུ་ བརྡ་སྤྲོད་འབད་ཝཨིན།",
          caseProceedings:
            "ང་བཅས་ཀྱིས་ གནད་དོན་གསལ་བསྒྲགས་དང་ བྱ་རིམ་ཚུ་ ལྟ་རྟོག་འབད་དེ་ གོ་རིམ་ཚུ་ག་ར་ དྭངས་གསལ་དང་ ཇོན་ཐངས་ཅན་སྦེ་ འཛིན་སྐྱོང་འཐབ་ཚུགསཔ་སྦེ་ ངེས་གཏན་བཟོ་ཝཨིན། གནད་དོན་ཐག་བཅད་པའི་ཤུལ་ལས་ ང་བཅས་ཀྱིས་ གནད་དོན་གྱི་གྲུབ་འབྲས་དང་ མི་འབོར་ཞིབ་རྩིས་ཀྱི་གནས་སྡུད་ཚུ་གི་སྐོར་ལས་ སྣན་ཞུ་ཡོངས་སུ་རྫོགས་པ་སྦེ་ དབྱེ་དཔྱད་དང་ ཐོ་བཀོད་འབད་ནི་གི་དོན་ལུ་ བཟོ་ཝཨིན།",
          ourProcess: "ང་བཅས་ཀྱི་བྱ་རིམ།",
          step1: "གོམ་པ་ ༡ པ།",
          step2: "གོམ་པ་ ༢ པ།",
          step3: "གོམ་པ་ ༣ པ།",
          clientApplication: "ཁྲིམས་དོན་གྲོགས་རམ་གྱི་དོན་ལུ་ མཁོ་མངགས་ཞུ་ཡིག།",
          caseReview: "གྱོད་དོན་བསྐྱར་ཞིབ་དང་ཁྲིམས་རྩོད་པའི་ལས་འགན།",
          caseReviewAndLawyer: "གྱོད་དོན་བསྐྱར་ཞིབ་དང་ཁྲིམས་རྩོད་པའི་ལས་འགན།",
          clientAppDesc:
            "ང་བཅས་ཀྱིས་ མཁོ་མངགས་འབད་མི་ཚུ་ལུ་ ཁྲིམས་དོན་གྱི་གྲོགས་རམ་དགོཔ་ངེས་གཏན་བཟོ་ཐབས་ལུ་ ཞུ་ཡིག་བཙུགས་ནིའི་བྱ་རིམ་བརྒྱུད་དེ་ ལམ་སྟོན་འབདཝ་ཨིན། ང་བཅས་ཀྱི་སྡེ་ཚན་གྱིས་ ཞུ་ཡིག་རེ་རེ་བཞིན་དུ་ ལེགས་ཤོམ་སྦེ་ བསྐྱར་ཞིབ་འབད་དེ་ འོས་འབབ་ཚུ་ གཏན་འབེབས་བཟོ་སྟེ་ དུས་ཚོད་ཁར་ ཆ་འཇོག་འབད་ནི་ལུ་ ཕན་ཐོགས་འབྱུང་ཚུགས།",
          caseReviewDesc:
            "ང་བཅས་ཀྱིས་ རྩོད་གཞི་རེ་རེ་བཞིན་དུ་ ལེགས་ཤོམ་སྦེ་ བསྐྱར་ཞིབ་འབད་དེ་ ཁྲིམས་རྩོདཔ་ཚོགས་སྡེ་བརྒྱུད་དེ་ ཁྲིམས་རྩོདཔ་འོས་འབབ་ཅན་ཅིག་ བསྐོ་བཞག་འབདཝ་ཨིན། ཁ་གསལ་གྱི་བརྡ་དོན་དང་ བསྐོ་བཞག་གཏན་འཁེལ་ཚུ་ ཁྲིམས་དོན་གྲོགས་རམ་ལྟེ་བ་ལུ་ ལོག་བརྡ་སྤྲོད་འབད་དེ་ མཉམ་འབྲེལ་ལེགས་ཤོམ་སྦེ་ འབད་ཚུགས།",
          caseReviewAndLawyerDesc:
            "ང་བཅས་ཀྱིས་ དྭངས་གསལ་དང་ ཞིབ་ཞིབ་སྦེ་ གཙོ་བོར་བསྟེན་ཏེ་ རྩོད་གཞི་གི་བྱ་རིམ་ག་ར་ལུ་ ལྟ་རྟོག་འབདཝ་ཨིན། རྩོད་གཞི་འདི་ ཐག་བཅད་ཚར་བའི་ཤུལ་ལས་ ང་བཅས་ཀྱིས་ རྩོད་གཞི་གི་གྲུབ་འབྲས་དང་ མི་འབོར་ཞིབ་རྩིས་ཀྱི་གནས་སྡུད་ཚུ་གི་སྐོར་ལས་ ཁ་གསལ་གྱི་སྙན་ཞུ་ཚུ་ གཏིང་ཟབ་སྦེ་ དབྱེ་དཔྱད་དང་ ཐོ་བཀོད་གཏན་གཏན་སྦེ་ བཞག་ནིའི་དོན་ལུ་ བཟོཝ་ཨིན།",
          trustUs:
            "ཁྱོད་ཀྱི་གནད་དོན་འདི་ བདག་འཛིན་དང་ གཏན་གཏན་སྦེ་ འཛིན་སྐྱོང་འཐབ་ནི་ལུ་ ང་བཅས་ལུ་ཡིད་ཆེས་བསྐྱེད། མཉམ་རུབ་ཐོག་ལས་ མཐར་འཁྱོལ་ཅན་གྱི་གྲོས་ཆོད་ཅིག་བཟོ་ནིའི་དོན་ལུ་ ལཱ་འབད་འོང་། བློ་གཏད་དང་བཅསཔ་སྦེ་ དྲང་བདེན་གྱི་ལམ་འགོ་བཙུགས། ང་བཅས་ཀྱིས་ ཁྱོད་ལུ་ གོམ་པ་རེ་རེ་བཞིན་དུ་ རྒྱབ་སྐྱོར་འབད་ནི་གི་དོན་ལུ་ ནཱ་ལུ་ཡོད།",

          // AboutUs
          aboutUsHeadline:
            "འབྲུག་ལུ་ ཡོངས་གྲགས་ཅན་དང་ ཤུགས་རྐྱེན་ཅན་གྱི་ཁྲིམས་རྩོད་ལས་སྡེ།",
          aboutUsSubHeadline: "མི་སྡེ་དྲང་བདེན་ལུ་དམིགས་གཏད་བསྐྱེདཔ་ཨིན།",
          motto:
            "ཁྲིམས་དོན་གྲོགས་རམ་ཚོགས་པ་གིས་ མི་ངོ་ག་ར་ལུ་ དྲང་བདེན་འདྲ་མཉམ་གྱི་ཐོབ་དབང་ཡོད་པའི་ གཞི་རྩ་ཐད་ཀར་དུ་ ལག་ལེན་འཐབ་སྟེ་ ལཱ་འབད་དོ་ཡོདཔ་ཨིན།",
          journeyTitle: "དུས་ཚོད་ཀྱི་འགྲུལ་བཞུད།",
          journeyDescription1:
            "འབྲུག་ཁྲིམས་དོན་གྲོགས་རམ་ལྟེ་བ་འདི་ རྒྱལ་པོའི་བཀའ་རྒྱ་དང་འཁྲིལ་ སྤྱི་ལོ་༢༠༢༢ སྤྱི་ཟླ་༡༠ པའི་ཚེས་༡༩ ལུ་ གཞི་བཙུགས་འབད་ཡོདཔ་ཨིན། འགོ་འབྱེད་རྟེན་འབྲེལ་ནང་ བི་ཨེན་ཨེལ་ཨའི་གི་ གཙོ་འཛིན་ མི་དབང་རྒྱལ་བཙུན་ བསོད་ནམས་བདེ་ཅན་དབང་ཕྱུག་དང་ ཁྲིམས་སྤྱི་བློན་པོ་ ཆོས་རྒྱལ་དགའ་སྒོ་རིག་འཛིན་གྱིས་ བྱོན་གནང་ཡི། རྟེན་འབྲེལ་གྱི་སྐབས་ལུ་ ཁྲིམས་དོན་གྲོགས་རམ་གྱི་ འགོ་བཙུགས་ཡིག་ཆ་དང་ ཁྲིམས་དོན་གྲོགས་རམ་གྱི་ བཅའ་ཡིག་༢༠༢༢ ཅན་མ་ཚུ་ཡང་ གསར་བཏོན་འབད་ཡི།",
          journeyDescription2:
            "ལྟེ་བ་དེ་གིས་ རྩ་ཁྲིམས་ཆེན་མོའི་དོན་ཚན་༩.༦ པའི་ནང་ འཁོད་དེ་ཡོད་དོ་བཟུམ་སྦེ་ མི་ཆ་མཉམ་ལུ་ ཁྲིམས་ཀྱི་འདུན་ས་དང་ ཁྲིམས་ཀྱི་བྱ་རིམ་ཚུ་ འཐོབ་ཚུགསཔ་བཟོ་ཐོག་ལས་ ཁྲིམས་ཀྱི་དབང་འཛིན་དང་ དྲང་ཁྲིམས་ལམ་ལུགས་ཚུ་ སྒྲིང་སྒྲིང་བཟོ་ནི་ལུ་ དམིགས་གཏད་བསྐྱེདཔ་ཨིན་པས། ཁྲིམས་དོན་གྱི་གྲོགས་རམ་འདི་ དམིགས་བསལ་གྱིས་ མི་ཉམས་ཆུང་ཚུ་ལུ་ ཁག་ཆེ་ཤོས་ཅིག་ཨིནམ་ལས་ དྲང་བདེན་དང་ དྲང་བདེན་ཆ་ཚང་ཐོབ་ཚུགས།",
          journeyDescription3:
            "ཁྲིམས་དོན་གྱི་གྲོགས་རམ་འདི་ མི་ཉམས་ཆུང་ཚུ་ལུ་རྐྱངམ་ཅིག་ཐོབ་དོ་ཡོདཔ་ད་ འདི་ཡང་ བཟའ་འཐུང་དང་བགོ་ལ་ དེ་ལས་ སྡོད་གནས་ལེགས་ཤོམ་མེད་མི་ཚུ་ལུ་རྐྱངམ་ཅིག་ཐོབ་དོ་ཡོདཔ་ཨིན་མས། ཁྲིམས་ལུགས་དང་འགལ་བའི་ ཨ་ལུ་དང་ གཏན་འཇགས་གཟུགས་ཁམས་ སེམས་ཁམས་ ཡང་ན་ མི་སྡེའི་དབང་པོ་སྐྱོན་ཅན་ཚུ་ལུ་ཡང་ དངུལ་འབྲེལ་གྱི་ ལྕོགས་གྲུབ་ལུ་མ་ལྟོས་པར་ ཁྲིམས་དོན་གྱི་ བསླབ་བྱ་དང་ གྲོགས་རམ་ཚུ་ ཐོབ་ཚུགས།",
          journeyDescription4:
            "ཁྲིམས་དོན་གྱི་གྲོགས་རམ་ཐོབ་ནིའི་དོན་ལུ་ ཞུ་ཡིག་བཙུགས་མི་ཚུ་གིས་ ཐབས་ལམ་བརྟག་དཔྱད་དང་ ཁྱད་ཚད་བརྟག་དཔྱད་གཉིས་ཆ་ར་ མཐར་འཁྱོལ་དགོཔ་ཨིན་པས། ཐབས་ལམ་བརྟག་དཔྱད་འདི་གིས་ ཞུ་ཡིག་བཙུགས་མི་ཅིག་གི་ དངུལ་འབྲེལ་གྱི་ལྕོགས་གྲུབ་འདི་ འོང་འབབ་དང་ བཀོལ་སྤྱོད་འབད་བཏུབ་པའི་ མ་རྩ་ཚུ་ བརྟག་དཔྱད་འབད་དེ་ འོས་འབབ་འདི་ འབྲུག་རྒྱལ་ཡོངས་རྩིས་དཔྱད་ལས་ཁང་གིས་ མི་རེ་ལུ་ དབུལ་ཕོངས་ཀྱི་ཚད་གཞི་བཀོད་མི་ལུ་གཞི་བཞག་སྟེ་ ཐག་བཅདཔ་ཨིན། བདེན་ཁུངས་བརྟག་དཔྱད་འདི་གིས་ ཞུ་ཡིག་བཙུགས་མི་ལུ་ ཁྲིམས་ཁང་ནང་ རྩོད་གཞི་འབག་འོང་ནི་དང་ ཡང་ན་ རྒྱབ་སྲུང་འབད་ནི་གི་ རྒྱུ་མཚན་ལྡན་པའི་ གཞི་རྟེན་ཡོད་མེད་ དབྱེ་ཞིབ་འབད་དེ་ མཐར་འཁྱོལ་གྱི་ འོས་འབབ་ཡོད་པའི་ རྩོད་གཞི་ཚུ་ལུ་རྐྱངམ་ཅིག་ ཁྲིམས་དོན་གྱི་ གྲོགས་རམ་ཐོབ་ཚུགསཔ་ ངེས་གཏན་བཟོཝ་ཨིན།",
          trackRecord: "དྲན་ཐོ།",
          trackRecordDescription:
            "ཁྲིམས་དོན་གྲོགས་རམ་ལྟེ་བ་གིས་ མཁོ་མངགས་འབད་མི་ གྱངས་ཁ་མ་ཆོདཔ་ཅིག་ལུ་ ཁྲིམས་དོན་གྱི་གྲོགས་རམ་བྱིན་ཏེ་ དྲང་བདེན་འདི་ ག་ར་ལུ་ ཐོབ་ཚུགསཔ་སྦེ་ ངེས་གཏན་བཟོ་སྟེ་ཡོདཔ་ཨིན། ང་བཅས་ཀྱིས་ ཁྲིམས་དོན་གྱི་དབང་ཚད་བདག་འཛིན་འཐབ་ནི་ལུ་ ཁས་བླངས་འབད་མི་འདི་ གསལ་སྟོན་འབད་དེ་ རྩོད་གཞི་ལེ་ཤ་ཅིག་ མཐར་འཁྱོལ་ཅན་སྦེ་ འཛིན་སྐྱོང་འཐབ་སྟེ་ སེལ་ཚུགས་ཅི། འདི་བཟུམ་གྱི་གྲུབ་འབྲས་ཚུ་གིས་ ང་བཅས་རའི་མི་སེར་ཚུ་གི་ཐོབ་དབང་དང་ བདེ་སྐྱིད་སྲུང་སྐྱོབ་འབད་ནི་ལུ་ ང་བཅས་ཀྱིས་ བརྩོན་ཤུགས་བསྐྱེད་མི་འདི་ གསལ་སྟོན་འབདཝ་ཨིན།",
          yearsExperience: "ཉམས་མྱོང་།",
          casesHelped: "ཕན་ཐོགས་བྱུང་ཡོདཔ།",

          //Track  Tour Application
          EnterAppId:"གློག་རིམ་ཨའི་ཌི་བཙུགས།",
          applicationTrack: "ཁྱོད་རའི་ཞུ་ཡིག་བརྟག་ཞིབ་འབད།",
          justice:
            "ང་བཅས་ཀྱིས་ མི་ཆ་མཉམ་ལུ་ དྲང་བདེན་དང་འདྲ་མཉམ་གྱི་དོན་ལུ་ འཐོབ་ཚུགས་པའི་ མཁས་མཆོག་ཁྲིམས་དོན་གྱི་གྲོགས་རམ་བྱིནམ་ཨིན།",
          enterId: "གློག་རིམ་ཨའི་ཌི་བཙུགས།",
          applicationDetails: "ཞུ་ཡིག་གི་ཁ་གསལ།",
          pending: "བསྣར་བཞག་ཡོདཔ།",
          applicationId: "ཞུ་ཡིག་ཨང་རྟགས།",
          userCid: "ངོ་སྤྲོད་ལག་ཁྱེར།",
          userName: "མིང།",
          caseType: "གནད་དོན་གྱི་དབྱེ་བ།",
          contactNumber: "འགྲུལ༌འཕྲིན༌ཨང།",
          assignedLawyer: "འགན་སྤྲོད་ཡོད་པའི་ཁྲིམས་རྩོད་པ།",
          copyRight: "༢༠༢༤ ཁྲིམས་ཀྱི་སྟེགས་གསོའི་ལྟེ་བ།",
          invalidId: "ནུས་མེད་ཨའི་ཌི། ID འདི་ APPID དང་ཅིག་ཁར་འགོ་བཙུགས་དགོ།",
          validId: "ནུས་ཅན་གྱི་ ཞུ་ཡིག་ཨའི་ཌི་ཅིག་བཙུགས་གནང་།",
          errorThrow:
            "གནད་དོན་ཁ་གསལ་ཚུ་འཐོབ་ནི་ལུ་འཛོལ་བ། ལོག་སྟེ་འབད་རྩོལ་བསྐྱེད་གནང་།",
          noApplication: "གློག་རིམ་ཨའི་ཌི་དང་གཅིག་ཁར་ གློག་རིམ་འཚོལ་མ་ཐོབ།",

          //Apply for Legal Aid Apply1
          applyTitleMain: "ཁྲིམས་དོན་གྲོགས་རམ་གྱི་དོན་ལུ་ ཞུ་ཡིག་འབྲི་ཤོག།",
          applySub:
            "ང་བཅས་ཀྱིས་ དྲང་བདེན་དང་འདྲ་མཉམ་གྱི་དོན་ལུ་ འཐོབ་ཚུགསཔ་དང་ མཁས་མཆོག་གི་ཁྲིམས་དོན་གྲོགས་རམ་བྱིནམ་ཨིན།",
          tabCurrent: "ཞུ་ཡིག་བཙུགས་མིའི་ཁ་གསལ།",
          midTab: "གྲོགས་རམ་ལྷན་ཐབས་གཙུག་སྡེ།",
          lastTab: "ཡིག་ཆའི་ཐོ།",
          applyTitle: "ཞུ་ཡིག་བཙུགས་མི་གི་ མི་སྒེར་བརྡ་དོན་དང་ཁ་གསལ།",
          legalLabelApplicationDetails: "ཞུ་ཡིག་བཙུགས་མིའི་ཁ་གསལ།",
          legalLabelCurrentAddress: "ད་ལྟོ་སྡོད་སའི་ཁ་བྱང་།",
          legalLabelPermanentAddress: "གཏན་རྐྱང་སྡོད་སའི་ཁ་བྱང་།",
          legalLabelHouseholdDetails: "ཁྱིམ་ཚང་གི་ཞིབ་ཕྲ།",
          proceed: "འཕྲོ་མཐུད།",
          cidPlaceholder: "ངོ་སྤྲོད་ལག་ཁྱེར་ཨང་",
          namePlaceholder: "མིང་",
          occupationPlaceholder: "ལཱ་གཡོག",
          contactNumberPlaceholder: "འབྲེལ་བ་འཐབ་སའི་ཨང་",
          selectDzongkhag: "རྫོང་ཁག་གདམ་ཁ་རྐྱབས",
          selectGewog: "རྒེད་འོག་གདམ་ཁ་རྐྱབས",
          selectVillage: "གཡུས་གདམ་ཁ་རྐྱབས",
          totalHouseholdIncomePlaceholder:
            "ཁྱིམ་གྱི་འོང་འབབ་བསྡོམས་ (དངུལ་ཀྲམ)",
          totalHouseholdMemberPlaceholder: "ཁྱིམ་ནང་གི་འཐུས་མི་ཡོངས་བསྡོམས",

          //Apply for Legal Aid Apply2
          applyTitle2:
            "མི་མང་དང་ གཞན་འབྲེལ་ཚུ་གིས་ ཁྲིམས་དོན་གྲོགས་རམ་ ལྷན་ཐབས་འབད་མི་ གཙུག་སྡེའི་ཁ་གསལ། (གལ་ཏེ་ཡོད་ན)",
          legalLabelInstitution:
            "གཙུག་སྡེ་དང་འབྲེལ་བ་འཐབ་སའི་འགོ་དཔོན་/ལས་བྱེདཔ་གི་ཁ་གསལ།",

          institutionNamePlaceholder: "གཙུག་སྡེའི་མིང་",
          officialNamePlaceholder: "འབྲེལ་བ་འཐབ་མིའི་འགོ་དཔོན་གྱི་མིང་",
          emailPlaceholder: "གློག་འཕྲིན་ཁ་བྱང་",

          //Apply for Legal Aid Apply3
          requiredDocument: "དགོས་མཁོའི་ཡིག་ཆ།",
          cidorValidPassport:
            "ངོ་སྤྲོད་ལག་ཁྱེར་ ཡང་ན་ ཆ་གནས་ཅན་གྱི་ཕྱི་སྐྱོད་ལག་ཁྱེར།",
          detailsofHouse: "ཁྱིམ་ཚང་གི་ཁོངས་མིའི་ཁ་གསལ།",
          attachmentforHouse: "ཁྱིམ་གྱི་ཡོང་འབབ་ཀྱི་དོན་ལུ་ཟུར་སྦྲགས།",
          attachmentofDisposable: "ཁྱིམ་གྱི་ཡོང་འབབ་ཀྱི་དོན་ལུ་ཟུར་སྦྲགས།",
          briefBackgroundCase: "ཁྱིམ་གྱི་ཡོང་འབབ་ཀྱི་དོན་ལུ་ཟུར་སྦྲགས།",
          evidenceofDisability: "དབང་པོ་སྐྱོན་ཅན་གྱི་དཔང་རྟགས།",
          apply3apply: "ཞུ་ཚིག་ཞུ།",

          browseFiles: "ཡིག་ཆ་འཚོལ་ནི།",
          applicationSubmittedTitle: "ཞུ་ཡིག་ཕུལ་ཡོདཔ།",
          applicationSubmittedText:
            "ཁྱོད་ཀྱི་ཞུ་ཡིག་མཐར་འཁྱོལ་ཅན་སྦེ་ཕུལ་ཡོདཔ་ཨིན།",
          submissionFailedTitle: "ཕུལ་ནི་འཐུས་ཤོར་བྱུང་ཡོདཔ།",
          submissionFailedText:
            "ཁྱོད་ཀྱི་ཞུ་ཡིག་ཕུལ་ནི་ལུ་འཛོལ་བ་བྱུང་ནུག། སླར་ལོག་འབད་རྩོལ་བསྐྱེད་གནང་།",

          // Terms And Policies
          termsAndPolicies: "ཆ་རྐྱེན་དང་སྲིད་ཇུས།",
          terms1:"ང་གིས་ འོག་ལུ་མིང་རྟགས་བཀོད་མི་ ཞུ་ཡིག་བཙུགས་མི་གིས་ ཁྲིམས་དོན་གྲོགས་རམ་གྱི་དོན་ལུ་ ཞུ་ཡིག་འདི་ནང་ བརྡ་དོན་ཚུ་ བདེན་པ་དང་ བདེན་པ་ཡོདཔ་སྦེ་ གསལ་བསྒྲགས་འབད་དེ་ ངོས་ལེན་འབདཝ་ཨིན། དང་ངེ་གི་ཤེས་བྱ་དང་ཡིད་ཆེས་དྲག་ཤོས་ལུ་མཇུག་བསྡུ། ང་གིས་ཧ་གོ་མི་ནང་ རྫུན་མའི་གཏམ་བཤད་དང་ བཏོན་བཏང་མི་ ཡང་ན་ བདེན་པ་ཚུ་ ལོག་བཤད་འབད་མི་ཚུ་ཨིན། ཁྲིམས་དོན་གྱི་གྲོགས་རམ་གང་རུང་ཅིག་ དེ་འཕྲོ་ལས་ མཇུག་བསྡུ་བཏང་ཚུགས་ནི་ཨིནམ་མ་ཚད་ ང་ལུ་ཁྲིམས་དོན་གྱི་བྱ་རིམ་ཚུ་ཡང་ འགོ་འདྲེན་འཐབ་ཚུགས་ནི་ཨིན་མས།",
          terms2:"བརྡ་དོན་གང་རུང་ཅིག་ ཤུལ་ལས་ རྫུན་མ་དང་ འཛོལ་བ་ ཡང་ན་ མ་ཚངམ་སྦེ་ མཐོང་པ་ཅིན་ ང་གིས་ ཉེས་འཛུགས་ག་ཅི་རང་འབད་རུང་ འགན་འཁྲི་འབག་དགོཔ་འོང་ཟེར་ ངོས་ལེན་འབད་དགོ། ཡང་ན་ ཞུ་ཡིག་འདི་གི་གྲུབ་འབྲས་ལུ་བརྟེན་ ཁྲིམས་དོན་གྲོགས་རམ་ལྟེ་བ་གིས་ ཁྲིམས་དོན་གྱི་འཐུས་ཚུ་ བཏང་ཡོདཔ་ལས་ ཁྲིམས་དོན་ནང་ བཀོད་དེ་ཡོད་མི་དང་འཁྲིལ་ ཞི་བའི་ཡང་ན་ ཉེས་ཅན་གྱི་ཉེས་ཁྲིམས་ ང་ལུ་ཕོག་འོང་།",
          terms3:"ད་རུང་ ང་གིས་ གསལ་བསྒྲགས་འདི་དང་ ཞུ་ཡིག་འདི་གི་ཆ་ཤས་ཅིག་སྦེ་ བྱིན་ཡོད་པའི་ཡིག་ཆ་ཚུ་ ངེ་གི་ཁྲིམས་དོན་གྲོགས་རམ་གྱི་འོས་འབབ་དང་འབྲེལ་བའི་ ཞིབ་དཔྱད་དང་ བྱ་རིམ་གང་རུང་ནང་ ལག་ལེན་འཐབ་ཚུགས་ཟེར་ ཧ་གོ་ཡི།",
          oath:"བརྟག་ཞིབ་སྒྲོམ་འདི་ རྟགས་བཀལ་ཏེ་ གོང་ལས་བཀོད་ཡོད་པའི་ གནས་ཚིག་དང་གནས་སྟངས་ཚུ་ལྷག་སྟེ་ ཧ་གོ་སྟེ་ ངོས་ལེན་འབད་ཡི་ཟེར་ ངོས་ལེན་འབད།",
          // LegalIssues page
          legalAidAndSupport: "བཅའ་ཁྲིམས་རོགས་སྐྱོར་དང་རྒྱབ་སྐྱོར།",
          comprehensiveLegalAssistance:
            "ཁྱོད་ཀྱི་དགོས་མཁོ་ཡོད་ཚད་ལུ་ ཁྲིམས་མཐུན་གྱི་ གྲོགས་རམ་ཡོངས་རྫོགས་བྱིན་ནི།",
          applyForLegalAid: "ཁྲིམས་དོན་རོགས་སྐྱོར་ཞུ་བ།",
          ourLegalServices: "ང་བཅས་ཁྲིམས་ཀྱི་ཞབས་ཏོག།",
          tailoredLegalSolutions:
            "ཁྱད་དུ་འཕགས་པའི་དགོས་མཁོ་རེ་རེའི་དོན་ལུ་ ཁྲིམས་དོན་གྱི་ཐབས་ཤེས།",
          legalAdvice: "ཁྲིམས་དོན་བསླབ་བྱ་།",
          expertLegalAdvice:
            "ཉམས་མྱོང་ཅན་གྱི་ཁྲིམས་རྩོད་པ་ལས་ ཁྲིམས་དོན་མཁས་མཆོག་གི་བསླབ་བྱ་ལེན།",
          consultationsHelp:
            "ང་བཅས་ཀྱི་ཞབས་ཏོག་འདི་གིས་ ཁྱོད་རའི་ཐོབ་དབང་དང་འགན་ཁུར་ དེ་ལས་ འོས་འབབ་ཅན་གྱི་བྱ་སྤྱོད་ཀྱི་སློབ་ཚན་ཚུ་ ཧ་གོ་ཐབས་ལུ་ གྲོས་བསྟུན་ཚུ་ བྱིནམ་ཨིན།",
          legalAssistance: "བཅའ་ཁྲིམས་རོགས་སྐྱོར།",
          helpDraftingDocuments:
            "ཁྲིམས་དོན་ཡིག་ཆ་ཚུ་ཟིན་བྲིས་བཏབ་ནི་དང་ ཁྲིམས་དོན་གྱི་འབྲི་ཤོག་ཚུ་བཀང་ནི་ལུ་ གྲོགས་རམ་ཐོབ།",
          paperworkCompliance:
            "ང་བཅས་ཀྱི་ཞབས་ཏོག་འདི་གིས་ ཡིག་ཆ་ཚུ་ག་ར་ ཁྲིམས་དོན་གྱི་དགོས་མཁོ་དང་འཁྲིལ་ཏེ་ གཏན་གཏན་སྦེ་ གྲ་སྒྲིག་འབད་དེ་ ཁྱོད་རའི་གནད་དོན་ལུ་ འཛོལ་བ་འབྱུང་ནི་གི་ཉེན་ཁ་ མར་ཕབ་འབདཝ་ཨིན།",
          legalRepresentation: "ཁྲིམས་ཀྱི་ངོ་ཚབ།",
          fullLegalRepresentation:
            "བསླབ་བྱ་དང་གྲོགས་རམ་ཚུ་རྩིས་ཏེ་ ཁྲིམས་ཁང་ནང་ ཁྲིམས་དོན་གྱི་ངོ་ཚབ་ཆ་ཚང་ཐོབ།",
          handleYourCase:
            "ཁྱོད་ཀྱི་ངོ་ཚབ་ཀྱིས་ གྲོས་བསྟུན་ལས་ ཁྲིམས་ཁང་ནང་ ཐོན་ཚུན་ཚོད་ ཁྱོད་ཀྱི་རྩོད་གཞི་འདི་ ཁྲིམས་དོན་གྱི་བྱ་རིམ་ཆ་མཉམ་ནང་ རྒྱབ་སྐྱོར་ཡོངས་རྫོགས་འབད་དེ་ འཛིན་སྐྱོང་འཐབ་འོང་།",
          whoIsEligible: "འོས་འབབ་ཡོད་མི་ག་སྨོ?",
          legalAidEligibility:
            "ཁྲིམས་དོན་གྲོགས་རམ་འདི་ མི་ཉམས་ཆུང་ཚུ་ལུ་རྐྱངམ་ཅིག་ཐོབ་ཚུགས། ལས་སྡེ་དང་མི་སྡེ་ཚུ་ལུ་འཐོབ་མི་ཚུགས།",
          indigentPerson:
            "མི་ཚེའི་དགོས་མཁོ་ཚུ་ ༼ཟ་འཐུང་ གྱོན་ཆས་ སྡོད་གནས་ལེགས་ཤོམ་༽ ཚུ་ རང་སོའི་དོན་ལུ་ བྱིན་མི་ཚུགས། ",
          cannotProvideNecessities:
            "ཁྲིམས་རྩོདཔ་ཅིག་ ཐོབ་ཚུགས་པའི་ ཐབས་ལམ་ལངམ་སྦེ་མེདཔ་ཨིན།",
          specialCases: "དམིགས་བསལ་གནད་དོན།",
          childrenInConflict: "ཁྲིམས་དང་འགལ་བའི་བྱིས་པ།(CICL)",
          providedLegalAdvice:
            "དྲང་བདེན་གྱི་ཁེ་ཕན་ལུ་དགོ་པ་ཅིན་ དངུལ་འབྲེལ་གྱི་ལྕོགས་གྲུབ་ལུ་མ་ལྟོས་པར་ ཁྲིམས་དོན་གྱི་བསླབ་བྱ་དང་གྲོགས་རམ་ཚུ་བྱིན་ཡོདཔ་ཨིན།",
          personsWithDisabilities:
            "གཏན་འཇགས་ཀྱི་གཟུགས་པོའམ་སེམས་ཁམས་དང་མི་སྡེའི་དབང་པོ་སྐྱོན་ཅན་གྱི་མི་སྣ།",
          eligibleForLegalAdvice:
            "དྲང་བདེན་གྱི་ཁེ་ཕན་ལུ་དགོ་པ་ཅིན་ དངུལ་འབྲེལ་གྱི་ལྕོགས་གྲུབ་ལུ་མ་ལྟོས་པར་ ཁྲིམས་དོན་གྱི་བསླབ་བྱ་དང་གྲོགས་རམ་གྱི་འོས་འབབ་ཡོདཔ་ཨིན།",
          variousLegalChallenges: "ཁྲིམས་ལུགས་ཀྱི་གདོང་ལེན་སྣ་ཚོགས།",
          commonLegalIssues:
            "ང་ཚོས་ཐག་གཅོད་བྱེད་པའི་སྤྱིར་བཏང་གི་ཁྲིམས་དོན་གནད་དོན།",
          contractDisputes: "གན་རྒྱ་རྩོད་རྙོག་ཚུ།",
          helpClientsResolveConflicts:
            "ང་བཅས་ཀྱིས་ མཁོ་མངགས་འབད་མི་ཚུ་ལུ་ གན་རྒྱ་གི་འགན་ཁུར་གྱི་ཐོག་ལུ་ འཁྲུག་རྩོད་སེལ་ཐབས་ལུ་ གྲོགས་རམ་འབདཝ་ཨིན།",
          familyLawMatters: "བཟའ་ཚང་ཁྲིམས་ཀྱི་གནད་དོན།",
          servicesIncludeMediation:
            "ང་བཅས་ཀྱི་ཞབས་ཏོག་ཚུ་ཡང་ ཁ་བྱལ་ནིའི་བྱ་རིམ་ནང་ བར་འདུམ་དང་ ངོ་ཚབ་འབད་ནི་དང་ ཨ་ལུ་བདག་འཛིན་དང་ ལྟ་སྐོར་གྱི་རྩོད་རྙོགས་ གཉེན་གྲོགས་དང་ཨ་ལུ་རྒྱབ་སྐྱོར་གྱི་ གོ་རིམ་ དེ་ལས་ བུ་ཚབ་བཙུགས་ནིའི་བྱ་རིམ་ཚུ་ཨིན།",
          criminalDefense: "ཉེས་འགེལ་སྲུང་སྐྱོབ།",
          legalTeamProvidesDefense:
            "ང་བཅས་ཀྱི་ཁྲིམས་དོན་སྡེ་ཚན་གྱིས་ ཉེན་སྲུང་གི་ཐབས་ཤེས་ཚུ་ བྱིན་དོ་ཡོདཔ་མ་ཚད་ ཁྲིམས་ཁང་ནང་ མཁོ་མངགས་འབད་མི་ཚུ་གི་ངོ་ཚབ་འབད་དེ་ ཉེས་འཛུགས་བཀལ་མི་ཚུ་གི་ ཐོབ་དབང་ཚུ་ ཉེས་ཅན་གྱི་ཁྲིམས་ལུགས་ཀྱི་ གནས་རིམ་ག་རའི་ནང་ ཉམས་སྲུང་འབད་ནིའི་དོན་ལུ་ ལཱ་འབདཝ་ཨིན།",
          employmentLaborIssues: "ལས་ཞུགས་དང་ངལ་རྩོལ་གྱི་གནད་དོན།",
          handlingWrongfulTermination:
            "འཛོལ་བ་ཅན་གྱི་ལཱ་མཇུག་བསྡུ་ནི་དང་ ཉེ་རིང་ཕྱེ་ནི་ གླ་ཆའི་རྩོད་གཞི་ དེ་ལས་ གན་རྒྱ་གི་གནད་དོན་ཚུ་ འཛིན་སྐྱོང་འཐབ་ནི།",
          personalInjuryClaims: "མི་སྒེར་གྱི་རྨས་སྐྱོན་ཐོབ་སྐལ།",
          representClientsObtainingCompensation:
            "ང་བཅས་ཀྱིས་ སྨན་བཅོས་ཀྱི་ཟད་འགྲོ་དང་ གླ་ཆ་མེདཔ་ཐལ་མི་ ན་ཟུག་དང་སྡུག་བསྔལ་ དེ་ལས་ སྣུམ་འཁོར་བརྡབ་སྐྱོན་དང་ བཤུད་བརྡར་དང་ སྨན་བཅོས་ཀྱི་ ནོར་འཁྲུལ་ དེ་ལས་ གཞན་མི་ མི་ངོ་རྐྱང་གི་ གནོད་སྐྱོན་ཚུ་ལས་བརྟེན་ རྒུད་འཐུས་ཐོབ་ནིའི་དོན་ལུ་ མཁོ་མངགས་འབད་མི་ཚུ་གི་ ངོ་ཚབ་འབདཝ་ཨིན།",
          consumerProtectionIssues: "འཛད་སྤྱོད་པའི་སྲུང་སྐྱོབ་ཀྱི་གནད་དོན།",
          addressFraudulentTransactions:
            "གཡོ་སྒྱུའི་ཚོང་འབྲེལ་དང་ སྐྱོན་ཡོད་པའི་ཐོན་སྐྱེད་ དེ་ལས་ ཁྲིམས་འགལ་གྱི་གནད་དོན་ཚུ་ བསལ་ནི།",
          estatePlanningProbate: "གཞིས་ཁང་འཆར་གཞི་དང་ བདག་དབང་།",
          draftingWillsEstablishingTrusts:
            "ཡིག་ཆ་བཟོ་ནི་དང་ བློ་གཏད་གཞི་བཙུགས་འབད་ནི་ དེ་ལས་ བརྟག་དཔྱད་ཀྱི་ འགྲུལ་བསྐྱོད་འབད་ནི།",
        },
      },
    },
  });

export default i18n;
