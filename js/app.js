/**
 * MODERN GYM & FITNESS - INTERACTIVE ENGINE
 * Features:
 * - Real-time Placeholders Live Customizer
 * - Responsive Mobile Nav & Touch Drawer
 * - Precision Interactive BMI & Calorie Calculator
 * - Interactive Schedule Timetable with Day Filtering
 * - Billing Toggle (Monthly vs Annual Savings)
 * - Program Category Filter Tabs
 * - Stat Counter Animations
 * - Modal Booking and Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initHeaderScroll();
  initBmiCalculator();
  initScheduleFilter();
  initPricingToggle();
  initProgramTabs();
  initStatCounters();
  initModals();
  initForms();
  initBrandCustomizer();
});

/* ==========================================================================
   1. MOBILE NAVIGATION & DRAWER
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navDrawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const navLinks = navDrawer ? navDrawer.querySelectorAll('.nav-link, .btn') : [];

  if (!toggleBtn || !navDrawer || !backdrop) return;

  function openNav() {
    toggleBtn.classList.add('active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    navDrawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggleBtn.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    navDrawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = navDrawer.classList.contains('active');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  backdrop.addEventListener('click', closeNav);

  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('active')) {
      closeNav();
    }
  });
}

/* ==========================================================================
   2. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ==========================================================================
   3. INTERACTIVE BMI & CALORIE CALCULATOR
   ========================================================================== */
function initBmiCalculator() {
  const metricBtn = document.getElementById('unitMetric');
  const imperialBtn = document.getElementById('unitImperial');
  const calcBtn = document.getElementById('calculateBmiBtn');
  
  const heightInput = document.getElementById('bmiHeight');
  const weightInput = document.getElementById('bmiWeight');
  const ageInput = document.getElementById('bmiAge');
  const heightUnitLabel = document.getElementById('heightUnit');
  const weightUnitLabel = document.getElementById('weightUnit');
  
  const displayValue = document.getElementById('bmiValueDisplay');
  const displayStatus = document.getElementById('bmiStatusBadge');
  const gaugeFill = document.getElementById('bmiGaugeFill');
  const recProgram = document.getElementById('bmiProgramRec');
  const recCalories = document.getElementById('bmiCalorieRec');
  
  const genderBtns = document.querySelectorAll('.gender-btn');
  let currentGender = 'male';
  let isMetric = true;

  if (!calcBtn || !displayValue) return;

  // Gender toggle
  genderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      genderBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGender = btn.dataset.gender || 'male';
      calculateBmi();
    });
  });

  // Unit switchers
  if (metricBtn && imperialBtn) {
    metricBtn.addEventListener('click', () => {
      if (isMetric) return;
      isMetric = true;
      metricBtn.classList.add('active');
      imperialBtn.classList.remove('active');
      heightUnitLabel.textContent = 'cm';
      weightUnitLabel.textContent = 'kg';
      
      // Convert values if existing
      const curH = parseFloat(heightInput.value);
      const curW = parseFloat(weightInput.value);
      if (curH) heightInput.value = Math.round(curH * 2.54);
      if (curW) weightInput.value = Math.round(curW * 0.453592);
      calculateBmi();
    });

    imperialBtn.addEventListener('click', () => {
      if (!isMetric) return;
      isMetric = false;
      imperialBtn.classList.add('active');
      metricBtn.classList.remove('active');
      heightUnitLabel.textContent = 'in';
      weightUnitLabel.textContent = 'lbs';
      
      // Convert values if existing
      const curH = parseFloat(heightInput.value);
      const curW = parseFloat(weightInput.value);
      if (curH) heightInput.value = Math.round(curH / 2.54);
      if (curW) weightInput.value = Math.round(curW / 0.453592);
      calculateBmi();
    });
  }

  function calculateBmi() {
    let h = parseFloat(heightInput.value);
    let w = parseFloat(weightInput.value);
    let age = parseInt(ageInput.value, 10) || 28;

    if (!h || !w || h <= 0 || w <= 0) {
      return;
    }

    let bmi = 0;
    let bmr = 0;

    if (isMetric) {
      // Metric: h in cm, w in kg
      const hM = h / 100;
      bmi = w / (hM * hM);
      // Harris-Benedict / Mifflin BMR
      if (currentGender === 'male') {
        bmr = 10 * w + 6.25 * h - 5 * age + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * age - 161;
      }
    } else {
      // Imperial: h in inches, w in lbs
      bmi = (w / (h * h)) * 703;
      const wKg = w * 0.453592;
      const hCm = h * 2.54;
      if (currentGender === 'male') {
        bmr = 10 * wKg + 6.25 * hCm - 5 * age + 5;
      } else {
        bmr = 10 * wKg + 6.25 * hCm - 5 * age - 161;
      }
    }

    const roundedBmi = bmi.toFixed(1);
    displayValue.textContent = roundedBmi;

    let status = '';
    let statusClass = '';
    let gaugePercent = 50;
    let program = '';
    let targetCalories = Math.round(bmr * 1.4); // moderate activity

    if (bmi < 18.5) {
      status = 'Underweight (Hypertrophy Target)';
      statusClass = '#00f2fe';
      gaugePercent = 20;
      program = 'Hypertrophy Mass Builder & Strength Fundamentals';
      targetCalories += 450; // surplus
    } else if (bmi >= 18.5 && bmi < 25) {
      status = 'Healthy & Optimal Weight';
      statusClass = '#ccff00';
      gaugePercent = 50;
      program = 'Athletic Conditioning & High Performance Training';
      targetCalories += 150;
    } else if (bmi >= 25 && bmi < 30) {
      status = 'Overweight (Fat Burn Phase)';
      statusClass = '#ffb703';
      gaugePercent = 75;
      program = 'Metabolic HIIT Shred & Functional Strength';
      targetCalories -= 350; // deficit
    } else {
      status = 'Obese (Transform Phase)';
      statusClass = '#ff5e36';
      gaugePercent = 95;
      program = 'Cardio Burn Engine & Mobility Reset';
      targetCalories -= 500;
    }

    displayStatus.textContent = status;
    displayStatus.style.color = statusClass;
    displayStatus.style.borderColor = statusClass;
    gaugeFill.style.width = `${Math.min(100, Math.max(10, gaugePercent))}%`;
    
    if (recProgram) recProgram.textContent = program;
    if (recCalories) recCalories.textContent = `~${targetCalories} kcal / day`;
  }

  calcBtn.addEventListener('click', calculateBmi);
  heightInput.addEventListener('input', calculateBmi);
  weightInput.addEventListener('input', calculateBmi);
  ageInput.addEventListener('input', calculateBmi);

  // Initial calculation
  calculateBmi();
}

/* ==========================================================================
   4. INTERACTIVE SCHEDULE FILTER
   ========================================================================== */
const SCHEDULE_DATA = {
  monday: [
    { time: '06:30 AM', name: 'Sunrise Heavy Iron & Deadlifts', type: 'Strength Training', coach: '[COACH NAME 1]', room: 'Iron Room A' },
    { time: '09:00 AM', name: 'High-Octane Battle HIIT', type: 'Cardio & Conditioning', coach: '[COACH NAME 2]', room: 'Arena Studio' },
    { time: '05:30 PM', name: 'Boxing Technical Sparring', type: 'Combat Sports', coach: '[COACH NAME 3]', room: 'Fight Zone' },
    { time: '07:00 PM', name: 'Power Flow Yoga & Deep Mobility', type: 'Mobility & Recovery', coach: '[COACH NAME 4]', room: 'Zen Lounge' }
  ],
  tuesday: [
    { time: '07:00 AM', name: 'Cross-Conditioning WOD', type: 'Functional Fitness', coach: '[COACH NAME 2]', room: 'Arena Studio' },
    { time: '11:00 AM', name: 'Upper Body Sculpt & Press', type: 'Hypertrophy', coach: '[COACH NAME 1]', room: 'Iron Room A' },
    { time: '06:00 PM', name: 'Cardio Core & Shred Circuit', type: 'HIIT & Abs', coach: '[COACH NAME 3]', room: 'Sprint Track' },
    { time: '07:30 PM', name: 'Athlete Recovery & Foam Rolling', type: 'Recovery', coach: '[COACH NAME 4]', room: 'Zen Lounge' }
  ],
  wednesday: [
    { time: '06:30 AM', name: 'Olympic Weightlifting & Squats', type: 'Strength Training', coach: '[COACH NAME 1]', room: 'Iron Room B' },
    { time: '09:30 AM', name: 'Kickboxing Heavy Bag Drills', type: 'Combat Fitness', coach: '[COACH NAME 3]', room: 'Fight Zone' },
    { time: '05:00 PM', name: 'Agility & Speed Conditioning', type: 'Athletic Performance', coach: '[COACH NAME 2]', room: 'Sprint Track' },
    { time: '07:00 PM', name: 'Full Body Kettlebell Blast', type: 'Strength Endurance', coach: '[COACH NAME 1]', room: 'Arena Studio' }
  ],
  thursday: [
    { time: '07:00 AM', name: 'Tabata Burn & Ropes', type: 'Cardio HIIT', coach: '[COACH NAME 2]', room: 'Arena Studio' },
    { time: '12:00 PM', name: 'Lunch Express Abs & Glutes', type: 'Core Target', coach: '[COACH NAME 4]', room: 'Studio B' },
    { time: '06:00 PM', name: 'Powerlifting Bench & Overhead', type: 'Strength Training', coach: '[COACH NAME 1]', room: 'Iron Room A' },
    { time: '07:30 PM', name: 'Evening Mobility & Stretch', type: 'Yoga / Recovery', coach: '[COACH NAME 4]', room: 'Zen Lounge' }
  ],
  friday: [
    { time: '06:30 AM', name: 'Full-Body Beast Circuit', type: 'Functional Strength', coach: '[COACH NAME 1]', room: 'Arena Studio' },
    { time: '09:00 AM', name: 'Muay Thai Fundamentals', type: 'Combat Fitness', coach: '[COACH NAME 3]', room: 'Fight Zone' },
    { time: '05:30 PM', name: 'Weekend Warmup Hyper-HIIT', type: 'Cardio Intensity', coach: '[COACH NAME 2]', room: 'Sprint Track' },
    { time: '06:45 PM', name: 'Community Sweat & Pump', type: 'All Levels', coach: '[COACH NAME 1]', room: 'Iron Room A' }
  ],
  saturday: [
    { time: '08:30 AM', name: 'Weekend Warrior Boot Camp', type: 'High Intensity Team', coach: '[COACH NAME 2]', room: 'Turf Arena' },
    { time: '10:30 AM', name: 'Strength Masterclass & Form Lab', type: 'Strength Training', coach: '[COACH NAME 1]', room: 'Iron Room A' },
    { time: '01:00 PM', name: 'Boxing Open Sparring Session', type: 'Combat Sports', coach: '[COACH NAME 3]', room: 'Fight Zone' },
    { time: '03:30 PM', name: 'Sound Bath & Restorative Flow', type: 'Mobility & Wellness', coach: '[COACH NAME 4]', room: 'Zen Lounge' }
  ],
  sunday: [
    { time: '09:00 AM', name: 'Open Gym Coaching Hours', type: 'Individual Focus', coach: '[COACH NAME 1]', room: 'All Facilities' },
    { time: '11:00 AM', name: 'Recovery Sauna & Contrast Bath', type: 'Wellness Protocol', coach: '[COACH NAME 4]', room: 'Spa Suite' },
    { time: '04:00 PM', name: 'Gentle Vinyasa Yoga for Athletes', type: 'Recovery Yoga', coach: '[COACH NAME 4]', room: 'Zen Lounge' }
  ]
};

function initScheduleFilter() {
  const dayButtons = document.querySelectorAll('.day-btn');
  const scheduleContainer = document.getElementById('scheduleList');
  if (!scheduleContainer) return;

  function renderDaySchedule(day) {
    const classes = SCHEDULE_DATA[day] || SCHEDULE_DATA.monday;
    scheduleContainer.innerHTML = '';

    classes.forEach(item => {
      const row = document.createElement('div');
      row.className = 'schedule-item';
      row.innerHTML = `
        <div class="sched-time">${item.time}</div>
        <div class="sched-class">
          <span class="sched-class-name">${item.name}</span>
          <span class="sched-class-type">${item.type}</span>
        </div>
        <div class="sched-coach">
          <div class="coach-avatar-mini">${item.coach.charAt(1) || 'C'}</div>
          <span class="placeholder-tag" data-ph-key="trainer-name">${item.coach}</span>
        </div>
        <div class="sched-room">${item.room}</div>
        <div>
          <button class="btn btn-outline btn-sm book-class-btn" data-class-name="${item.name}" data-class-time="${item.time}">
            Book Spot
          </button>
        </div>
      `;
      scheduleContainer.appendChild(row);
    });

    // Attach book button events
    const bookButtons = scheduleContainer.querySelectorAll('.book-class-btn');
    bookButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cName = btn.dataset.className;
        const cTime = btn.dataset.classTime;
        openBookingModal(cName, cTime);
      });
    });

    // Re-apply live placeholder customizer values if present
    applyCustomizerValues();
  }

  dayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dayButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selectedDay = btn.dataset.day || 'monday';
      renderDaySchedule(selectedDay);
    });
  });

  // Render initial Monday schedule
  renderDaySchedule('monday');
}

/* ==========================================================================
   5. MEMBERSHIP PRICING BILLING TOGGLE
   ========================================================================== */
function initPricingToggle() {
  const switchBtn = document.getElementById('billingSwitch');
  const labelMonthly = document.getElementById('labelMonthly');
  const labelYearly = document.getElementById('labelYearly');
  const priceStarter = document.getElementById('priceStarter');
  const pricePro = document.getElementById('pricePro');
  const priceVip = document.getElementById('priceVip');
  const pricePeriodLabels = document.querySelectorAll('.price-period');

  if (!switchBtn || !priceStarter || !pricePro || !priceVip) return;

  let isYearly = false;

  function updatePrices() {
    if (isYearly) {
      switchBtn.classList.add('yearly');
      labelMonthly.classList.remove('active');
      labelYearly.classList.add('active');
      
      // 20% savings annual prices
      priceStarter.textContent = '24';
      pricePro.textContent = '48';
      priceVip.textContent = '89';
      
      pricePeriodLabels.forEach(el => el.textContent = '/ month (billed annually)');
    } else {
      switchBtn.classList.remove('yearly');
      labelMonthly.classList.add('active');
      labelYearly.classList.remove('active');
      
      // Regular monthly prices
      priceStarter.textContent = '29';
      pricePro.textContent = '59';
      priceVip.textContent = '109';
      
      pricePeriodLabels.forEach(el => el.textContent = '/ month (cancel anytime)');
    }
  }

  switchBtn.addEventListener('click', () => {
    isYearly = !isYearly;
    updatePrices();
  });

  if (labelMonthly) {
    labelMonthly.addEventListener('click', () => {
      isYearly = false;
      updatePrices();
    });
  }

  if (labelYearly) {
    labelYearly.addEventListener('click', () => {
      isYearly = true;
      updatePrices();
    });
  }
}

/* ==========================================================================
   6. PROGRAM CATEGORY FILTER TABS
   ========================================================================== */
function initProgramTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const programCards = document.querySelectorAll('.program-card');

  if (!tabBtns.length || !programCards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter || 'all';

      programCards.forEach(card => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. STAT COUNTER ANIMATIONS
   ========================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target, 10) || 0;
        let count = 0;
        const duration = 1800;
        const stepTime = Math.max(20, Math.floor(duration / target));

        const timer = setInterval(() => {
          count += Math.ceil(target / (duration / 30));
          if (count >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = count;
          }
        }, 30);

        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   8. MODALS & BOOKING DIALOGS
   ========================================================================== */
function initModals() {
  const trialModal = document.getElementById('trialModal');
  const openTrialBtns = document.querySelectorAll('.open-trial-modal');
  const closeBtns = document.querySelectorAll('.modal-close-btn');
  const overlays = document.querySelectorAll('.modal-overlay');

  openTrialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (trialModal) openModal(trialModal);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      overlays.forEach(m => closeModal(m));
    });
  });

  overlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      overlays.forEach(m => closeModal(m));
    }
  });
}

function openModal(modalEl) {
  modalEl.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modalEl) {
  modalEl.classList.remove('active');
  document.body.style.overflow = '';
}

function openBookingModal(className, classTime) {
  const bookingModal = document.getElementById('bookingModal');
  if (!bookingModal) return;

  const modalClassTitle = document.getElementById('modalSelectedClass');
  if (modalClassTitle) {
    modalClassTitle.textContent = `${className} (${classTime})`;
  }

  openModal(bookingModal);
}

/* ==========================================================================
   9. FORMS & RICH TOAST NOTIFICATIONS
   ========================================================================== */
function showToast(message, icon = '✓') {
  let toast = document.getElementById('systemToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'systemToast';
    toast.className = 'toast-box';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="toast-icon" style="font-size:1.3rem;">${icon}</span>
    <span class="toast-message" style="font-size:0.92rem; font-weight:600;">${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

function initForms() {
  // Free trial pass form (in-page)
  const trialForm = document.getElementById('trialBookingForm');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = trialForm.querySelector('input[name="name"]').value;
      showToast(`🎉 VIP Pass Reserved! Welcome aboard, ${name}! Check your SMS for entry pass.`, '🔥');
      trialForm.reset();
    });
  }

  // Modal trial form
  const modalTrialForm = document.getElementById('modalTrialForm');
  if (modalTrialForm) {
    modalTrialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = modalTrialForm.querySelector('input[name="modal_name"]').value;
      const modal = document.getElementById('trialModal');
      if (modal) closeModal(modal);
      showToast(`🎉 VIP Pass Generated for ${name}! Please show this confirmation at front desk.`, '🏆');
      modalTrialForm.reset();
    });
  }

  // Modal class booking form
  const modalClassForm = document.getElementById('modalClassBookingForm');
  if (modalClassForm) {
    modalClassForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = document.getElementById('bookingModal');
      if (modal) closeModal(modal);
      showToast('⚡ Spot Confirmed! Your workout session has been booked on the schedule.', '💪');
      modalClassForm.reset();
    });
  }

  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('💌 Subscribed! Workout tips and nutrition guides are on their way.', '✨');
      newsletterForm.reset();
    });
  }
}

/* ==========================================================================
   10. LIVE BRAND CUSTOMIZER / PLACEHOLDER REPLACER
   Allows the user to easily substitute "[YOUR GYM NAME]", phone, etc., on-the-fly!
   ========================================================================== */
function initBrandCustomizer() {
  const toggleBtn = document.getElementById('toggleCustomizerBtn');
  const drawer = document.getElementById('customizerDrawer');
  const closeBtn = document.getElementById('closeCustomizerBtn');
  const resetBtn = document.getElementById('resetCustomizerBtn');

  const inputGymName = document.getElementById('inputGymName');
  const inputGymPhone = document.getElementById('inputGymPhone');
  const inputGymEmail = document.getElementById('inputGymEmail');
  const inputGymAddress = document.getElementById('inputGymAddress');
  const inputGymTagline = document.getElementById('inputGymTagline');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('active');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
    });
  }

  function handleInputUpdate() {
    const customConfig = {
      'gym-name': inputGymName?.value.trim() || '',
      'gym-phone': inputGymPhone?.value.trim() || '',
      'gym-email': inputGymEmail?.value.trim() || '',
      'gym-address': inputGymAddress?.value.trim() || '',
      'gym-tagline': inputGymTagline?.value.trim() || ''
    };

    localStorage.setItem('gym_custom_placeholders', JSON.stringify(customConfig));
    applyCustomizerValues();
  }

  [inputGymName, inputGymPhone, inputGymEmail, inputGymAddress, inputGymTagline].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', handleInputUpdate);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('gym_custom_placeholders');
      if (inputGymName) inputGymName.value = '';
      if (inputGymPhone) inputGymPhone.value = '';
      if (inputGymEmail) inputGymEmail.value = '';
      if (inputGymAddress) inputGymAddress.value = '';
      if (inputGymTagline) inputGymTagline.value = '';
      
      // Revert elements to defaults
      document.querySelectorAll('[data-ph-key]').forEach(el => {
        const defaultText = el.getAttribute('data-default-ph');
        if (defaultText) el.textContent = defaultText;
      });

      showToast('🔄 Reset all labels to template placeholders!', 'ℹ️');
    });
  }

  // Save default text on all placeholder tags
  document.querySelectorAll('[data-ph-key]').forEach(el => {
    if (!el.getAttribute('data-default-ph')) {
      el.setAttribute('data-default-ph', el.textContent.trim());
    }
  });

  // Load saved preferences if any
  try {
    const saved = localStorage.getItem('gym_custom_placeholders');
    if (saved) {
      const config = JSON.parse(saved);
      if (inputGymName && config['gym-name']) inputGymName.value = config['gym-name'];
      if (inputGymPhone && config['gym-phone']) inputGymPhone.value = config['gym-phone'];
      if (inputGymEmail && config['gym-email']) inputGymEmail.value = config['gym-email'];
      if (inputGymAddress && config['gym-address']) inputGymAddress.value = config['gym-address'];
      if (inputGymTagline && config['gym-tagline']) inputGymTagline.value = config['gym-tagline'];
      applyCustomizerValues();
    }
  } catch (err) {
    console.warn('Customizer preferences error:', err);
  }
}

function applyCustomizerValues() {
  try {
    const saved = localStorage.getItem('gym_custom_placeholders');
    if (!saved) return;
    const config = JSON.parse(saved);

    document.querySelectorAll('[data-ph-key]').forEach(el => {
      const key = el.getAttribute('data-ph-key');
      if (config[key] && config[key].length > 0) {
        el.textContent = config[key];
      } else {
        const def = el.getAttribute('data-default-ph');
        if (def) el.textContent = def;
      }
    });
  } catch (e) {
    // ignore
  }
}
