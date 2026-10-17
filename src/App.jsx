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

  // Independent Sliders
  const [leftSlideIndex, setLeftSlideIndex] = useState(0);
  const [rightSlideIndex, setRightSlideIndex] = useState(0);

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

  // Form State
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [searchNotification, setSearchNotification] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!fromLocation || !toLocation) return;
    setSearchNotification(`Route query initialized: ${fromLocation} ➔ ${toLocation}`);
  };

  // Scroll Popup Observer Hook
  const featuresRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('popup-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }

    return () => {
      if (featuresRef.current) observer.unobserve(featuresRef.current);
    };
  }, []);

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
            <button className="login-btn">Sign In / Register</button>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Smart Journey with Smart Delivery</h1>
          <p className="hero-subtitle">Experience seamless regional transit, multi-hop routing, and secure parcel management.</p>

          {/* Image Sliders */}
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

          {/* User Manual Header Bar */}
          <div className="manual-toggle-bar">
            <button 
              className="user-manual-main-btn"
              onClick={() => setIsManualExpanded(!isManualExpanded)}
            >
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
                <button 
                  className={`tab-fold-btn ${activeAction === 'bookSeat' ? 'active' : ''}`}
                  onClick={() => { setActiveAction('bookSeat'); setSearchNotification(null); }}
                >
                  Book Seat
                </button>
                <button 
                  className={`tab-fold-btn ${activeAction === 'parcelSend' ? 'active' : ''}`}
                  onClick={() => { setActiveAction('parcelSend'); setSearchNotification(null); }}
                >
                  Parcel Send
                </button>
                <button 
                  className={`tab-fold-btn ${activeAction === 'parcelReceive' ? 'active' : ''}`}
                  onClick={() => { setActiveAction('parcelReceive'); setSearchNotification(null); }}
                >
                  Parcel Receive
                </button>
              </div>

              {/* BOOK SEAT DASHBOARD */}
              {activeAction === 'bookSeat' && (
                <div className="search-card-wrapper">
                  <div className="search-form-header"><h2>Book Your Bus Seat</h2></div>
                  <form onSubmit={handleSearch} className="search-form-wrapper-box">
                    <div className="search-inputs-row">
                      <div className="input-group">
                        <label>FROM</label>
                        <input 
                          type="text" 
                          placeholder="Departure Station" 
                          value={fromLocation}
                          onChange={(e) => setFromLocation(e.target.value)}
                          required 
                        />
                      </div>
                      <div className="input-group">
                        <label>TO</label>
                        <input 
                          type="text" 
                          placeholder="Destination Station" 
                          value={toLocation}
                          onChange={(e) => setToLocation(e.target.value)}
                          required 
                        />
                      </div>

                      {/* Date Selection */}
                      <div className="input-group date-selection-group">
                        <label>DATE SELECTION</label>
                        <div className="date-blue-menu-wrapper">
                          <button 
                            type="button"
                            className="blue-date-toggle-btn"
                            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                          >
                            📅 {dateMode === 'today' ? 'Today' : dateMode === 'yesterday' ? 'Yesterday' : 'Manual Select'} ▾
                          </button>

                          {isDateDropdownOpen && (
                            <div className="blue-date-dropdown-menu">
                              <button 
                                type="button" 
                                className={`dropdown-item ${dateMode === 'today' ? 'active' : ''}`}
                                onClick={() => { setDateMode('today'); setIsDateDropdownOpen(false); }}
                              >
                                Today
                              </button>
                              <button 
                                type="button" 
                                className={`dropdown-item ${dateMode === 'yesterday' ? 'active' : ''}`}
                                onClick={() => { setDateMode('yesterday'); setIsDateDropdownOpen(false); }}
                              >
                                Yesterday
                              </button>
                              <button 
                                type="button" 
                                className={`dropdown-item ${dateMode === 'manual' ? 'active' : ''}`}
                                onClick={() => { setDateMode('manual'); setIsDateDropdownOpen(false); }}
                              >
                                Manual Select (Max 5 Days)
                              </button>
                            </div>
                          )}
                        </div>

                        {dateMode === 'manual' && (
                          <input 
                            type="date" 
                            value={selectedDate}
                            min={todayStr}
                            max={maxDateStr}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            required 
                            className="date-input-field"
                          />
                        )}
                      </div>

                      <button type="submit" className="search-submit-btn">SEARCH BUSES</button>
                    </div>
                  </form>
                </div>
              )}

              {/* PARCEL SEND DASHBOARD */}
              {activeAction === 'parcelSend' && (
                <div className="search-card-wrapper">
                  <div className="search-form-header"><h2>Send Parcel Verification</h2></div>
                  <form className="search-form-wrapper-box" onSubmit={(e) => e.preventDefault()}>
                    <div className="search-inputs-row">
                      <div className="input-group"><label>PICKUP LOCATION</label><input type="text" placeholder="Sender Area / Stand" /></div>
                      <div className="input-group"><label>DROP LOCATION</label><input type="text" placeholder="Receiver Destination" /></div>
                      
                      <div className="input-group date-selection-group">
                        <label>DISPATCH DATE</label>
                        <div className="date-blue-menu-wrapper">
                          <button 
                            type="button"
                            className="blue-date-toggle-btn"
                            onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                          >
                            📅 {dateMode === 'today' ? 'Today' : dateMode === 'yesterday' ? 'Yesterday' : 'Manual Select'} ▾
                          </button>

                          {isDateDropdownOpen && (
                            <div className="blue-date-dropdown-menu">
                              <button 
                                type="button" 
                                className={`dropdown-item ${dateMode === 'today' ? 'active' : ''}`}
                                onClick={() => { setDateMode('today'); setIsDateDropdownOpen(false); }}
                              >
                                Today
                              </button>
                              <button 
                                type="button" 
                                className={`dropdown-item ${dateMode === 'yesterday' ? 'active' : ''}`}
                                onClick={() => { setDateMode('yesterday'); setIsDateDropdownOpen(false); }}
                              >
                                Yesterday
                              </button>
                              <button 
                                type="button" 
                                className={`dropdown-item ${dateMode === 'manual' ? 'active' : ''}`}
                                onClick={() => { setDateMode('manual'); setIsDateDropdownOpen(false); }}
                              >
                                Manual Select (Max 5 Days)
                              </button>
                            </div>
                          )}
                        </div>

                        {dateMode === 'manual' && (
                          <input 
                            type="date" 
                            value={selectedDate}
                            min={todayStr}
                            max={maxDateStr}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="date-input-field"
                          />
                        )}
                      </div>

                      <button className="search-submit-btn parcel-btn">GENERATE PARCEL OTP</button>
                    </div>
                  </form>
                </div>
              )}

              {/* PARCEL RECEIVE DASHBOARD */}
              {activeAction === 'parcelReceive' && (
                <div className="search-card-wrapper">
                  <div className="search-form-header"><h2>Receive Parcel Verification</h2></div>
                  <div className="search-form-wrapper-box">
                    <div className="search-inputs-row">
                      <div className="input-group"><label>TRACKING ID</label><input type="text" placeholder="Enter Tracking Code" /></div>
                      <div className="input-group"><label>RECEIVER OTP</label><input type="text" placeholder="Enter 4-digit OTP" /></div>
                      <div className="input-group"><label>CONFIRM PHONE</label><input type="tel" placeholder="Mobile Number" /></div>
                      <button className="search-submit-btn parcel-btn">VERIFY & COLLECT</button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {searchNotification && (
            <div className="clean-search-feedback">
              <p>ℹ️ {searchNotification}</p>
            </div>
          )}

        </div>
      </section>

      {/* 3 Features Section with Scroll Popup Animation and Updated Smart Parcel Safety Title */}
      <section className="features-section scroll-popup-section" ref={featuresRef}>
        <div className="features-container">
          <div className="feature-card popup-card">
            <div className="feature-icon-box">01</div>
            <h3>Zero-Hardware Tracking</h3>
            <p>Multi-tier crowdsourced & conductor GPS system ensures live bus location without costly GPS hardware.</p>
          </div>
          <div className="feature-card popup-card">
            <div className="feature-icon-box">02</div>
            <h3>Smart Parcel Safety</h3>
            <p>Complete end-to-end security with automated WhatsApp alerts and verification codes for receiver pickup.</p>
          </div>
          <div className="feature-card popup-card">
            <div className="feature-icon-box">03</div>
            <h3>AI Regional Voice Support</h3>
            <p>Book seats and query schedules seamlessly in local languages through automated AI voice response.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;