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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Save, AlertCircle, CheckCircle } from 'lucide-react';

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

// Product Node Component
const ProductNode = ({ data, id }: { data: any; id: string }) => {
  const [productData, setProductData] = useState<ProductData>({
    name: data.productData?.name || '',
    description: data.productData?.description || '',
    extraText: data.productData?.extraText || ''
  });

  const updateField = (field: keyof ProductData, value: string) => {
    const updated = { ...productData, [field]: value };
    setProductData(updated);
    data.onChange?.(id, updated);
  };

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="bg-blue-50">
        <CardTitle className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          Product Information
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div>
          <Label htmlFor="product-name" className="text-xs">Product Name</Label>
          <Input
            id="product-name"
            value={productData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Enter product name"
            className="text-sm"
          />
        </div>

        <div>
          <Label htmlFor="product-description" className="text-xs">Description</Label>
          <Textarea
            id="product-description"
            value={productData.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Describe your product"
            rows={2}
            className="text-sm"
          />
        </div>

        <div>
          <Label htmlFor="product-extra" className="text-xs">Additional Information</Label>
          <Textarea
            id="product-extra"
            value={productData.extraText}
            onChange={(e) => updateField('extraText', e.target.value)}
            placeholder="Extra details, specifications, etc."
            rows={2}
            className="text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Issues Node Component
const IssuesNode = ({ data, id }: { data: any; id: string }) => {
  const [issues, setIssues] = useState<Issue[]>(data.issues || []);

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
    <Card className="w-80 shadow-lg">
      <CardHeader className="bg-red-50">
        <CardTitle className="flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 text-red-500" />
          Common Issues
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {issues.map((issue) => (
          <div key={issue.id} className="border rounded-lg p-3 space-y-2">
            <Input
              value={issue.title || ''}
              onChange={(e) => updateIssue(issue.id, 'title', e.target.value)}
              placeholder="Issue title"
              className="text-sm"
            />
            <Textarea
              value={issue.description || ''}
              onChange={(e) => updateIssue(issue.id, 'description', e.target.value)}
              placeholder="Describe the issue"
              rows={2}
              className="text-sm"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeIssue(issue.id)}
              className="text-xs"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={addIssue} variant="outline" className="w-full text-xs">
          <Plus className="w-3 h-3 mr-1" />
          Add Issue
        </Button>
      </CardContent>
    </Card>
  );
};

// Solutions Node Component
const SolutionsNode = ({ data, id }: { data: any; id: string }) => {
  const [solutions, setSolutions] = useState<Solution[]>(data.solutions || []);

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
    <Card className="w-80 shadow-lg">
      <CardHeader className="bg-green-50">
        <CardTitle className="flex items-center gap-2 text-sm">
          <CheckCircle className="w-4 h-4 text-green-500" />
          Solutions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {solutions.map((solution) => (
          <div key={solution.id} className="border rounded-lg p-3 space-y-2">
            <Input
              value={solution.title}
              onChange={(e) => updateSolution(solution.id, 'title', e.target.value)}
              placeholder="Solution title"
              className="text-sm"
            />
            <Textarea
              value={solution.description}
              onChange={(e) => updateSolution(solution.id, 'description', e.target.value)}
              placeholder="Describe the solution"
              rows={2}
              className="text-sm"
            />
            <div>
              <Label className="text-xs">Steps:</Label>
              {solution.steps.map((step, stepIdx) => (
                <Input
                  key={stepIdx}
                  value={step}
                  onChange={(e) => updateStep(solution.id, stepIdx, e.target.value)}
                  placeholder={`Step ${stepIdx + 1}`}
                  className="mt-1 text-sm"
                />
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => addStep(solution.id)}
                className="mt-1 text-xs"
              >
                <Plus className="w-3 h-3 mr-1" />
                Add Step
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={addSolution} variant="outline" className="w-full text-xs">
          <Plus className="w-3 h-3 mr-1" />
          Add Solution
        </Button>
      </CardContent>
    </Card>
  );
};

const nodeTypes: NodeTypes = {
  productNode: ProductNode,
  issuesNode: IssuesNode,
  solutionsNode: SolutionsNode,
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
];

const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    animated: true,
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    animated: true,
  },
];

export default function ProductFlowPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeData, setNodeData] = useState<Record<string, any>>({});

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeDataChange = useCallback((nodeId: string, data: any) => {
    setNodeData(prev => ({ ...prev, [nodeId]: data }));
  }, []);

  const addNewProduct = () => {
    const newNodeId = `product-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: 'productNode',
      position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
      data: { productData: {}, onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewIssues = () => {
    const newNodeId = `issues-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: 'issuesNode',
      position: { x: Math.random() * 200 + 450, y: Math.random() * 200 + 50 },
      data: { issues: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewSolutions = () => {
    const newNodeId = `solutions-${Date.now()}`;
    const newNode: Node = {
      id: newNodeId,
      type: 'solutionsNode',
      position: { x: Math.random() * 200 + 450, y: Math.random() * 200 + 300 },
      data: { solutions: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const publishData = () => {
    const allData = {
      productId: resolvedParams.id,
      nodes: nodes.map(node => ({
        id: node.id,
        type: node.type,
        data: nodeData[node.id] || node.data
      })),
      edges: edges,
      timestamp: new Date().toISOString()
    };

    console.log('Publishing data for product:', resolvedParams.id, allData);
    alert(`Data for product ${resolvedParams.id} saved successfully!`);
  };

  // Update nodes with onChange handler
  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onChange: handleNodeDataChange,
        },
      }))
    );
  }, [handleNodeDataChange, setNodes]);

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <div>
          <h1 className="text-xl font-bold">Product Flow Builder</h1>
          <p className="text-sm text-gray-500">Product ID: {resolvedParams.id}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={addNewProduct} variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Product
          </Button>
          <Button onClick={addNewIssues} variant="outline" size="sm">
            <AlertCircle className="w-4 h-4 mr-1" />
            Issues
          </Button>
          <Button onClick={addNewSolutions} variant="outline" size="sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            Solutions
          </Button>
          <Button onClick={publishData} className="bg-blue-600 hover:bg-blue-700" size="sm">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
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
