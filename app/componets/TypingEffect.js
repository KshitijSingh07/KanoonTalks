'use client'
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';

export default function TypingEffect() {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        'KanoonTalks',
        'Law Simplified for All',
      ],
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });

    return () => typed.destroy(); // cleanup
  }, []);

  return <span ref={el} className="text-blue-4
  
  00" />;
}
