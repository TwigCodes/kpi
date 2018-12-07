import { AppState } from '@app/core';

export interface Result {
  questionnaireId: number;
  questionId: number;
  projectId: number;
  result: string;
  reviewerId: number;
  revieweeId: number;
}

export interface Feedback {
  targetUser: Employee;
  questionnaireId: number;
}

export interface Questionnaire {
  id: number;
  projectId: number;
  questionIds: number[];
}

export interface Question {
  id: number;
  questionnaireId: number;
  question: string;
  options?: { label: string; value: string }[];
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
