"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import {
  filterByCategory,
  selectTemplate,
  setTemplates,
} from "@/redux/slices/templateSlices";
import { AppDispatch, RootState } from "@/redux/store";

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
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-900">
      <div className="text-white">Loading editor...</div>
    </div>
  ),
});

const TemplateSection: React.FC<TemplateSectionProps> = ({
  onTemplateSelect,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { templates, filteredTemplates, selectedTemplate, selectedCategory } =
    useSelector((state: RootState) => state.templates);

  const [categories, setCategories] = React.useState<string[]>([]);

  // Initialize templates
  useEffect(() => {
    const initialTemplates: Template[] = [
      // Frontend Templates
      {
        id: "react-component",
        name: "React Component",
        description: "Basic React component with TypeScript",
        language: "typescript",
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
        category: "Frontend",
      },
      {
        id: "react-hooks",
        name: "React Hooks",
        description: "React component with useState and useEffect hooks",
        language: "typescript",
        code: `import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/user/1');
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError('Failed to fetch user');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;`,
        category: "Frontend",
      },
      {
        id: "vue-composition",
        name: "Vue Composition API",
        description: "Vue 3 component with Composition API",
        language: "javascript",
        code: `<template>
  <div class="counter">
    <h2>Counter: {{ count }}</h2>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const doubleCount = computed(() => count.value * 2);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};

const reset = () => {
  count.value = 0;
};

onMounted(() => {
  console.log('Counter component mounted');
});
</script>

<style scoped>
.counter {
  padding: 20px;
  text-align: center;
}

button {
  margin: 5px;
  padding: 10px 15px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #2980b9;
}
</style>`,
        category: "Frontend",
      },
      {
        id: "angular-component",
        name: "Angular Component",
        description: "Basic Angular component with TypeScript",
        language: "typescript",
        code: `import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.loading = true;
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.products = [
        { id: 1, name: 'Product 1', price: 29.99, description: 'Description 1' },
        { id: 2, name: 'Product 2', price: 49.99, description: 'Description 2' },
        { id: 3, name: 'Product 3', price: 19.99, description: 'Description 3' }
      ];
    } catch (error) {
      this.error = 'Failed to load products';
    } finally {
      this.loading = false;
    }
  }

  addToCart(product: Product): void {
    console.log('Added to cart:', product);
    // Implement cart logic here
  }
}`,
        category: "Frontend",
      },
      {
        id: "svelte-component",
        name: "Svelte Component",
        description: "Svelte component with reactive state",
        language: "javascript",
        code: `<script>
  let count = 0;
  let name = 'World';
  
  $: doubled = count * 2;
  $: console.log(\`The count is \${count}\`);

  function increment() {
    count += 1;
  }

  function decrement() {
    count -= 1;
  }

  function reset() {
    count = 0;
  }
</script>

<div class="counter">
  <h1>Hello {name}!</h1>
  
  <div class="count-display">
    <h2>Count: {count}</h2>
    <p>Doubled: {doubled}</p>
  </div>

  <div class="buttons">
    <button on:click={increment}>+</button>
    <button on:click={decrement}>-</button>
    <button on:click={reset}>Reset</button>
  </div>

  <input bind:value={name} placeholder="Enter your name" />
</div>

<style>
  .counter {
    padding: 20px;
    text-align: center;
    font-family: Arial, sans-serif;
  }

  .count-display {
    margin: 20px 0;
  }

  .buttons button {
    margin: 0 5px;
    padding: 10px 15px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .buttons button:hover {
    background: #2980b9;
  }

  input {
    margin-top: 20px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>`,
        category: "Frontend",
      },

      // Backend Templates
      {
        id: "express-api",
        name: "Express API",
        description: "Node.js Express server with TypeScript",
        language: "typescript",
        code: `import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Hello from Express API!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

app.get('/api/users', (req: Request, res: Response) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.json(users);
});

app.post('/api/users', (req: Request, res: Response) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  res.status(201).json(newUser);
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});`,
        category: "Backend",
      },
      {
        id: "fastapi-crud",
        name: "FastAPI CRUD",
        description: "FastAPI with full CRUD operations",
        language: "python",
        code: `from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI(title="Todo API", version="1.0.0")

# In-memory database
todos = []

class Todo(BaseModel):
    id: str
    title: str
    description: Optional[str] = None
    completed: bool = False
    created_at: datetime
    updated_at: datetime

class TodoCreate(BaseModel):
    title: str
    description: Optional[str] = None

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

@app.get("/")
async def root():
    return {"message": "Welcome to Todo API", "version": "1.0.0"}

@app.get("/todos", response_model=List[Todo])
async def get_todos(completed: Optional[bool] = None):
    if completed is not None:
        return [todo for todo in todos if todo.completed == completed]
    return todos

@app.get("/todos/{todo_id}", response_model=Todo)
async def get_todo(todo_id: str):
    for todo in todos:
        if todo.id == todo_id:
            return todo
    raise HTTPException(status_code=404, detail="Todo not found")

@app.post("/todos", response_model=Todo, status_code=201)
async def create_todo(todo_create: TodoCreate):
    todo_id = str(uuid.uuid4())
    now = datetime.now()
    
    todo = Todo(
        id=todo_id,
        title=todo_create.title,
        description=todo_create.description,
        created_at=now,
        updated_at=now
    )
    
    todos.append(todo)
    return todo

@app.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: str, todo_update: TodoUpdate):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            update_data = todo_update.dict(exclude_unset=True)
            updated_todo = todo.copy(update=update_data)
            updated_todo.updated_at = datetime.now()
            todos[index] = updated_todo
            return updated_todo
    
    raise HTTPException(status_code=404, detail="Todo not found")

@app.delete("/todos/{todo_id}", status_code=204)
async def delete_todo(todo_id: str):
    for index, todo in enumerate(todos):
        if todo.id == todo_id:
            todos.pop(index)
            return
    
    raise HTTPException(status_code=404, detail="Todo not found")`,
        category: "Backend",
      },
      {
        id: "nestjs-controller",
        name: "NestJS Controller",
        description: "NestJS controller with TypeORM",
        language: "typescript",
        code: `import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

interface CreateUserDto {
  name: string;
  email: string;
  age?: number;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
}

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: parseInt(id) } });
    
    if (!user) {
      throw new NotFoundException(\`User with ID \${id} not found\`);
    }
    
    return user;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new NotFoundException(\`User with email \${email} not found\`);
    }
    
    return user;
  }
}`,
        category: "Backend",
      },
      {
        id: "django-view",
        name: "Django View",
        description: "Django REST framework view",
        language: "python",
        code: `from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Product
from .serializers import ProductSerializer

@api_view(['GET', 'POST'])
def product_list(request):
    """
    List all products, or create a new product.
    """
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def product_detail(request, pk):
    """
    Retrieve, update or delete a product instance.
    """
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def product_search(request):
    """
    Search products by name or description.
    """
    query = request.GET.get('q', '')
    
    if not query:
        return Response(
            {'error': 'Query parameter "q" is required'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    products = Product.objects.filter(
        models.Q(name__icontains=query) | 
        models.Q(description__icontains=query)
    )
    
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def product_bulk_create(request):
    """
    Create multiple products at once.
    """
    serializer = ProductSerializer(data=request.data, many=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)`,
        category: "Backend",
      },
      {
        id: "spring-boot",
        name: "Spring Boot",
        description: "Spring Boot REST controller",
        language: "java",
        code: `package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);
        
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public User createUser(@Valid @RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id, 
            @Valid @RequestBody User userDetails) {
        
        Optional<User> optionalUser = userRepository.findById(id);
        
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        User user = optionalUser.get();
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setAge(userDetails.getAge());
        
        User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        
        if (optionalUser.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        
        userRepository.delete(optionalUser.get());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String name) {
        return userRepository.findByNameContainingIgnoreCase(name);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userRepository.findByEmail(email);
        
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
}`,
        category: "Backend",
      },
      {
        id: "graphql-apollo",
        name: "GraphQL Apollo",
        description: "GraphQL server with Apollo and TypeScript",
        language: "typescript",
        code: `import { ApolloServer } from 'apollo-server';
import { gql } from 'apollo-server-core';

// Type definitions
const typeDefs = gql\`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    createdAt: String!
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    usersByAge(min: Int, max: Int): [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    updateUser(id: ID!, name: String, email: String, age: Int): User!
    deleteUser(id: ID!): Boolean!
  }

  type Subscription {
    userCreated: User!
  }
\`;

// Sample data
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    createdAt: new Date().toISOString(),
  },
];

// Resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (_, { id }) => users.find(user => user.id === id),
    usersByAge: (_, { min, max }) => {
      return users.filter(user => {
        if (min !== undefined && user.age < min) return false;
        if (max !== undefined && user.age > max) return false;
        return true;
      });
    },
  },

  Mutation: {
    createUser: (_, { name, email, age }) => {
      const newUser = {
        id: String(users.length + 1),
        name,
        email,
        age,
        createdAt: new Date().toISOString(),
      };
      users.push(newUser);
      return newUser;
    },

    updateUser: (_, { id, name, email, age }) => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const updatedUser = {
        ...users[userIndex],
        ...(name && { name }),
        ...(email && { email }),
        ...(age !== undefined && { age }),
      };

      users[userIndex] = updatedUser;
      return updatedUser;
    },

    deleteUser: (_, { id }) => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      users.splice(userIndex, 1);
      return true;
    },
  },
};

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

// Start server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(\`🚀 Server ready at \${url}\`);
});`,
        category: "Backend",
      },
    ];

    dispatch(setTemplates(initialTemplates));

    // Extract unique categories
    const uniqueCategories = [
      "all",
      ...new Set(initialTemplates.map((t) => t.category)),
    ];
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
    <div className="min-h-screen text-white">
      <Head>
        <title>Template Section with Monaco Editor</title>
        <meta
          name="description"
          content="Template selection with Monaco editor"
        />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Code Templates
          </h1>
          <p className="text-gray-400">
            Select a template to view and edit in the Monaco editor
          </p>
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
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryFilter(category)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Template list */}
            <div className="overflow-y-auto max-h-96">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={`p-4 border-b border-gray-700 cursor-pointer transition-colors ${
                    selectedTemplate?.id === template.id
                      ? "bg-blue-900 bg-opacity-30"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <h3 className="font-medium text-lg">{template.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {template.description}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {template.category}
                    </span>
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
                {selectedTemplate?.name || "Select a template"}
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
                    wordWrap: "on",
                    automaticLayout: true,
                    padding: { top: 10 },
                  }}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-900">
                  <p className="text-gray-500">
                    Select a template to start editing
                  </p>
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
