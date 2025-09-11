export interface Template {
  id: string;
  name: string;
  description: string;
  language: string;
  code: string;
  category: string;
}

export interface TemplateState {
  selectedTemplate: Template | null;
  templates: Template[];
  filteredTemplates: Template[];
  selectedCategory: string;
}