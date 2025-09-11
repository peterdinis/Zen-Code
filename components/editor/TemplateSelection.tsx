// components/TemplateSection.tsx
"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { filterByCategory, selectTemplate, setTemplates } from '@/redux/slices/templateSlices';
import { AppDispatch, RootState } from '@/redux/store';

// Define template types
interface Template {
  id: string;
  name: string;
  description: string;
  language: string;
  code: string;
  category: string;
}

// Define props interface
interface TemplateSectionProps {
  onTemplateSelect: (templateCode: string, templateLanguage: string) => void;
}

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-900">
      <div className="text-white">Loading editor...</div>
    </div>
  )
});

const TemplateSection: React.FC<TemplateSectionProps> = ({ onTemplateSelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    templates,
    filteredTemplates,
    selectedTemplate,
    selectedCategory
  } = useSelector((state: RootState) => state.templates);

  const [categories, setCategories] = React.useState<string[]>([]);

  // Initialize templates
  useEffect(() => {
    const initialTemplates: Template[] = [
      {
        id: 'react-component',
        name: 'React Component',
        description: 'Basic React component with TypeScript',
        language: 'typescript',
        code: `import React from 'react';

interface Props {
  name: string;
}

const MyComponent: React.FC<Props> = ({ name }) => {
  return (
    <div className="p-4 bg-blue-100 rounded-lg">
      <h1>Hello, {name}!</h1>
      <p>This is a React component with TypeScript.</p>
    </div>
  );
};

export default MyComponent;`,
        category: 'Web Frontend'
      },
      // ... (other templates remain the same)
    ];

    dispatch(setTemplates(initialTemplates));
    
    // Extract unique categories
    const uniqueCategories = ['all', ...new Set(initialTemplates.map(t => t.category))];
    setCategories(uniqueCategories as string[]);
    
    // Set the first template as selected by default
    if (initialTemplates.length > 0 && !selectedTemplate) {
      dispatch(selectTemplate(initialTemplates[0]));
    }
  }, [dispatch]);

  // Handle template selection
  const handleSelectTemplate = (template: Template) => {
    dispatch(selectTemplate(template));
    // Call the parent callback function
    onTemplateSelect(template.code, template.language);
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    dispatch(filterByCategory(category));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Head>
        <title>Template Section with Monaco Editor</title>
        <meta name="description" content="Template selection with Monaco editor" />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Code Templates
          </h1>
          <p className="text-gray-400">Select a template to view and edit in the Monaco editor</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Template sidebar */}
          <div className="w-full lg:w-1/3 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-700">
              <h2 className="text-xl font-semibold">Templates</h2>
            </div>
            
            {/* Category filter */}
            <div className="p-4 bg-gray-750">
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Template list */}
            <div className="overflow-y-auto max-h-96">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={`p-4 border-b border-gray-700 cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id
                      ? 'bg-blue-900 bg-opacity-30'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <h3 className="font-medium text-lg">{template.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{template.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{template.category}</span>
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                      {template.language}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor section */}
          <div className="w-full lg:w-2/3 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 bg-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {selectedTemplate?.name || 'Select a template'}
              </h2>
              <div className="text-sm text-gray-400">
                {selectedTemplate?.language.toUpperCase()}
              </div>
            </div>
            
            <div className="h-96 md:h-[500px]">
              {selectedTemplate ? (
                <MonacoEditor
                  height="100%"
                  language={selectedTemplate.language}
                  value={selectedTemplate.code}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                    padding: { top: 10 }
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-900">
                  <p className="text-gray-500">Select a template to start editing</p>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-gray-750 flex justify-between items-center">
              <div className="text-sm text-gray-400">
                {selectedTemplate?.category} • {selectedTemplate?.language}
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-700 rounded text-sm hover:bg-gray-600 transition-colors">
                  Copy Code
                </button>
                <button className="px-4 py-2 bg-blue-600 rounded text-sm hover:bg-blue-500 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSection;