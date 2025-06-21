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
import { Plus, Save, AlertCircle, CheckCircle, Package } from 'lucide-react';

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

const initialEdges: Edge[] = [];

// Only nodes that are connected via edges will be published

export default function ProductFlowPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [nodeData, setNodeData] = useState<Record<string, any>>({});
  const nodeDataRef = React.useRef<Record<string, any>>({});

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeDataChange = useCallback((nodeId: string, data: any) => {
    setNodeData(prev => ({ ...prev, [nodeId]: data }));
    nodeDataRef.current[nodeId] = data;
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

    // Only include connected nodes in the export
    const connectedNodes = nodes.filter(node => connectedNodeIds.has(node.id));
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

    // Show summary
    const summary = `
Product: ${resolvedParams.id}
Connected nodes: ${connectedNodes.length}/${nodes.length}
Connected components: ${nodeGroups.length}
Edges: ${edges.length}
    `.trim();

    alert(`Data published successfully!\n\n${summary}`);
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
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Product ID: {resolvedParams.id}</span>
            <span>•</span>
            <span>Nodes: {nodes.length}</span>
            <span>•</span>
            <span>Connections: {edges.length}</span>
            {edges.length === 0 && (
              <span className="text-amber-600 font-medium">⚠ Connect nodes to publish</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addNewProduct}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Product
          </button>
          <button
            onClick={addNewIssues}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <AlertCircle className="w-4 h-4" />
            Issues
          </button>
          <button
            onClick={addNewSolutions}
            className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            Solutions
          </button>
          <button
            onClick={publishData}
            className={`flex items-center gap-1 px-3 py-2 text-sm font-medium text-white rounded-md transition-colors ${
              edges.length > 0
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={edges.length === 0}
          >
            <Save className="w-4 h-4" />
            Publish Connected ({(() => {
              const connectedIds = new Set<string>();
              edges.forEach(edge => {
                connectedIds.add(edge.source);
                connectedIds.add(edge.target);
              });
              return connectedIds.size;
            })()})
          </button>
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
