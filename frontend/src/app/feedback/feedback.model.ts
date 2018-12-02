import { AppState } from '@app/core';

export interface Employee {
  id: string;
  name: string;
  email: string;
  employeeNo: string;
  gender: boolean;
  avatar: string;
  title: string;
  reportTo?: string;
}

export interface FeedbackState {}

export interface State extends AppState {
  feedback: FeedbackState;
}
