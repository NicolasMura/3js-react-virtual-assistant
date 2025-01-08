'use client';

import { Canvas } from '@react-three/fiber';
import { Experience } from '../components/experience';
import { UI } from '../components/ui';
import { ChatProvider } from './hooks/useChat';
import styles from './page.module.scss';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <ChatProvider>
        <UI></UI>
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
          <color attach="background" args={['#ececec']} />
          <Experience />
        </Canvas>
      </ChatProvider>
    </div>
  );
}
