import { FSRS, Rating } from '@squeakyrobot/fsrs';

const f = new FSRS();

export function createCard(questionId) {
  const card = f.createEmptyCard();
  return { ...card, questionId };
}

export function gradeCard(card, rating) {
  const ratingMap = { again: Rating.Again, hard: Rating.Hard, good: Rating.Good, easy: Rating.Easy };
  const now = new Date();
  // Reconstruct Date objects from ISO strings (after JSON serialization)
  const cardWithDates = {
    ...card,
    due: card.due instanceof Date ? card.due : new Date(card.due),
    last_review: card.last_review ? (card.last_review instanceof Date ? card.last_review : new Date(card.last_review)) : null,
  };
  const schedulingCards = f.repeat(cardWithDates, now);
  const result = schedulingCards[ratingMap[rating]];
  return {
    ...result.card,
    questionId: card.questionId,
  };
}

export function answerToRating(isCorrect, timeTakenSeconds) {
  if (!isCorrect) return 'again';
  if (timeTakenSeconds < 5) return 'easy';
  if (timeTakenSeconds <= 15) return 'good';
  return 'hard';
}

export function getDueCards(cardStates, now = new Date()) {
  return Object.values(cardStates).filter(card => {
    const due = card.due instanceof Date ? card.due : new Date(card.due);
    return due <= now;
  });
}

export function getNewCards(cardStates, allQuestionIds) {
  return allQuestionIds.filter(id => !cardStates[id] || cardStates[id].state === 0);
}

export { Rating };
