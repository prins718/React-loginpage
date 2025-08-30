import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import emailjs from "emailjs-com";
import CustomAlert from "./CustomAlert";
import "./Register.css";

function Register() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", password: "", otp: "" });
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const generateOtp = () => Math.floor(1000 + Math.random() * 9000).toString();

  
  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(form.mobile)) newErrors.mobile = "Enter a valid 10-digit mobile number";

    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email address";

    if (!form.password.trim()) newErrors.password = "Password is required";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOtp = () => {
    if (!validateForm()) return; 
    const otp = generateOtp();
    setGeneratedOtp(otp);

    emailjs
      .send(
        "service_kaopbjm",
        "template_o130y98",
        {
          email: form.email,
          passcode: otp,
          time: "15 minutes",
        },
        "RCXzgFRmtIOs0SmG1"
      )
      .then(() => {
        setOtpSent(true);
        setAlert({ message: `OTP has been sent to ${form.email}`, type: "success" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        setAlert({ message: "Failed to send OTP. Please try again.", type: "error" });
      });
  };

  const verifyOtp = () => {
    if (!form.otp.trim()) {
      setErrors({ otp: "OTP is required" });
      return;
    }

    if (form.otp === generatedOtp) {
     
      let users = JSON.parse(localStorage.getItem("users")) || [];

      
      if (users.some((user) => user.email === form.email)) {
        setAlert({ message: "Email already registered!", type: "error" });
        return;
      }

      
      const newUser = {
        name: form.name,
        mobile: form.mobile,
        email: form.email,
        password: form.password,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      setAlert({ message: "OTP verified successfully! Registration complete.", type: "success" });
      setTimeout(() => navigate("/"), 2000);
    } else {
      setErrors({ otp: "Invalid OTP, please try again." });
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>

      {alert && (
        <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div>
          <input type="text" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange} />
          {errors.mobile && <small className="error">{errors.mobile}</small>}
        </div>

        <div>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div>
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
          {errors.password && <small className="error">{errors.password}</small>}
        </div>

        {!otpSent && <button type="button" onClick={sendOtp}>Send OTP</button>}

        {otpSent && (
          <div>
            <input type="text" name="otp" placeholder="Enter OTP" value={form.otp} onChange={handleChange} />
            {errors.otp && <small className="error">{errors.otp}</small>}
            <button type="button" onClick={verifyOtp}>Verify OTP</button>
          </div>
        )}
      </form>

      <p>Already have an account? <Link to="/">Login</Link></p>
    </div>
  );
}

export default Register;
