import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText,
  Download,
  Globe,
  Database,
  Smartphone,
  Server,
} from "lucide-react";
import { toast } from "sonner";

const templates = [
  {
    category: "Web Frontend",
    icon: Globe,
    color: "bg-primary/20 text-primary",
    templates: [
      {
        name: "React App",
        language: "javascript",
        description: "Basic React component with hooks",
        code: `import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <h1>Hello React!</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;`
      },
      {
        name: "Vue Component", 
        language: "javascript",
        description: "Vue 3 composition API component",
        code: `<template>
  <div class="vue-app">
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">Increment</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const title = ref('Hello Vue!')
const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<style scoped>
.vue-app {
  padding: 20px;
}
</style>`
      }
    ]
  },
  {
    category: "Backend",
    icon: Server,
    color: "bg-accent/20 text-accent",
    templates: [
      {
        name: "Express API",
        language: "javascript", 
        description: "Node.js Express server",
        code: `const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: \`User \${id}\` });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
      },
      {
        name: "FastAPI Python",
        language: "python",
        description: "Python FastAPI server", 
        code: `from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class User(BaseModel):
    id: int
    name: str
    email: Optional[str] = None

users_db = []

@app.get("/")
async def root():
    return {"message": "Hello FastAPI!"}

@app.post("/users/", response_model=User)
async def create_user(user: User):
    users_db.append(user)
    return user

@app.get("/users/", response_model=List[User])
async def get_users():
    return users_db

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`
      }
    ]
  },
  {
    category: "Mobile",
    icon: Smartphone,
    color: "bg-electric-blue/20 text-electric-blue", 
    templates: [
      {
        name: "React Native",
        language: "javascript",
        description: "React Native mobile app",
        code: `import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.body}>
          <Text style={styles.title}>Hello React Native!</Text>
          <Text style={styles.counter}>Count: {count}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.buttonText}>Increment</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  counter: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default App;`
      }
    ]
  },
  {
    category: "Data Science",
    icon: Database,
    color: "bg-neon-pink/20 text-neon-pink",
    templates: [
      {
        name: "Data Analysis",
        language: "python",
        description: "Pandas data analysis starter",
        code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Load and explore data
def load_data(file_path):
    """Load dataset and perform initial exploration"""
    df = pd.read_csv(file_path)
    
    print("Dataset Info:")
    print(f"Shape: {df.shape}")
    print(f"Columns: {df.columns.tolist()}")
    print("\\nData Types:")
    print(df.dtypes)
    print("\\nMissing Values:")
    print(df.isnull().sum())
    
    return df

# Basic statistics
def analyze_data(df):
    """Perform basic statistical analysis"""
    print("\\nDescriptive Statistics:")
    print(df.describe())
    
    # Correlation matrix
    plt.figure(figsize=(10, 8))
    correlation_matrix = df.corr()
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm')
    plt.title('Correlation Matrix')
    plt.show()
    
    return correlation_matrix

# Example usage
if __name__ == "__main__":
    # Replace with your dataset path
    # df = load_data('your_dataset.csv')
    # analyze_data(df)
    
    # Sample data for demo
    np.random.seed(42)
    sample_data = pd.DataFrame({
        'feature1': np.random.normal(0, 1, 100),
        'feature2': np.random.normal(2, 1.5, 100),
        'target': np.random.randint(0, 2, 100)
    })
    
    print("Sample Analysis:")
    analyze_data(sample_data)`
      }
    ]
  }
];

interface TemplateSelectorProps {
  onTemplateSelect: (code: string, language: string) => void;
}

export function TemplateSelector({ onTemplateSelect }: TemplateSelectorProps) {
  const handleTemplateClick = (template: any) => {
    onTemplateSelect(template.code, template.language);
    toast.success(`${template.name} template loaded!`);
  };

  return (
    <div className="space-y-6">
      {templates.map((category) => (
        <Card key={category.category} className="glass p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category.color}`}>
              <category.icon className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold">{category.category}</h3>
          </div>
          
          <div className="grid gap-4">
            {category.templates.map((template, index) => (
              <Card key={index} className="p-4 border border-border/50 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <FileText className="w-4 h-4 text-primary" />
                      <h4 className="font-medium">{template.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {template.language}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {template.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleTemplateClick(template)}
                    className="shrink-0 ml-3"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}