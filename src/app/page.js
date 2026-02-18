"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error correctly on change
    if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = "";
    if (!value) {
        error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
        if (name === 'user_captcha_input') error = "Captcha is required";
    } else {
        if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
            error = "Please enter a valid email address";
        }
    }
    
    if (error) {
        setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    if (!formData.subject) newErrors.subject = "Service Type is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (!userCaptchaInput) newErrors.captcha = "Captcha is required";
    else if (validateCaptcha(userCaptchaInput) !== true) {
      newErrors.captcha = "Captcha does not match";
      setUserCaptchaInput("");
      loadCaptchaEnginge(6);
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const apiUrl = "https://app.wingstek.in/api";

      // Concat subject with prefix
      const submissionData = {
        ...formData,
        subject: `Vijay Portfolio : ${formData.subject}`,
      };

      const response = await axios.post(`${apiUrl}/contact`, submissionData);

      if (response.status === 200 || response.status === 201) {
        toast.success("Thank you. We will get back to you soon.");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
        setUserCaptchaInput("");
        loadCaptchaEnginge(6);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      {/* Back to top button */}
      <div className="btn-back_to_top">
        <span className="ti-arrow-up" />
      </div>
      <div
        className="vg-page page-home"
        id="home"
        style={{
          backgroundImage: "url(assets/img/1181244.jpg)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Navbar */}
        <div
          className="navbar navbar-expand-lg navbar-dark sticky"
          data-offset={500}
        >
          <div className="container">
            {/* <a href="" className="navbar-brand display-sm tw-text-silver-500 tw-font-bold">
              Vijay Chakaravarthy 
            </a> */}
            <button
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#main-navbar"
              aria-expanded="true"
            >
              <span className="ti-menu" />
            </button>
            <div className="collapse navbar-collapse" id="main-navbar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a
                    href="#home"
                    className="nav-link "
                    data-animate="scrolling"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#about"
                    className="nav-link"
                    data-animate="scrolling"
                  >
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#service"
                    className="nav-link"
                    data-animate="scrolling"
                  >
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#portfolio"
                    className="nav-link"
                    data-animate="scrolling"
                  >
                    Portfolio
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#contact"
                    className="nav-link"
                    data-animate="scrolling"
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <ul className="nav ml-auto">
                <li className="nav-item">
                  <a
                    href="mailto:dvcrvijay@gmail.com"
                    className="btn btn-fab btn-theme no-shadow"
                  >
                    <i className="fa fa-envelope" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>{" "}
        {/* End Navbar */}
        {/* Caption header */}
        <div className="caption-header text-center wow zoomInDown">
          <div style={{ width: 150, height: 150 }}>
            <Image
              width="0"
              height="0"
              style={{ width: "auto", height: "auto" }}
              src="assets/img/vijay.jpg"
              alt="Full Stack Developer"
              className="img-fluid rounded-circle tw-border-2 tw-border-white"
            />
          </div>
          <h1 className="display-tc">-- Vijay Chakaravarthy --</h1>
          <div className="tw-text-silver-500 tw-font-bold">
            Full Stack Developer
          </div>
        <h6 className="tw-mt-3 tw-text-orange-500 tw-font-bold">
  Web Design&nbsp;|&nbsp;Web Application&nbsp;|&nbsp;Mobile App
</h6>

        </div>{" "}
        {/* End Caption header */}
        <div className="floating-button">
          <span className="ti-mouse" />
        </div>
      </div>
      <div className="vg-page page-about" id="about">
        <div className="container py-5A py-2">
          <div className="row">
            <div className="col-lg-4 py-3">
              <h4 className="fw-light display-sm tw-text-orange-500">
                --Vijay Chakaravarthy--
              </h4>
              <h5 className="fg-theme mb-3">Full Stack Developer</h5>
              <ul className="theme-list">
                <li>
                  <b>Lives In:</b> Tamilnadu, India
                </li>
                <li>
                  <b>Qualification:</b> M.SC (CS &amp; IT)
                </li>
                <li>
                  <b>Experience:</b> 10+ Yrs
                </li>
                <li>
                  <b>Email:</b> dvcrvijay@gmail.com
                </li>
                <li>
                  <b>Whatsapp:</b> +91 9500856957
                </li>
              </ul>
              <a href="#contact" className="btn btn-theme-outline">
                Contact Me
              </a>
              {/*<div class="img-place wow fadeInUp">
      <Image width="0" height="0" style={{width:'auto', height: "auto" }}  src="assets/img/person.jpg" alt="">
    </div>*/}
            </div>
            <div className="col-lg-7 offset-lg-1 wow fadeInRight">
              <h1 className="fw-lightA fw-normal tw-underline tw-decoration-solid tw-decoration-1 fg-theme">
                About Me
              </h1>
              {/*<h5 class="fg-theme mb-3">--Full Stack Developer--</h5>*/}
              <p className="text-muted">
                Hello, I&apos;m Vijay, a seasoned web developer with over 10+
                years of experience in web design and development. I specialize
                in creating dynamic and responsive websites using a wide range
                of technologies, ensuring seamless user experiences. My journey
                in web development began with a passion for problem-solving and
                a desire to create innovative digital solutions.
              </p>
              <p className="text-muted">
                I believe that a website is more than just a digital presence;
                it&apos;s an essential part of a brand&apos;s identity. My
                approach combines creative design with robust functionality to
                deliver websites that not only look great but also perform
                exceptionally. I strive to stay at the forefront of
                technological advancements, continuously updating my skill set
                to provide my clients with cutting-edge solutions.
              </p>
            </div>
          </div>
        </div>
        <div className="container py-0">
          <h1 className="text-center fw-normal wow fadeIn tw-underline tw-decoration-solid tw-decoration-1 fg-theme">
            My Skills
          </h1>
          <div className="row py-3">
            <div className="col-md-12">
              <p className="text-muted">
                I am proficient in PHP, JavaScript, AJAX, jQuery, MySQL, HTML,
                CSS, WordPress, CodeIgniter, Laravel, Bootstrap, E-commerce,
                React Js, and React Native. Areas of Expertise : Web
                Development, Front-End and Back-End Development, E-commerce
                Solutions, CMS Development, Corporate Websites, Custom Web
                Applications, Mobile App Development (React Native).
              </p>
              <div className="tw-flex flex-wrap tw-justify-center gap-4 sm:gap-8 ">
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  PHP
                </div>
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  JavaScript
                </div>
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  Ajax
                </div>
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  jQuery
                </div>
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  HTML
                </div>
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  CSS
                </div>
              </div>
              <div className="tw-flex flex-wrap tw-justify-center gap-4 sm:gap-8 ">
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  WordPress
                </div>
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  Laravel
                </div>
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  CodeIgniter
                </div>
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  React Js
                </div>
                <div className="tw-rounded-full tw-bg-[#52565c] tw-text-white tw-flex tw-items-center tw-justify-center tw-h-32 tw-w-32 mb-4 tw-mr-4">
                  React Native
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container pt-0">
          <div className="row">
            <div className="col-md-12 wow fadeInRight">
              <h1 className="text-center fw-normal wow fadeIn tw-underline tw-decoration-solid tw-decoration-1 fg-theme">
                My Work Ethic
              </h1>
              <p className="text-muted">
                What sets me apart is my dedication to understanding my
                clients&apos; unique needs and translating them into functional,
                user-friendly websites. I am committed to:
              </p>
              <ul className="timeline mt-4 pr-md-5">
                <li>
                  <div className="details">
                    <h5>Quality</h5>
                    <small className="fg-theme" />
                    <p>
                      Delivering high-quality code that is clean, efficient, and
                      maintainable.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="details">
                    <h5>Communication</h5>
                    <small className="fg-theme" />
                    <p>
                      Maintaining transparent and regular communication with
                      clients throughout the project lifecycle.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="details">
                    <h5>Timeliness</h5>
                    <small className="fg-theme" />
                    <p>
                      Adhering to project timelines and ensuring timely delivery
                      without compromising on quality.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="details">
                    <h5>Client Satisfaction</h5>
                    <small className="fg-theme" />
                    <p>
                      My ultimate goal is client satisfaction. Going above and
                      beyond to ensure that my clients are satisfied with the
                      end product and receive ongoing support if needed.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="vg-page page-service " id="service">
        <div className="container">
          <div className="text-center wow fadeInUp">
            <div className="badge badge-subhead">Service</div>
          </div>
          <h1 className="fw-normal text-center wow fadeInUp tw-underline tw-decoration-solid tw-decoration-1 fg-theme">
            What can i do?
          </h1>
          <div className="row mt-5">
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-service wow fadeInUp">
                <div className="icon">
                  <span className="ti-paint-bucket" />
                </div>
                <div className="caption">
                  <h4 className="fg-themeA ">Web Design</h4>
                  {/*<p>There are many variations of passages of Lorem Ipsum available</p>*/}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-service wow fadeInUp">
                <div className="icon">
                  <span className="ti-desktop" />
                </div>
                <div className="caption">
                  <h4 className="fg-themeA">Web Development</h4>
                  {/*<p>There are many variations of passages of Lorem Ipsum available</p>*/}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-service wow fadeInUp">
                <div className="icon">
                  <span className="ti-mobile" />
                </div>
                <div className="caption">
                  <h4 className="fg-themeA">App Development</h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-service wow fadeInUp">
                <div className="icon">
                  <span className="ti-search" />
                </div>
                <div className="caption">
                  <h4 className="fg-themeA">SEO</h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-service wow fadeInUp">
                <div className="icon">
                  <span className="ti-briefcase" />
                </div>
                <div className="caption">
                  <h4 className="fg-themeA">Business Website</h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-service wow fadeInUp">
                <div className="icon">
                  <span className="ti-layers" />
                </div>
                <div className="caption">
                  <h4 className="fg-themeA">Dynamic Website</h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-service wow fadeInUp">
                <div className="icon">
                  <span className="ti-shopping-cart" />
                </div>
                <div className="caption">
                  <h4 className="fg-themeA">Ecommerce </h4>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-3">
              <div className="card card-service wow fadeInUp">
                <div className="icon">
                  <span className="ti-package" />
                </div>
                <div className="caption">
                  <h4 className="fg-themeA">Wordpress </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Portfolio page */}
      <div className="vg-page page-portfolio" id="portfolio">
        <div className="container">
          <div className="text-center wow fadeInUp">
            <div className="badge badge-subhead">Portfolio</div>
          </div>
          <h1 className="text-center fw-normal wow fadeInUp tw-underline tw-decoration-solid tw-decoration-1 fg-theme">
            See my Work
          </h1>
          {/*<div class="filterable-button py-3 wow fadeInUp" data-toggle="selected">
  <button class="btn btn-theme-outline selected" data-filter="*">All</button>
  <button class="btn btn-theme-outline" data-filter=".apps">Apps</button>
  <button class="btn btn-theme-outline" data-filter=".template">Template</button>
  <button class="btn btn-theme-outline" data-filter=".ios">IOS</button>
  <button class="btn btn-theme-outline" data-filter=".ui-ux">UI/UX</button>
  <button class="btn btn-theme-outline" data-filter=".graphic">Graphic</button>
  <button class="btn btn-theme-outline" data-filter=".wireframes">Wireframes</button>
</div>*/}
          <div className="gridder my-3">
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w1.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="100"
                  style={{ height: "250px" }}
                  src="assets/img/work/w1.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w2.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w2.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w3.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w3.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w4.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w4.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w5.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w5.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w6.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w6.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w8.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w8.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w7.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w7.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w10.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w10.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w8.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w9.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w11.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w11.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="grid-item apps wow zoomIn">
              <div
                className="img-place"
                data-src="assets/img/work/w12.jpg"
                data-fancybox="gallery"
                data-caption=""
              >
                <Image
                  width="0"
                  height="0"
                  style={{ height: "250px" }}
                  src="assets/img/work/w12.jpg"
                  alt=""
                />
              </div>
            </div>
            {/*
		<div class="grid-item apps wow zoomIn">
    <div class="img-place" data-src="assets/img/work/w13.jpg" data-fancybox="gallery" data-caption="">
      <Image width="0" height="0"   src="assets/img/work/w13.jpg" alt="">
      
    </div>
  </div>

		<div class="grid-item apps wow zoomIn">
    <div class="img-place" data-src="assets/img/work/w14.jpg" data-fancybox="gallery" data-caption="">
      <Image width="0" height="0"   src="assets/img/work/w14.jpg" alt="">
      
    </div>
  </div>

     		<div class="grid-item apps wow zoomIn">
    <div class="img-place" data-src="assets/img/work/w15.jpg" data-fancybox="gallery" data-caption="">
      <Image width="0" height="0"   src="assets/img/work/w15.jpg" alt="">
      
    </div>
  </div>
		*/}
            {/*<div class="grid-item graphic ui-ux wireframes wow zoomIn">
    <div class="img-place" data-src="assets/img/work/work-6.jpg" data-fancybox="gallery" data-caption="<h5 class='fg-theme'>Game Streaming</h5> <p>Games, Streaming</p>">
      <Image width="0" height="0"   src="assets/img/work/work-6.jpg" alt="">
      <div class="img-caption">
        <h5 class="fg-theme">Game Streaming</h5>
        <p>Games, Streaming</p>
      </div>
    </div>
  </div>*/}
          </div>{" "}
          {/* End gridder */}
          {/*<div class="text-center wow fadeInUp">
  <a href="javascript:void(0)" class="btn btn-theme">Load More</a>
</div>*/}
        </div>
      </div>{" "}
      {/* End Portfolio page */}
      {/* Testimonial */}
      {/*
  <div class="vg-page page-testimonial" style="display:none;">
    <div class="container">
<h1 class="text-center fw-normal wow fadeInUp">What Clients are Saying</h1>
<div class="row justify-content-center mt-5 wow fadeInUp">
  <div class="col-md-9">
    <div class="owl-carousel testi-carousel">
      <div class="item">
        <div class="row">
          <div class="col-md-6">
            <div class="img-place">
              <Image width="0" height="0" style={{width:'auto', height: "auto" }}  src="assets/img/testimonials/testimonials_1.jpg" alt="">
            </div>
          </div>
          <div class="col-md-6">
            <div class="caption">
              <div class="testi-content">There are many variations of passages of Lorem Ipsum available, but the majority have suffered</div>
              <div class="testi-info">
                <div class="thumb-profile">
                  <Image width="0" height="0" style={{width:'auto', height: "auto" }}  src="assets/img/testimonials/testimonials_1.jpg" alt="">
                </div>
                <div class="tagline">
                  <h5 class="mb-0">Satria Nugraha</h5>
                  <span class="text-muted">CEO Nutshell</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        <div class="row">
          <div class="col-md-6">
            <div class="img-place">
              <Image width="0" height="0" style={{width:'auto', height: "auto" }}  src="assets/img/testimonials/testimonials_2.jpg" alt="">
            </div>
          </div>
          <div class="col-md-6">
            <div class="caption">
              <div class="testi-content">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe natus expedita ab facilis ut, animi explicabo amet. Voluptatibus possimus iste enim, doloremque, fugiat accusamus nisi optio fugit ratione expedita harum?</div>
              <div class="testi-info">
                <div class="thumb-profile">
                  <Image width="0" height="0" style={{width:'auto', height: "auto" }}  src="assets/img/testimonials/testimonials_2.jpg" alt="">
                </div>
                <div class="tagline">
                  <h5 class="mb-0">Selena Arrini</h5>
                  <span class="text-muted">CEO BigTree</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  </div> 
  */}
      {/* End testimonial */}
      {/* Contact */}
      <div className="vg-page page-contact" id="contact">
        <div className="container-fluid">
          <div className="text-center wow fadeInUp">
            <div className="badge badge-subhead">Contact</div>
          </div>
          <h1 className="text-center fw-normal wow fadeInUp tw-underline tw-decoration-solid tw-decoration-1 fg-theme">
            Get in touch
          </h1>
          <div className="row py-0">
            <div className="col-lg-7 px-0 pr-lg-3 ">
              <Image
                width={0}
                height={0}
                layout="responsive"
                alt="vijay - Full Stack Developer"
                src="assets/img/5124556.jpg"
              />
            </div>
            <div className="col-lg-5">
              <form className="vg-contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="col-12 mt-3 wow fadeInUp">
                    <input
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
                  </div>
                  <div className="col-12 mt-3 wow fadeInUp">
                    <input
                      className={`form-control ${errors.email ? "is-invalid" : ""}`}
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
                  </div>
                  <div className="col-12 mt-3 wow fadeInUp">
                    <input
                      className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                      type="text"
                      name="mobile"
                      id="mobile"
                      placeholder="Whatsapp no"
                      value={formData.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.mobile && <div className="text-danger small mt-1">{errors.mobile}</div>}
                  </div>
                  <div className="col-12 mt-3 wow fadeInUp">
                    <select
                      id="subject"
                      name="subject"
                      className={`form-control ${errors.subject ? "is-invalid" : ""}`}
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    >
                      <option value="">--Service Type--</option>
                      <option value="Web Design">Web Design</option>
                      <option value="Web Development">Web Development</option>
                      <option value="App Development">App Development</option>
                      <option value="Custom Application">
                        Custom Application
                      </option>
                    </select>
                    {errors.subject && <div className="text-danger small mt-1">{errors.subject}</div>}
                  </div>
                  <div className="col-12 mt-3 wow fadeInUp">
                    <textarea
                      className={`form-control ${errors.message ? "is-invalid" : ""}`}
                      name="message"
                      id="message"
                      rows={6}
                      placeholder="Enter message here.."
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    {errors.message && <div className="text-danger small mt-1">{errors.message}</div>}
                  </div>
                  <div className="col-12 mt-3 wow fadeInUp">
                    <div className="border rounded p-3 bg-white" style={{ borderColor: "#ced4da" }}>
                       <label className="mb-2 text-muted small font-weight-bold">Security Check</label>
                       <div className="d-md-flex align-items-center">
                         <div className="d-flex align-items-center mb-3 mb-md-0 mr-md-3">
                           <div style1={{ transform: "scale(0.85)", transformOrigin: "left center" }}>
                             <LoadCanvasTemplate reloadText=" " reloadColor="#fff" />
                           </div>
                           <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary ml-2"
                              onClick={() => loadCaptchaEnginge(6)}
                              title="Reload Captcha"
                           >
                             <i className="ti-reload"></i>
                           </button>
                         </div>
                         <div className="flex-grow-1">
                           <input
                              className={`form-control ${errors.captcha ? "is-invalid" : ""}`}
                              placeholder="Enter Captcha"
                              id="user_captcha_input"
                              name="user_captcha_input"
                              type="text"
                              value={userCaptchaInput}
                              onChange={(e) => {
                                setUserCaptchaInput(e.target.value);
                                if (errors.captcha) setErrors({ ...errors, captcha: "" });
                              }}
                              onBlur={(e) => {
                                  if (!e.target.value) {
                                      setErrors(prev => ({ ...prev, captcha: "Captcha is required" }));
                                  }
                              }}
                              required
                           />
                           {errors.captcha && <div className="text-danger small mt-1">{errors.captcha}</div>}
                         </div>
                       </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-theme mt-3 wow fadeInUp ml-1"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End Contact */}
      {/* Footer */}
      <div className="vg-footer">
        <h1 className="text-center display-sm">Freelance Full Stack Developer</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 py-3">
              <div className="footer-info">
                <p>Follow me</p>
                <hr className="divider" />
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-3">
              <div classa="float-lg-right">
                <p>Services</p>
                <hr className="divider" />
                <ul className="list-unstyled">
                  <li>
                    <a href="#">Web Design</a>
                  </li>
                  <li>
                    <a href="#">Web Development</a>
                  </li>
                  <li>
                    <a href="#">App Development</a>
                  </li>
                  <li>
                    <a href="#">Custom Application</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 py-3">
              <div classa="float-lg-right">
                <p>Contact me</p>
                <hr className="divider" />
                <ul className="list-unstyled">
                  <li>dvcrvijay@gmail.com</li>
                  <li>+91 9500856957</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row justify-content-center mt-3">
            <div className="col-12">
              <p className="text-center mb-0 mt-4">
                Copyright © 2024. All right reserved.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* End footer */}
    </>
  );
}
