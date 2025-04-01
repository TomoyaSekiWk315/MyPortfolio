// components/sections/ContactSection.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { toast } from 'react-hot-toast'

// GSAPプラグインの登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// メール送信関数
const sendEmail = async (data: { name: string; email: string; subject: string; message: string }) => {
  console.log('Sending email:', data)
  // 実際のメール送信処理は後で実装
  return Promise.resolve()
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  
  // フォーム状態管理
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // 送信状態管理
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);
  
  // スクロールアニメーション設定
  useEffect(() => {
    if (!sectionRef.current || !formRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom-=100',
        end: 'center center',
        scrub: 0.5,
      }
    });
    
    tl.fromTo(
      formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
    
    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);
  
  // 入力変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // フォーム検証
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'お名前を入力してください';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'メッセージを入力してください';
    }
    
    setFormStatus(Object.keys(newErrors).length === 0 ? null : 'error');
    return Object.keys(newErrors).length === 0;
  };
  
  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setFormStatus(null);
    
    try {
      await sendEmail(formData)
      toast.success('メッセージを送信しました')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch {
      toast.error('メッセージの送信に失敗しました')
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative min-h-screen py-20 bg-white overflow-hidden"
    >
      {/* 背景装飾 */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 transform origin-top-right z-0"></div>
      <div 
        className="absolute top-40 right-40 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #FF7A00 0%, transparent 70%)' }}
      ></div>
      <div 
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-5"
        style={{ background: 'radial-gradient(circle, #FF7A00 0%, transparent 70%)' }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-heading font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-primary">Contact</span> Us
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              プロジェクトのご相談や、サービスに関するお問い合わせはこちらからお気軽にどうぞ。
              48時間以内に返信いたします。
            </motion.p>
          </div>
          
          {/* コンテンツコンテナ */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* お問い合わせ情報 */}
            <motion.div 
              className="md:col-span-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-50 p-8 rounded-xl h-full">
                <h3 className="text-2xl font-bold mb-6">お問い合わせ先情報</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">メール</h4>
                      <p className="text-gray-600">tomoya.seki.wk@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">住所</h4>
                      <p className="text-gray-600">茨城県 つくば市</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10">
                  <h4 className="font-medium text-gray-900 mb-4">フォローする</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow transition-shadow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 9H2V21H6V9Z" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow transition-shadow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23 3.00005C22.0424 3.67552 20.9821 4.19216 19.86 4.53005C19.2577 3.83756 18.4573 3.34674 17.567 3.12397C16.6767 2.90121 15.7395 2.95724 14.8821 3.2845C14.0247 3.61176 13.2884 4.19445 12.773 4.95376C12.2575 5.71308 11.9877 6.61238 12 7.53005V8.53005C10.2426 8.57561 8.50127 8.18586 6.93101 7.39549C5.36074 6.60513 4.01032 5.43868 3 4.00005C3 4.00005 -1 13 8 17C5.94053 18.398 3.48716 19.099 1 19C10 24 21 19 21 7.50005C20.9991 7.2215 20.9723 6.94364 20.92 6.67005C21.9406 5.66354 22.6608 4.39276 23 3.00005Z" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm hover:shadow transition-shadow">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.5 6.5H17.51" stroke="#FF7A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* コンタクトフォーム */}
            <motion.div 
              className="md:col-span-3"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-xl shadow-lg">
                {formStatus === 'success' ? (
                  <motion.div 
                    className="text-center py-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 11.0799V11.9999C21.9988 14.1563 21.3005 16.2545 20.0093 17.9817C18.7182 19.7088 16.9033 20.9723 14.8354 21.5838C12.7674 22.1952 10.5573 22.1218 8.53447 21.3744C6.51168 20.6271 4.78465 19.246 3.61096 17.4369C2.43727 15.6279 1.87979 13.4879 2.02168 11.3362C2.16356 9.18443 2.99721 7.13619 4.39828 5.49694C5.79935 3.85768 7.69279 2.71525 9.79619 2.24001C11.8996 1.76477 14.1003 1.9822 16.07 2.85986" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M22 4L12 14.01L9 11.01" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">お問い合わせありがとうございます</h3>
                    <p className="text-gray-600 mb-6">
                      メッセージを受け付けました。48時間以内にご返信いたします。
                    </p>
                    <button 
                      className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-colors"
                      onClick={() => setFormStatus(null)}
                    >
                      新しいメッセージを送る
                    </button>
                  </motion.div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* お名前 */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                          お名前 <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleChange} 
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all
                            ${formStatus === 'error' ? 'border-red-300 focus:ring-red-100' : 'border-gray-300 focus:ring-primary-100 focus:border-primary'}`}
                          placeholder="山田 太郎"
                        />
                        {formStatus === 'error' && (
                          <p className="text-red-500 text-sm mt-1">{formStatus === 'error' ? 'このフィールドは必須です' : ''}</p>
                        )}
                      </div>
                      
                      {/* メールアドレス */}
                      <div>
                        <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                          メールアドレス <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all
                            ${formStatus === 'error' ? 'border-red-300 focus:ring-red-100' : 'border-gray-300 focus:ring-primary-100 focus:border-primary'}`}
                          placeholder="your-email@example.com"
                        />
                        {formStatus === 'error' && (
                          <p className="text-red-500 text-sm mt-1">{formStatus === 'error' ? 'このフィールドは必須です' : ''}</p>
                        )}
                      </div>
                    </div>
                    
                    {/* 件名 */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                        件名
                      </label>
                      <select 
                        id="subject" 
                        name="subject" 
                        value={formData.subject} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary transition-all"
                      >
                        <option value="">お問い合わせ内容を選択してください</option>
                        <option value="general">一般的なお問い合わせ</option>
                        <option value="project">プロジェクトの相談</option>
                        <option value="support">サポート</option>
                        <option value="other">その他</option>
                      </select>
                    </div>
                    
                    {/* メッセージ */}
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                        メッセージ <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message} 
                        onChange={handleChange} 
                        rows={5} 
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all
                          ${formStatus === 'error' ? 'border-red-300 focus:ring-red-100' : 'border-gray-300 focus:ring-primary-100 focus:border-primary'}`}
                        placeholder="お問い合わせ内容を入力してください"
                      ></textarea>
                      {formStatus === 'error' && (
                        <p className="text-red-500 text-sm mt-1">{formStatus === 'error' ? 'このフィールドは必須です' : ''}</p>
                      )}
                    </div>
                    
                    {/* エラーメッセージ */}
                    {formStatus === 'error' && (
                      <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
                        送信中にエラーが発生しました。後ほど再度お試しください。
                      </div>
                    )}
                    
                    {/* 送信ボタン */}
                    <div className="text-right">
                      <button 
                        type="submit" 
                        className="px-8 py-3 bg-primary text-white rounded-lg font-medium inline-flex items-center hover:bg-primary-dark transition-colors disabled:bg-primary-light disabled:cursor-not-allowed"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            送信中...
                          </>
                        ) : "送信する"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}