'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-8">お問い合わせ</h2>
          <p className="text-gray-300 mb-8">
            プロジェクトについてのご相談やお問い合わせはこちらから
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            お問い合わせする
          </button>
        </motion.div>
      </div>
    </section>
  );
} 