import React, {useState} from "react";
import '../Component/Form.scss'

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = () => {
        let tempErrors ={};
        let isValid = true;

        if (formData.name.length < 3) {
            tempErrors.name = 'Name must be at least 3 characters long';
            isValid = false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            tempErrors.email = 'Email is not valid';
            isValid = false;
        }
        const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            tempErrors.password= 'Password must be atleast 8 characters long and contain at least one number';
            isValid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = 'Password does not match';
            isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,[name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (validate()) {
            alert(JSON.stringify(formData, null, 2));
        }
        setIsSubmitting(false);
    }
    return(
        <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>Submit</button>
      </form>
    );
};
export default Form;