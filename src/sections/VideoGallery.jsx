import { motion } from 'framer-motion';
import SectionWrapper from '../components/SectionWrapper';

const videoSources = ['/media/videos/IMG_0643.MP4', '/media/videos/IMG_0644.MP4'];

function VideoGallery() {
  return (
    <SectionWrapper
      id="student-works"
      label="Видео студентов"
      title="Работы студентов"
      subtitle="Готовые AI-видео, созданные на курсе — с сильной подачей и визуальной динамикой."
      className="bg-genii-bg-deep"
    >
  <div className="grid grid-cols-2 gap-4 sm:gap-6 xl:grid-cols-3">
        {videoSources.map((src) => (
          <motion.div
            key={src}
            whileHover={{ scale: 1.03 }}
            className="group relative overflow-hidden rounded-3xl surface-muted"
          >
            <video
              src={src}
              className="h-full w-full object-cover aspect-[9/16]"
              preload="metadata"
              controls
              playsInline
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-genii-accent/15 opacity-70" />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-genii-light backdrop-blur">
                Play
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default VideoGallery;
