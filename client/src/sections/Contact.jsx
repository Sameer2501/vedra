import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectInterest: 'General Inquiry',
    message: '',
    preferredTime: 'Anytime'
  });

  const [newsletterEmail, setNewsletterEmail] = useState('');
  
  // Submit states
  const [status, setStatus] = useState({ loading: false, success: false, message: '', error: false });
  const [newsStatus, setNewsStatus] = useState({ loading: false, success: false, message: '', error: false });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, message: '', error: false });

    // Simulate luxury API connection delay
    setTimeout(() => {
      setStatus({
        loading: false,
        success: true,
        message: 'Your private consultation dossier request has been successfully transmitted. Our elite concierge team will contact you shortly.',
        error: false
      });
      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectInterest: 'General Inquiry',
        message: '',
        preferredTime: 'Anytime'
      });
    }, 1200);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsStatus({ loading: true, success: false, message: '', error: false });

    // Simulate luxury newsletter registration delay
    setTimeout(() => {
      setNewsStatus({
        loading: false,
        success: true,
        message: 'Welcome to VEDRA Living. You have been added to our exclusive registry.',
        error: false
      });
      setNewsletterEmail('');
    }, 1000);
  };

  return (
    <section 
      id="contact" 
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 bg-v-black overflow-hidden flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-stretch">
          
          {/* Left Column: Contact details & newsletter */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              <span className="text-xs font-sans tracking-luxury-wide uppercase text-v-gold font-semibold mb-4 block">
                Private Consultation
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-light text-v-ivory leading-tight mb-8">
                Initiate Your <br />
                <span className="gold-gradient-text italic font-medium">Masterpiece</span>
              </h2>
              
              <p className="text-sm text-v-beige/70 leading-relaxed font-light mb-12 max-w-md">
                Our private concierge is available worldwide to discuss acquisitions, site selections, or architectural commissions.
              </p>

              {/* Contact Information Details */}
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <span className="p-2 border border-v-gold/25 text-v-gold mt-1">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-sans tracking-luxury text-v-beige/40 uppercase mb-1">Milan Atelier</h4>
                    <p className="text-xs text-v-ivory leading-relaxed font-light">Via Montenapoleone 27, 20121 Milano, Italy</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="p-2 border border-v-gold/25 text-v-gold mt-1">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-sans tracking-luxury text-v-beige/40 uppercase mb-1">Zurich Office</h4>
                    <p className="text-xs text-v-ivory leading-relaxed font-light">Bahnhofstrasse 45, 8001 Zürich, Switzerland</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="p-2 border border-v-gold/25 text-v-gold mt-1">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-sans tracking-luxury text-v-beige/40 uppercase mb-1">Direct Dial</h4>
                    <p className="text-xs text-v-ivory leading-relaxed font-light">+41 44 221 00 00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="p-2 border border-v-gold/25 text-v-gold mt-1">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <h4 className="text-[10px] font-sans tracking-luxury text-v-beige/40 uppercase mb-1">Electronic Dossier</h4>
                    <p className="text-xs text-v-ivory leading-relaxed font-light">concierge@vedraliving.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="glass-panel p-6 border border-v-gold/10">
              <h4 className="text-xs font-serif tracking-luxury text-v-gold uppercase mb-2">The VEDRA Registry</h4>
              <p className="text-[11px] font-sans text-v-beige/65 leading-relaxed mb-4 font-light">
                Subscribe to receive private, off-market previews of upcoming architectural commissions.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-v-black/50 border border-v-gold/20 focus:border-v-gold text-xs text-v-ivory px-4 py-2.5 outline-none w-full font-sans tracking-wide transition-all duration-300 rounded-none"
                />
                
                <button
                  type="submit"
                  disabled={newsStatus.loading}
                  className="px-5 py-2.5 bg-v-gold hover:bg-v-gold/80 text-v-black text-xs font-semibold tracking-luxury uppercase transition-all duration-300 rounded-none whitespace-nowrap"
                >
                  {newsStatus.loading ? 'Signing...' : 'Subscribe'}
                </button>
              </form>

              {/* Newsletter Message Banner */}
              <AnimatePresence>
                {newsStatus.message && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-[10px] mt-3 font-sans tracking-wide flex items-center gap-1.5 ${
                      newsStatus.error ? 'text-red-400' : 'text-v-gold'
                    }`}
                  >
                    {newsStatus.error ? <AlertCircle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                    <span>{newsStatus.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Private consultation form */}
          <div className="lg:col-span-7 glass-panel p-8 md:p-12 border border-v-gold/10 flex flex-col justify-between relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(198,167,106,0.03),transparent_60%)] pointer-events-none" />
            
            <form onSubmit={handleFormSubmit} className="space-y-6 relative z-10">
              
              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans tracking-luxury text-v-beige/55 uppercase pl-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-v-black/40 border border-v-gold/25 focus:border-v-gold text-sm text-v-ivory px-4 py-3 outline-none transition-all duration-300 font-sans"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans tracking-luxury text-v-beige/55 uppercase pl-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-v-black/40 border border-v-gold/25 focus:border-v-gold text-sm text-v-ivory px-4 py-3 outline-none transition-all duration-300 font-sans"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans tracking-luxury text-v-beige/55 uppercase pl-1">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-v-black/40 border border-v-gold/25 focus:border-v-gold text-sm text-v-ivory px-4 py-3 outline-none transition-all duration-300 font-sans"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Project Selection */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-sans tracking-luxury text-v-beige/55 uppercase pl-1">Project Interest</label>
                  <select
                    name="projectInterest"
                    value={formData.projectInterest}
                    onChange={handleInputChange}
                    className="bg-v-black/40 border border-v-gold/25 focus:border-v-gold text-sm text-v-ivory px-4 py-3 outline-none transition-all duration-300 font-sans select-none"
                    style={{ colorScheme: 'dark' }}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="The Obsidian Pavilion">The Obsidian Pavilion (Iceland)</option>
                    <option value="The Ivory Monolith">The Ivory Monolith (Switzerland)</option>
                    <option value="The Aurelia Villa">The Aurelia Villa (Italy)</option>
                    <option value="The Lumina Atrium">The Lumina Atrium (Japan)</option>
                  </select>
                </div>

              </div>

              {/* Preferred contact time */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-sans tracking-luxury text-v-beige/55 uppercase pl-1">Preferred Consultation Time</label>
                <div className="flex flex-wrap gap-3">
                  {['Morning', 'Afternoon', 'Evening', 'Anytime'].map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, preferredTime: time }))}
                      className={`px-4 py-2 text-xs font-sans tracking-wider border transition-all duration-500 rounded-none cursor-pointer ${
                        formData.preferredTime === time 
                          ? 'border-v-gold bg-v-gold/10 text-v-gold' 
                          : 'border-v-gold/10 bg-v-black/20 text-v-beige/60 hover:border-v-gold/40'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-sans tracking-luxury text-v-beige/55 uppercase pl-1">Private Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-v-black/40 border border-v-gold/25 focus:border-v-gold text-sm text-v-ivory px-4 py-3 outline-none resize-none transition-all duration-300 font-sans"
                  placeholder="Tell us about your spatial requirements, desired geography, or design goals."
                />
              </div>

              {/* Submit Consultation Request button */}
              <button
                type="submit"
                disabled={status.loading}
                className="group w-full relative overflow-hidden py-4 border border-v-gold text-xs tracking-luxury-wide uppercase font-semibold text-v-black bg-v-gold hover-interactive hover:text-v-ivory transition-all duration-500 rounded-none flex items-center justify-center gap-2 select-none"
              >
                {/* Golden shimmering sweeping overlay */}
                <span className="absolute inset-0 w-full h-full bg-v-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
                <span className="relative z-10 flex items-center gap-2">
                  {status.loading ? 'Transmitting Request...' : 'Transmit Inquiry Dossier'}
                  <Send className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>

              {/* Main Submit Message Banner */}
              <AnimatePresence>
                {status.message && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`p-4 border font-sans text-xs leading-relaxed flex items-start gap-3 mt-4 ${
                      status.error 
                        ? 'bg-red-950/20 border-red-500/30 text-red-300' 
                        : 'bg-v-gray border-v-gold/30 text-v-gold'
                    }`}
                  >
                    {status.error ? <AlertCircle className="h-5 w-5 flex-shrink-0" /> : <CheckCircle className="h-5 w-5 flex-shrink-0" />}
                    <span>{status.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
