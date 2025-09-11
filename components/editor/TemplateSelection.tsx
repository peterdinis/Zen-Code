import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';

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
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>([]);
  const editorRef = useRef<any>(null);

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
      {
        id: 'vue-component',
        name: 'Vue Component',
        description: 'Vue composition API component',
        language: 'javascript',
        code: `<template>
  <div class="greeting">
    <h1>{{ greeting }}</h1>
    <button @click="changeGreeting">Change Greeting</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const greeting = ref('Hello, Vue!');

const changeGreeting = () => {
  greeting.value = greeting.value === 'Hello, Vue!' 
    ? 'Hi from Vue!' 
    : 'Hello, Vue!';
};
</script>

<style scoped>
.greeting {
  padding: 1rem;
  text-align: center;
}
</style>`,
        category: 'Web Frontend'
      },
      {
        id: 'express-api',
        name: 'Express API',
        description: 'Node.js Express server with TypeScript',
        language: 'typescript',
        code: `import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express API!' });
});

app.get('/api/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' }
  ];
  res.json(users);
});

// Start server
app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});`,
        category: 'Backend'
      },
      {
        id: 'fastapi-python',
        name: 'FastAPI Python',
        description: 'Python FastAPI server',
        language: 'python',
        code: `from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

class Item(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    tax: Optional[float] = None

@app.get("/")
async def read_root():
    return {"message": "Hello from FastAPI"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Optional[str] = None):
    return {"item_id": item_id, "q": q}

@app.post("/items/")
async def create_item(item: Item):
    return item

@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Item):
    return {"item_id": item_id, **item.dict()}`,
        category: 'Backend'
      },
      {
        id: 'react-native',
        name: 'React Native',
        description: 'React Native mobile app component',
        language: 'javascript',
        code: `import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Counter</Text>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={decrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={increment}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  count: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
    minWidth: 60,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;`,
        category: 'Mobile'
      },
      {
        id: 'sql-query',
        name: 'SQL Query',
        description: 'Create and query database tables',
        language: 'sql',
        code: `-- Create users table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (username, email) VALUES
('johndoe', 'john@example.com'),
('janedoe', 'jane@example.com');

INSERT INTO posts (user_id, title, content, published) VALUES
(1, 'First Post', 'This is my first post!', TRUE),
(1, 'Draft Post', 'This is a draft post.', FALSE),
(2, 'Jane''s Post', 'Hello from Jane!', TRUE);

-- Query to get all published posts with author info
SELECT 
    p.title, 
    p.content, 
    p.created_at, 
    u.username as author
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE p.published = TRUE
ORDER BY p.created_at DESC;`,
        category: 'Database'
      }
    ];

    setTemplates(initialTemplates);
    setFilteredTemplates(initialTemplates);
    
    // Extract unique categories
    const uniqueCategories = ['all', ...new Set(initialTemplates.map(t => t.category))];
    setCategories(uniqueCategories as string[]);
    
    // Set the first template as selected by default
    if (initialTemplates.length > 0 && !selectedTemplate) {
      setSelectedTemplate(initialTemplates[0]);
    }
  }, []);

  // Handle template selection
  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template);
    // Call the parent callback function
    onTemplateSelect(template.code, template.language);
  };

  // Handle category filter
  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(templates.filter(t => t.category === category));
    }
  };

  // Handle editor mounting
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
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
                  onMount={handleEditorDidMount}
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