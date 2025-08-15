import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAlignCenter, FaWhatsapp } from "react-icons/fa";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faPhone,
  faMapMarkerAlt,
  faClock,
  faCheckCircle,
  faUserMd,
  faHeart,
  faCheck,
  faAward,
  faMicroscope,
  faSmile,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Home.css";

const Home = () => {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [backgroundImages, setbackgroundImages] = useState([
    require("../Assets/Images/bg4.jpg"),
    require("../Assets/Images/bg1.jpg"),
    require("../Assets/Images/bg2.jpg"),
  ]);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://backend-kappa-sandy-79.vercel.app/getImageAndDetails");
      const data = await response.json();
      // Store both URL and public_id for each image

      if (data.length > 0) {
        console.log(data.length);
        setbackgroundImages(data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };
  useEffect(() => {
    fetchImages();
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [backgroundImages.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ServiceCard = ({ title, image, description }) => {
    return (
      <div className="service-card-container">
        <div className="service-card">
          <div className="service-card-front">
            <img src={image} alt={title} className="service-image" />
            <h3 className="service-title">{title}</h3>
          </div>
          <div className="service-card-back">
            <p className="service-description">{description}</p>
          </div>
        </div>
      </div>
    );
  };

  const [showAllServices, setShowAllServices] = useState(false);

  const services = [
    {
      title: "Pure Tone Audiometry",
      image: require("../Assets/Images/pta.png"),
      description:
        "Pure Tone Audiometry is a hearing test that measures a person’s ability to hear sounds at different pitches and volumes. It helps determine the degree and type of hearing loss.",
    },
    {
      title: "Speech Audiometry",
      image: require("../Assets/Images/speech-audiometry.png"),
      description:
        "Speech Audiometry evaluates a person's ability to hear and understand speech. It measures speech recognition threshold and word recognition ability.",
    },
    {
      title: "Tinnitus Management",
      image: require("../Assets/Images/Tinnitus-Management.png"),
      description:
        "Tinnitus management helps reduce the impact of ringing or buzzing in the ears. Our clinic offers sound therapy and personalized counseling for effective relief.",
    },
    {
      title: "Tympanometry",
      image: require("../Assets/Images/tympanometry.jpg"),
      description:
        "Tympanometry is a quick test we offer to assess middle ear health. It helps diagnose infections, fluid buildup, or eardrum issues accurately.",
    },
    {
      title: "Otoacoustic Emissions",
      image: require("../Assets/Images/oae.png"),
      description:
        "Otoacoustic Emissions (OAE) testing checks inner ear (cochlear) function. Our clinic uses it to detect hearing issues, especially in newborns and young children.",
    },
    {
      title: "Acoustic Reflex Testing",
      image: require("../Assets/Images/reflex.png"),
      description:
        "Acoustic Reflex Testing checks how ear muscles respond to loud sounds. At our clinic, it helps identify middle ear and nerve pathway problems.",
    },
    {
      title: "Auditory Brainstem Response",
      image: require("../Assets/Images/brainstempng.png"),
      description:
        "Auditory Brainstem Response (ABR) test measures the brain’s activity in response to sound. Our clinic uses it for hearing assessment and neurological evaluation.",
    },
    {
      title: "Auditory Steady-State Response",
      image: require("../Assets/Images/assr.png"),
      description:
        "Auditory Steady-State Response (ASSR) test evaluates hearing by measuring brain responses to continuous tones. Our clinic uses it for accurate hearing assessment, especially in difficult-to-test patients.",
    },
    {
      title: "Hearing Aids Dispensing and Programming",
      image: require("../Assets/Images/hearingaids.png"),
      description:
        "We provide expert hearing aids dispensing and programming to ensure clear sound and comfortable fit. Our clinic customizes devices for each patient’s unique hearing needs.",
    },
  ];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/manbaknv", {
        // Replace with your form ID
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New Contact Form Submission - ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="home-page">
      {/* Header */}
      <header>
        {/* Main Navigation */}
        <nav
          className={`navbar navbar-expand-lg navbar-dark ${
            scrolled ? "scrolled" : ""
          }`}
        >
          <div className="container">
            <div className="d-flex align-items-center">
              <img
                src={require("../Assets/Images/logo.png")}
                alt="Logo"
                className="navbar-logo"
              />
              <div className="navbar-brand-text">
                <div className="brand-name">MK Audiology</div>
                <div className="brand-subtitle">Hear Well Center</div>
              </div>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="mainNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => scrollToSection("home")}
                  >
                    Home
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => scrollToSection("about")}
                  >
                    About Us{" "}
                    <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => scrollToSection("services")}
                  >
                    Services{" "}
                    <FontAwesomeIcon icon={faChevronDown} className="ms-1" />
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    onClick={() => scrollToSection("contact")}
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="background-slideshow">
          {backgroundImages.map((image, index) => {
            const imageUrl = typeof image === "string" ? image : image?.url;

            return (
              <div key={index}>
                <div
                  className={`slide ${
                    index === currentBgIndex ? "active" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="hero-content">
          <div className="text-container">
            <p
              className="wave-text"
              style={{
                animationDelay: "15s",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                fontSize: "2.0rem",
              }}
            >
              YOUR HEARING,{" "}
              <span style={{ color: "dodgerblue" }}>OUR PRIORITY</span>
            </p>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="about-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2>Why Choose MK Audiology?</h2>
            <p className="lead">
              Pakistan's trusted hearing health specialists 
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <FontAwesomeIcon
                      icon={faAward}
                      className="text-primary"
                      size="2x"
                    />
                  </div>
                  <h4>Experience</h4>
                  <p>
                    Providing exceptional hearing care to thousands of satisfied
                    patients.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <FontAwesomeIcon
                      icon={faMicroscope}
                      className="text-primary"
                      size="2x"
                    />
                  </div>
                  <h4>Advanced Technology</h4>
                  <p>
                    State-of-the-art diagnostic equipment and hearing aid
                    technology.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center p-4">
                  <div className="bg-primary bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
                    <FontAwesomeIcon
                      icon={faSmile}
                      className="text-primary"
                      size="2x"
                    />
                  </div>
                  <h4>Personalized Care</h4>
                  <p>
                    Customized solutions tailored to your specific hearing
                    needs.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5 align-items-center">
            <div className="col-lg-6">
              <h3 className="mb-4">Hearing Health Check</h3>
              <div className="bg-light p-4 rounded mb-4">
                <p className="fw-bold">
                  Common signs you may need a hearing test:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-success me-2"
                    />
                    Difficulty following conversations
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-success me-2"
                    />
                    Turning up TV volume too high
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-success me-2"
                    />
                    Ringing in ears (tinnitus)
                  </li>
                  <li className="mb-2">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-success me-2"
                    />
                    Asking people to repeat themselves
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6 mt-4 mt-lg-0">
              <img
                src={require("../Assets/Images/bg4.jpg")}
                alt="Hearing test in progress"
                className="img-fluid rounded shadow"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="services-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Our Services</h2>
          <div className="services-container">
            {services
              .slice(0, showAllServices ? services.length : 3)
              .map((service, index) => (
                <ServiceCard
                  key={index}
                  title={service.title}
                  image={service.image}
                  description={service.description}
                />
              ))}
          </div>
          {services.length > 3 && (
            <button
              className="show-more-btn"
              onClick={() => setShowAllServices(!showAllServices)}
            >
              {showAllServices ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section py-5">
        <div className="container">
          <h2 className="text-center mb-5">Contact Us</h2>
          <div className="row">
            {/* Contact Form Column */}
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h3 className="card-title mb-4">Send us a message</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <select
                        className="form-select"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="appointment">Book an Appointment</option>
                        <option value="service">Service Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Your Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info Column */}
            <div className="col-lg-6">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h3 className="card-title mb-4">Contact Information</h3>

                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    <div className="contact-info-content">
                      <h5>Our Location</h5>
                      <p>
                        Clinic 1st, 3rd Floor Pakland Square Plaza
                        <br />
                        Near IDC MRI 1.5 Tesla G8 Markaz
                        <br />
                        Islamabad, Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FontAwesomeIcon icon={faPhone} />
                    </div>
                    <div className="contact-info-content">
                      <h5>Phone Numbers</h5>
                      <p>
                        <a href="tel:+923461251701">+92 3461251701</a>
                        <br />
                        <a href="tel:+923475234091">+92 3475234091</a>
                      </p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className="contact-info-content">
                      <h5>Working Hours</h5>
                      <p>
                        Monday - Saturday: 9:00 AM - 9:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="mb-3">Follow Us</h5>
                    <div className="social-links">
                      <a
                        href="https://www.facebook.com/share/19MkRdyXiP/?mibextid=wwXIfr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                      <a
                        href="https://www.instagram.com/mkaudiology595?igsh=MXZzMHFnYjN2dw%3D%3D&utm_source=qr"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map Embed */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="map-container">
                <iframe
                  title="MK Audiology Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.715766861235!2d73.0477223152087!3d33.69474498070248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbfd0789179f9%3A0x1a1b5745a5c5b5d5!2sPakland%20Square%20Plaza!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer-section py-5">
        <div className="container">
          <div className="row g-4">
            {/* Brand Info Column */}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <div className="footer-brand">
                <div className="d-flex align-items-center mb-3">
                  <img
                    src={require("../Assets/Images/logo.png")}
                    alt="MK Audiology Logo"
                    className="footer-logo me-2"
                  />
                  <div>
                    <h4 className="mb-0">MK Audiology</h4>
                    <p className="mb-0">Hear Well Center</p>
                  </div>
                </div>
                <p className="footer-text">
                  Providing exceptional hearing care with cutting-edge
                  technology and compassionate service.
                </p>
                <div className="social-links">
                  <a
                    href="https://www.facebook.com/share/19MkRdyXiP/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </a>
                  <a
                    href="https://www.instagram.com/mkaudiology595?igsh=MXZzMHFnYjN2dw%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="instagram-btn"
                  >
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="col-lg-2 col-md-4 mb-4 mb-md-0">
              <h5 className="footer-heading mb-4">Quick Links</h5>
              <ul className="footer-links">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="footer-link"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="footer-link"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="footer-link"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="footer-link"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Services Column */}
            <div className="col-lg-3 col-md-4 mb-4 mb-md-0">
              <h5 className="footer-heading mb-4">Our Services</h5>
              <ul className="footer-links">
                <li>
                  <a href="#services" className="footer-link">
                    Hearing Tests
                  </a>
                </li>
                <li>
                  <a href="#services" className="footer-link">
                    Hearing Aids
                  </a>
                </li>
                <li>
                  <a href="#services" className="footer-link">
                    Tinnitus Treatment
                  </a>
                </li>
                <li>
                  <a href="#services" className="footer-link">
                    Pediatric Audiology
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="col-lg-3 col-md-4">
              <h5 className="footer-heading mb-4">Contact Info</h5>
              <ul className="footer-contact-info">
                <li className="d-flex mb-3">
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    className="me-3 mt-1"
                  />
                  <span>
                    Clinic 1st, 3rd Floor Pakland Square Plaza, G8 Markaz
                    Islamabad
                  </span>
                </li>
                <li className="d-flex mb-3">
                  <FontAwesomeIcon icon={faPhone} className="me-3 mt-1" />
                  <div>
                    <a href="tel:+923461251701" className="footer-link d-block">
                      +92 346 1251701
                    </a>
                    <a href="tel:+923475234091" className="footer-link d-block">
                      +92 347 5234091
                    </a>
                  </div>
                </li>
                <li className="d-flex">
                  <FontAwesomeIcon icon={faClock} className="me-3 mt-1" />
                  <span>
                    Mon-Sat: 9:00 AM - 9:00 PM
                    <br />
                    Sunday: Closed
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="footer-bottom mt-5 pt-4 border-top border-light">
            <div className="row align-items-center">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                <p className="mb-0">
                  &copy; {new Date().getFullYear()} MK Audiology. All rights
                  reserved.
                </p>
              </div>
              <div className="col-md-6 text-center text-md-end">
                <a
                  href="https://www.linkedin.com/in/ahmed-abbas-092385319"
                  className="footer-link"
                >
                  Developed by Ahmed Abbas
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div
        className="whatsapp-float"
        onClick={() =>
          window.open(
            "https://wa.me/923475234091?text=Hello%20MK%20Audiology,%20I%20have%20a%20question",
            "_blank"
          )
        }
      >
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-tooltip">Chat with us</span>
      </div>
    </div>
  );
};

export default Home;
