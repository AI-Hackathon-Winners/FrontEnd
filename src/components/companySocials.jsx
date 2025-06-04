import React from 'react';
import { FiInstagram, FiFacebook, FiLinkedin, FiMessageSquare, FiGlobe, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const socials = [
  {
    id: 'whatsapp',
    icon: <FiMessageSquare />,
    url: 'https://wa.me/233123456789',
    color: 'bg-green-500',
    tooltip: 'WhatsApp',
  },
  {
    id: 'instagram',
    icon: <FiInstagram />,
    url: 'https://instagram.com/yourcompany',
    color: 'bg-pink-500',
    tooltip: 'Instagram',
  },
  {
    id: 'facebook',
    icon: <FiFacebook />,
    url: 'https://facebook.com/yourcompany',
    color: 'bg-blue-600',
    tooltip: 'Facebook',
  },
  {
    id: 'linkedin',
    icon: <FiLinkedin />,
    url: 'https://linkedin.com/company/yourcompany',
    color: 'bg-blue-800',
    tooltip: 'LinkedIn',
  },
  {
    id: 'gmail',
    icon: <FiMail />,
    url: 'mailto:yourcompany@gmail.com',
    color: 'bg-red-600',
    tooltip: 'Gmail',
  },
  {
    id: 'website',
    icon: <FiGlobe />,
    url: 'https://yourcompany.com',
    color: 'bg-purple-700',
    tooltip: 'Website',
  },
];

const CompanySocials = () => {
  return (
    <div className="fixed right-4 top-1/3 z-50 flex flex-col gap-4">
      {socials.map((item, i) => (
        <motion.a
          href={item.url}
          key={item.id}
          target="_blank"
          rel="noopener noreferrer"
          title={item.tooltip}
          className={`w-12 h-12 text-white flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition transform cursor-pointer ${item.color}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, type: 'spring' }}
          whileHover={{ rotate: 15 }}
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {item.icon}
          </motion.div>
        </motion.a>
      ))}
    </div>
  );
};

export default CompanySocials;
