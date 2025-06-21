'use client';

import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Save, AlertCircle, CheckCircle, Package, ImageIcon, Upload, X, ArrowLeft } from 'lucide-react';
import { uploadImageToBlob, isValidImageFile, formatFileSize, BlobUploadResult, deleteImageFromSupabase } from '@/lib/blob-storage';

interface ProductData {
  name: string;
  description: string;
  extraText: string;
}

interface Issue {
  id: number;
  title: string;
  description: string;
}

interface Solution {
  id: number;
  title: string;
  description: string;
  steps: string[];
}

interface ImageData {
  image: BlobUploadResult | null;
  description: string;
}

// Product Node Component
const ProductNode = ({ data, id }: { data: any; id: string }) => {
  const [productData, setProductData] = useState<ProductData>({
    name: data.productData?.name || '',
    description: data.productData?.description || '',
    extraText: data.productData?.extraText || ''
  });

  // Update local state when data prop changes (for localStorage restore)
  React.useEffect(() => {
    if (data.productData) {
      setProductData({
        name: data.productData.name || '',
        description: data.productData.description || '',
        extraText: data.productData.extraText || ''
      });
    }
  }, [data.productData]);

  const updateField = (field: keyof ProductData, value: string) => {
    const updated = { ...productData, [field]: value };
    setProductData(updated);
    // Make sure we're calling onChange with the full productData structure
    data.onChange?.(id, { productData: updated });
  };

  // Also trigger onChange when component mounts to ensure initial data is saved
  React.useEffect(() => {
    if (productData.name || productData.description || productData.extraText) {
      data.onChange?.(id, { productData });
    }
  }, []); // Only run on mount

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !bg-blue-500 !border-2 !border-white !shadow-md"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !bg-blue-500 !border-2 !border-white !shadow-md"
      />

      <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-3 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-900">Product</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <input
              value={productData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="Product name"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <textarea
              value={productData.description}
              onChange={(e) => updateField('description', e.target.value)}
              placeholder="Describe your product"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="space-y-2">
            <textarea
              value={productData.extraText}
              onChange={(e) => updateField('extraText', e.target.value)}
              placeholder="Additional details, features, specifications..."
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Issues Node Component
const IssuesNode = ({ data, id }: { data: any; id: string }) => {
  const [issues, setIssues] = useState<Issue[]>(data.issues || []);

  // Update local state when data prop changes (for localStorage restore)
  React.useEffect(() => {
    if (data.issues) {
      setIssues(data.issues);
    }
  }, [data.issues]);

  const addIssue = () => {
    const newIssue: Issue = {
      id: Date.now(),
      title: '',
      description: ''
    };
    const updated = [...issues, newIssue];
    setIssues(updated);
    data.onChange?.(id, { issues: updated });
  };

  const updateIssue = (issueId: number, field: keyof Omit<Issue, 'id'>, value: string) => {
    const updated = issues.map(issue =>
      issue.id === issueId ? { ...issue, [field]: value } : issue
    );
    setIssues(updated);
    data.onChange?.(id, { issues: updated });
  };

  const removeIssue = (issueId: number) => {
    const updated = issues.filter(issue => issue.id !== issueId);
    setIssues(updated);
    data.onChange?.(id, { issues: updated });
  };

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !bg-red-500 !border-2 !border-white !shadow-md"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !bg-red-500 !border-2 !border-white !shadow-md"
      />

      <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="bg-red-50 border-b border-red-100 px-4 py-3 rounded-t-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-medium text-gray-900">Common Issues</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {issues.map((issue) => (
            <div key={issue.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <input
                value={issue.title || ''}
                onChange={(e) => updateIssue(issue.id, 'title', e.target.value)}
                placeholder="Issue title"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <textarea
                value={issue.description || ''}
                onChange={(e) => updateIssue(issue.id, 'description', e.target.value)}
                placeholder="Describe the issue"
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
              <button
                onClick={() => removeIssue(issue.id)}
                className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={addIssue}
            className="w-full flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Issue
          </button>
        </div>
      </div>
    </div>
  );
};

// Solutions Node Component
const SolutionsNode = ({ data, id }: { data: any; id: string }) => {
  const [solutions, setSolutions] = useState<Solution[]>(data.solutions || []);

  // Update local state when data prop changes (for localStorage restore)
  React.useEffect(() => {
    if (data.solutions) {
      setSolutions(data.solutions);
    }
  }, [data.solutions]);

  const addSolution = () => {
    const newSolution: Solution = {
      id: Date.now(),
      title: '',
      description: '',
      steps: ['']
    };
    const updated = [...solutions, newSolution];
    setSolutions(updated);
    data.onChange?.(id, { solutions: updated });
  };

  const updateSolution = (solutionId: number, field: keyof Omit<Solution, 'id'>, value: any) => {
    const updated = solutions.map(solution =>
      solution.id === solutionId ? { ...solution, [field]: value } : solution
    );
    setSolutions(updated);
    data.onChange?.(id, { solutions: updated });
  };

  const addStep = (solutionId: number) => {
    const updated = solutions.map(solution =>
      solution.id === solutionId
        ? { ...solution, steps: [...solution.steps, ''] }
        : solution
    );
    setSolutions(updated);
    data.onChange?.(id, { solutions: updated });
  };

  const updateStep = (solutionId: number, stepIndex: number, value: string) => {
    const updated = solutions.map(solution =>
      solution.id === solutionId
        ? {
            ...solution,
            steps: solution.steps.map((step, idx) => idx === stepIndex ? value : step)
          }
        : solution
    );
    setSolutions(updated);
    data.onChange?.(id, { solutions: updated });
  };

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !bg-green-500 !border-2 !border-white !shadow-md"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !bg-green-500 !border-2 !border-white !shadow-md"
      />

      <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="bg-green-50 border-b border-green-100 px-4 py-3 rounded-t-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <h3 className="text-sm font-medium text-gray-900">Solutions</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {solutions.map((solution) => (
            <div key={solution.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <input
                value={solution.title}
                onChange={(e) => updateSolution(solution.id, 'title', e.target.value)}
                placeholder="Solution title"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                value={solution.description}
                onChange={(e) => updateSolution(solution.id, 'description', e.target.value)}
                placeholder="Describe the solution"
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
              <div>
                <label className="text-xs font-medium text-gray-600">Steps:</label>
                {solution.steps.map((step, stepIdx) => (
                  <input
                    key={stepIdx}
                    value={step}
                    onChange={(e) => updateStep(solution.id, stepIdx, e.target.value)}
                    placeholder={`Step ${stepIdx + 1}`}
                    className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                ))}
                <button
                  onClick={() => addStep(solution.id)}
                  className="mt-1 flex items-center gap-1 px-3 py-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add Step
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addSolution}
            className="w-full flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Solution
          </button>
        </div>
      </div>
    </div>
  );
};

// Image + Description Node Component
const ImageDescriptionNode = ({ data, id }: { data: any; id: string }) => {
  const [imageData, setImageData] = useState<ImageData>({
    image: data.imageData?.image || null,
    description: data.imageData?.description || ''
  });
  const [isUploading, setIsUploading] = useState(false);

  // Update local state when data prop changes (for localStorage restore)
  React.useEffect(() => {
    if (data.imageData) {
      setImageData({
        image: data.imageData.image || null,
        description: data.imageData.description || ''
      });
    }
  }, [data.imageData]);

  const updateDescription = (description: string) => {
    const updated = { ...imageData, description };
    setImageData(updated);
    data.onChange?.(id, { imageData: updated });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      console.log('Starting upload for file:', file.name, 'Size:', file.size);
      const uploadResult = await uploadImageToBlob(file);
      console.log('Upload completed:', uploadResult);

      const updated = { ...imageData, image: uploadResult };
      setImageData(updated);
      data.onChange?.(id, { imageData: updated });
    } catch (error) {
      console.error('Detailed upload error:', error);

      // More specific error messages
      let errorMessage = 'Failed to upload image. ';
      if (error instanceof Error) {
        if (error.message.includes('bucket')) {
          errorMessage += 'Storage bucket not found. Please create an "images" bucket in your Supabase project.';
        } else if (error.message.includes('policy')) {
          errorMessage += 'Permission denied. Please check your Supabase storage policies.';
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage += 'Please check your Supabase configuration and try again.';
      }

      alert(errorMessage);
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const removeImage = async () => {
    if (imageData.image?.path) {
      try {
        await deleteImageFromSupabase(imageData.image.path);
      } catch (error) {
        console.error('Error deleting image from Supabase:', error);
        // Continue with local removal even if cloud deletion fails
      }
    }
    const updated = { ...imageData, image: null };
    setImageData(updated);
    data.onChange?.(id, { imageData: updated });
  };

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !bg-purple-500 !border-2 !border-white !shadow-md"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !bg-purple-500 !border-2 !border-white !shadow-md"
      />

      <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="bg-purple-50 border-b border-purple-100 px-4 py-3 rounded-t-lg">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-medium text-gray-900">Image + Description</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {/* Image Upload Section */}
          <div className="space-y-2">
            {!imageData.image ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-purple-500" />
                  </div>
                  <p className="text-sm text-gray-600">Upload an image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="mt-2 block w-full text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-medium file:bg-purple-50 file:text-purple-600 hover:file:bg-purple-100 file:cursor-pointer cursor-pointer"
                  />
                  {isUploading && (
                    <p className="text-xs text-purple-600">Uploading...</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imageData.image.url}
                  alt="Uploaded image"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <X className="w-3 h-3 text-gray-600" />
                </button>
                <div className="mt-2 text-xs text-gray-500">
                  {imageData.image.name} ({formatFileSize(imageData.image.size)})
                </div>
              </div>
            )}
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <textarea
              value={imageData.description}
              onChange={(e) => updateDescription(e.target.value)}
              placeholder="Describe this image and its relevance to your product..."
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  productNode: ProductNode,
  issuesNode: IssuesNode,
  solutionsNode: SolutionsNode,
  imageDescriptionNode: ImageDescriptionNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'productNode',
    position: { x: 100, y: 100 },
    data: { productData: {} },
  },
  {
    id: '2',
    type: 'issuesNode',
    position: { x: 450, y: 50 },
    data: { issues: [] },
  },
  {
    id: '3',
    type: 'solutionsNode',
    position: { x: 450, y: 300 },
    data: { solutions: [] },
  },
  {
    id: '4',
    type: 'imageDescriptionNode',
    position: { x: 450, y: 550 },
    data: { imageData: {} },
  },
];

const initialEdges: Edge[] = [];

// Only nodes that are connected via edges will be published

export default function ProductFlowPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [nodeData, setNodeData] = useState<Record<string, any>>({});
  const nodeDataRef = React.useRef<Record<string, any>>({});
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [projectParams, setProjectParams] = useState<{
    name?: string;
    tone?: string;
    prompt?: string;
  }>({});

  // Local storage key based on product ID
  const storageKey = `product-flow-${resolvedParams.id}`;

  // Extract URL parameters on component mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const params = {
        name: urlParams.get('name') || undefined,
        tone: urlParams.get('tone') || undefined,
        prompt: urlParams.get('prompt') || undefined,
      };
      setProjectParams(params);

      // If we have a product name from URL params, initialize the first product node with it
      if (params.name && !localStorage.getItem(storageKey)) {
        // Only set initial data if there's no saved data
        console.log('Initializing product with params:', params);
      }
    }
  }, [resolvedParams.id, storageKey]);

  // Define handleNodeDataChange first so it can be used in useEffect
  const handleNodeDataChange = useCallback((nodeId: string, data: any) => {
    console.log(`=== Node data change for ${nodeId} ===`, data);
    setNodeData(prev => {
      const updated = { ...prev, [nodeId]: data };
      nodeDataRef.current = updated;
      return updated;
    });
    console.log('Updated nodeDataRef:', nodeDataRef.current);
  }, []);

  // Initialize nodes and edges with proper data structure
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onChange: handleNodeDataChange,
      },
    }))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Load data from localStorage on component mount
  React.useEffect(() => {
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        console.log('Loading saved data from localStorage:', parsed);

        // Restore nodeData first
        if (parsed.nodeData) {
          setNodeData(parsed.nodeData);
          nodeDataRef.current = parsed.nodeData;
        }

        // Then restore nodes with the saved data merged in
        if (parsed.nodes) {
          const restoredNodes = parsed.nodes.map((savedNode: any) => {
            const nodeDataForThisNode = parsed.nodeData?.[savedNode.id] || {};
            return {
              ...savedNode,
              data: {
                ...savedNode.data,
                ...nodeDataForThisNode,
                onChange: handleNodeDataChange,
              },
            };
          });
          setNodes(restoredNodes);
        }

        if (parsed.edges) {
          setEdges(parsed.edges);
        }
      } else if (projectParams.name) {
        // No saved data but we have URL parameters - initialize first product node with them
        console.log('Initializing with project params:', projectParams);
        const initialProductData = {
          name: projectParams.name,
          description: projectParams.prompt || `${projectParams.name} - ${projectParams.tone || 'professional'} documentation`,
          extraText: ''
        };

        // Update the first product node with URL parameters
        setNodeData(prev => ({ ...prev, '1': { productData: initialProductData } }));
        nodeDataRef.current['1'] = { productData: initialProductData };

        // Update the first node's data
        setNodes(prev => prev.map(node =>
          node.id === '1' ? {
            ...node,
            data: {
              ...node.data,
              productData: initialProductData,
              onChange: handleNodeDataChange
            }
          } : node
        ));
      }
      setIsLoaded(true);
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      setIsLoaded(true);
    }
  }, [resolvedParams.id, handleNodeDataChange, setNodes, setEdges, projectParams]);

  // Save data to localStorage whenever nodes, edges, or nodeData changes
  React.useEffect(() => {
    if (!isLoaded) return; // Don't save until initial load is complete

    try {
      const dataToSave = {
        nodes: nodes.map(node => ({
          ...node,
          data: {
            // Remove the onChange function but keep all other data
            ...Object.fromEntries(
              Object.entries(node.data).filter(([key]) => key !== 'onChange')
            )
          }
        })),
        edges,
        nodeData: nodeDataRef.current,
        timestamp: new Date().toISOString()
      };

      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
      setLastSaved(new Date().toLocaleTimeString());

      // Update the project's lastModified timestamp in the saved projects list
      updateProjectLastModified(resolvedParams.id);

      console.log('Saved to localStorage:', dataToSave);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [nodes, edges, nodeData, storageKey, isLoaded, resolvedParams.id]);

  // Function to update project's lastModified timestamp
  const updateProjectLastModified = (projectId: string) => {
    try {
      const saved = localStorage.getItem('persona-projects');
      if (saved) {
        const projects = JSON.parse(saved);
        const updatedProjects = projects.map((project: any) =>
          project.id === projectId
            ? { ...project, lastModified: new Date().toISOString() }
            : project
        );
        localStorage.setItem('persona-projects', JSON.stringify(updatedProjects));
      }
    } catch (error) {
      console.error('Error updating project lastModified:', error);
    }
  };

  // Clear localStorage function
  const clearSavedData = () => {
    try {
      localStorage.removeItem(storageKey);
      // Reset to initial state
      setNodes(initialNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onChange: handleNodeDataChange,
        },
      })));
      setEdges(initialEdges);
      setNodeData({});
      nodeDataRef.current = {};
      setLastSaved(null);
      alert('Saved data cleared! Page reset to initial state.');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      alert('Error clearing saved data.');
    }
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewProduct = () => {
    const newNodeId = `product-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: 'productNode' as const,
      position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
      data: { productData: {}, onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewIssues = () => {
    const newNodeId = `issues-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: 'issuesNode' as const,
      position: { x: Math.random() * 200 + 450, y: Math.random() * 200 + 50 },
      data: { issues: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewSolutions = () => {
    const newNodeId = `solutions-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: 'solutionsNode' as const,
      position: { x: Math.random() * 200 + 450, y: Math.random() * 200 + 300 },
      data: { solutions: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewImageDescription = () => {
    const newNodeId = `image-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: 'imageDescriptionNode' as const,
      position: { x: Math.random() * 200 + 450, y: Math.random() * 200 + 550 },
      data: { imageData: {}, onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const publishData = () => {
    // Get all connected node IDs by traversing edges
    const getConnectedNodes = () => {
      const connectedNodeIds = new Set<string>();
      const nodeGroups: string[][] = [];

      // Find all connected components
      edges.forEach(edge => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);

        // Find existing group or create new one
        let sourceGroup = nodeGroups.find(group => group.includes(edge.source));
        let targetGroup = nodeGroups.find(group => group.includes(edge.target));

        if (!sourceGroup && !targetGroup) {
          // Create new group
          nodeGroups.push([edge.source, edge.target]);
        } else if (sourceGroup && !targetGroup) {
          // Add target to source group
          sourceGroup.push(edge.target);
        } else if (!sourceGroup && targetGroup) {
          // Add source to target group
          targetGroup.push(edge.source);
        } else if (sourceGroup && targetGroup && sourceGroup !== targetGroup) {
          // Merge groups
          sourceGroup.push(...targetGroup);
          const targetIndex = nodeGroups.indexOf(targetGroup);
          nodeGroups.splice(targetIndex, 1);
        }
      });

      return { connectedNodeIds, nodeGroups };
    };

    const { connectedNodeIds, nodeGroups } = getConnectedNodes();

    if (connectedNodeIds.size === 0) {
      alert('No connected nodes found! Please connect nodes with edges before publishing.');
      return;
    }

    // Check if there's a connected Product node
    const connectedNodes = nodes.filter(node => connectedNodeIds.has(node.id));
    const hasConnectedProductNode = connectedNodes.some(node => node.type === 'productNode');

    if (!hasConnectedProductNode) {
      alert('A Product node is required for publishing! Please connect at least one Product node to other nodes.');
      return;
    }

    // Generate clean CSV format - more paragraph-like
    const generateCSV = () => {
      let csv = 'Section,Content\\r\\n';

      // Helper function to escape CSV values
      const escapeCSV = (value: string) => {
        if (!value) return '';
        // If value contains comma, newline, or quote, wrap in quotes and escape internal quotes
        if (value.includes(',') || value.includes('\\r') || value.includes('\\n') || value.includes('"')) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      };

      console.log('=== DEBUG: Node data being processed ===');
      console.log('Connected nodes:', connectedNodes);
      console.log('Node data ref:', nodeDataRef.current);

      // Get product data - check multiple sources
      const productNode = connectedNodes.find(node => node.type === 'productNode');
      console.log('Product node found:', productNode);

      let productData = null;
      if (productNode) {
        // Try multiple ways to get the data
        productData = nodeDataRef.current[productNode.id] ||
                     productNode.data ||
                     nodeData[productNode.id] || {};
        console.log('Product data extracted:', productData);
      }

      // Product Overview Section
      let productOverview = '';
      if (productData && productData.productData) {
        const name = productData.productData.name || 'Untitled Product';
        const description = productData.productData.description || '';
        const details = productData.productData.extraText || '';

        productOverview = `Product: ${name}. `;
        if (description) productOverview += `Description: ${description}. `;
        if (details) productOverview += `Additional Details: ${details}. `;
        productOverview += `Product ID: ${resolvedParams.id}. Created: ${new Date().toISOString().split('T')[0]}. Connected Components: ${connectedNodes.length}.`;
      } else {
        productOverview = `Product: Untitled Product. Product ID: ${resolvedParams.id}. Created: ${new Date().toISOString().split('T')[0]}. Connected Components: ${connectedNodes.length}. (No product data available)`;
      }

      csv += `Product Overview,"${escapeCSV(productOverview)}"\\r\\n`;

      // Images Section
      const imageNodes = connectedNodes.filter(node => node.type === 'imageDescriptionNode');
      console.log('Image nodes found:', imageNodes);

      if (imageNodes.length > 0) {
        let imagesContent = '';
        imageNodes.forEach((node, index) => {
          const imageNodeData = nodeDataRef.current[node.id] || node.data || nodeData[node.id] || {};
          console.log(`Image node ${index + 1} data:`, imageNodeData);

          const imageData = imageNodeData.imageData || {};
          if (imageData) {
            if (index > 0) imagesContent += ' ';
            imagesContent += `Image ${index + 1}: `;
            if (imageData.image?.url) {
              imagesContent += `Available at ${imageData.image.url}. `;
            }
            if (imageData.description) {
              imagesContent += `Description: ${imageData.description}. `;
            }
          }
        });
        if (imagesContent) {
          csv += `Images and Media,"${escapeCSV(imagesContent.trim())}"\\r\\n`;
        }
      }

      // Common Issues Section
      const issueNodes = connectedNodes.filter(node => node.type === 'issuesNode');
      console.log('Issue nodes found:', issueNodes);

      if (issueNodes.length > 0) {
        let issuesContent = '';
        let issueCounter = 1;
        issueNodes.forEach(node => {
          const issueNodeData = nodeDataRef.current[node.id] || node.data || nodeData[node.id] || {};
          console.log('Issue node data:', issueNodeData);

          const issues = issueNodeData.issues || [];
          issues.forEach((issue: any) => {
            if (issue.title) {
              if (issuesContent) issuesContent += ' ';
              issuesContent += `Issue ${issueCounter}: ${issue.title}.`;
              if (issue.description) {
                issuesContent += ` ${issue.description}.`;
              }
              issueCounter++;
            }
          });
        });
        if (issuesContent) {
          csv += `Common Issues,"${escapeCSV(issuesContent.trim())}"\\r\\n`;
        }
      }

      // Solutions Section
      const solutionNodes = connectedNodes.filter(node => node.type === 'solutionsNode');
      console.log('Solution nodes found:', solutionNodes);

      if (solutionNodes.length > 0) {
        let solutionsContent = '';
        let solutionCounter = 1;
        solutionNodes.forEach(node => {
          const solutionNodeData = nodeDataRef.current[node.id] || node.data || nodeData[node.id] || {};
          console.log('Solution node data:', solutionNodeData);

          const solutions = solutionNodeData.solutions || [];
          solutions.forEach((solution: any) => {
            if (solution.title) {
              if (solutionsContent) solutionsContent += ' ';
              solutionsContent += `Solution ${solutionCounter}: ${solution.title}.`;
              if (solution.description) {
                solutionsContent += ` ${solution.description}.`;
              }
              if (solution.steps && solution.steps.length > 0) {
                const steps = solution.steps.filter((step: string) => step.trim());
                if (steps.length > 0) {
                  solutionsContent += ` Steps: ${steps.join(', ')}.`;
                }
              }
              solutionCounter++;
            }
          });
        });
        if (solutionsContent) {
          csv += `Solutions and Troubleshooting,"${escapeCSV(solutionsContent.trim())}"\\r\\n`;
        }
      }

      console.log('=== DEBUG: Final CSV generated ===');
      return csv;
    };

    const csvData = generateCSV();

    // Create formatted output
    const formattedOutput = {
      csv: csvData
    };

    console.log('=== PUBLISHED CSV DATA ===');
    console.log('JSON Format:');
    console.log(JSON.stringify(formattedOutput, null, 2));
    console.log('\\n=== RAW CSV CONTENT ===');
    console.log(csvData.replace(/\\\\r\\\\n/g, '\\n'));
    console.log('\\n=== FORMATTED CSV ===');
    // Show nicely formatted CSV for easy reading
    const readableCSV = csvData.replace(/\\\\r\\\\n/g, '\\n');
    console.log(readableCSV);

    // Only include connected nodes in the export
    const connectedEdges = edges;

    const allData = {
      productId: resolvedParams.id,
      connectedComponents: nodeGroups.length,
      nodes: connectedNodes.map(node => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: nodeDataRef.current[node.id] || node.data,
        isConnected: true
      })),
      edges: connectedEdges,
      metadata: {
        totalNodes: nodes.length,
        connectedNodes: connectedNodes.length,
        isolatedNodes: nodes.length - connectedNodes.length,
        timestamp: new Date().toISOString()
      }
    };

    console.log('Publishing connected data for product:', resolvedParams.id, allData);

    // Copy CSV to clipboard
    navigator.clipboard.writeText(JSON.stringify(formattedOutput)).then(() => {
      alert(`CSV data published and copied to clipboard!\\n\\nConnected nodes: ${connectedNodes.length}/${nodes.length}\\n\\nCheck browser console for detailed CSV output.`);
    }).catch(() => {
      alert(`CSV data published!\\n\\nConnected nodes: ${connectedNodes.length}/${nodes.length}\\n\\nCheck console for CSV output.`);
    });
  };

  // Helper function to check if publish is allowed
  const getPublishState = () => {
    if (edges.length === 0) {
      return { canPublish: false, reason: 'No connections' };
    }

    const connectedIds = new Set<string>();
    edges.forEach(edge => {
      connectedIds.add(edge.source);
      connectedIds.add(edge.target);
    });

    const connectedNodes = nodes.filter(node => connectedIds.has(node.id));
    const hasConnectedProductNode = connectedNodes.some(node => node.type === 'productNode');

    if (!hasConnectedProductNode) {
      return { canPublish: false, reason: 'No Product node connected' };
    }

    return { canPublish: true, reason: '', connectedCount: connectedIds.size };
  };

  const publishState = getPublishState();

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Clean, hierarchical top bar */}
      <div className="bg-white border-b">
        {/* Main navigation and title */}
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Persona Logo */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.history.back()}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-md transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="text-sm font-medium text-gray-600">Persona</span>
              </div>

              <div className="h-6 w-px bg-gray-200"></div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">Product Flow Builder</h1>

              </div>
            </div>
          </div>
        </div>

        {/* Building blocks section - emphasized and prominent */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">Add Components</span>
              <div className="flex gap-3">
                <button
                  onClick={addNewProduct}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Product
                </button>
                <button
                  onClick={addNewIssues}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all shadow-sm"
                >
                  <AlertCircle className="w-4 h-4" />
                  Issues
                </button>
                <button
                  onClick={addNewSolutions}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Solutions
                </button>
                <button
                  onClick={addNewImageDescription}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all shadow-sm"
                >
                  <ImageIcon className="w-4 h-4" />
                  Image
                </button>
              </div>
            </div>

            {/* Action buttons - positioned on the right */}
            <div className="flex items-center gap-3">
              <button
                onClick={clearSavedData}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 bg-white border border-gray-200 hover:border-red-200 rounded-lg transition-all shadow-sm"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
              <button
                onClick={publishData}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all shadow-sm ${
                  publishState.canPublish
                    ? 'bg-gray-900 text-white border-gray-900 hover:bg-gray-800 hover:border-gray-800'
                    : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                }`}
                disabled={!publishState.canPublish}
                title={!publishState.canPublish ? publishState.reason : 'Publish connected components'}
              >
                <Save className="w-4 h-4" />
                Publish
              </button>
            </div>
          </div>
        </div>

        {/* Status info - small and subtle */}
        <div className="px-6 pb-3 border-t border-gray-50">
          <div className="flex items-center gap-4 pt-3 text-xs text-gray-400">
            <span>ID: {resolvedParams.id}</span>
            {projectParams.name && (
              <>
                <span>•</span>
                <span>{projectParams.name}</span>
              </>
            )}
            {projectParams.tone && (
              <>
                <span>•</span>
                <span>{projectParams.tone}</span>
              </>
            )}
            <span>•</span>
            <span>{nodes.length} nodes</span>
            <span>•</span>
            <span>{edges.length} connections</span>
            {lastSaved && (
              <>
                <span>•</span>
                <span className="text-green-500">Saved {lastSaved}</span>
              </>
            )}
            {!publishState.canPublish && (
              <>
                <span>•</span>
                <span className="text-amber-500 font-medium">{publishState.reason}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gray-50"
        >
          <Controls />
          <Background gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
