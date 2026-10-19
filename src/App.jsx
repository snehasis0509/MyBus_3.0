 import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// 8 Dedicated Photos for Left Side (Bus Transit & Journey)
const leftSliderData = [
  { title: "Smart Bus Transit", img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop&q=80" },
  { title: "Multi-Hop Connected Routes", img: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=80" },
  { title: "Intercity Fleet Service", img: "https://images.unsplash.com/photo-1557223562-6c77ef16210f?w=800&auto=format&fit=crop&q=80" },
  { title: "Live GPS Tracked Coaches", img: "https://images.unsplash.com/photo-1517649763962-0c623266010b?w=800&auto=format&fit=crop&q=80" },
  { title: "Highway Express Transit", img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80" },
  { title: "Regional Terminal Station", img: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&auto=format&fit=crop&q=80" },
  { title: "Passenger Comfort Seating", img: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&auto=format&fit=crop&q=80" },
  { title: "Night Express Routes", img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=80" }
];

// 8 Dedicated Photos for Right Side (Parcel Logistics & Delivery)
const rightSliderData = [
  { title: "Smart Parcel Delivery", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80" },
  { title: "Express Logistics Hub", img: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80" },
  { title: "Live Zero-Hardware Tracking", img: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80" },
  { title: "Dual-OTP Parcel Verification", img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80" },
  { title: "Same-Day Dispatch System", img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop&q=80" },
  { title: "Regional Courier Depot", img: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&auto=format&fit=crop&q=80" },
  { title: "AI Local Support Logistics", img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80" },
  { title: "Automated Parcel Sorting", img: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&auto=format&fit=crop&q=80" }
];

function App() {
  const [isManualExpanded, setIsManualExpanded] = useState(false);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [activeAction, setActiveAction] = useState('bookSeat');

  // Sliders State
  const [leftSlideIndex, setLeftSlideIndex] = useState(0);
  const [rightSlideIndex, setRightSlideIndex] = useState(0);

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');

  // Form Fields State
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState(''); // NEW MANDATORY EMAIL FIELD
  const [ageCategory, setAgeCategory] = useState('18+');
  const [exactAge, setExactAge] = useState('');
  
  // Mobile Verification State
  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileOtpSent, setIsMobileOtpSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  const [mobileTimer, setMobileTimer] = useState(30);

  // Aadhaar Verification State
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isAadhaarOtpSent, setIsAadhaarOtpSent] = useState(false);
  const [aadhaarOtp, setAadhaarOtp] = useState('');
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [aadhaarTimer, setAadhaarTimer] = useState(30);

  // Form Error & Permission
  const [formError, setFormError] = useState('');
  const [autoFillPermission, setAutoFillPermission] = useState(false);

  // Reset Modal Fields Function
  const handleCloseModal = () => {
    setIsAuthModalOpen(false);
    setFullName('');
    setEmailAddress('');
    setAgeCategory('18+');
    setExactAge('');
    setMobileNumber('');
    setIsMobileOtpSent(false);
    setMobileOtp('');
    setIsMobileVerified(false);
    setMobileTimer(30);
    setAadhaarNumber('');
    setIsAadhaarOtpSent(false);
    setAadhaarOtp('');
    setIsAadhaarVerified(false);
    setAadhaarTimer(30);
    setFormError('');
  };

  // Scroll Popup Observer Hook
  const featuresRef = useRef(null);
  const metricsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('popup-visible');
          } else {
            entry.target.classList.remove('popup-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (metricsRef.current) observer.observe(metricsRef.current);

    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
      if (metricsRef.current) observer.unobserve(metricsRef.current);
    };
  }, []);

  // Timers Effect
  useEffect(() => {
    let timer;
    if (isMobileOtpSent && mobileTimer > 0 && !isMobileVerified) {
      timer = setInterval(() => setMobileTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isMobileOtpSent, mobileTimer, isMobileVerified]);

  useEffect(() => {
    let timer;
    if (isAadhaarOtpSent && aadhaarTimer > 0 && !isAadhaarVerified) {
      timer = setInterval(() => setAadhaarTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isAadhaarOtpSent, aadhaarTimer, isAadhaarVerified]);

  // Sliders Effect
  useEffect(() => {
    const leftTimer = setInterval(() => {
      setLeftSlideIndex((prev) => (prev + 1) % leftSliderData.length);
    }, 3000);
    return () => clearInterval(leftTimer);
  }, []);

  useEffect(() => {
    const rightTimer = setInterval(() => {
      setRightSlideIndex((prev) => (prev + 1) % rightSliderData.length);
    }, 3000);
    return () => clearInterval(rightTimer);
  }, []);

  const handlePrevLeftSlide = () => setLeftSlideIndex((prev) => (prev === 0 ? leftSliderData.length - 1 : prev - 1));
  const handleNextLeftSlide = () => setLeftSlideIndex((prev) => (prev + 1) % leftSliderData.length);

  const handlePrevRightSlide = () => setRightSlideIndex((prev) => (prev === 0 ? rightSliderData.length - 1 : prev - 1));
  const handleNextRightSlide = () => setRightSlideIndex((prev) => (prev + 1) % rightSliderData.length);

  // Date Logic
  const [dateMode, setDateMode] = useState('today');
  const [selectedDate, setSelectedDate] = useState('');

  const getFormattedDate = (offsetDays = 0) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const todayStr = getFormattedDate(0);
  const maxDateStr = getFormattedDate(5);

  useEffect(() => {
    if (dateMode === 'today') setSelectedDate(todayStr);
    else if (dateMode === 'yesterday') setSelectedDate(getFormattedDate(-1));
    else if (dateMode === 'manual' && !selectedDate) setSelectedDate(todayStr);
  }, [dateMode]);

  // Handlers for OTP
  const handleSendMobileOtp = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      setFormError('Please enter a valid 10-digit Mobile Number');
      return;
    }
    setFormError('');
    setIsMobileOtpSent(true);
    setMobileTimer(30);
  };

  const handleVerifyMobileOtp = () => {
    if (mobileOtp.length >= 4) {
      setIsMobileVerified(true);
      setFormError('');
    } else {
      setFormError('Please enter valid Mobile OTP');
    }
  };

  const handleSendAadhaarOtp = () => {
    if (!aadhaarNumber || aadhaarNumber.length < 12) {
      setFormError('Please enter a valid 12-digit Aadhaar Number');
      return;
    }
    setFormError('');
    setIsAadhaarOtpSent(true);
    setAadhaarTimer(30);
  };

  const handleVerifyAadhaarOtp = () => {
    if (aadhaarOtp.length >= 4) {
      setIsAadhaarVerified(true);
      setFormError('');
    } else {
      setFormError('Please enter valid Aadhaar OTP');
    }
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();

    if (authMode === 'register') {
      if (!fullName.trim()) {
        setFormError('Name is required!');
        return;
      }
      if (!emailAddress.trim()) {
        setFormError('Email Address is required!');
        return;
      }
      if (ageCategory === 'below18' && !exactAge) {
        setFormError('Please specify your age!');
        return;
      }
      if (!isMobileVerified && !isAadhaarVerified) {
        setFormError('Please verify your Mobile Number and Aadhaar!');
        return;
      }
      if (!isMobileVerified) {
        setFormError('Please verify your Mobile Number!');
        return;
      }
      if (!isAadhaarVerified) {
        setFormError('Please verify your Aadhaar!');
        return;
      }
    } else {
      if (!isMobileVerified) {
        setFormError('Please verify your Mobile Number to Login!');
        return;
      }
    }

    handleCloseModal();
  };

  const currentLeftSlide = leftSliderData[leftSlideIndex];
  const currentRightSlide = rightSliderData[rightSlideIndex];

  return (
    <div className="app-container">
      {/* 1. Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="brand-logo">
            <span className="logo-text">My<span className="logo-highlight">Bus</span></span>
          </div>

          <div className="nav-links">
            <a href="#bus" className="nav-item active">Bus Tickets</a>
            <a href="#parcel" className="nav-item">Express Parcel</a>
            <a href="#tracking" className="nav-item">Live Tracking</a>
            <a href="#help" className="nav-item">Help & Support</a>
          </div>

          <div className="nav-actions">
            <button className="login-btn" onClick={() => setIsAuthModalOpen(true)}>
              Login/Register
            </button>

            <button className="bw-profile-avatar-btn right-corner-profile" title="User Profile" onClick={() => setIsAuthModalOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Smart Journey with Smart Delivery</h1>
          <p className="hero-subtitle">Experience seamless regional transit, multi-hop routing, and secure parcel management.</p>

          {/* Dual Carousel */}
          <div className="dual-carousel-wrapper">
            <div className="banner-card-box">
              <button className="card-arrow left-card-arrow" onClick={handlePrevLeftSlide}>‹</button>
              <div className="banner-card">
                <img src={currentLeftSlide.img} alt={currentLeftSlide.title} />
                <div className="banner-overlay"><h3>{currentLeftSlide.title}</h3></div>
              </div>
              <button className="card-arrow right-card-arrow" onClick={handleNextLeftSlide}>›</button>
            </div>

            <div className="banner-card-box">
              <button className="card-arrow left-card-arrow" onClick={handlePrevRightSlide}>‹</button>
              <div className="banner-card">
                <img src={currentRightSlide.img} alt={currentRightSlide.title} />
                <div className="banner-overlay"><h3>{currentRightSlide.title}</h3></div>
              </div>
              <button className="card-arrow right-card-arrow" onClick={handleNextRightSlide}>›</button>
            </div>
          </div>

          {/* User Manual Bar */}
          <div className="manual-toggle-bar">
            <button className="user-manual-main-btn" onClick={() => setIsManualExpanded(!isManualExpanded)}>
              User Manual & Quick Actions
              <span className={`circle-arrow-icon ${isManualExpanded ? 'open' : ''}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </span>
            </button>
          </div>

          {/* Paper Folding Accordion Section */}
          <div className={`paper-fold-container ${isManualExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="paper-fold-content">
              
              <div className="action-tabs-container">
                <button className={`tab-fold-btn ${activeAction === 'bookSeat' ? 'active' : ''}`} onClick={() => setActiveAction('bookSeat')}>Book Seat</button>
                <button className={`tab-fold-btn ${activeAction === 'parcelSend' ? 'active' : ''}`} onClick={() => setActiveAction('parcelSend')}>Parcel Send</button>
                <button className={`tab-fold-btn ${activeAction === 'parcelReceive' ? 'active' : ''}`} onClick={() => setActiveAction('parcelReceive')}>Parcel Receive</button>
              </div>

              {/* 1. BOOK SEAT DASHBOARD */}
              {activeAction === 'bookSeat' && (
                <div className="search-card-wrapper">
                  <div className="search-form-header"><h2>Book Your Bus Seat</h2></div>
                  <form onSubmit={(e) => e.preventDefault()} className="search-form-wrapper-box">
                    <div className="search-inputs-row">
                      <div className="input-group">
                        <label>FROM</label>
                        <input type="text" placeholder="Departure Station" required />
                      </div>
                      <div className="input-group">
                        <label>TO</label>
                        <input type="text" placeholder="Destination Station" required />
                      </div>
                      <div className="input-group date-selection-group">
                        <label>DATE SELECTION</label>
                        <div className="date-blue-menu-wrapper">
                          <button type="button" className="blue-date-toggle-btn" onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}>
                            📅 {dateMode === 'today' ? 'Today' : dateMode === 'yesterday' ? 'Yesterday' : 'Manual Select'} ▾
                          </button>
                          {isDateDropdownOpen && (
                            <div className="blue-date-dropdown-menu">
                              <button type="button" className="dropdown-item" onClick={() => { setDateMode('today'); setIsDateDropdownOpen(false); }}>Today</button>
                              <button type="button" className="dropdown-item" onClick={() => { setDateMode('yesterday'); setIsDateDropdownOpen(false); }}>Yesterday</button>
                              <button type="button" className="dropdown-item" onClick={() => { setDateMode('manual'); setIsDateDropdownOpen(false); }}>Manual Select (Max 5 Days)</button>
                            </div>
                          )}
                        </div>
                        {dateMode === 'manual' && <input type="date" value={selectedDate} min={todayStr} max={maxDateStr} onChange={(e) => setSelectedDate(e.target.value)} className="date-input-field" />}
                      </div>
                      <button type="submit" className="search-submit-btn">SEARCH BUSES</button>
                    </div>
                  </form>
                </div>
              )}

              {/* 2. PARCEL SEND DASHBOARD */}
              {activeAction === 'parcelSend' && (
                <div className="search-card-wrapper">
                  <div className="search-form-header"><h2>Send Parcel Verification</h2></div>
                  <form onSubmit={(e) => e.preventDefault()} className="search-form-wrapper-box">
                    <div className="search-inputs-row">
                      <div className="input-group">
                        <label>PICKUP LOCATION</label>
                        <input type="text" placeholder="Sender Area / Bus Stand" required />
                      </div>
                      <div className="input-group">
                        <label>DROP LOCATION</label>
                        <input type="text" placeholder="Receiver Destination" required />
                      </div>
                      <div className="input-group date-selection-group">
                        <label>DISPATCH DATE</label>
                        <div className="date-blue-menu-wrapper">
                          <button type="button" className="blue-date-toggle-btn" onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}>
                            📅 {dateMode === 'today' ? 'Today' : dateMode === 'yesterday' ? 'Yesterday' : 'Manual Select'} ▾
                          </button>
                          {isDateDropdownOpen && (
                            <div className="blue-date-dropdown-menu">
                              <button type="button" className="dropdown-item" onClick={() => { setDateMode('today'); setIsDateDropdownOpen(false); }}>Today</button>
                              <button type="button" className="dropdown-item" onClick={() => { setDateMode('yesterday'); setIsDateDropdownOpen(false); }}>Yesterday</button>
                              <button type="button" className="dropdown-item" onClick={() => { setDateMode('manual'); setIsDateDropdownOpen(false); }}>Manual Select (Max 5 Days)</button>
                            </div>
                          )}
                        </div>
                        {dateMode === 'manual' && <input type="date" value={selectedDate} min={todayStr} max={maxDateStr} onChange={(e) => setSelectedDate(e.target.value)} className="date-input-field" />}
                      </div>
                      <button type="submit" className="search-submit-btn parcel-btn">GENERATE PARCEL OTP</button>
                    </div>
                  </form>
                </div>
              )}

              {/* 3. PARCEL RECEIVE DASHBOARD */}
              {activeAction === 'parcelReceive' && (
                <div className="search-card-wrapper">
                  <div className="search-form-header"><h2>Receive Parcel Verification</h2></div>
                  <form onSubmit={(e) => e.preventDefault()} className="search-form-wrapper-box">
                    <div className="search-inputs-row">
                      <div className="input-group">
                        <label>TRACKING ID</label>
                        <input type="text" placeholder="Enter Tracking Code" required />
                      </div>
                      <div className="input-group">
                        <label>RECEIVER OTP</label>
                        <input type="text" placeholder="Enter 4-digit OTP" required />
                      </div>
                      <div className="input-group">
                        <label>CONFIRM PHONE</label>
                        <input type="tel" placeholder="Mobile Number" required />
                      </div>
                      <button type="submit" className="search-submit-btn parcel-btn">VERIFY & COLLECT</button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURE CARDS SECTION */}
      <section className="features-section scroll-popup-section" ref={featuresRef}>
        <div className="features-container">
          <div className="feature-card popup-card">
            <div className="feature-icon-box">01</div>
            <h3>Zero-Hardware Tracking</h3>
            <p>Multi-tier crowdsourced & conductor GPS system ensures live bus location without costly GPS hardware.</p>
          </div>
          <div className="feature-card popup-card">
            <div className="feature-icon-box">02</div>
            <h3>Dual OTP Parcel Safety</h3>
            <p>Complete end-to-end security with automated WhatsApp alerts and verification codes for receiver pickup.</p>
          </div>
          <div className="feature-card popup-card">
            <div className="feature-icon-box">03</div>
            <h3>AI Regional Voice Support</h3>
            <p>Book seats and query schedules seamlessly in local languages through automated AI voice response.</p>
          </div>
        </div>
      </section>

      {/* 4. METRICS & HIGHLIGHTS SECTION */}
      <section className="metrics-banner-section scroll-popup-section" ref={metricsRef}>
        <div className="metrics-container">
          <div className="neon-ambient-glow"></div>
          
          <div className="metrics-header">
            <h2 className="enhanced-heading">Why Travelers Choose MyBus</h2>
            <p>Designed for speed, transparency, and effortless regional connectivity</p>
          </div>

          <div className="metrics-grid">
            <div className="metric-card popup-card interactive-perk-card">
              <div className="card-ambient-orb"></div>
              <div className="metric-number">100+ Buses</div>
              <div className="metric-label">Active Fleet Network</div>
              <div className="metric-desc">Well-maintained regional coaches ready for your journey</div>
            </div>

            <div className="metric-card popup-card interactive-perk-card">
              <div className="card-ambient-orb"></div>
              <div className="metric-number">Live Seats</div>
              <div className="metric-label">Real-Time Availability</div>
              <div className="metric-desc">Instant check on window and aisle preferences</div>
            </div>

            <div className="metric-card popup-card interactive-perk-card">
              <div className="card-ambient-orb"></div>
              <div className="metric-number">Multi-Hop</div>
              <div className="metric-label">Smart Connecting Routes</div>
              <div className="metric-desc">Find the fastest paths even when direct buses are rare</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOGIN / REGISTER MODAL DASHBOARD OVERLAY */}
      {isAuthModalOpen && (
        <div className="modal-overlay-backdrop" onClick={handleCloseModal}>
          <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button className="close-modal-btn" onClick={handleCloseModal} title="Close Modal">✕</button>

            <div className="auth-modal-header">
              <h2>{authMode === 'register' ? 'Register Your MyBus Account' : 'Log in to manage your bookings'}</h2>
              <p>{authMode === 'register' ? 'Enter your details to create an account' : 'Verify your details to proceed'}</p>
            </div>

            {formError && <div className="form-error-banner">{formError}</div>}

            <form onSubmit={handleAuthSubmit} className="auth-form-body">
              {authMode === 'register' && (
                <>
                  {/* Name Field */}
                  <div className="auth-input-block">
                    <label>Name <span className="req-star">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Enter full name" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>

                  {/* Mandatory Email Address Field */}
                  <div className="auth-input-block">
                    <label>Email Address <span className="req-star">*</span></label>
                    <input 
                      type="email" 
                      placeholder="example@domain.com" 
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      required
                    />
                  </div>

                  {/* Age Field */}
                  <div className="auth-input-block">
                    <label>Age Option <span className="req-star">*</span></label>
                    <div className="age-toggle-row">
                      <button 
                        type="button" 
                        className={`age-choice-btn ${ageCategory === '18+' ? 'active' : ''}`}
                        onClick={() => setAgeCategory('18+')}
                      >
                        18+
                      </button>
                      <button 
                        type="button" 
                        className={`age-choice-btn ${ageCategory === 'below18' ? 'active' : ''}`}
                        onClick={() => setAgeCategory('below18')}
                      >
                        Below 18
                      </button>
                    </div>

                    {ageCategory === 'below18' && (
                      <div className="sub-input-box">
                        <label>Enter Age <span className="req-star">*</span></label>
                        <input 
                          type="number" 
                          placeholder="e.g. 16" 
                          value={exactAge} 
                          onChange={(e) => setExactAge(e.target.value)}
                          required
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Mobile Number Field */}
              <div className="auth-input-block">
                <label>Mobile Number <span className="req-star">*</span></label>
                <div className="input-verify-row">
                  <input 
                    type="tel" 
                    placeholder="Enter 10-digit mobile" 
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    disabled={isMobileVerified}
                    required
                  />
                  {!isMobileVerified ? (
                    <button type="button" className="verify-switch-btn" onClick={handleSendMobileOtp}>
                      {isMobileOtpSent ? 'Resend' : 'Verify'}
                    </button>
                  ) : (
                    <span className="verified-badge">✓ Verified</span>
                  )}
                </div>

                {isMobileOtpSent && !isMobileVerified && (
                  <div className="otp-expanded-card">
                    <label>Enter 4-Digit Mobile OTP</label>
                    <div className="otp-inputs-wrapper">
                      <input 
                        type="text" 
                        maxLength="4" 
                        placeholder="OTP"
                        value={mobileOtp}
                        onChange={(e) => setMobileOtp(e.target.value)}
                      />
                      <button type="button" className="otp-submit-btn" onClick={handleVerifyMobileOtp}>Submit OTP</button>
                    </div>
                    
                    <div className="otp-timer-row">
                      {mobileTimer > 0 ? (
                        <span>Didn't receive OTP? Retry in 00:{mobileTimer < 10 ? `0${mobileTimer}` : mobileTimer}</span>
                      ) : (
                        <button type="button" className="link-btn" onClick={handleSendMobileOtp}>Send Again</button>
                      )}
                    </div>

                    <label className="permission-checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={autoFillPermission} 
                        onChange={(e) => setAutoFillPermission(e.target.checked)} 
                      />
                      Allow auto-fill OTP from SMS
                    </label>
                  </div>
                )}
              </div>

              {/* Aadhaar Number Field */}
              {authMode === 'register' && (
                <div className="auth-input-block">
                  <label>Aadhaar Number <span className="req-star">*</span></label>
                  <div className="input-verify-row">
                    <input 
                      type="text" 
                      placeholder="Enter 12-digit Aadhaar" 
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value)}
                      disabled={isAadhaarVerified}
                      required
                    />
                    {!isAadhaarVerified ? (
                      <button type="button" className="verify-switch-btn" onClick={handleSendAadhaarOtp}>
                        {isAadhaarOtpSent ? 'Resend' : 'Verify'}
                      </button>
                    ) : (
                      <span className="verified-badge">✓ Verified</span>
                    )}
                  </div>

                  {isAadhaarOtpSent && !isAadhaarVerified && (
                    <div className="otp-expanded-card">
                      <label>Enter Aadhaar OTP</label>
                      <div className="otp-inputs-wrapper">
                        <input 
                          type="text" 
                          maxLength="6" 
                          placeholder="Aadhaar OTP"
                          value={aadhaarOtp}
                          onChange={(e) => setAadhaarOtp(e.target.value)}
                        />
                        <button type="button" className="otp-submit-btn" onClick={handleVerifyAadhaarOtp}>Submit OTP</button>
                      </div>

                      <div className="otp-timer-row">
                        {aadhaarTimer > 0 ? (
                          <span>Didn't receive OTP? Retry in 00:{aadhaarTimer < 10 ? `0${aadhaarTimer}` : aadhaarTimer}</span>
                        ) : (
                          <button type="button" className="link-btn" onClick={handleSendAadhaarOtp}>Send Again</button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button type="submit" className="auth-main-submit-btn">
                {authMode === 'register' ? 'Register Account' : 'Log in'}
              </button>
            </form>

            <div className="auth-footer-toggle">
              {authMode === 'register' ? (
                <p>Already have an account? <button type="button" className="link-btn" onClick={() => { setAuthMode('login'); setFormError(''); }}>Log in</button></p>
              ) : (
                <p>Don't have an account? <button type="button" className="link-btn" onClick={() => { setAuthMode('register'); setFormError(''); }}>Sign up</button></p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;