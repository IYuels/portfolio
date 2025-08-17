import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'
  const [isVisible, setIsVisible] = useState(false);

  // EmailJS configuration - Replace these with your actual EmailJS credentials
  const EMAILJS_SERVICE_ID = 'service_djf7ep5';
  const EMAILJS_TEMPLATE_ID = 'template_wgoy0t9';
  const EMAILJS_PUBLIC_KEY = 'maXQkC7jEVEzpWwv5';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name.trim() || !email.trim() || !message.trim()) {
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setStatus('error');
      return;
    }

    setStatus('sending');

    try {
      // Load EmailJS dynamically
      if (!window.emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = () => {
          window.emailjs.init(EMAILJS_PUBLIC_KEY);
          performSend();
        };
        document.head.appendChild(script);
      } else {
        performSend();
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  const performSend = async () => {
    try {
      const templateParams = {
        to_email: 'ramosjules213@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject || 'New Contact Form Message',
        message: formData.message,
        reply_to: formData.email
      };

      const response = await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  const toggleForm = () => {
    setIsVisible(!isVisible);
    setStatus(''); // Reset status when toggling
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={toggleForm}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
      >
        <Mail size={20} />
        Send Message
      </button>

      {/* Modal Overlay */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md border border-white/10 relative">
            {/* Close Button */}
            <button
              onClick={toggleForm}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              ×
            </button>

            {/* Form Header */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Get In Touch
              </h3>
              <p className="text-white/70">Send me a message and I'll get back to you soon!</p>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-300">
                <CheckCircle size={20} />
                <span>Message sent successfully!</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-300">
                <AlertCircle size={20} />
                <span>Please fill all required fields with valid information.</span>
              </div>
            )}

            {/* Contact Form */}
            <form onSubmit={sendEmail} className="space-y-4">
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="flex-1 px-4 py-3 border border-white/30 text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Setup Instructions */}
            <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-300 text-sm">
                <strong>Setup Required:</strong> Configure EmailJS credentials in the component to enable email functionality.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;