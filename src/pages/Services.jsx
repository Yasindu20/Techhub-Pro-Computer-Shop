import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  FiTool, FiCpu, FiMonitor, FiHardDrive, FiShield,
  FiClock, FiDollarSign, FiPhone, FiMail, FiMapPin,
  FiCheck, FiArrowRight, FiStar, FiUser
} from 'react-icons/fi';
import { services } from '../data/services';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const serviceIcons = {
    '🔧': <FiTool className="w-8 h-8" />,
    '💻': <FiMonitor className="w-8 h-8" />,
    '🛠️': <FiCpu className="w-8 h-8" />,
    '💾': <FiHardDrive className="w-8 h-8" />,
    '🏢': <FiShield className="w-8 h-8" />,
    '🎮': <FiCpu className="w-8 h-8" />,
  };

  const testimonials = [
    {
      name: 'John Smith',
      service: 'Computer Repair',
      rating: 5,
      comment: 'Excellent service! My laptop was fixed quickly and professionally.',
      date: '2 weeks ago'
    },
    {
      name: 'Sarah Johnson',
      service: 'Custom PC Building',
      rating: 5,
      comment: 'They built me the perfect gaming PC. Great performance and value!',
      date: '1 month ago'
    },
    {
      name: 'Mike Chen',
      service: 'Data Recovery',
      rating: 5,
      comment: 'Recovered all my important files when I thought they were lost forever.',
      date: '3 weeks ago'
    },
  ];

  const onSubmit = (data) => {
    console.log('Service booking:', data);
    setBookingSubmitted(true);
    reset();
    setShowBookingForm(false);
    setTimeout(() => setBookingSubmitted(false), 5000);
  };

  const handleBookService = (service) => {
    setSelectedService(service);
    setShowBookingForm(true);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FiStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Tech Services
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Expert repair, maintenance, and support services for all your technology needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setShowBookingForm(true)}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold 
                  hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                Book a Service
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg 
                font-semibold hover:bg-white hover:text-primary-600 transform hover:scale-105 
                transition-all duration-300">
                Get Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From simple repairs to complex custom builds, our certified technicians 
              are here to help with all your technology needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-dark-card rounded-xl shadow-lg hover:shadow-2xl 
                  transition-all duration-300 overflow-hidden ${
                  service.popular ? 'ring-2 ring-primary-600' : ''
                }`}>
                
                {service.popular && (
                  <div className="bg-primary-600 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-primary-600 bg-primary-50 dark:bg-primary-900/30 
                      p-3 rounded-lg">
                      {serviceIcons[service.icon] || <FiTool className="w-8 h-8" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-semibold">
                        {service.price}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {service.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <FiCheck className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <FiClock className="w-4 h-4" />
                      <span>{service.turnaround}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <FiShield className="w-4 h-4" />
                      <span>{service.warranty}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookService(service)}
                    className="w-full btn-primary flex items-center justify-center space-x-2">
                    <span>Book Service</span>
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Our Service Process
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Simple, transparent, and professional service every time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                title: 'Book Service',
                description: 'Schedule your service online or call us directly',
                icon: <FiPhone className="w-6 h-6" />
              },
              {
                step: '02',
                title: 'Diagnosis',
                description: 'Free comprehensive analysis of your device',
                icon: <FiTool className="w-6 h-6" />
              },
              {
                step: '03',
                title: 'Repair',
                description: 'Professional repair using genuine parts',
                icon: <FiCpu className="w-6 h-6" />
              },
              {
                step: '04',
                title: 'Delivery',
                description: 'Fast delivery or pickup when ready',
                icon: <FiCheck className="w-6 h-6" />
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full 
                    flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {process.step}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary-100 dark:bg-primary-900/30 
                    text-primary-600 p-2 rounded-full">
                    {process.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {process.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {process.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Read reviews from satisfied customers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 
                    rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.service}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.date}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 italic">
                  "{testimonial.comment}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary-600 dark:bg-primary-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Need Help Right Away?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Our expert technicians are standing by to help you with your tech problems
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center justify-center space-x-3">
                <FiPhone className="w-6 h-6" />
                <div className="text-left">
                  <p className="font-semibold">Call Us</p>
                  <p className="opacity-90">1-800-TECHHUB</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <FiMail className="w-6 h-6" />
                <div className="text-left">
                  <p className="font-semibold">Email Us</p>
                  <p className="opacity-90">support@techhub.com</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <FiMapPin className="w-6 h-6" />
                <div className="text-left">
                  <p className="font-semibold">Visit Us</p>
                  <p className="opacity-90">123 Tech Street</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setShowBookingForm(true)}
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold 
                hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
              Schedule Service Now
            </button>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 
          bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-dark-card rounded-xl shadow-2xl max-w-md w-full 
              max-h-[90vh] overflow-y-auto">
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                  Book Service
                  {selectedService && ` - ${selectedService.title}`}
                </h3>
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 
                    dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                      bg-white dark:bg-gray-800"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 
                    dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                      bg-white dark:bg-gray-800"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 
                    dark:text-gray-300 mb-1">
                    Phone *
                  </label>
                  <input
                    {...register('phone', { required: 'Phone is required' })}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                      bg-white dark:bg-gray-800"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 
                    dark:text-gray-300 mb-1">
                    Service *
                  </label>
                  <select
                    {...register('service', { required: 'Please select a service' })}
                    defaultValue={selectedService?.title || ''}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                      bg-white dark:bg-gray-800">
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 
                    dark:text-gray-300 mb-1">
                    Preferred Date
                  </label>
                  <input
                    {...register('date')}
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                      bg-white dark:bg-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 
                    dark:text-gray-300 mb-1">
                    Description of Issue
                  </label>
                  <textarea
                    {...register('description')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                      rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent 
                      resize-none bg-white dark:bg-gray-800"
                    placeholder="Please describe the issue or service needed..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 
                      rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 
                      dark:hover:bg-gray-800">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    Book Service
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}

      {/* Success Message */}
      {bookingSubmitted && (
        <div className="fixed bottom-4 right-4 z-50">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg 
              flex items-center space-x-2">
            <FiCheck className="w-5 h-5" />
            <span>Service booked successfully! We'll contact you soon.</span>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Services;