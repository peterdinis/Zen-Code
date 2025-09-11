import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Plus, 
  Github, 
  FolderOpen,
  Calendar,
  Code2,
  Star,
  Search,
  Trash2,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  lastModified: string;
  starred: boolean;
  type: 'local' | 'github';
  githubUrl?: string;
  framework?: string;
}

// Mock data pre ukážku
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'React E-commerce App',
    description: 'Modern e-commerce application built with React and TypeScript',
    language: 'TypeScript',
    lastModified: '2 hours ago',
    starred: true,
    type: 'github',
    githubUrl: 'https://github.com/user/ecommerce-app',
    framework: 'React'
  },
  {
    id: '2',
    name: 'Node.js API Server',
    description: 'RESTful API server with authentication and database integration',
    language: 'JavaScript',
    lastModified: '1 day ago',
    starred: false,
    type: 'local',
    framework: 'Node.js'
  },
  {
    id: '3',
    name: 'Vue.js Dashboard',
    description: 'Admin dashboard with charts and real-time data',
    language: 'Vue',
    lastModified: '3 days ago',
    starred: true,
    type: 'github',
    githubUrl: 'https://github.com/user/vue-dashboard',
    framework: 'Vue.js'
  }
];

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'local' | 'github'>('all');
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [isGithubImportDialogOpen, setIsGithubImportDialogOpen] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    name: '',
    description: '',
    language: 'JavaScript',
    framework: ''
  });
  const [githubUrl, setGithubUrl] = useState('');

  // Filter projects based on search and type
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || project.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleCreateProject = () => {
    if (!newProjectData.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectData.name,
      description: newProjectData.description,
      language: newProjectData.language,
      lastModified: 'Just now',
      starred: false,
      type: 'local',
      framework: newProjectData.framework
    };

    setProjects(prev => [newProject, ...prev]);
    setIsNewProjectDialogOpen(false);
    setNewProjectData({ name: '', description: '', language: 'JavaScript', framework: '' });
    toast.success('Project created successfully!');
  };

  const handleImportFromGithub = () => {
    if (!githubUrl.trim()) {
      toast.error('GitHub URL is required');
      return;
    }

    // Extract repo name from URL
    const repoName = githubUrl.split('/').pop() || 'Imported Project';
    
    const importedProject: Project = {
      id: Date.now().toString(),
      name: repoName,
      description: 'Imported from GitHub repository',
      language: 'JavaScript',
      lastModified: 'Just now',
      starred: false,
      type: 'github',
      githubUrl: githubUrl,
      framework: 'Unknown'
    };

    setProjects(prev => [importedProject, ...prev]);
    setIsGithubImportDialogOpen(false);
    setGithubUrl('');
    toast.success('Project imported from GitHub!');
  };

  const toggleStar = (projectId: string) => {
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, starred: !project.starred }
        : project
    ));
  };

  const deleteProject = (projectId: string) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    toast.success('Project deleted');
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-500',
      'Python': 'bg-green-500',
      'Vue': 'bg-emerald-500',
      'React': 'bg-cyan-500',
      'Node.js': 'bg-green-600'
    };
    return colors[language] || 'bg-gray-500';
  };

  // Empty state with Lottie-like animation
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
      {/* Animated illustration */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 flex items-center justify-center">
            <FolderOpen className="w-10 h-10 text-muted-foreground animate-bounce" />
          </div>
        </div>
        {/* Floating dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-ping"></div>
        <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-accent rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-foreground">No Projects Found</h3>
        <p className="text-muted-foreground max-w-md">
          {searchQuery || filterType !== 'all' 
            ? "No projects match your current filters. Try adjusting your search or filters."
            : "Start your coding journey by creating a new project or importing from GitHub."
          }
        </p>
      </div>
      
      {!searchQuery && filterType === 'all' && (
        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button className="hover:scale-105 transition-transform">
                <Plus className="w-4 h-4 mr-2" />
                Create New Project
              </Button>
            </DialogTrigger>
          </Dialog>
          
          <Dialog open={isGithubImportDialogOpen} onOpenChange={setIsGithubImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Github className="w-4 h-4 mr-2" />
                Import from GitHub
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">My Projects</h2>
          <p className="text-muted-foreground">Manage your coding projects</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
            <DialogTrigger asChild>
              <Button className="hover:scale-105 transition-transform">
                <Plus className="w-4 h-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
          </Dialog>
          
          <Dialog open={isGithubImportDialogOpen} onOpenChange={setIsGithubImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="hover:scale-105 transition-transform">
                <Github className="w-4 h-4 mr-2" />
                Import from GitHub
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            variant={filterType === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('all')}
            className="transition-all"
          >
            All
          </Button>
          <Button
            variant={filterType === 'local' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('local')}
            className="transition-all"
          >
            Local
          </Button>
          <Button
            variant={filterType === 'github' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType('github')}
            className="transition-all"
          >
            GitHub
          </Button>
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      <div className="flex-1 overflow-y-auto">
        {filteredProjects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="glass hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group animate-in fade-in-0 slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {project.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleStar(project.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Star 
                          className={`w-4 h-4 ${project.starred ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} 
                        />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteProject(project.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="gap-1">
                        <div className={`w-2 h-2 rounded-full ${getLanguageColor(project.language)}`} />
                        {project.language}
                      </Badge>
                      
                      {project.framework && (
                        <Badge variant="outline">
                          {project.framework}
                        </Badge>
                      )}
                      
                      {project.type === 'github' && (
                        <Badge variant="outline" className="gap-1">
                          <Github className="w-3 h-3" />
                          GitHub
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {project.lastModified}
                      </div>
                      
                      {project.githubUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-6 px-2 hover:text-primary"
                        >
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full hover:scale-105 transition-transform" 
                      size="sm"
                    >
                      <Code2 className="w-4 h-4 mr-2" />
                      Open Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* New Project Dialog */}
      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                value={newProjectData.name}
                onChange={(e) => setNewProjectData({...newProjectData, name: e.target.value})}
                placeholder="My Awesome Project"
                className="glass"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newProjectData.description}
                onChange={(e) => setNewProjectData({...newProjectData, description: e.target.value})}
                placeholder="A brief description of your project"
                className="glass"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={newProjectData.language}
                  onChange={(e) => setNewProjectData({...newProjectData, language: e.target.value})}
                  placeholder="JavaScript"
                  className="glass"
                />
              </div>
              
              <div>
                <Label htmlFor="framework">Framework (Optional)</Label>
                <Input
                  id="framework"
                  value={newProjectData.framework}
                  onChange={(e) => setNewProjectData({...newProjectData, framework: e.target.value})}
                  placeholder="React, Vue, etc."
                  className="glass"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsNewProjectDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* GitHub Import Dialog */}
      <Dialog open={isGithubImportDialogOpen} onOpenChange={setIsGithubImportDialogOpen}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Import from GitHub</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="github-url">Repository URL</Label>
              <Input
                id="github-url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username/repository"
                className="glass"
              />
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsGithubImportDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleImportFromGithub}>
                <Github className="w-4 h-4 mr-2" />
                Import Repository
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}