import React from "react";
import NavBar from "../components/Nav";
import { Link } from "react-router-dom";
import LegalBanner from "../assets/legalBanner.png";
import { MdExpandMore, MdOutlineGavel, MdOutlineHandshake, MdOutlineVolunteerActivism, MdOutlineDescription, MdOutlineFamilyRestroom, MdOutlineAssuredWorkload, MdDiversity3, MdOutlineHealing, MdOutlineVerifiedUser, MdOutlineAccountBalance } from "react-icons/md";
import EligibleImg from "../assets/eligible.png";
import Footer from "../components/Footer";
import "./css/legal.css";

function LegalIssues() {
  return (
    <>
      <NavBar currentPage="legal" />
      <div className="Home-banner-wrapper">
        <div className="banner">
          <div className="banner-content">
            <p className="banner-topic">LEGAL AID AND SUPPORT</p>
            <p className="banner-subTopic legal-banner-sub">Providing Comprehensive Legal Assistance for All Your Needs</p>

            <Link to="/apply1" className="banner-cta-wrapper">
              <div className="banner-cta legal-banner-cta">
                APPLY FOR LEGAL AID
                <div className="icon-container">
                  <MdExpandMore className="exapnd-more" />
                </div>
              </div>
            </Link>
          </div>
          <div className="banner-image">
            <div className="banner-img-wrapper">
              <img src={LegalBanner} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="service-wrapper legal-service-wrapper legal-issue-legal-service">
        <p className="service-topic">Our Legal Services</p>
        <p className="service-subtopic">Comprehensive and Tailored Legal Solutions for Every Unique Need</p>

        <div className="service-container">
          <div className="service-main">
            <div className="service-content">
              <MdOutlineGavel className="service-icon" />
              <p className="service-content-topic">Legal Advice</p>
              <p className="service-content-des">Get expert legal advice from an experienced lawyer.</p>
              <p className="service-content-des">Our service offers consultations to help you understand your rights, obligations, and potential courses of action.</p>
            </div>
          </div>

          <div className="service-main">
            <div className="service-content">
              <MdOutlineHandshake className="service-icon" />
              <p className="service-content-topic">Legal Assistance</p>
              <p className="service-content-des">Get help drafting legal documents and filling out judicial forms.</p>
              <p className="service-content-des">Our service ensures all paperwork is accurately prepared and compliant with legal requirements, reducing the risk of errors affecting your case.</p>
            </div>
          </div>

          <div className="service-main">
            <div className="service-content">
              <MdOutlineVolunteerActivism className="service-icon" />
              <p className="service-content-topic">Legal Representation</p>
              <p className="service-content-des">Get full legal representation in court, including advice and assistance.</p>
              <p className="service-content-des">Your representative will handle your case from consultation to court appearances, providing comprehensive support throughout the legal process.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="whitespace"></div>

      <div className="eligible-wrapper">
        <img src={EligibleImg} alt="" />
        <div className="eligible-content-wrapper">
          <div className="main-eligible">
            <p>Who is Eligible?</p>
            <p>Legal Aid is only available to indigent person. It is not available to companies or groups of people.</p>
          </div>
          <div className="eligible-criteria">
            <div className="criteria-1">
              <p>An indigent person is someone who</p>
              <p>Cannot provide the necessities of life (food, clothing, decent shelter) for themselves. Does not have sufficient means to afford a lawyer.</p>
            </div>

            <div className="criteria-1 criteria-2">
              <p>Special Cases</p>
              <p>Children in Conflict with the Law (CICL)</p>
              <p>Provided with legal advice and assistance regardless of financial capacity if the interest of justice requires it.</p>
            </div>

            <div className="criteria-1 criteria-3">
              <p>Persons with Permanent Physical or Mental and Social Disabilities</p>
              <p>Eligible for legal advice and assistance regardless of financial capacity if the interest of justice requires it.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="legal-grid-container">
        <div class="legal-grid-item legal-grid-item1">
          <p>Various Legal Challenges</p>
          <p>Common Legal Issues We Address</p>
        </div>
        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineDescription className="issues-icon" />
          <p className="issues-topic">Contract Disputes</p>
          <p className="issues-des">We help clients resolve conflicts over contract obligations, negotiate settlements, and, if necessary, represent them in court to enforce or defend their contractual rights.</p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineFamilyRestroom className="issues-icon" />
          <p className="issues-topic">Family Law Matters</p>
          <p className="issues-des">Our services include mediation and representation in divorce proceedings, child custody and visitation disputes, spousal and child support arrangements, and adoption processes.</p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineAssuredWorkload className="issues-icon" />
          <p className="issues-topic">Criminal Defense</p>
          <p className="issues-des">Our legal team provides defense strategies, represents clients in court, negotiates plea bargains, and works to protect the rights of the accused at all stages of the criminal justice process.</p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdDiversity3 className="issues-icon" />
          <p className="issues-topic">Employment and Labor Issues</p>
          <p className="issues-des">Handling wrongful termination, discrimination, wage disputes, and contract issues.</p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineHealing className="issues-icon" />
          <p className="issues-topic">Personal Injury Claims</p>
          <p className="issues-des">We represent clients in obtaining compensation for medical expenses, lost wages, pain and suffering, and other damages resulting from car accidents, slip and falls, medical malpractice, and other personal injury cases.</p>
        </div>

        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineVerifiedUser className="issues-icon" />
          <p className="issues-topic">Consumer Protection Issues</p>
          <p className="issues-des">Addressing fraudulent transactions, defective products, and legal violations.</p>
        </div>
        <div class="legal-grid-item legal-grid-item-rest">
          <MdOutlineAccountBalance className="issues-icon" />
          <p className="issues-topic">Estate Planning and Probate</p>
          <p className="issues-des">Drafting wills, establishing trusts, and navigating probate.</p>
        </div>
      </div>
      <div className="whitespace"></div>
      <Footer />
    </>
  );
}

export default LegalIssues;
