import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FiMail, FiPhone, FiMapPin, FiClock, FiSend,
  FiMessageSquare, FiUser, FiCheck
} from 'react-icons/fi';

const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const contactInfo = [
    {
      icon: <FiPhone className="w-6 h-6" />,
      title: 'Phone',
      details: ['1-800-TECHHUB', '(555) 123-4567'],
      subtitle: 'Mon-Fri 8AM-8PM, Sat-Sun 10AM-6PM'
    },
    {
      icon: <FiMail className="w-6 h-6" />,
      title: 'Email',
      details: ['support@techhub.com', 'sales@techhub.com'],
      subtitle: 'We reply within 2 hours'
    },
    {
      icon: <FiMapPin className="w-6 h-6" />,
      title: 'Visit Us',
      details: ['123 Tech Street', 'Silicon Valley, CA 94000'],
      subtitle: 'Free parking available'
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: 'Store Hours',
      details: ['Mon-Fri: 9AM-8PM', 'Sat-Sun: 10AM-6PM'],
      subtitle: 'Extended holiday hours'
    }
  ];

  const departments = [
    { value: 'sales', label: 'Sales Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'service', label: 'Repair Service' },
    { value: 'business', label: 'Business Solutions' },
    { value: 'general', label: 'General Question' }
  ];

  const onSubmit = (data) => {
    console.log('Contact form data:', data);
    setMessageSent(true);
    reset();
    setTimeout(() => setMessageSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl opacity-90">
              Get in touch with our expert team for all your technology needs
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Get In Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Have questions about our products or services? Our team of experts 
                is here to help you find the perfect technology solutions.
              </p>
            </motion.div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-primary-600 bg-primary-50 dark:bg-primary-900/30 
                      p-3 rounded-lg">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-600 dark:text-gray-400">
                          {detail}
                        </p>
                      ))}
                      <p className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                        {info.subtitle}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-8">
              
              {messageSent ? (
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full 
                    flex items-center justify-center mx-auto mb-6">
                    <FiCheck className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 
                          dark:text-gray-300 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <FiUser className="absolute left-3 top-3 text-gray-400" />
                          <input
                            {...register('name', { required: 'Name is required' })}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 
                              dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 
                              focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Your full name"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 
                          dark:text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <FiMail className="absolute left-3 top-3 text-gray-400" />
                          <input
                            {...register('email', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                              }
                            })}
                            type="email"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 
                              dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 
                              focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="your@email.com"
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone and Department */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 
                          dark:text-gray-300 mb-2">
                          Phone Number
                        </label>
                        <div className="relative">
                          <FiPhone className="absolute left-3 top-3 text-gray-400" />
                          <input
                            {...register('phone')}
                            type="tel"
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 
                              dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 
                              focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="(555) 123-4567"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 
                          dark:text-gray-300 mb-2">
                          Department *
                        </label>
                        <select
                          {...register('department', { required: 'Please select a department' })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                            rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                            focus:border-transparent">
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept.value} value={dept.value}>
                              {dept.label}
                            </option>
                          ))}
                        </select>
                        {errors.department && (
                          <p className="text-red-500 text-sm mt-1">{errors.department.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 
                        dark:text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        {...register('subject', { required: 'Subject is required' })}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
                          rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                          focus:border-transparent"
                        placeholder="Brief description of your inquiry"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 
                        dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <div className="relative">
                        <FiMessageSquare className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                          {...register('message', { 
                            required: 'Message is required',
                            minLength: {
                              value: 10,
                              message: 'Message must be at least 10 characters'
                            }
                          })}
                          rows={6}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 
                            dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 
                            focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                          placeholder="Please provide detailed information about your inquiry..."
                        />
                      </div>
                      {errors.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full btn-primary flex items-center justify-center space-x-2">
                      <FiSend className="w-5 h-5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16">
          <div className="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Our Location
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visit our showroom to see our products in person
              </p>
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                Interactive Map Coming Soon
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;