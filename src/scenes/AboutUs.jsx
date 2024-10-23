import React, { useEffect, useRef, useState } from 'react';
import NavBar from '../components/Nav';
import "./css/about.css";
import Banner from "../assets/aboutus-banner.png";
import Motto from "../assets/about-group.png";
import Inauguration from "../assets/Inauguration.png";
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';
import i18n from "../i18n";

function About() {
    const { t } = useTranslation();
    const [isSticky, setIsSticky] = useState(true);
    const [yearsCount, setYearsCount] = useState(0);
    const [casesCount, setCasesCount] = useState(0);
    const [inauguralImages] = useState([Inauguration, Banner, Motto]);
    const textRef = useRef(null);
    const imageRef = useRef(null);
    const statsRef = useRef(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentLang, setCurrentLang] = useState(i18n.language);

    useEffect(() => {
        const handleLanguageChange = () => {
            setCurrentLang(i18n.language);
        };
        i18n.on('languageChanged', handleLanguageChange);
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, []);


    useEffect(() => {
        const handleScroll = () => {
            if (textRef.current && imageRef.current) {
                const { bottom } = textRef.current.getBoundingClientRect();
                const { height } = imageRef.current.getBoundingClientRect();
                setIsSticky(bottom > height);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    animateCounter(2, setYearsCount, 1000);
                    animateCounter(100, setCasesCount, 2000);
                    observer.unobserve(entries[0].target);
                }
            },
            { threshold: 0.5 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    const animateCounter = (end, setter, duration) => {
        let start = 0;
        const increment = end / (duration / 16); 

        const timer = setInterval(() => {
            start += increment;
            setter(Math.floor(start));

            if (start >= end) {
                clearInterval(timer);
                setter(end);
            }
        }, 16);
    };

    const handleImageChange = () => {
        if (textRef.current && imageRef.current) {
            const { top, height } = textRef.current.getBoundingClientRect();
            const scrollProgress = (window.innerHeight - top) / (height * 1.2);
            const imageIndex = Math.min(
                Math.floor(scrollProgress * inauguralImages.length),
                inauguralImages.length - 1
            );
            setCurrentImageIndex(Math.max(0, imageIndex));
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            handleImageChange();
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <NavBar currentPage="about" />
            <div className="about-banner-wrapper">
                <div className="about-banner">
                    <div className="about-img-wrapper">
                        <img src={Banner} alt="" />
                    </div>
                </div>
                <div className="about-des">
                    <p className={`${currentLang === "dz" ? "font-large-dz" : ""}`}>{t('aboutUsHeadline')}</p>
                    <p className={`${currentLang === "dz" ? "font-medium-dz" : ""}`}
                    >{t('aboutUsSubHeadline')}</p>
                </div>
            </div>

            <div className="about-motto">
                <img src={Motto} alt="" />
                <p>{t('motto')}</p>
            </div>
            <div className="whitespace"></div>
            <div className="Inauguration-wrapper">
                <p className='Inauguration-title'>{t('journeyTitle')}</p>
                <div className="Inauguration-container">
                    <div className={`Inauguration-image ${isSticky ? 'sticky' : ''}`} ref={imageRef}>
                        <img src={inauguralImages[currentImageIndex]} alt="Inauguration" />
                    </div>
                    <div className="Inauguration-text" ref={textRef}>
                        <p>{t('journeyDescription1')}</p>
                        <p>{t('journeyDescription2')}</p>
                        <p>{t('journeyDescription3')}</p>
                        <p>{t('journeyDescription4')}</p>
                    </div>
                </div>
            </div>
            <div className="whitespace"></div>
            <div className="statistics" ref={statsRef}>
                <div className="stats-des">
                    <p className={`${currentLang === "dz" ? "font-medium-dz" : ""}`}>{t('trackRecord')}</p>
                    <p className={`${currentLang === "dz" ? "font-xsmall-dz" : ""}`}>{t('trackRecordDescription')}</p>
                </div>
                <div className="stats-num">
                    <div className="stats1">
                        <p>
                            {yearsCount} <span>+</span>
                        </p>
                        <p className={`${currentLang === "dz" ? "font-small-dz" : ""}`}>{t('yearsExperience')}</p>
                    </div>
                    <div className="stats2">
                        <p>
                            {casesCount} <span>+</span>
                        </p>
                        <p className={`${currentLang === "dz" ? "font-small-dz" : ""}`}>{t('casesHelped')}</p>
                    </div>
                </div>
            </div>
            <div className="whitespace"></div>
            <Footer />
        </>
    );
}

export default About;
