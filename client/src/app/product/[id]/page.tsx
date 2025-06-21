"use client";

import React, { useCallback, useEffect, useState } from "react";
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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle, ArrowLeft, CheckCircle, ImageIcon, Loader2, Package, Plus, Save, Upload, X, Settings, Hash, Users, Target, Zap, TrendingUp, DollarSign, Cpu } from 'lucide-react';
import { uploadImageToBlob, isValidImageFile, formatFileSize, BlobUploadResult, deleteImageFromSupabase } from '@/lib/blob-storage';

interface ProductData {
  name: string;
  description: string;
  extraText: string;
}

interface CustomField {
  id: number;
  key: string;
  value: string;
}

interface CustomComponentType {
  id: string;
  name: string;
  icon: string;
  color: string;
  fields: string[];
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
    name: data.productData?.name || "",
    description: data.productData?.description || "",
    extraText: data.productData?.extraText || "",
  });

  // Update local state when data prop changes (for localStorage restore)
  React.useEffect(() => {
    if (data.productData) {
      setProductData({
        name: data.productData.name || "",
        description: data.productData.description || "",
        extraText: data.productData.extraText || "",
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
            <h3 className="text-sm font-medium text-gray-900">Product Overview</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <input
              value={productData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Product name"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <textarea
              value={productData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe your product"
              rows={2}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="space-y-2">
            <textarea
              value={productData.extraText}
              onChange={(e) => updateField("extraText", e.target.value)}
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
      title: "",
      description: "",
    };
    const updated = [...issues, newIssue];
    setIssues(updated);
    data.onChange?.(id, { issues: updated });
  };

  const updateIssue = (
    issueId: number,
    field: keyof Omit<Issue, "id">,
    value: string
  ) => {
    const updated = issues.map((issue) =>
      issue.id === issueId ? { ...issue, [field]: value } : issue
    );
    setIssues(updated);
    data.onChange?.(id, { issues: updated });
  };

  const removeIssue = (issueId: number) => {
    const updated = issues.filter((issue) => issue.id !== issueId);
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
            <h3 className="text-sm font-medium text-gray-900">Product Limitations</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="border border-gray-200 rounded-lg p-3 space-y-2"
            >
              <input
                value={issue.title || ""}
                onChange={(e) => updateIssue(issue.id, "title", e.target.value)}
                placeholder="Issue title"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <textarea
                value={issue.description || ""}
                onChange={(e) =>
                  updateIssue(issue.id, "description", e.target.value)
                }
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
      title: "",
      description: "",
      steps: [""],
    };
    const updated = [...solutions, newSolution];
    setSolutions(updated);
    data.onChange?.(id, { solutions: updated });
  };

  const updateSolution = (
    solutionId: number,
    field: keyof Omit<Solution, "id">,
    value: any
  ) => {
    const updated = solutions.map((solution) =>
      solution.id === solutionId ? { ...solution, [field]: value } : solution
    );
    setSolutions(updated);
    data.onChange?.(id, { solutions: updated });
  };

  const addStep = (solutionId: number) => {
    const updated = solutions.map((solution) =>
      solution.id === solutionId
        ? { ...solution, steps: [...solution.steps, ""] }
        : solution
    );
    setSolutions(updated);
    data.onChange?.(id, { solutions: updated });
  };

  const updateStep = (solutionId: number, stepIndex: number, value: string) => {
    const updated = solutions.map((solution) =>
      solution.id === solutionId
        ? {
            ...solution,
            steps: solution.steps.map((step, idx) =>
              idx === stepIndex ? value : step
            ),
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
            <h3 className="text-sm font-medium text-gray-900">Product Capabilities</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              className="border border-gray-200 rounded-lg p-3 space-y-2"
            >
              <input
                value={solution.title}
                onChange={(e) =>
                  updateSolution(solution.id, "title", e.target.value)
                }
                placeholder="Solution title"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <textarea
                value={solution.description}
                onChange={(e) =>
                  updateSolution(solution.id, "description", e.target.value)
                }
                placeholder="Describe the solution"
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
              <div>
                <label className="text-xs font-medium text-gray-600">
                  Steps:
                </label>
                {solution.steps.map((step, stepIdx) => (
                  <input
                    key={stepIdx}
                    value={step}
                    onChange={(e) =>
                      updateStep(solution.id, stepIdx, e.target.value)
                    }
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
    description: data.imageData?.description || "",
  });
  const [isUploading, setIsUploading] = useState(false);

  // Update local state when data prop changes (for localStorage restore)
  React.useEffect(() => {
    if (data.imageData) {
      setImageData({
        image: data.imageData.image || null,
        description: data.imageData.description || "",
      });
    }
  }, [data.imageData]);

  const updateDescription = (description: string) => {
    const updated = { ...imageData, description };
    setImageData(updated);
    data.onChange?.(id, { imageData: updated });
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      alert("Please select a valid image file (JPEG, PNG, GIF, WebP)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      console.log("Starting upload for file:", file.name, "Size:", file.size);
      const uploadResult = await uploadImageToBlob(file);
      console.log("Upload completed:", uploadResult);

      const updated = { ...imageData, image: uploadResult };
      setImageData(updated);
      data.onChange?.(id, { imageData: updated });
    } catch (error) {
      console.error("Detailed upload error:", error);

      // More specific error messages
      let errorMessage = "Failed to upload image. ";
      if (error instanceof Error) {
        if (error.message.includes("bucket")) {
          errorMessage +=
            'Storage bucket not found. Please create an "images" bucket in your Supabase project.';
        } else if (error.message.includes("policy")) {
          errorMessage +=
            "Permission denied. Please check your Supabase storage policies.";
        } else {
          errorMessage += error.message;
        }
      } else {
        errorMessage +=
          "Please check your Supabase configuration and try again.";
      }

      alert(errorMessage);
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = "";
    }
  };

  const removeImage = async () => {
    if (imageData.image?.path) {
      try {
        await deleteImageFromSupabase(imageData.image.path);
      } catch (error) {
        console.error("Error deleting image from Supabase:", error);
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
            <h3 className="text-sm font-medium text-gray-900">
              Image + Description
            </h3>
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
                  {imageData.image.name} ({formatFileSize(imageData.image.size)}
                  )
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

// Custom Field Node Component
const CustomFieldNode = ({ data, id }: { data: any; id: string }) => {
  const [customFields, setCustomFields] = useState<CustomField[]>(data.customFields || []);

  // Update local state when data prop changes (for localStorage restore)
  React.useEffect(() => {
    if (data.customFields) {
      setCustomFields(data.customFields);
    }
  }, [data.customFields]);

  const addCustomField = () => {
    const newField: CustomField = {
      id: Date.now(),
      key: '',
      value: ''
    };
    const updated = [...customFields, newField];
    setCustomFields(updated);
    data.onChange?.(id, { customFields: updated });
  };

  const updateCustomField = (fieldId: number, fieldType: 'key' | 'value', newValue: string) => {
    const updated = customFields.map(field =>
      field.id === fieldId ? { ...field, [fieldType]: newValue } : field
    );
    setCustomFields(updated);
    data.onChange?.(id, { customFields: updated });
  };

  const removeCustomField = (fieldId: number) => {
    const updated = customFields.filter(field => field.id !== fieldId);
    setCustomFields(updated);
    data.onChange?.(id, { customFields: updated });
  };

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !bg-orange-500 !border-2 !border-white !shadow-md"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !bg-orange-500 !border-2 !border-white !shadow-md"
      />

      <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="bg-orange-50 border-b border-orange-100 px-4 py-3 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-orange-500" />
            <h3 className="text-sm font-medium text-gray-900">Custom Fields</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {customFields.map((field) => (
            <div key={field.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
              <div className="flex gap-2">
                <input
                  value={field.key}
                  onChange={(e) => updateCustomField(field.id, 'key', e.target.value)}
                  placeholder="Field name (e.g., Price, Weight, SKU)"
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button
                  onClick={() => removeCustomField(field.id)}
                  className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <textarea
                value={field.value}
                onChange={(e) => updateCustomField(field.id, 'value', e.target.value)}
                placeholder="Field value"
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
          <button
            onClick={addCustomField}
            className="w-full flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Custom Field
          </button>
        </div>
      </div>
    </div>
  );
};

// Features Node Component
const FeaturesNode = ({ data, id }: { data: any; id: string }) => {
  const [features, setFeatures] = useState<Issue[]>(data.features || []);

  React.useEffect(() => {
    if (data.features) {
      setFeatures(data.features);
    }
  }, [data.features]);

  const addFeature = () => {
    const newFeature: Issue = {
      id: Date.now(),
      title: "",
      description: "",
    };
    const updated = [...features, newFeature];
    setFeatures(updated);
    data.onChange?.(id, { features: updated });
  };

  const updateFeature = (
    featureId: number,
    field: keyof Omit<Issue, "id">,
    value: string
  ) => {
    const updated = features.map((feature) =>
      feature.id === featureId ? { ...feature, [field]: value } : feature
    );
    setFeatures(updated);
    data.onChange?.(id, { features: updated });
  };

  const removeFeature = (featureId: number) => {
    const updated = features.filter((feature) => feature.id !== featureId);
    setFeatures(updated);
    data.onChange?.(id, { features: updated });
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
            <Zap className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-900">Features</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="border border-gray-200 rounded-lg p-3 space-y-2"
            >
              <div className="flex justify-between items-center">
                <input
                  value={feature.title}
                  onChange={(e) =>
                    updateFeature(feature.id, "title", e.target.value)
                  }
                  placeholder="Feature name"
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={() => removeFeature(feature.id)}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={feature.description}
                onChange={(e) =>
                  updateFeature(feature.id, "description", e.target.value)
                }
                placeholder="Feature description"
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
          <button
            onClick={addFeature}
            className="w-full flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Feature
          </button>
        </div>
      </div>
    </div>
  );
};

// Use Cases Node Component
const UseCasesNode = ({ data, id }: { data: any; id: string }) => {
  const [useCases, setUseCases] = useState<Issue[]>(data.useCases || []);

  React.useEffect(() => {
    if (data.useCases) {
      setUseCases(data.useCases);
    }
  }, [data.useCases]);

  const addUseCase = () => {
    const newUseCase: Issue = {
      id: Date.now(),
      title: "",
      description: "",
    };
    const updated = [...useCases, newUseCase];
    setUseCases(updated);
    data.onChange?.(id, { useCases: updated });
  };

  const updateUseCase = (
    useCaseId: number,
    field: keyof Omit<Issue, "id">,
    value: string
  ) => {
    const updated = useCases.map((useCase) =>
      useCase.id === useCaseId ? { ...useCase, [field]: value } : useCase
    );
    setUseCases(updated);
    data.onChange?.(id, { useCases: updated });
  };

  const removeUseCase = (useCaseId: number) => {
    const updated = useCases.filter((useCase) => useCase.id !== useCaseId);
    setUseCases(updated);
    data.onChange?.(id, { useCases: updated });
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
            <Target className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-medium text-gray-900">Use Cases</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {useCases.map((useCase) => (
            <div
              key={useCase.id}
              className="border border-gray-200 rounded-lg p-3 space-y-2"
            >
              <div className="flex justify-between items-center">
                <input
                  value={useCase.title}
                  onChange={(e) =>
                    updateUseCase(useCase.id, "title", e.target.value)
                  }
                  placeholder="Use case title"
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  onClick={() => removeUseCase(useCase.id)}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={useCase.description}
                onChange={(e) =>
                  updateUseCase(useCase.id, "description", e.target.value)
                }
                placeholder="Use case description"
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
          <button
            onClick={addUseCase}
            className="w-full flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Use Case
          </button>
        </div>
      </div>
    </div>
  );
};

// Personas Node Component
const PersonasNode = ({ data, id }: { data: any; id: string }) => {
  const [personas, setPersonas] = useState<Issue[]>(data.personas || []);

  React.useEffect(() => {
    if (data.personas) {
      setPersonas(data.personas);
    }
  }, [data.personas]);

  const addPersona = () => {
    const newPersona: Issue = {
      id: Date.now(),
      title: "",
      description: "",
    };
    const updated = [...personas, newPersona];
    setPersonas(updated);
    data.onChange?.(id, { personas: updated });
  };

  const updatePersona = (
    personaId: number,
    field: keyof Omit<Issue, "id">,
    value: string
  ) => {
    const updated = personas.map((persona) =>
      persona.id === personaId ? { ...persona, [field]: value } : persona
    );
    setPersonas(updated);
    data.onChange?.(id, { personas: updated });
  };

  const removePersona = (personaId: number) => {
    const updated = personas.filter((persona) => persona.id !== personaId);
    setPersonas(updated);
    data.onChange?.(id, { personas: updated });
  };

  return (
    <div className="relative">
      <Handle
        type="target"
        position={Position.Left}
        className="!w-4 !h-4 !bg-indigo-500 !border-2 !border-white !shadow-md"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="!w-4 !h-4 !bg-indigo-500 !border-2 !border-white !shadow-md"
      />

      <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="bg-indigo-50 border-b border-indigo-100 px-4 py-3 rounded-t-lg">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-500" />
            <h3 className="text-sm font-medium text-gray-900">Target Users</h3>
          </div>
        </div>

        <div className="p-4 space-y-3">
          {personas.map((persona) => (
            <div
              key={persona.id}
              className="border border-gray-200 rounded-lg p-3 space-y-2"
            >
              <div className="flex justify-between items-center">
                <input
                  value={persona.title}
                  onChange={(e) =>
                    updatePersona(persona.id, "title", e.target.value)
                  }
                  placeholder="User persona name"
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => removePersona(persona.id)}
                  className="ml-2 p-1 text-gray-400 hover:text-red-500 rounded-md transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                value={persona.description}
                onChange={(e) =>
                  updatePersona(persona.id, "description", e.target.value)
                }
                placeholder="Describe this user persona, their needs, and pain points"
                rows={2}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
          <button
            onClick={addPersona}
            className="w-full flex items-center justify-center gap-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add User Persona
          </button>
        </div>
      </div>
    </div>
  );
};

const nodeTypes: NodeTypes = {
  // Renamed existing nodes for better product modeling
  overviewNode: ProductNode, // productNode -> overviewNode (Product Overview)
  limitationsNode: IssuesNode, // issuesNode -> limitationsNode (Product Limitations)
  capabilitiesNode: SolutionsNode, // solutionsNode -> capabilitiesNode (Product Capabilities)
  mediaNode: ImageDescriptionNode, // imageDescriptionNode -> mediaNode (Media Assets)
  customFieldNode: CustomFieldNode, // Custom key-value fields
  // New node types for comprehensive product modeling
  featuresNode: FeaturesNode, // Product Features
  useCasesNode: UseCasesNode, // Use Cases and Applications
  personasNode: PersonasNode, // Target Users/Personas
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "overviewNode", // Renamed from productNode
    position: { x: 100, y: 100 },
    data: { productData: {} },
  },
  {
    id: "2",
    type: "limitationsNode", // Renamed from issuesNode
    position: { x: 450, y: 50 },
    data: { issues: [] },
  },
  {
    id: "3",
    type: "capabilitiesNode", // Renamed from solutionsNode
    position: { x: 450, y: 300 },
    data: { solutions: [] },
  },
  {
    id: "4",
    type: "mediaNode", // Renamed from imageDescriptionNode
    position: { x: 450, y: 550 },
    data: { imageData: {} },
  },
];

const initialEdges: Edge[] = [];

// Only nodes that are connected via edges will be published

export default function ProductFlowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
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


  // Bot creation states
  const [isCreatingBot, setIsCreatingBot] = useState(false);
  const [botUrl, setBotUrl] = useState("");
  const [showBotDialog, setShowBotDialog] = useState(false);
  const [botError, setBotError] = useState("");

  // Local storage key based on product ID
  const storageKey = `product-flow-${resolvedParams.id}`;

  // Extract URL parameters on component mount
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const params = {
        name: urlParams.get("name") || undefined,
        tone: urlParams.get("tone") || undefined,
        prompt: urlParams.get("prompt") || undefined,
      };
      setProjectParams(params);

      // If we have a product name from URL params, initialize the first product node with it
      if (params.name && !localStorage.getItem(storageKey)) {
        // Only set initial data if there's no saved data
        console.log("Initializing product with params:", params);
      }
    }
  }, [resolvedParams.id, storageKey]);

  // Define handleNodeDataChange first so it can be used in useEffect
  const handleNodeDataChange = useCallback((nodeId: string, data: any) => {
    console.log(`=== Node data change for ${nodeId} ===`, data);
    setNodeData((prev) => {
      const updated = { ...prev, [nodeId]: data };
      nodeDataRef.current = updated;
      return updated;
    });
    console.log("Updated nodeDataRef:", nodeDataRef.current);
  }, []);

  // Initialize nodes and edges with proper data structure
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map((node) => ({
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
        console.log("Loading saved data from localStorage:", parsed);

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
        console.log("Initializing with project params:", projectParams);
        const initialProductData = {
          name: projectParams.name,
          description:
            projectParams.prompt ||
            `${projectParams.name} - ${
              projectParams.tone || "professional"
            } documentation`,
          extraText: "",
        };

        // Update the first product node with URL parameters
        setNodeData((prev) => ({
          ...prev,
          "1": { productData: initialProductData },
        }));
        nodeDataRef.current["1"] = { productData: initialProductData };

        // Update the first node's data
        setNodes((prev) =>
          prev.map((node) =>
            node.id === "1"
              ? {
                  ...node,
                  data: {
                    ...node.data,
                    productData: initialProductData,
                    onChange: handleNodeDataChange,
                  },
                }
              : node
          )
        );
      }
      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      setIsLoaded(true);
    }
  }, [
    resolvedParams.id,
    handleNodeDataChange,
    setNodes,
    setEdges,
    projectParams,
  ]);

  // Save data to localStorage whenever nodes, edges, or nodeData changes
  React.useEffect(() => {
    if (!isLoaded) return; // Don't save until initial load is complete

    try {
      const dataToSave = {
        nodes: nodes.map((node) => ({
          ...node,
          data: {
            // Remove the onChange function but keep all other data
            ...Object.fromEntries(
              Object.entries(node.data).filter(([key]) => key !== "onChange")
            ),
          },
        })),
        edges,
        nodeData: nodeDataRef.current,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem(storageKey, JSON.stringify(dataToSave));
      setLastSaved(new Date().toLocaleTimeString());

      // Update the project's lastModified timestamp in the saved projects list
      updateProjectLastModified(resolvedParams.id);

      console.log("Saved to localStorage:", dataToSave);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [nodes, edges, nodeData, storageKey, isLoaded, resolvedParams.id]);

  // Function to update project's lastModified timestamp
  const updateProjectLastModified = (projectId: string) => {
    try {
      const saved = localStorage.getItem("persona-projects");
      if (saved) {
        const projects = JSON.parse(saved);
        const updatedProjects = projects.map((project: any) =>
          project.id === projectId
            ? { ...project, lastModified: new Date().toISOString() }
            : project
        );
        localStorage.setItem(
          "persona-projects",
          JSON.stringify(updatedProjects)
        );
      }
    } catch (error) {
      console.error("Error updating project lastModified:", error);
    }
  };

  // Clear localStorage function
  const clearSavedData = () => {
    try {
      localStorage.removeItem(storageKey);
      // Reset to initial state
      setNodes(
        initialNodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            onChange: handleNodeDataChange,
          },
        }))
      );
      setEdges(initialEdges);
      setNodeData({});
      nodeDataRef.current = {};
      setLastSaved(null);
      alert("Saved data cleared! Page reset to initial state.");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
      alert("Error clearing saved data.");
    }
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewOverview = () => {
    const newNodeId = `overview-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: "overviewNode" as const, // Renamed from productNode
      position: { x: Math.random() * 200 + 100, y: Math.random() * 200 + 100 },
      data: { productData: {}, onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewFeatures = () => {
    const newNodeId = `features-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: "featuresNode" as const,
      position: { x: Math.random() * 200 + 700, y: Math.random() * 200 + 100 },
      data: { features: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewUseCases = () => {
    const newNodeId = `usecases-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: "useCasesNode" as const,
      position: { x: Math.random() * 200 + 700, y: Math.random() * 200 + 300 },
      data: { useCases: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewCapabilities = () => {
    const newNodeId = `capabilities-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: "capabilitiesNode" as const, // Renamed from solutionsNode
      position: { x: Math.random() * 200 + 450, y: Math.random() * 200 + 300 },
      data: { solutions: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewLimitations = () => {
    const newNodeId = `limitations-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: "limitationsNode" as const, // Renamed from issuesNode
      position: { x: Math.random() * 200 + 450, y: Math.random() * 200 + 50 },
      data: { issues: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewPersonas = () => {
    const newNodeId = `personas-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: "personasNode" as const,
      position: { x: Math.random() * 200 + 700, y: Math.random() * 200 + 500 },
      data: { personas: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewMedia = () => {
    const newNodeId = `media-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: "mediaNode" as const, // Renamed from imageDescriptionNode
      position: { x: Math.random() * 200 + 450, y: Math.random() * 200 + 550 },
      data: { imageData: {}, onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const addNewCustomField = () => {
    const newNodeId = `custom-${Date.now()}`;
    const newNode = {
      id: newNodeId,
      type: 'customFieldNode' as const,
      position: { x: Math.random() * 200 + 450, y: Math.random() * 200 + 400 },
      data: { customFields: [], onChange: handleNodeDataChange },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const publishData = async () => {
    // Get all connected node IDs by traversing edges
    const getConnectedNodes = () => {
      const connectedNodeIds = new Set<string>();
      const nodeGroups: string[][] = [];

      // Find all connected components
      edges.forEach((edge) => {
        connectedNodeIds.add(edge.source);
        connectedNodeIds.add(edge.target);

        // Find existing group or create new one
        let sourceGroup = nodeGroups.find((group) =>
          group.includes(edge.source)
        );
        let targetGroup = nodeGroups.find((group) =>
          group.includes(edge.target)
        );

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
      alert(
        "No connected nodes found! Please connect nodes with edges before publishing."
      );
      return;
    }

    // Check if there's a connected Overview node
    const connectedNodes = nodes.filter((node) =>
      connectedNodeIds.has(node.id)
    );
    const hasConnectedOverviewNode = connectedNodes.some(
      (node) => node.type === "overviewNode" // Updated from productNode
    );

    if (!hasConnectedOverviewNode) {
      alert(
        "An Overview node is required for publishing! Please connect at least one Overview node to other nodes."
      );
      return;
    }

    // Generate clean CSV format - more paragraph-like
    const generateCSV = () => {
      let csv = 'Section,Content\r\n';

      // Helper function to escape CSV values
      const escapeCSV = (value: string) => {
        if (!value) return "";
        if (
          value.includes(",") ||
          value.includes("\r") ||
          value.includes("\n") ||
          value.includes('"')
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      };

      console.log("=== DEBUG: Node data being processed ===");
      console.log("Connected nodes:", connectedNodes);
      console.log("Node data ref:", nodeDataRef.current);

      // Get product data - check multiple sources
      const productNode = connectedNodes.find(
        (node) => node.type === "overviewNode" // Updated from productNode
      );
      console.log("Product node found:", productNode);

      let productData = null;
      if (productNode) {
        // Try multiple ways to get the data
        productData =
          nodeDataRef.current[productNode.id] ||
          productNode.data ||
          nodeData[productNode.id] ||
          {};
        console.log("Product data extracted:", productData);
      }

      // Product Overview Section
      let productOverview = "";
      if (productData && productData.productData) {
        const name = productData.productData.name || "Untitled Product";
        const description = productData.productData.description || "";
        const details = productData.productData.extraText || "";

        productOverview = `Product: ${name}. `;
        if (description) productOverview += `Description: ${description}. `;
        if (details) productOverview += `Additional Details: ${details}. `;
        productOverview += `Product ID: ${resolvedParams.id}. Created: ${
          new Date().toISOString().split("T")[0]
        }. Connected Components: ${connectedNodes.length}.`;
      } else {
        productOverview = `Product: Untitled Product. Product ID: ${
          resolvedParams.id
        }. Created: ${
          new Date().toISOString().split("T")[0]
        }. Connected Components: ${
          connectedNodes.length
        }. (No product data available)`;
      }

      csv += `Product Overview,"${escapeCSV(productOverview)}"\\r\\n`;

      // Media Section
      const mediaNodes = connectedNodes.filter(
        (node) => node.type === "mediaNode" // Updated from imageDescriptionNode
      );
      console.log("Media nodes found:", mediaNodes);

      if (mediaNodes.length > 0) {
        let imagesContent = "";
        mediaNodes.forEach((node, index) => {
          const imageNodeData =
            nodeDataRef.current[node.id] ||
            node.data ||
            nodeData[node.id] ||
            {};
          console.log(`Media node ${index + 1} data:`, imageNodeData);

          const imageData = imageNodeData.imageData || {};
          if (imageData) {
            if (index > 0) imagesContent += " ";
            imagesContent += `Media ${index + 1}: `;
            if (imageData.image?.url) {
              imagesContent += `Available at ${imageData.image.url}. `;
            }
            if (imageData.description) {
              imagesContent += `Description: ${imageData.description}. `;
            }
          }
        });
        if (imagesContent) {
          csv += `Media Assets,"${escapeCSV(imagesContent.trim())}"\\r\\n`;
        }
      }

      // Limitations Section
      const limitationNodes = connectedNodes.filter(
        (node) => node.type === "limitationsNode" // Updated from issuesNode
      );
      console.log("Limitation nodes found:", limitationNodes);

      if (limitationNodes.length > 0) {
        let limitationsContent = "";
        let limitationCounter = 1;
        limitationNodes.forEach((node) => {
          const limitationNodeData =
            nodeDataRef.current[node.id] ||
            node.data ||
            nodeData[node.id] ||
            {};
          console.log("Limitation node data:", limitationNodeData);

          const issues = limitationNodeData.issues || [];
          issues.forEach((issue: any) => {
            if (issue.title) {
              if (limitationsContent) limitationsContent += " ";
              limitationsContent += `Limitation ${limitationCounter}: ${issue.title}.`;
              if (issue.description) {
                limitationsContent += ` ${issue.description}.`;
              }
              limitationCounter++;
            }
          });
        });
        if (limitationsContent) {
          csv += `Product Limitations,"${escapeCSV(limitationsContent.trim())}"\\r\\n`;
        }
      }

      // Capabilities Section
      const capabilityNodes = connectedNodes.filter(
        (node) => node.type === "capabilitiesNode" // Updated from solutionsNode
      );
      console.log("Capability nodes found:", capabilityNodes);

      if (capabilityNodes.length > 0) {
        let capabilitiesContent = "";
        let capabilityCounter = 1;
        capabilityNodes.forEach((node) => {
          const capabilityNodeData =
            nodeDataRef.current[node.id] ||
            node.data ||
            nodeData[node.id] ||
            {};
          console.log("Capability node data:", capabilityNodeData);

          const solutions = capabilityNodeData.solutions || [];
          solutions.forEach((solution: any) => {
            if (solution.title) {
              if (capabilitiesContent) capabilitiesContent += " ";
              capabilitiesContent += `Capability ${capabilityCounter}: ${solution.title}.`;
              if (solution.description) {
                capabilitiesContent += ` ${solution.description}.`;
              }
              if (solution.steps && solution.steps.length > 0) {
                const steps = solution.steps.filter((step: string) =>
                  step.trim()
                );
                if (steps.length > 0) {
                  capabilitiesContent += ` Implementation: ${steps.join(", ")}.`;
                }
              }
              capabilityCounter++;
            }
          });
        });
        if (capabilitiesContent) {
          csv += `Product Capabilities,"${escapeCSV(
            capabilitiesContent.trim()
          )}"\\r\\n`;
        }
      }

      // Custom Fields Section
      const customFieldNodes = connectedNodes.filter(node => node.type === 'customFieldNode');
      console.log('Custom field nodes found:', customFieldNodes);

      if (customFieldNodes.length > 0) {
        let customFieldsContent = '';
        customFieldNodes.forEach((node, nodeIndex) => {
          const customFieldNodeData = nodeDataRef.current[node.id] || node.data || nodeData[node.id] || {};
          console.log(`Custom field node ${nodeIndex + 1} data:`, customFieldNodeData);

          const customFields = customFieldNodeData.customFields || [];
          customFields.forEach((field: any) => {
            if (field.key && field.value) {
              if (customFieldsContent) customFieldsContent += ' ';
              customFieldsContent += `${field.key}: ${field.value}.`;
            }
          });
        });
        if (customFieldsContent) {
          csv += `Custom Fields,"${escapeCSV(customFieldsContent.trim())}"\\r\\n`;
        }
      }

      // Features Section
      const featureNodes = connectedNodes.filter(node => node.type === 'featuresNode');
      console.log('Feature nodes found:', featureNodes);

      if (featureNodes.length > 0) {
        let featuresContent = '';
        let featureCounter = 1;
        featureNodes.forEach((node) => {
          const featureNodeData = nodeDataRef.current[node.id] || node.data || nodeData[node.id] || {};
          console.log('Feature node data:', featureNodeData);

          const features = featureNodeData.features || [];
          features.forEach((feature: any) => {
            if (feature.title) {
              if (featuresContent) featuresContent += ' ';
              featuresContent += `Feature ${featureCounter}: ${feature.title}.`;
              if (feature.description) {
                featuresContent += ` ${feature.description}.`;
              }
              featureCounter++;
            }
          });
        });
        if (featuresContent) {
          csv += `Product Features,"${escapeCSV(featuresContent.trim())}"\\r\\n`;
        }
      }

      // Use Cases Section
      const useCaseNodes = connectedNodes.filter(node => node.type === 'useCasesNode');
      console.log('Use case nodes found:', useCaseNodes);

      if (useCaseNodes.length > 0) {
        let useCasesContent = '';
        let useCaseCounter = 1;
        useCaseNodes.forEach((node) => {
          const useCaseNodeData = nodeDataRef.current[node.id] || node.data || nodeData[node.id] || {};
          console.log('Use case node data:', useCaseNodeData);

          const useCases = useCaseNodeData.useCases || [];
          useCases.forEach((useCase: any) => {
            if (useCase.title) {
              if (useCasesContent) useCasesContent += ' ';
              useCasesContent += `Use Case ${useCaseCounter}: ${useCase.title}.`;
              if (useCase.description) {
                useCasesContent += ` ${useCase.description}.`;
              }
              useCaseCounter++;
            }
          });
        });
        if (useCasesContent) {
          csv += `Use Cases,"${escapeCSV(useCasesContent.trim())}"\\r\\n`;
        }
      }

      // Target Users/Personas Section
      const personaNodes = connectedNodes.filter(node => node.type === 'personasNode');
      console.log('Persona nodes found:', personaNodes);

      if (personaNodes.length > 0) {
        let personasContent = '';
        let personaCounter = 1;
        personaNodes.forEach((node) => {
          const personaNodeData = nodeDataRef.current[node.id] || node.data || nodeData[node.id] || {};
          console.log('Persona node data:', personaNodeData);

          const personas = personaNodeData.personas || [];
          personas.forEach((persona: any) => {
            if (persona.title) {
              if (personasContent) personasContent += ' ';
              personasContent += `Target User ${personaCounter}: ${persona.title}.`;
              if (persona.description) {
                personasContent += ` ${persona.description}.`;
              }
              personaCounter++;
            }
          });
        });
        if (personasContent) {
          csv += `Target Users,"${escapeCSV(personasContent.trim())}"\\r\\n`;
        }
      }

      console.log('=== DEBUG: Final CSV generated ===');
      return csv;
    };

    const csvData = generateCSV();

    // Submit to API
    setIsCreatingBot(true);
    setBotError("");
    setBotUrl("");

    try {
      const res = await fetch("http://localhost:5000/api/bot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          csv: csvData,
          prompt:
            projectParams.prompt ||
            `Generate documentation for ${
              projectParams.name || "this product"
            }`,
          tone: projectParams.tone || "professional",
        }),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to create bot: ${res.status} ${res.statusText}`
        );
      }

      const data = await res.json();
      setBotUrl(data.url);
      setShowBotDialog(true);

      console.log("Bot created successfully:", data);
    } catch (error: any) {
      console.error("Error creating bot:", error);
      setBotError(error.message || "Failed to create bot");
      alert(`Error creating bot: ${error.message || "Please try again"}`);
    } finally {
      setIsCreatingBot(false);
    }
  };

  // Helper function to check if publish is allowed
  const getPublishState = () => {
    if (edges.length === 0) {
      return { canPublish: false, reason: "No connections" };
    }

    const connectedIds = new Set<string>();
    edges.forEach((edge) => {
      connectedIds.add(edge.source);
      connectedIds.add(edge.target);
    });

    const connectedNodes = nodes.filter((node) => connectedIds.has(node.id));
    const hasConnectedOverviewNode = connectedNodes.some(
      (node) => node.type === "overviewNode" // Updated from productNode
    );

    if (!hasConnectedOverviewNode) {
      return { canPublish: false, reason: "No Overview node connected" };
    }

    return { canPublish: true, reason: "", connectedCount: connectedIds.size };
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
                <span className="text-sm font-medium text-gray-600">
                  Persona
                </span>
              </div>

              <div className="h-6 w-px bg-gray-200"></div>
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Product Flow Builder
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Building blocks section - emphasized and prominent */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-900">
                Add Components
              </span>
              <div className="flex gap-3 flex-wrap">
                {/* Core Product Components */}
                <div className="flex gap-2">
                  <button
                    onClick={addNewOverview}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all shadow-sm"
                  >
                    <Package className="w-4 h-4" />
                    Overview
                  </button>
                  <button
                    onClick={addNewFeatures}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all shadow-sm"
                  >
                    <Zap className="w-4 h-4" />
                    Features
                  </button>
                  <button
                    onClick={addNewUseCases}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-all shadow-sm"
                  >
                    <Target className="w-4 h-4" />
                    Use Cases
                  </button>
                </div>

                {/* Analysis Components */}
                <div className="flex gap-2">
                  <button
                    onClick={addNewCapabilities}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-all shadow-sm"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Capabilities
                  </button>
                  <button
                    onClick={addNewLimitations}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-all shadow-sm"
                  >
                    <AlertCircle className="w-4 h-4" />
                    Limitations
                  </button>
                  <button
                    onClick={addNewPersonas}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-all shadow-sm"
                  >
                    <Users className="w-4 h-4" />
                    Target Users
                  </button>
                </div>

                {/* Content Components */}
                <div className="flex gap-2">
                  <button
                    onClick={addNewMedia}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 transition-all shadow-sm"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Media
                  </button>
                  <button
                    onClick={addNewCustomField}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-all shadow-sm"
                  >
                    <Hash className="w-4 h-4" />
                    Custom Fields
                  </button>
                </div>
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
                  publishState.canPublish && !isCreatingBot
                    ? "bg-gray-900 text-white border-gray-900 hover:bg-gray-800 hover:border-gray-800"
                    : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                }`}
                disabled={!publishState.canPublish || isCreatingBot}
                title={
                  !publishState.canPublish
                    ? publishState.reason
                    : "Create bot from connected components"
                }
              >
                {isCreatingBot ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating Bot...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Bot
                  </>
                )}
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
                <span className="text-amber-500 font-medium">
                  {publishState.reason}
                </span>
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

      {/* Bot Creation Success Dialog */}
      <Dialog open={showBotDialog} onOpenChange={setShowBotDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Bot Created Successfully!
            </DialogTitle>
            <DialogDescription>
              Your bot has been created and is ready to use. Click the link
              below to access your bot.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 mb-2">
                <strong>Bot URL:</strong>
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-2 py-1 text-xs bg-white border border-green-300 rounded text-green-700 break-all">
                  {botUrl}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => navigator.clipboard.writeText(botUrl)}
                  className="shrink-0"
                >
                  Copy
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setShowBotDialog(false)}>
              Close
            </Button>
            <Button asChild>
              <Link href={botUrl} target="_blank" rel="noopener noreferrer">
                Go to Bot
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
