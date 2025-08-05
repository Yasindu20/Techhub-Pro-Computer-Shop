import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiUsers, FiAward, FiTrendingUp, FiHeart,
  FiTarget, FiEye, FiZap
} from 'react-icons/fi';

const About = () => {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: <FiAward /> },
    { number: '50K+', label: 'Happy Customers', icon: <FiUsers /> },
    { number: '10K+', label: 'Products Sold', icon: <FiTrendingUp /> },
    { number: '24/7', label: 'Support Available', icon: <FiHeart /> },
  ];

  const values = [
    {
      icon: <FiTarget className="w-8 h-8" />,
      title: 'Our Mission',
      description: 'To provide cutting-edge technology solutions that empower individuals and businesses to achieve their full potential.',
    },
    {
      icon: <FiEye className="w-8 h-8" />,
      title: 'Our Vision',
      description: 'To be the most trusted technology partner, known for innovation, quality, and exceptional customer service.',
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: 'Our Values',
      description: 'Innovation, integrity, customer-first approach, and continuous improvement drive everything we do.',
    },
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: '/images/team/john.jpg',
      bio: '15+ years in tech industry',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Sales',
      image: '/images/team/sarah.jpg',
      bio: 'Expert in customer relations',
    },
    {
      name: 'Mike Chen',
      role: 'Technical Director',
      image: '/images/team/mike.jpg',
      bio: 'Hardware specialist',
    },
    {
      name: 'Emily Davis',
      role: 'Customer Success Manager',
      image: '/images/team/emily.jpg',
      bio: 'Dedicated to your satisfaction',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">About TechHub Pro</h1>
            <p className="text-xl opacity-90">
              Your trusted technology partner since 2009
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 text-center">
                <div className="text-primary-600 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Founded in 2009, TechHub Pro began as a small computer repair shop with 
                  a big vision: to make technology accessible and reliable for everyone.
                </p>
                <p>
                  Over the years, we've grown from a local repair service to a comprehensive 
                  technology solutions provider, serving thousands of customers across the country.
                </p>
                <p>
                  Today, we offer everything from cutting-edge gaming PCs and professional 
                  workstations to expert repair services and IT consulting. Our commitment 
                  to quality and customer satisfaction remains at the heart of everything we do.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative">
              <img
                src="/images/about/store.jpg"
                alt="TechHub Pro Store"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 
                rounded-xl shadow-xl">
                <div className="text-3xl font-bold">15+</div>
                <div>Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our core values guide every decision we make and every interaction we have
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8 text-center">
                <div className="text-primary-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Passionate experts dedicated to providing you with the best technology solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center">
                <div className="relative mb-4 mx-auto w-48 h-48">
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 
                    rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Experience the TechHub Pro Difference?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of satisfied customers who trust us with their technology needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-lg 
                font-semibold hover:bg-gray-100 transform hover:scale-105 
                transition-all duration-300">
                Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 
                rounded-lg font-semibold hover:bg-white hover:text-primary-600 
                transform hover:scale-105 transition-all duration-300">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;