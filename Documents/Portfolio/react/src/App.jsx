import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import image1 from './assets/image1.jpg';

// Contact Form Component
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
  const EMAILJS_SERVICE_ID = 'your_service_id';
  const EMAILJS_TEMPLATE_ID = 'your_template_id';
  const EMAILJS_PUBLIC_KEY = 'your_public_key';

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
        setTimeout(() => {
          setIsVisible(false);
          setStatus('');
        }, 2000);
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
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleForm}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
      >
        Send Message
      </button>

      {/* Modal Overlay */}
      {isVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-2xl p-8 w-full max-w-md border border-white/10 relative animate-in fade-in zoom-in duration-300">
            {/* Close Button */}
            <button
              onClick={toggleForm}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors text-2xl leading-none"
            >
              ×
            </button>

            {/* Form Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Mail className="text-white" size={24} />
              </div>
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
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Forum Project",
      description: "Full-stack forum with React, Firebase, and Typescript. Features include user signup/signin, notifications, like and comment, browse posts, and create posts.",
      image: "https://ssl.sitew.org/images/blog/articles/cover/figma-creer-forum.png",
      tech: ["React", "Firebase", "Typescript", "Tailwind CSS"],
      github: "https://github.com/IYuels/Thesis_Project",
      live: "https://thesis-project.vercel.app/"
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing my skills, projects, and contact information.",
      image: "https://ssl.sitew.org/images/blog/articles/cover/figma-creer-portfolio.png",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      github: "https://github.com/IYuels/portfolio",
      live: "https://iyuels.github.io/Portfolio/"
    },
  ];

  const skills = [
    { name: "JavaScript", level: 70 },
    { name: "React", level: 70 },
    { name: "Node.js", level: 50 },
    { name: "Python", level: 50 },
    { name: "TypeScript", level: 60 }
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Portfolio
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-white/80 hover:text-white transition-colors capitalize"
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-white/80 hover:text-white transition-colors capitalize w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 relative">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                <img src={image1} alt="Profile" className="w-full h-full rounded-full object-cover" />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-5 animate-spin"></div>
            <div className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-5 animate-spin"></div>

          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Jules Ramos
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Fresh CS Grad | Front-End Foundations | Ready to Build & Learn.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-all transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>
          
          <div className="mt-16 animate-bounce">
            <ChevronDown size={32} className="text-white/50 mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-white/80 leading-relaxed">
              Hi! I'm a recent Bachelor of Science in Computer Science graduate with a strong foundation in front-end development using React, TypeScript, JavaScript, HTML, and CSS. 
              I'm passionate about building clean, responsive, and user-friendly web interfaces.

              What drives me is the thrill of solving real-world problems with code and continuously learning new technologies. 
              Whether it's debugging tricky components or improving UI/UX, I'm eager to grow and contribute to impactful projects.
              </p>
              
              <div className="flex space-x-4">
                <a href="https://github.com/IYuels" className="text-white/60 hover:text-white transition-colors">
                  <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/jules-ramos-b38952278/" className="text-white/60 hover:text-white transition-colors">
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-100 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl backdrop-blur-sm border border-white/10 p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white mb-4">What I can Offer:</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-medium text-blue-300">✅ Solid Front-End Foundations</h4>
                      <p className="text-white/60">Comfortable working with modern web technologies like React, TypeScript, JavaScript, HTML, and CSS.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-blue-300">✅ Fast Learner</h4>
                      <p className="text-white/60">I adapt quickly to new tools, frameworks, and workflows.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-blue-300">✅ Team-Ready Attitude</h4>
                      <p className="text-white/60">Ready to collaborate effectively and contribute to team success.</p>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-blue-300">✅ Growth Mindset</h4>
                      <p className="text-white/60">Always looking to improve and expand my knowledge—both technically and personally.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 mb-4 text-sm leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center text-white/60 hover:text-white transition-colors"
                    >
                      <Github size={16} className="mr-1" />
                      Code
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center text-white/60 hover:text-white transition-colors"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-white/60">{skill.level}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            I'm always interested in new opportunities and exciting projects. 
            Let's discuss how we can work together to bring your ideas to life.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <Mail className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-white/70">ramosjules213@gmail.com</p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <Github className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">GitHub</h3>
              <a href="https://github.com/IYuels" className="text-white/60 hover:text-white transition-colors">
                IYuels
                </a>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl border border-white/10">
              <Linkedin className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">LinkedIn</h3>
              <a href="https://www.linkedin.com/in/jules-ramos-b38952278/" className="text-white/60 hover:text-white transition-colors">
                Jules Ramos
                </a>
            </div>
          </div>
          
          {/* Fixed ContactForm placement */}
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60">
            © 2025 Jules Ramos. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;