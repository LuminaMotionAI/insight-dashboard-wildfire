'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  // 다크 모드 토글 함수
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  // darkMode 상태가 변경될 때마다 실행
  useEffect(() => {
    // HTML 요소에 다크 모드 클래스 추가/제거
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // localStorage에 테마 설정 저장
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);
  
  // 컴포넌트 마운트 시 로컬 스토리지에서 테마 설정 불러오기
  useEffect(() => {
    // 시스템 설정이나 로컬 스토리지 확인
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
    }
  }, []);
  
  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors fixed top-4 right-4 z-50"
      aria-label={darkMode ? '라이트 모드로 전환' : '다크 모드로 전환'}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle; 