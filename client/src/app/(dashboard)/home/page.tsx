"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PersonaIcon, BrainIcon, PackageIcon, SparklesIcon, FileIcon, ClockIcon, TrashIcon, PlusIcon, ArrowRightIcon } from '@/components/icons';

interface ProjectFormData {
  productName: string;
  tone: string;
  prompt: string;
}

interface SavedProject {
  id: string;
  name: string;
  tone: string;
  prompt: string;
  createdAt: string;
  lastModified: string;
}

export default function Home() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [formData, setFormData] = useState<ProjectFormData>({
    productName: '',
    tone: 'professional',
    prompt: ''
  });

  // Load saved projects from localStorage on component mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('persona-projects');
      if (saved) {
        const projects = JSON.parse(saved);
        setSavedProjects(projects);
      }
    } catch (error) {
      console.error('Error loading saved projects:', error);
    }
  }, []);

  // Save projects to localStorage
  const saveProjectsToStorage = (projects: SavedProject[]) => {
    try {
      localStorage.setItem('persona-projects', JSON.stringify(projects));
      setSavedProjects(projects);
    } catch (error) {
      console.error('Error saving projects:', error);
    }
  };

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Clear, formal, and business-focused' },
    { value: 'friendly', label: 'Friendly', description: 'Warm, approachable, and conversational' },
    { value: 'technical', label: 'Technical', description: 'Detailed, precise, and expert-level' },
    { value: 'casual', label: 'Casual', description: 'Relaxed, informal, and easy-going' },
    { value: 'authoritative', label: 'Authoritative', description: 'Confident, decisive, and commanding' },
    { value: 'empathetic', label: 'Empathetic', description: 'Understanding, supportive, and caring' }
  ];

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateProject = () => {
    if (!formData.productName.trim()) {
      alert('Please enter a product name');
      return;
    }

    setIsCreating(true);

    // Generate a unique project ID
    const projectId = `${formData.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Date.now()}`;

    // Create new project object
    const newProject: SavedProject = {
      id: projectId,
      name: formData.productName,
      tone: formData.tone,
      prompt: formData.prompt || `Create comprehensive documentation for ${formData.productName} with a ${formData.tone} tone.`,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    };

    // Save to localStorage
    const updatedProjects = [newProject, ...savedProjects];
    saveProjectsToStorage(updatedProjects);

    // Clear the form
    setFormData({
      productName: '',
      tone: 'professional',
      prompt: ''
    });

    // Encode the parameters to pass to the product page
    const params = new URLSearchParams({
      name: formData.productName,
      tone: formData.tone,
      prompt: formData.prompt || `Create comprehensive documentation for ${formData.productName} with a ${formData.tone} tone.`
    });

    // Navigate to the product page with parameters
    router.push(`/product/${projectId}?${params.toString()}`);
  };

  const quickStartTemplates = [
    {
      name: 'SaaS Product',
      tone: 'professional',
      prompt: 'Create comprehensive documentation for a SaaS product including features, pricing, integrations, and user guides.'
    },
    {
      name: 'Mobile App',
      tone: 'friendly',
      prompt: 'Document a mobile application with user-friendly guides, troubleshooting tips, and feature explanations.'
    },
    {
      name: 'API Documentation',
      tone: 'technical',
      prompt: 'Generate technical documentation for an API including endpoints, authentication, examples, and error handling.'
    }
  ];

  const handleQuickStart = (template: typeof quickStartTemplates[0]) => {
    setFormData({
      productName: template.name,
      tone: template.tone,
      prompt: template.prompt
    });
  };

  // Open an existing project
  const handleOpenProject = (project: SavedProject) => {
    const params = new URLSearchParams({
      name: project.name,
      tone: project.tone,
      prompt: project.prompt
    });
    router.push(`/product/${project.id}?${params.toString()}`);
  };

  // Delete a project
  const handleDeleteProject = (projectId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      const updatedProjects = savedProjects.filter(p => p.id !== projectId);
      saveProjectsToStorage(updatedProjects);

      // Also remove from localStorage for the specific project
      try {
        localStorage.removeItem(`product-flow-${projectId}`);
      } catch (error) {
        console.error('Error removing project data:', error);
      }
    }
  };

  // Clear all projects
  const handleClearAllProjects = () => {
    if (confirm('Are you sure you want to delete ALL projects? This action cannot be undone.')) {
      // Remove all project data from localStorage
      savedProjects.forEach(project => {
        try {
          localStorage.removeItem(`product-flow-${project.id}`);
        } catch (error) {
          console.error('Error removing project data:', error);
        }
      });

      // Clear the projects list
      saveProjectsToStorage([]);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-xl">
              <div className="text-white">
                <SparklesIcon size={24} />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-black tracking-tight">Persona</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Create intelligent documentation flows for your products. Build connected knowledge bases with precision and elegance.
          </p>
        </div>

        {/* Quick Start Templates */}
        <div id="templates" className="mb-16">
          <h2 className="text-2xl font-bold text-black mb-8">Quick Start Templates</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickStartTemplates.map((template, index) => (
              <button
                key={index}
                onClick={() => handleQuickStart(template)}
                className="group p-6 border border-gray-200 rounded-xl text-left hover:border-black hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-100 group-hover:bg-black rounded-lg flex items-center justify-center transition-colors duration-300">
                    <div className="text-gray-600 group-hover:text-white">
                      <BrainIcon size={20} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-black text-lg">{template.name}</h3>
                </div>
                <p className="text-gray-600 mb-4 leading-relaxed line-clamp-2">{template.prompt}</p>
                <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg">
                  {template.tone}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Saved Projects */}
        {savedProjects.length > 0 && (
          <div id="projects" className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-black">Recent Projects</h2>
              <button
                onClick={handleClearAllProjects}
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
              >
                <TrashIcon />
                Clear All
              </button>
            </div>
            <div className="space-y-4">
              {savedProjects.slice(0, 5).map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleOpenProject(project)}
                  className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-black hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="font-semibold text-black text-lg truncate">{project.name}</h3>
                        <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-gray-100 text-gray-700 rounded-lg">
                          {project.tone}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <ClockIcon />
                          <span>Created {formatDate(project.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ArrowRightIcon size={12} />
                          <span>Open Project</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="ml-4 p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete Project"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
              {savedProjects.length > 5 && (
                <div className="text-center pt-4">
                  <p className="text-gray-500">
                    Showing 5 of {savedProjects.length} projects
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Create New Project Form */}
        <div id="create" className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
              <div className="text-white">
                <PackageIcon />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-black">Create New Project</h2>
          </div>

          <div className="space-y-8">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Product Name *
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder="e.g., MyAwesome App, CloudSync Pro, DataViz Dashboard"
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-black placeholder-gray-400 text-lg"
              />
            </div>

            {/* Tone Selection */}
            <div>
              <label className="block text-sm font-semibold text-black mb-4">
                Documentation Tone
              </label>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {toneOptions.map((tone) => (
                  <button
                    key={tone.value}
                    onClick={() => handleInputChange('tone', tone.value)}
                    className={`p-4 border rounded-xl text-left transition-all duration-300 ${
                      formData.tone === tone.value
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-400 bg-white text-black'
                    }`}
                  >
                    <div className="font-semibold mb-2">{tone.label}</div>
                    <div className={`text-sm ${formData.tone === tone.value ? 'text-gray-300' : 'text-gray-600'}`}>
                      {tone.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Prompt */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Custom Instructions (Optional)
              </label>
              <textarea
                value={formData.prompt}
                onChange={(e) => handleInputChange('prompt', e.target.value)}
                placeholder="Describe what kind of documentation you want to create, specific requirements, target audience, etc."
                rows={5}
                className="w-full px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent resize-none text-black placeholder-gray-400"
              />
              <p className="text-sm text-gray-500 mt-2">
                Leave empty to use the default prompt based on your product name and tone.
              </p>
            </div>

            {/* Create Button */}
            <div className="flex justify-end pt-6">
              <button
                onClick={handleCreateProject}
                disabled={isCreating || !formData.productName.trim()}
                className={`flex items-center gap-3 px-8 py-4 text-white font-semibold rounded-xl transition-all duration-300 ${
                  isCreating || !formData.productName.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl'
                }`}
              >
                {isCreating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <PlusIcon />
                    Create Project
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-2xl p-6">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="text-white">
                <FileIcon size={20} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-black mb-2">What happens next?</h3>
              <p className="text-gray-600 leading-relaxed">
                You'll be taken to the visual flow editor where you can create connected documentation nodes,
                add images, define issues and solutions, and publish clean CSV documentation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
