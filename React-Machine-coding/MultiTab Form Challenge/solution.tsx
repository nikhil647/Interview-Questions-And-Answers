import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export default function App() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch 
  } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("formData") || "{}")
  });
  
  const [selectedTab, setSelected] = useState("profile");

  // Data persistence across tabs
  const formData = watch();
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const onSubmit = (args) => {
    console.log("args", args);
    alert("Form submitted successfully!");
    localStorage.removeItem("formData");
  };

  const tabSelection = () => {
    console.log("selectedTab -->", selectedTab);
    switch (selectedTab) {
      case "profile":
        return <Profile register={register} errors={errors} />;
      case "interest":
        return <Interest register={register} errors={errors} />;
      case "setting":
        return <Setting register={register} errors={errors} />;
      default:
        break;
    }
  };

  return (
    <div className="App" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Main Form</h1>
      <div id="formContinaer" className="formTab-nav">
        <span
          className={`tab ${selectedTab === "profile" ? "selected" : ""}`}
          onClick={() => setSelected("profile")}
        >
          {" "}
          Profile{" "}
        </span>
        <span
          className={`tab ${selectedTab === "interest" ? "selected" : ""}`}
          onClick={() => setSelected("interest")}
        >
          {" "}
          Interest{" "}
        </span>
        <span
          className={`tab ${selectedTab === "setting" ? "selected" : ""}`}
          onClick={() => setSelected("setting")}
        >
          {" "}
          Setting{" "}
        </span>
      </div>
      <div onSubmit={handleSubmit(onSubmit)}>
        {tabSelection()}
        
        {selectedTab === "setting" && (
          <button className="submit-button" onClick={handleSubmit(onSubmit)}>
            {" "}
            Submit{" "}
          </button>
        )}
      </div>
      
      <style>{`
        .formTab-nav {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 20px;
          font-size: 25px;
          background-color: pink;
          margin-bottom: 30px;
        }
        .tab {
          border: 1px solid gray;
          padding: 10px;
          cursor: pointer;
        }
        .tab.selected {
          background-color: red;
          color: white;
        }
        .flex-col {
          display: flex;
          flex-direction: column;
          gap: 15px;
          max-width: 500px;
        }
        .flex-col label {
          font-weight: bold;
          margin-top: 10px;
        }
        .flex-col input, .flex-col select {
          padding: 8px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: red;
          font-size: 14px;
          margin-top: 5px;
        }
        .submit-button {
          margin-top: 20px;
          padding: 10px 30px;
          font-size: 18px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .submit-button:hover {
          background-color: #45a049;
        }
        .radio-group {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }
        .radio-group label {
          font-weight: normal;
          display: flex;
          align-items: center;
          gap: 5px;
        }
      `}</style>
    </div>
  );
}

const Profile = ({ register, errors }) => {
  return (
    <div className="flex-col">
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Profile Info</div>
      
      <label> First Name * </label>
      <input
        {...register("firstName", {
          required: "Name is required",
        })}
      />
      {errors.firstName && <span className="error">{errors.firstName.message}</span>}

      <label> Age * </label>
      <input
        {...register("age", {
          required: "Age is required",
          min: { value: 1, message: "Age must be at least 1" },
          max: { value: 120, message: "Age must be less than 120" }
        })}
        type="number"
      />
      {errors.age && <span className="error">{errors.age.message}</span>}

      <label> Email * </label>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: { 
            value: emailRegex, 
            message: "Invalid email format" 
          }
        })}
      />
      {errors.email && <span className="error">{errors.email.message}</span>}
    </div>
  );
};

const Interest = ({ register, errors }) => {
  return (
    <div className="flex-col">
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Interest Info</div>
      
      <label> Domain Preference * </label>
      <div className="radio-group">
        <label>
          <input 
            type="radio" 
            value="frontend" 
            {...register("domainPref", { required: "Please select a preference" })} 
          />
          Frontend
        </label>
        <label>
          <input 
            type="radio" 
            value="backend" 
            {...register("domainPref")} 
          />
          Backend
        </label>
        <label>
          <input 
            type="radio" 
            value="fullstack" 
            {...register("domainPref")} 
          />
          Full Stack
        </label>
      </div>
      {errors.domainPref && <span className="error">{errors.domainPref.message}</span>}

      <label> Frameworks </label>
      <select {...register("framework")}>
        <option value="">Select a framework...</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
      </select>

      <label> Skills (check all that apply) </label>
      <div>
        <label style={{ fontWeight: "normal", display: "block" }}>
          <input type="checkbox" {...register("skills")} value="javascript" />
          {" "}JavaScript
        </label>
        <label style={{ fontWeight: "normal", display: "block" }}>
          <input type="checkbox" {...register("skills")} value="typescript" />
          {" "}TypeScript
        </label>
        <label style={{ fontWeight: "normal", display: "block" }}>
          <input type="checkbox" {...register("skills")} value="nodejs" />
          {" "}Node.js
        </label>
      </div>
    </div>
  );
};

const Setting = ({ register, errors }) => {
  return (
    <div className="flex-col">
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Settings</div>
      
      <label> Expected Salary </label>
      <input 
        {...register("salary", {
          min: { value: 0, message: "Salary must be positive" }
        })} 
        type="number"
        placeholder="Enter amount"
      />
      {errors.salary && <span className="error">{errors.salary.message}</span>}

      <label> Preferred Location </label>
      <select {...register("location")}>
        <option value="">Select location...</option>
        <option value="remote">Remote</option>
        <option value="onsite">On-site</option>
        <option value="hybrid">Hybrid</option>
      </select>

      <label style={{ fontWeight: "normal", display: "flex", alignItems: "center", gap: "10px" }}>
        <input type="checkbox" {...register("newsletter")} />
        Subscribe to newsletter
      </label>
    </div>
  );
};