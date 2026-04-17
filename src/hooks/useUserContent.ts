'use client';
import { useState, useEffect, useCallback } from 'react';

// ─── localStorage key ─────────────────────────────────────────────────────────
const USER_CONTENT_KEY = 'jdn_user_content';

// ─── User Content Types ───────────────────────────────────────────────────────

/** A custom quiz question added by the user */
export interface UserQuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'tricky';
}

/** A custom code example added by the user */
export interface UserCodeExample {
  title: string;
  code: string;
  output?: string;
  explanation?: string;
}

/** A custom subtopic added by the user */
export interface UserSubtopic {
  id: string;
  title: string;
  explanation: string;     // maps to simpleExplanation
  codeExample?: UserCodeExample;
}

/** A custom interview question added by the user */
export interface UserInterviewQuestion {
  id: string;
  topicId: string;
  topicTitle: string;
  question: string;
  answer: string;
  difficulty: 'beginner' | 'intermediate' | 'tricky';
}

/** A fully custom topic created by the user */
export interface UserTopic {
  id: string;
  title: string;
  subtopicName: string;  // single subtopic for simplicity
  explanation: string;
  codeExample?: string;  // raw code string
  createdAt: string;
  interviewQuestion?: UserInterviewQuestion;
  quizQuestion?: UserQuizQuestion;
}

/** Root structure stored in localStorage under jdn_user_content */
export interface UserContentStore {
  /** Custom topics created by the user */
  topics: UserTopic[];
  /** Standalone interview questions added to existing topics */
  interviewQuestions: UserInterviewQuestion[];
  /** Standalone quiz questions added to existing topics */
  quizQuestions: UserQuizQuestion[];
}

const EMPTY_STORE: UserContentStore = {
  topics: [],
  interviewQuestions: [],
  quizQuestions: [],
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useUserContent() {
  const [store, setStore] = useState<UserContentStore>(EMPTY_STORE);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_CONTENT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<UserContentStore>;
        setStore({
          topics: parsed.topics ?? [],
          interviewQuestions: parsed.interviewQuestions ?? [],
          quizQuestions: parsed.quizQuestions ?? [],
        });
      }
    } catch {
      // If corrupt data, reset to empty
      localStorage.removeItem(USER_CONTENT_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  /** Persist the entire store object to localStorage */
  const persist = useCallback((next: UserContentStore) => {
    setStore(next);
    try {
      localStorage.setItem(USER_CONTENT_KEY, JSON.stringify(next));
    } catch {
      /* storage full / private mode */
    }
  }, []);

  // ─── Content Getters ──────────────────────────────────────────────────────

  /** Get all user-created topics */
  const getTopics = useCallback((): UserTopic[] => store.topics, [store]);

  /** Get user interview questions, optionally filtered by topicId */
  const getInterviewQuestions = useCallback(
    (topicId?: string): UserInterviewQuestion[] => {
      if (!topicId) return store.interviewQuestions;
      return store.interviewQuestions.filter((q) => q.topicId === topicId);
    },
    [store]
  );

  /** Get user quiz questions (all) */
  const getQuizQuestions = useCallback((): UserQuizQuestion[] => store.quizQuestions, [store]);

  // ─── Content Adders ───────────────────────────────────────────────────────

  /** Add a new full user topic */
  const addTopic = useCallback(
    (topic: Omit<UserTopic, 'id' | 'createdAt'>) => {
      const newTopic: UserTopic = {
        ...topic,
        id: `user-topic-${Date.now()}`,
        createdAt: new Date().toISOString(),
      };
      persist({
        ...store,
        topics: [...store.topics, newTopic],
      });
      return newTopic;
    },
    [store, persist]
  );

  /** Add a standalone interview question */
  const addInterviewQuestion = useCallback(
    (q: Omit<UserInterviewQuestion, 'id'>) => {
      const newQ: UserInterviewQuestion = {
        ...q,
        id: `user-iq-${Date.now()}`,
      };
      persist({
        ...store,
        interviewQuestions: [...store.interviewQuestions, newQ],
      });
      return newQ;
    },
    [store, persist]
  );

  /** Add a standalone quiz question */
  const addQuizQuestion = useCallback(
    (q: Omit<UserQuizQuestion, 'id'>) => {
      const newQ: UserQuizQuestion = {
        ...q,
        id: `user-qq-${Date.now()}`,
      };
      persist({
        ...store,
        quizQuestions: [...store.quizQuestions, newQ],
      });
      return newQ;
    },
    [store, persist]
  );

  /** Add full content in one shot (from the AddContentModal form) */
  const addContent = useCallback(
    (data: {
      topicTitle: string;
      subtopicName: string;
      explanation: string;
      codeExample?: string;
      interviewQuestion?: string;
      interviewAnswer?: string;
      quizQuestion?: string;
      quizCorrectAnswer?: string;
    }) => {
      const topicId = `user-topic-${Date.now()}`;
      const createdAt = new Date().toISOString();

      const iq: UserInterviewQuestion | undefined =
        data.interviewQuestion
          ? {
              id: `user-iq-${Date.now()}`,
              topicId,
              topicTitle: data.topicTitle,
              question: data.interviewQuestion,
              answer: data.interviewAnswer ?? 'See explanation above.',
              difficulty: 'intermediate',
            }
          : undefined;

      const qq: UserQuizQuestion | undefined =
        data.quizQuestion
          ? {
              id: `user-qq-${Date.now()}`,
              question: data.quizQuestion,
              // Simple: user provides answer as option A, others are placeholders
              options: [
                data.quizCorrectAnswer ?? 'Your answer',
                'Option B',
                'Option C',
                'Option D',
              ],
              answer: 0,
              explanation: `The correct answer is: ${data.quizCorrectAnswer ?? 'your answer'}`,
              difficulty: 'medium',
            }
          : undefined;

      const newTopic: UserTopic = {
        id: topicId,
        title: data.topicTitle,
        subtopicName: data.subtopicName,
        explanation: data.explanation,
        codeExample: data.codeExample,
        createdAt,
        interviewQuestion: iq,
        quizQuestion: qq,
      };

      const nextStore: UserContentStore = {
        topics: [...store.topics, newTopic],
        interviewQuestions: iq
          ? [...store.interviewQuestions, iq]
          : store.interviewQuestions,
        quizQuestions: qq
          ? [...store.quizQuestions, qq]
          : store.quizQuestions,
      };
      persist(nextStore);
      return newTopic;
    },
    [store, persist]
  );

  // ─── Delete ───────────────────────────────────────────────────────────────

  /** Remove a user topic by id */
  const removeTopic = useCallback(
    (id: string) => {
      persist({
        ...store,
        topics: store.topics.filter((t) => t.id !== id),
      });
    },
    [store, persist]
  );

  /** Clear all user content */
  const clearAll = useCallback(() => {
    persist(EMPTY_STORE);
  }, [persist]);

  // ─── Merge helper (runtime merge, does NOT mutate topics.ts) ─────────────

  /**
   * Merges user-created topics with the canonical topics array at runtime.
   * User topics are appended at the end — original topics are never modified.
   */
  const mergeWithDefaultTopics = useCallback(
    <T extends { id: string }>(defaultTopics: T[]): (T | UserTopic)[] => {
      return [...defaultTopics, ...store.topics];
    },
    [store.topics]
  );

  const hasUserContent =
    store.topics.length > 0 ||
    store.interviewQuestions.length > 0 ||
    store.quizQuestions.length > 0;

  return {
    loaded,
    store,
    hasUserContent,
    // Getters
    getTopics,
    getInterviewQuestions,
    getQuizQuestions,
    // Adders
    addContent,
    addTopic,
    addInterviewQuestion,
    addQuizQuestion,
    // Delete
    removeTopic,
    clearAll,
    // Merge
    mergeWithDefaultTopics,
  };
}
