# 🏋️ Modern Gym & Fitness Website (Mobile-Friendly & Customizable)

An ultra-modern, high-performance website designed for gyms, fitness clubs, and personal trainers. Built with pure HTML5, modern vanilla CSS, and vanilla JavaScript. Features an athletic dark carbon aesthetic with vibrant electric volt accents (`#ccff00`), interactive tools, and clean placeholders for easy rebranding.

---

## ⚡ Live Features

- **📱 100% Mobile-Friendly**: Responsive from small mobile screens (320px) up to 4K displays. Touch-friendly slide-in navigation drawer.
- **🏷️ Customizable Placeholders**: All brand names, phone numbers, addresses, trainer profiles, plans, and testimonials are marked with clean `[PLACEHOLDER]` tags for quick customization.
- **🛠️ Built-in Live Brand Customizer**: Floating in-browser helper tool allowing you to test replacing gym names, phone numbers, and addresses in real-time.
- **📊 Interactive BMI & Calorie Calculator**: Supports Metric (cm/kg) & Imperial (in/lbs), real-time dynamic visual gauge meter, and personalized workout recommendations.
- **📅 Interactive Class Schedule**: Filterable timetable by day (Monday through Sunday) with instant "Book Spot" modal dialog.
- **💳 Pricing Billing Switcher**: Monthly vs. Annual toggle with automatic 20% discount calculation.
- **🥊 Filterable Workout Disciplines**: Instant category filtering for Strength & Iron, HIIT Shred, Combat Boxing, and Mobility Yoga.
- **🌟 Lead Generation & Booking Modals**: 3-Day Free VIP Pass modals and booking forms with animated toast alerts.

---

## 📂 Project Structure

```text
gym-demo/
├── index.html                 # Main website structure & semantic SEO markup
├── css/
│   └── styles.css             # Design system, responsive layout, animations
├── js/
│   └── app.js                 # Interactive engine (BMI, schedule, modals, customizer)
├── assets/
│   └── images/
│       ├── hero-bg.jpg        # High-res gym interior hero background
│       ├── workout-strength.jpg # Heavy barbell strength training image
│       └── workout-hiit.jpg   # Dynamic battle ropes HIIT image
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

No build tools, bundlers, or package managers required. Simply open `index.html` in any modern web browser or serve via a local HTTP server:

```bash
# Using Python
python -m http.server 8080

# Or with Node
npx serve .
```

Then visit `http://localhost:8080/`.

---

## ✏️ Rebranding & Customization Guide

You can replace all placeholder texts easily:
1. Search and replace `[YOUR GYM NAME]` with your club's actual name.
2. Replace `[YOUR MOTTO / TAGLINE HERE]` with your slogan.
3. Replace contact placeholders:
   - `[123 FITNESS BLVD, YOUR CITY]`
   - `[+1 (555) 000-FITNESS]`
   - `[CONTACT@YOURGYMNAME.COM]`
4. Customize coach names: `[HEAD COACH NAME 1]`, `[COACH NAME 2]`, `[COACH NAME 3]`.

---

## 📄 License

MIT License. Free to use for personal and commercial fitness projects.
