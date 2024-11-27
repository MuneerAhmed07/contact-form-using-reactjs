import { useState } from "react";

const ContactForm = () => {

    const [formData, setFormData] = useState({
        name: "",
        email:"",
        message:"",
    });

    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);

    console.log(formData)

    // Handle input Change
    const HandleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    // Validate Input
    const validate = () => {
        const errors = {};
        if(!formData.name.trim()) {
            errors.name = "Name is required";
        }
        if(!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid"
        }
        if(!formData.message.trim()) {
            errors.message = "message is required";
        }

        return errors;
    }

    // handle Form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationError = validate();

        if(Object.keys(validationError).length > 0) {
            setError (validationError)
        } else {
            setError({});
            setSubmitted(true);
            console.log("Form submitted", formData);
            setFormData({name: "", email: "", message: ""})
        }

    }

  return (
    <>
        <div className="contact-form-container">
            <h1>Contact Us</h1>
            {submitted && <p className="success-message">Form submitted successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        id="name"
                        autoComplete='off'
                        name='name'
                        value={formData.name}
                        onChange={HandleChange}
                        className={error.name ? "error" : ""}
                    />
                    {error.name && <p className="error-message">{error.name}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email"
                        id="email"
                        name='email'
                        autoComplete='off'
                        value={formData.email}
                        onChange={HandleChange}
                        className={error.email ? "error" : ""}
                    />
                    {error.email && <p className="error-message">{error.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <textarea name="message" id="message"
                     value={formData.message}
                     onChange={HandleChange}
                        className={error.message ? "error" : ""}
                    ></textarea>
                    {error.message && <p className="error-message">{error.message}</p>}
                </div>
                <button type='submit' className='submit-button'>Submit</button>
            </form>
        </div>
    </>
  )
}

export default ContactForm;
