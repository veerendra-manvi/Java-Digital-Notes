'use client';
import { useState, useEffect } from 'react';

const PROGRESS_KEY = 'jdn_progress';

export function useProgress() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROGRESS_KEY);
      if (stored) setCompleted(JSON.parse(stored));
    } catch {}
  }, []);

  const markComplete = (topicId: string) => {
    setCompleted((prev) => {
      if (prev.includes(topicId)) return prev;
      const next = [...prev, topicId];
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const unmarkComplete = (topicId: string) => {
    setCompleted((prev) => {
      const next = prev.filter((id) => id !== topicId);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isCompleted = (topicId: string) => completed.includes(topicId);

  const progressPercent = (total: number) =>
    total === 0 ? 0 : Math.round((completed.length / total) * 100);

  return { completed, markComplete, unmarkComplete, isCompleted, progressPercent };
}
