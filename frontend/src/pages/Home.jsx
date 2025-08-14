import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FileText, Map, MessageSquare, Brain, Zap, CheckCircle, Users, Award, Star } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import 'tailwindcss/tailwind.css';

// Mock NavLink for navigation
const NavLink = ({ to, children, className }) => (
  <a href={to} className={className}>{children}</a>
);

// Custom Hook for Scroll Animations
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    className="scroll-animate bg-gray-800/70 backdrop-blur-lg p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/50 transform hover:-translate-y-3 transition-all duration-500 ease-in-out shadow-xl hover:shadow-purple-600/30"
    style={{ transitionDelay: delay }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="mb-6 text-purple-400 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
    <p className="text-gray-300 leading-relaxed">{description}</p>
  </motion.div>
);

// Step Card Component
const StepCard = ({ number, title, description, image }) => (
  <motion.div
    className="scroll-animate group flex flex-col md:flex-row items-center gap-8 md:gap-12 even:md:flex-row-reverse"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <div className="md:w-1/2">
      <div className="flex items-center gap-4 mb-4">
        <span className="flex items-center justify-center w-12 h-12 text-xl font-bold text-white bg-purple-600 rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
          {number}
        </span>
        <h3 className="text-3xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
    </div>
    <div className="md:w-1/2 w-full overflow-hidden rounded-xl">
      <img
        src={image}
        alt={title}
        className="rounded-xl shadow-2xl w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
    </div>
  </motion.div>
);

// Testimonial Card Component
const TestimonialCard = ({ quote, author, role }) => (
  <motion.div
    className="scroll-animate bg-gray-800/50 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20 hover:shadow-purple-600/30 transition-all duration-300"
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <div className="flex items-center gap-2 mb-4">
      <Star className="text-yellow-400" size={20} />
      <Star className="text-yellow-400" size={20} />
      <Star className="text-yellow-400" size={20} />
      <Star className="text-yellow-400" size={20} />
      <Star className="text-yellow-400" size={20} />
    </div>
    <p className="text-gray-200 italic mb-4">"{quote}"</p>
    <p className="font-semibold text-white">{author}</p>
    <p className="text-gray-400 text-sm">{role}</p>
  </motion.div>
);

// Stats Counter Component
const StatsCounter = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 1, staggerChildren: 0.3 },
    });
  }, [controls]);

  const stats = [
    { icon: <Users size={40} />, value: "10K+", label: "Users Empowered" },
    { icon: <Award size={40} />, value: "95%", label: "Job Placement Rate" },
    { icon: <CheckCircle size={40} />, value: "1M+", label: "Resumes Analyzed" },
  ];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="text-center p-6 bg-gray-800/50 backdrop-blur-lg rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-purple-400 mb-4">{stat.icon}</div>
          <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
          <p className="text-gray-300">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default function Home() {
  useScrollAnimation();

  const features = [
    {
      icon: <FileText size={40} />,
      title: "AI-Powered Resume Analysis",
      description:
        "Revolutionize your job application with our cutting-edge AI. Upload your resume and a job description, and our intelligent system will meticulously analyze it for ATS compatibility, highlight your unique strengths, and provide tailored recommendations to ensure your resume captivates recruiters and secures interviews.",
    },
    {
      icon: <Map size={40} />,
      title: "Bespoke Career Roadmaps",
      description:
        "Envision your dream career and let CareerParto pave the way. Our AI crafts a personalized roadmap, detailing the precise skills, certifications, and experiences needed to achieve your goals. Access curated resources and actionable steps to propel you toward professional success with confidence.",
    },
    {
      icon: <MessageSquare size={40} />,
      title: "Dynamic Interview Preparation",
      description:
        "Step into interviews with unshakable poise. Our AI-driven coach delivers customized practice questions tailored to your target role, provides real-time feedback on your responses, and hones your delivery. Transform nerves into confidence and leave a lasting impression on hiring managers.",
    },
    {
      icon: <Brain size={40} />,
      title: "Skill Gap Analysis",
      description:
        "Stay ahead in a competitive job market with our in-depth skill gap analysis. Our AI evaluates your current abilities against industry demands, identifying critical areas for growth. Receive targeted recommendations to upskill and position yourself as the ideal candidate for your dream role.",
    },
  ];

  const testimonials = [
    {
      quote:
        "CareerParto turned my job search around. The resume analysis pinpointed exactly what I needed to improve, and the roadmap gave me a clear path. I landed a senior developer role in just weeks!",
      author: "Emma L.",
      role: "Senior Software Developer",
    },
    {
      quote:
        "The interview prep tool was phenomenal. It tailored questions to my industry and gave me feedback that transformed my confidence. I aced my interview and got the job!",
      author: "Rahul M.",
      role: "Product Manager",
    },
    {
      quote:
        "I was lost in my career transition until CareerParto. The personalized roadmap and skill gap analysis gave me focus, and now I’m thriving in a new industry.",
      author: "Sofia K.",
      role: "UX Designer",
    },
    {
      quote:
        "The AI insights were a game-changer. My resume went from generic to standout, and the interview prep made me feel unstoppable. I’m now a data scientist at a top firm!",
      author: "James T.",
      role: "Data Scientist",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-circuit-board-and-data-processing-3D-animation-3136-large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-20 container mx-auto px-6 animate-float">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 h-48 md:h-56 lg:h-40">
              <TypeAnimation
                sequence={[
                  'Ignite Your Career with AI Brilliance',
                  2500,
                  'Perfect Your Resume with AI Precision',
                  2500,
                  'Navigate Your Future with AI Clarity',
                  2500,
                  'Conquer Interviews with AI Mastery',
                  2500,
                ]}
                wrapper="span"
                speed={40}
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-white"
                repeat={Infinity}
              />
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 max-w-4xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              CareerParto is your ultimate partner in conquering the job market. Harness the power of advanced AI to optimize your resume, craft a bespoke career roadmap, and master interviews with unparalleled confidence.
            </p>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <NavLink
                to="/signup"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-12 rounded-full hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-600/50"
              >
                Begin Your Epic Journey
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 md:py-28 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="scroll-animate text-4xl md:text-5xl font-extrabold">Our Impact</h2>
            <p className="scroll-animate text-lg text-gray-400 max-w-2xl mx-auto mt-4">
              Join a thriving community of professionals who have transformed their careers with CareerParto’s AI-driven solutions.
            </p>
          </div>
          <StatsCounter />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-28 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="scroll-animate text-4xl md:text-5xl font-extrabold">The CareerParto Edge</h2>
            <p className="scroll-animate text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              Discover a suite of intelligent tools meticulously designed to elevate your career to new heights, powered by cutting-edge AI technology.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={`${index * 150}ms`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-28 bg-black/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="scroll-animate text-4xl md:text-5xl font-extrabold">Your Journey to Success</h2>
            <p className="scroll-animate text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              Follow three simple steps to unlock your career potential with CareerParto’s AI-driven guidance.
            </p>
          </div>
          <div className="space-y-20">
            <StepCard
              number="1"
              title="Share Your Vision"
              description="Begin by uploading your resume and specifying your dream job. Our AI uses this data to craft a personalized strategy tailored to your unique aspirations and strengths."
              image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
            />
            <StepCard
              number="2"
              title="Gain AI-Driven Insights"
              description="In moments, our platform delivers a comprehensive analysis of your resume’s ATS score, highlights your competitive edge, and provides a prioritized list of improvements to make you stand out."
              image="https://images.pexels.com/photos/5716052/pexels-photo-5716052.jpeg"
            />
            <StepCard
              number="3"
              title="Succeed with Confidence"
              description="Armed with an optimized resume, a clear career roadmap, and polished interview skills, step into every opportunity ready to impress and secure your dream role."
              image="https://images.pexels.com/photos/21696/pexels-photo.jpg"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-28 bg-indigo-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="scroll-animate text-4xl md:text-5xl font-extrabold">Stories of Triumph</h2>
            <p className="scroll-animate text-lg text-gray-400 max-w-3xl mx-auto mt-4">
              Hear from professionals who transformed their careers with CareerParto’s innovative tools and personalized guidance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-32 bg-purple-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="scroll-animate mb-8 text-purple-400 animate-pulse-slow">
              <Zap size={80} className="mx-auto" />
            </div>
            <h2 className="scroll-animate text-4xl md:text-6xl font-extrabold mb-8">
              Your Dream Career Awaits
            </h2>
            <p className="scroll-animate text-lg md:text-xl text-gray-300 mb-12">
              Don’t let uncertainty hold you back. With CareerParto’s AI-powered tools, you’ll navigate the job market with precision, confidence, and a competitive edge. Join thousands of success stories today.
            </p>
            <div className="scroll-animate">
              <NavLink
                to="/signup"
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-14 rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl hover:shadow-purple-600/50"
              >
                Start Your Success Story
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes pulse-slow {
          50% {
            opacity: 0.7;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .scroll-animate.animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}