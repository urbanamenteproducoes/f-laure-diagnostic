export interface DiagnosticResult {
  id: string;
  date: string;
  companyName: string;
  answers: Record<string, any>;
  scores: {
    overall: number;
    readiness: number;
    efficiency: number;
    categories: Record<string, number>;
  };
  recommendations: Recommendation[];
}

export interface Recommendation {
  title: string;
  description: string;
  priority: 'Alta' | 'Média' | 'Baixa';
  department: string;
}

export interface QuizOption {
  label: string;
  value: string;
  description?: string;
}

export interface QuizQuestionCondition {
  field: string;
  operator: 'equals' | 'not_equals' | 'contains' | 'not_contains' | 'in' | 'not_in';
  value: any;
}

export interface QuizQuestion {
  id: string;
  label: string;
  type: 'text' | 'single_choice' | 'multiple_choice';
  placeholder?: string;
  options?: QuizOption[];
  condition?: QuizQuestionCondition;
  or_conditions?: QuizQuestionCondition[];
}

export interface QuizStep {
  id: string;
  title: string;
  subtitle: string;
  icon?: string;
  questions: QuizQuestion[];
}
