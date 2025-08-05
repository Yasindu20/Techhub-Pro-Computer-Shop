import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiCalendar, FiUser, FiTag, FiArrowRight, FiSearch,
  FiTrendingUp, FiCpu, FiMonitor, FiTool
} from 'react-icons/fi';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'Ultimate Gaming PC Build Guide for 2024',
      excerpt: 'Everything you need to know about building a high-performance gaming PC with the latest components.',
      author: 'John Smith',
      date: '2024-01-15',
      category: 'Gaming',
      readTime: '8 min read',
      image: '/images/blog/gaming-pc-build.jpg',
      tags: ['Gaming', 'PC Building', 'RTX 4090', 'Intel i9'],
      featured: true,
    },
    {
      id: 2,
      title: 'RTX 4080 vs RTX 4070 Ti: Which GPU Should You Buy?',
      excerpt: 'Comprehensive comparison of NVIDIA\'s latest graphics cards to help you make the right choice.',
      author: 'Sarah Johnson',
      date: '2024-01-12',
      category: 'Reviews',
      readTime: '6 min read',
      image: '/images/blog/gpu-comparison.jpg',
      tags: ['GPU', 'Reviews', 'NVIDIA', 'Gaming'],
      featured: true,
    },
    {
      id: 3,
      title: 'How to Choose the Perfect Monitor for Your Setup',
      excerpt: 'From gaming to professional work, find the ideal display for your needs with our comprehensive guide.',
      author: 'Mike Chen',
      date: '2024-01-10',
      category: 'Guides',
      readTime: '5 min read',
      image: '/images/blog/monitor-guide.jpg',
      tags: ['Monitors', 'Setup', 'Gaming', 'Productivity'],
      featured: false,
    },
    {
      id: 4,
      title: 'Top 10 PC Maintenance Tips to Keep Your System Running Smooth',
      excerpt: 'Essential maintenance practices to extend your computer\'s lifespan and optimize performance.',
      author: 'Emily Davis',
      date: '2024-01-08',
      category: 'Tips',
      readTime: '7 min read',
      image: '/images/blog/pc-maintenance.jpg',
      tags: ['Maintenance', 'Tips', 'Performance', 'Hardware'],
      featured: false,
    },
    {
      id: 5,
      title: 'Business Laptop Buying Guide: What to Look For',
      excerpt: 'Key factors to consider when choosing laptops for your business or professional needs.',
      author: 'John Smith',
      date: '2024-01-05',
      category: 'Business',
      readTime: '4 min read',
      image: '/images/blog/business-laptops.jpg',
      tags: ['Business', 'Laptops', 'Productivity', 'Enterprise'],
      featured: false,
    },
    {
      id: 6,
      title: 'The Future of AI in Personal Computing',
      excerpt: 'Exploring how artificial intelligence is revolutionizing personal computers and user experiences.',
      author: 'Sarah Johnson',
      date: '2024-01-03',
      category: 'Technology',
      readTime: '9 min read',
      image: '/images/blog/ai-computing.jpg',
      tags: ['AI', 'Technology', 'Future', 'Innovation'],
      featured: false,
    },
  ];

  const categories = [
    { id: 'all', name: 'All Posts', icon: <FiTrendingUp /> },
    { id: 'Gaming', name: 'Gaming', icon: <FiCpu /> },
    { id: 'Reviews', name: 'Reviews', icon: <FiMonitor /> },
    { id: 'Guides', name: 'Guides', icon: <FiTool /> },
    { id: 'Tips', name: 'Tips', icon: <FiTrendingUp /> },
    { id: 'Business', name: 'Business', icon: <FiUser /> },
    { id: 'Technology', name: 'Technology', icon: <FiCpu /> },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">TechHub Pro Blog</h1>
            <p className="text-xl opacity-90">
              Stay updated with the latest tech news, reviews, and expert guides
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Featured Posts */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Featured Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our most popular and comprehensive guides
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden 
                  hover:shadow-2xl transition-all duration-300 group">
                <div className="relative h-64 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600 
                    flex items-center justify-center text-white text-4xl font-bold">
                    {post.category}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center">
                      <FiCalendar className="mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <FiUser className="mr-1" />
                      {post.author}
                    </span>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 
                    group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="bg-gray-100 dark:bg-gray-700 
                          text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link to={`/blog/${post.id}`} 
                      className="text-primary-600 hover:text-primary-700 flex items-center">
                      Read More <FiArrowRight className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Search */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Search Articles
              </h3>
              <div className="relative">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                    rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 
                    focus:border-transparent"
                />
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-dark-card rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg 
                      transition-colors text-left ${
                      selectedCategory === category.id
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                    {category.icon}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {selectedCategory === 'all' ? 'All Articles' : `${selectedCategory} Articles`}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden 
                    hover:shadow-2xl transition-all duration-300 group">
                  
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 
                      flex items-center justify-center text-white text-2xl font-bold">
                      {post.category}
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-black/50 text-white px-2 py-1 rounded text-sm">
                        <FiTag className="inline mr-1" />
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 
                      dark:text-gray-400 mb-3">
                      <span className="flex items-center">
                        <FiCalendar className="mr-1" />
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 
                      group-hover:text-primary-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                        <FiUser className="mr-1" />
                        {post.author}
                      </span>
                      
                      <Link to={`/blog/${post.id}`} 
                        className="text-primary-600 hover:text-primary-700 flex items-center text-sm font-medium">
                        Read More <FiArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FiSearch className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or browse different categories
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Blog;