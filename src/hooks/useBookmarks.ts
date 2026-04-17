'use client';
import { useState, useEffect } from 'react';

const BOOKMARKS_KEY = 'jdn_bookmarks';

export interface Bookmark {
  topicId: string;
  topicTitle: string;
  questionText: string;
  savedAt: string;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      if (stored) setBookmarks(JSON.parse(stored));
    } catch {}
  }, []);

  const persist = (items: Bookmark[]) => {
    setBookmarks(items);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(items));
  };

  const addBookmark = (bm: Omit<Bookmark, 'savedAt'>) => {
    const exists = bookmarks.some(
      (b) => b.topicId === bm.topicId && b.questionText === bm.questionText
    );
    if (!exists) persist([...bookmarks, { ...bm, savedAt: new Date().toISOString() }]);
  };

  const removeBookmark = (topicId: string, questionText: string) => {
    persist(bookmarks.filter((b) => !(b.topicId === topicId && b.questionText === questionText)));
  };

  const isBookmarked = (topicId: string, questionText: string) =>
    bookmarks.some((b) => b.topicId === topicId && b.questionText === questionText);

  return { bookmarks, addBookmark, removeBookmark, isBookmarked };
}
