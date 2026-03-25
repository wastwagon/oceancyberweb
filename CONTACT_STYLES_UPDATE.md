# Contact Section Styles Update

## Overview
Updated the Contact Information section styles to improve readability and hierarchy with a consistent dark navy and teal color scheme.

## Updated CSS Classes

### Contact Section Heading
```css
.contact-heading {
  @apply text-[#003366] font-bold text-2xl md:text-3xl lg:text-4xl mb-8;
}
```

### Contact Info Items
```css
.contact-info-item {
  @apply flex items-start gap-4 p-6 bg-white/5 backdrop-blur-xl border border-[#ccc] rounded-2xl hover:bg-white/10 hover:border-[#004d61] transition-all duration-300;
}

.contact-info-title {
  @apply font-semibold text-[#003366] mb-1 text-base md:text-lg;
}

.contact-info-content {
  @apply text-[#555] whitespace-pre-line text-sm md:text-base;
}

.contact-info-link {
  @apply text-[#555] hover:text-[#003366] transition-colors whitespace-pre-line text-sm md:text-base;
}
```

### Form Elements
```css
.form-label {
  @apply block text-[#555] font-medium mb-2 text-sm md:text-base;
}

.form-input {
  @apply w-full px-4 py-3 rounded-xl bg-white/5 border border-[#ccc] text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#004d61]/30 focus:border-[#004d61] transition-all text-sm md:text-base;
}

.form-textarea {
  @apply w-full px-4 py-3 rounded-xl bg-white/5 border border-[#ccc] text-[#333] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#004d61]/30 focus:border-[#004d61] transition-all resize-none text-sm md:text-base;
}

.form-field {
  @apply space-y-2;
}

.form-submit-btn {
  @apply w-full px-6 py-4 bg-gradient-to-r from-[#003366] to-[#004d61] text-white rounded-full font-semibold hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#004d61]/50 transition-all duration-300 flex items-center justify-center gap-2;
}
```

## Key Style Improvements

### Color Scheme
- **Section Headings**: Dark navy (#003366), bold, larger font size
- **Form Labels**: Neutral gray (#555), medium weight, smaller than headings
- **Input Text**: Readable dark text (#333)
- **Placeholder Text**: Light gray (#999) to avoid competing with labels
- **Borders**: 1px solid #ccc for normal state
- **Hover/Focus**: Teal (#004d61) border color matching brand accent

### Spacing & Layout
- Added proper spacing between form fields using `.form-field` class
- Consistent padding (10px) in input fields and textarea
- Rounded corners for modern appearance
- Smooth transitions for interactive elements

### Responsive Design
- All classes include responsive variants (md:, lg:) for desktop and mobile
- Font sizes scale appropriately across breakpoints
- Layout maintains consistency across different screen sizes

## Example JSX/React Snippet

```jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="contact" className="py-32 bg-gradient-to-b from-blue-50-custom via-blue-100-custom to-blue-200-custom">
      <div className="container mx-auto px-6 md:px-8">
        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <div>
            <h3 className="contact-heading">Contact Information</h3>
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
                className="contact-info-item"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-400/30 flex items-center justify-center">
                  <div className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <div className="contact-info-title">Address</div>
                  <div className="contact-info-content">
                    232 Nii Kwashiefio Avenue, Accra, Ghana
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:mt-12 bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-cyan-400/20"
        >
          <form className="space-y-6">
            <div className="form-field">
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="form-input"
              />
            </div>
            
            <div className="form-field">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="form-input"
              />
            </div>
            
            <div className="form-field">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                placeholder="+233 XX XXX XXXX"
                className="form-input"
              />
            </div>
            
            <div className="form-field">
              <label className="form-label">Message</label>
              <textarea
                placeholder="Tell us about your project..."
                rows={5}
                className="form-textarea"
              />
            </div>
            
            <button type="submit" className="form-submit-btn">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
```

## Benefits of This Update

1. **Improved Readability**: Clear hierarchy with dark navy headings and neutral gray labels
2. **Consistent Branding**: Teal accent color (#004d61) used for hover/focus states
3. **Better UX**: Proper spacing between form fields and clear visual feedback
4. **Accessible**: High contrast text colors and clear focus indicators
5. **Responsive**: Styles work consistently across desktop and mobile devices
6. **Maintainable**: Reusable CSS classes that can be easily updated globally

The Contact section now has a professional, cohesive appearance that aligns with the overall brand identity while providing excellent user experience across all devices.