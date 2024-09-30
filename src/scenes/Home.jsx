import React, { useState } from "react";
import "./css/home.css";
import Accordion from "../components/Accordion";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
import BannerImg from "../assets/banner.png";
import { Link } from "react-router-dom";
import { MdExpandMore, MdOutlineGavel } from "react-icons/md";
import { IoNewspaperOutline } from "react-icons/io5";
import { LuFileEdit } from "react-icons/lu";
import TrustSection from "../components/TrustSection";

function Home() {
  return (
    <>
      {/* <Accordion /> */}

      {/* Motto
            <div className="motto-wrapper">
                <div className="motto-section">
                    <p className='motto-topic'>Creating Impact</p>
                    <p className='motto-des'>
                        “At The Legal Aid Society, we're committed to ensuring justice for Bhutan's low-income citizens. In the courtroom or the community, our dedication never wavers as we tirelessly work to increase access to legal support for all”
                    </p>
                </div>
            </div> */}
      <NavBar currentPage="home" />
        <div className="Home-banner-wrapper">
          <div className="banner-circle"></div>
          <div className="banner">
            <div className="banner-content">
              <p className="banner-topic">
                UPHOLDING RIGHTS AND STRENGTHENING FAIRNESS
              </p>
              <p className="banner-subTopic">
                ACCESSIBLE LEGAL ASSITANCE FOR ALL
              </p>

              <Link to="#" className="banner-cta-wrapper">
                <div className="banner-cta">
                  GET HELP TODAY
                  <div className="icon-container">
                    <MdExpandMore className="exapnd-more" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="banner-image">
              <div className="banner-img-wrapper">
                <img src={BannerImg} alt="" />
              </div>
            </div>
          </div>
        </div>

        <div className="service-wrapper">
          <p className="service-topic">What We Do</p>
          <p className="service-subtopic">
            We provide accessible, expert legal aid to ensure justice and
            equality for all.
          </p>

          <div className="service-container">
            <div className="service-main">
              <div className="service-content">
                <IoNewspaperOutline className="service-icon" />
                <p className="service-content-topic">Applications</p>
                <p className="service-content-des">
                  We efficiently review and approve applications at the Legal
                  Aid Centre and coordinate the issuance of grants to the Bar
                  Council to secure funding for legal aid services.
                </p>
              </div>
            </div>

            <div className="service-main">
              <div className="service-content">
                <MdOutlineGavel className="service-icon" />
                <p className="service-content-topic">Lawyer Assignments</p>
                <p className="service-content-des">
                  We manage the assignment of lawyers through the Bar Council,
                  ensuring detailed case notifications and lawyer appointments
                  are communicated back to the Legal Aid Centre for smooth
                  coordination.
                </p>
              </div>
            </div>

            <div className="service-main">
              <div className="service-content">
                <LuFileEdit className="service-icon" />
                <p className="service-content-topic">Case Proceedings</p>
                <p className="service-content-des">
                  We oversee case disclosures and proceedings, ensuring all
                  steps are handled with transparency and efficiency. Upon case
                  resolution, we generate comprehensive reports on case outcomes
                  and demographic data for thorough analysis and record-keeping.
                </p>
              </div>
            </div>
          </div>

          {/* Process */}
          <div className="process-wrapper">
            <div className="process-content-container">
              <p className="process-topic">Our Process</p>

              <div className="steps-container">
                <div className="steps-content">
                  <div className="steps-number">STEP 1</div>
                  <div className="steps-des-cont">
                    <div className="steps-des-topic">
                      Client application for legal aid
                    </div>
                    <div className="steps-des-subdes">
                      We guide clients through the application process to ensure
                      they receive the legal aid they need. Our team reviews
                      each application thoroughly to determine eligibility and
                      facilitate timely approval.
                    </div>
                  </div>
                </div>
                <div className="steps-content">
                  <div className="steps-number">STEP 2</div>
                  <div className="steps-des-cont">
                    <div className="steps-des-topic">
                      Case Review and Lawyer Assignment
                    </div>
                    <div className="steps-des-subdes">
                      We carefully review each case and assign the most suitable
                      lawyer through the Bar Council. Detailed notifications and
                      appointment confirmations are communicated back to the
                      Legal Aid Centre to ensure smooth coordination.
                    </div>
                  </div>
                </div>
                <div className="steps-content">
                  <div className="steps-number">STEP 3</div>
                  <div className="steps-des-cont">
                    <div className="steps-des-topic">
                      Case Review and Lawyer Assignment
                    </div>
                    <div className="steps-des-subdes">
                      We oversee every aspect of case proceedings with a focus
                      on transparency and thoroughness. After the case is
                      resolved, we prepare detailed reports on case outcomes and
                      demographic data for in-depth analysis and accurate
                      record-keeping.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
          <TrustSection />
        </div>


      <Footer />
    </>
  );
}

export default Home;
