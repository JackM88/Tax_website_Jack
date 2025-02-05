import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import "./Contact.css";

const Contact = () => {
  const [activeForm, setActiveForm] = useState("appointmentForm");

  const apikey = process.env.REACT_APP_WEB3FORMS_API_KEY;

  const showForm = (formId) => {
    console.log(`Switching to form: ${formId}`);
    setActiveForm(formId);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", apikey);

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      toast.success("Message sent successfully!", {
        autoClose: 2000, 
        pauseOnHover: false, 
        closeOnClick: true,
      });
    } else {
      console.log("Error", res);
      toast.error("Error sending message!", {
        autoClose: 2000, 
        pauseOnHover: false, 
        closeOnClick: true,
      });
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Single ToastContainer instance at the top */}

      <div className="header-section-contact">
        <Navbar />
        <div className="head-txt">
          <h1>Contact</h1>
        </div>
      </div>

      <div className="contact-container">
        <div className="left-column">
          <h2>Tax Consultants of North America</h2>
          <p>8405 Richmond Hwy, Unit D Alexandria, VA 22309</p>
          <br />
          <p>Mailing Address: PO Box 90730 Alexandria, VA 22309</p>
          <br />
          <p>
            <i className="fa-solid fa-phone"></i> 703-519-9700
          </p>
          <br />
          <p>
            <i className="fa-solid fa-fax"></i> 703-519-9703
          </p>
          <br />
          <p>
            <i className="fa-solid fa-envelope"></i> tcna@tcna3.com
          </p>
        </div>

        <div className="right-column">
          <div className="pill-align">
            <div className="pill-nav">
              <button
                className={activeForm === "appointmentForm" ? "active" : ""}
                onClick={() => showForm("appointmentForm")}
              >
                Appointment
              </button>
              <button
                className={activeForm === "messageForm" ? "active" : ""}
                onClick={() => showForm("messageForm")}
              >
                Message
              </button>
            </div>
          </div>

          <div className="form-container">
            {/* Appointment Form */}
            <form
              id="appointmentForm"
              className={activeForm === "appointmentForm" ? "active" : ""}
              onSubmit={onSubmit}
            >
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <input
                type="tel"
                name="phone"
                pattern="\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}"
                minLength="10"
                maxLength="12"
                placeholder="Phone"
                required
              />
              <input type="date" name="date" placeholder="Date" required />
              <input type="time" name="time" placeholder="Time" required />
              <textarea name="message" placeholder="Message"></textarea>
              <button type="submit">Send</button>
            </form>

            {/* Message Form */}
            <form
              id="messageForm"
              className={activeForm === "messageForm" ? "active" : ""}
              onSubmit={onSubmit}
            >
              <input type="text" name="name" placeholder="Name" required />
              <input type="email" name="email" placeholder="Email" required />
              <textarea name="message" placeholder="Message"></textarea>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
