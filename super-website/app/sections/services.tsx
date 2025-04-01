'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Web Development',
    description: 'モダンなウェブアプリケーションの開発',
  },
  {
    title: '3D Design',
    description: 'インタラクティブな3Dコンテンツの制作',
  },
  {
    title: 'UI/UX Design',
    description: 'ユーザー体験を重視したデザイン',
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-800 p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 