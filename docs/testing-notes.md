# Testing Notes

## Purpose of Testing
The purpose of testing was to ensure that all pages of HTMLemon display correctly, function as expected, and meet accessibility standards on different devices and browsers.

---

## Test Plan
| Feature | What was tested | Expected Outcome | Pass/Fail | Notes |
|----------|----------------|------------------|------------|--------|
| Navigation | All menu links work and lead to correct pages | Opens correct page | Pass | All links working correctly |
| Theme Switch | Light/Dark toggle works on all pages | Switches instantly, maintains readability | Pass | Works on all pages |
| Images | All images load with alt text | Loads correctly with descriptive alt text | Pass | Added missing alt on logo |
| Responsiveness | Layout adjusts on mobile, tablet, and desktop | Layout remains usable and readable | Pass | Fixed minor mobile padding issue |
| Forms | Contact form fields display and validate | Input fields visible, labels accessible | Minor Issue | Adjusted alignment and spacing |

---

## Tools Used
- Chrome DevTools – for responsive and layout testing  
- Firefox Accessibility Inspector – to test colour contrast and ARIA structure  
- W3C HTML Validator – for syntax validation  
- W3C CSS Validator – for stylesheet validation  
- Lighthouse (Chrome) – to evaluate performance, SEO, and accessibility  
- VoiceOver (macOS) – to test keyboard and screen reader navigation

---

## Results and Fixes
- Logo not displaying – Fixed incorrect image path in `index.html`.  
- Theme button alignment – Adjusted flexbox CSS rules.  
- Low contrast button colour – Updated hover tone to #E6C300.  
- Missing alt text – Added descriptions for icons and images.

---

## Accessibility Checks
- Colour contrast verified via WebAIM; text passes AA standards.  
- Alt text included for all images.  
- All interactive elements have visible focus states.  
- Navigation fully operable via keyboard (tested with tab key).  
- Tested both light and dark themes for readability.

Screenshots:  
- `/evidence/lighthouse-report.png`  
- `/evidence/contrast-check.png`

---

## Summary
Testing confirmed that HTMLemon is visually consistent, responsive, and accessible.  
Minor issues identified during testing were resolved promptly.  
Future improvements include theme preference persistence and more detailed form validation.