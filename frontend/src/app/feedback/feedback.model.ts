import { AppState } from '@app/core';

export interface Result {
  questionnaireID: number;
  questionId: number;
  projectId: number;
  result: string;
  reviewerId: number;
  revieweeId: number;
}

export interface Questionnaire {
  id: number;
  projectId: number;
  questionIds: number[];
}

export interface Question {
  id: number;
  questionnaireID: number;
  question: string;
  type: string;
  displayOrder: number;
}

export interface Employee {
  id?: number;
  name: string;
  email: string;
  employeeNo?: string;
  gender: boolean;
  avatar: string;
  title: string;
  reportTo?: string;
}

export interface FeedbackState {}

export interface State extends AppState {
  feedback: FeedbackState;
}
