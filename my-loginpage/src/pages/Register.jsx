import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import emailjs from "emailjs-com"; 
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", password: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

 
  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  const sendOtp = () => {
    if (!form.email) return alert("Enter email first");

    const otp = generateOtp();
    setGeneratedOtp(otp);

   
    emailjs.send(
      "service_kaopbjm",    
      "template_o130y98",   
      {
        email: form.email,     
        passcode: otp,
        time: "15 minutes"
      },
      "RCXzgFRmtIOs0SmG1"   
    ).then(() => {
      setOtpSent(true);
      alert(`OTP has been sent to ${form.email}`);
    }).catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Failed to send OTP. Please try again.");
    });
  };

  const verifyOtp = () => {
    if (form.otp === generatedOtp) {
      
      localStorage.setItem("user", JSON.stringify(form));
      alert("OTP verified successfully! Registration complete, please login.");
      navigate("/"); 
    } else {
      alert("Invalid OTP, please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />

        {!otpSent && (
          <button type="button" onClick={sendOtp}>Send OTP</button>
        )}

        {otpSent && (
          <>
            <input 
              type="text" 
              name="otp" 
              placeholder="Enter OTP" 
              value={form.otp} 
              onChange={handleChange} 
              required 
            />
            <button type="button" onClick={verifyOtp}>Verify OTP</button>
          </>
        )}
      </form>
      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Register;
