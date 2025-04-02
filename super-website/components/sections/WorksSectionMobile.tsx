import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import Image from 'next/image'

export default function WorksSectionMobile() {
  return (
    <section id="works-section" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 w-full h-full bg-background">
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          {/* 横スクロール可能なプロジェクトコンテナ */}
          <div className="w-full overflow-x-auto">
            <div className="flex space-x-4" style={{ width: `${projects.length * 100}%` }}>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="w-full flex-shrink-0"
                  style={{ width: `calc(100% / ${projects.length})` }}
                >
                  {/* 映像とコンテンツのコンテナ */}
                  <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                    {/* 映像 */}
                    {project.videoUrl && (
                      <video
                        src={project.videoUrl}
                        className="w-full h-full object-cover"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    )}
                    
                    {/* オーバーレイグラデーション */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    
                    {/* コンテンツ */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* 上部の画像 */}
                      {project.mobileImageUrl && (
                        <motion.div
                          key={`image-${index}`}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="relative w-1/3 aspect-square mx-auto"
                        >
                          <Image
                            src={project.mobileImageUrl}
                            alt={project.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </motion.div>
                      )}
                      
                      {/* 下部のテキスト */}
                      <motion.div
                        key={`text-${index}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-white space-y-2"
                      >
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <p className="text-xs whitespace-pre-line line-clamp-3">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-0.5 text-[10px] bg-white/20 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 