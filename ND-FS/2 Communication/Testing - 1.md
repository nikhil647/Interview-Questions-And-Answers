# 🧪 Frontend Testing – Quick Notes

Testing ensures UI works correctly and users get a smooth experience. Frontend apps are tested using multiple techniques to validate functionality, behavior, performance, and accessibility across systems and devices.

---

### 1. Unit Testing  
Tests small components in isolation, like a button or function logic.  
Fast to run and helps catch bugs early.  
**Tool Example:** Jest / React Testing Library

---

### 2. Integration Testing  
Checks how multiple components work together.  
Useful to verify data flow between UI and services.  
**Tool Example:** Cypress / Playwright

---

### 3. Functional Testing  
Validates the app behavior against requirements.  
Ensures features work as expected for the user.  
**Tool Example:** Cypress UI commands

---

### 4. End-to-End (E2E) Testing  
Simulates real user workflows — from login to checkout.  
Great for testing full application scenarios.  
**Tool Example:** Cypress E2E tests

---

### 5. Regression Testing  
Ensures new changes don’t break existing features.  
Run after bug fixes or feature updates.  
**Tool Example:** Cypress automated test suite

---

### 6. Performance Testing  
Measures load time, responsiveness, and resource usage.  
Helps provide a fast & smooth UX.  
**Tool Example:** Lighthouse / WebPageTest

---

### 7. Accessibility Testing  
Checks usability for users with disabilities.  
Covers ARIA roles, contrast, keyboard navigation.  
**Tool Example:** axe-core with Cypress

---

### 8. Cross Browser Testing  
Ensures UI works well across Chrome, Firefox, Safari, etc.  
Fixes CSS and rendering inconsistencies.  
**Tool Example:** BrowserStack / Cypress cross-browser

---

### 9. Usability Testing  
Observes how real users interact with the UI.  
Finds UX improvements and interaction pain points.  
**Tool Example:** Prototype user testing via Figma or analytics events.

---

### 10. Security Testing  
Validates data safety and prevents vulnerabilities.  
Includes XSS, CSRF, input validation checks.  
**Tool Example:** Cypress + security scanning tools

---

### 11. Localization / i18n Testing  
Ensures UI adapts to different languages and regions.  
Checks translations, formats, currency, layout changes.  
**Tool Example:** Cypress tests with multiple locale configs

---

### 12. A/B Testing  
Compare two UI versions to see which performs better.  
Useful for optimization and conversion improvement.  
**Tool Example:** Google Optimize / Experiment Flags

---

### 13. TDD – Test Driven Development  
Write tests **before** writing code.  
Helps build cleaner and bug-free features from start.  
**Tool Example:** Jest + Cypress workflow
