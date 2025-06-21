/**
 * Direct Supabase storage utility for handling image uploads
 */
import { supabase } from './supabase'

export interface BlobUploadResult {
  url: string;
  path: string;
  name: string;
  size: number;
  type: string;
}

// Check if bucket exists and create if needed
export async function ensureStorageBucket(): Promise<void> {
  try {
    // List buckets to check if 'images' exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()

    if (listError) {
      console.error('Error listing buckets:', listError)
      return
    }

    const imagesBucket = buckets?.find(bucket => bucket.name === 'images')

    if (!imagesBucket) {
      console.log('Images bucket not found, creating...')

      // Create the bucket
      const { data, error: createError } = await supabase.storage.createBucket('images', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        fileSizeLimit: 5242880 // 5MB
      })

      if (createError) {
        console.error('Error creating bucket:', createError)
        throw new Error(`Failed to create images bucket: ${createError.message}`)
      }

      console.log('Images bucket created successfully:', data)
    } else {
      console.log('Images bucket already exists')
    }
  } catch (error) {
    console.error('Error ensuring storage bucket:', error)
    // Don't throw here, let upload attempt anyway
  }
}

export async function uploadImageToBlob(file: File): Promise<BlobUploadResult> {
  try {
    console.log('Starting simple Supabase upload...')

    const fileExt = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = fileName // Upload to root of bucket, not subfolder

    console.log('Uploading to root of images bucket:', filePath)

    // Simple upload without subfolder
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        upsert: true // Allow overwriting if file exists
      })

    if (error) {
      console.error('Upload failed:', error)
      throw new Error(`Upload failed: ${error.message}`)
    }

    console.log('Upload successful:', data)

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return {
      url: publicUrlData.publicUrl,
      path: filePath,
      name: file.name,
      size: file.size,
      type: file.type
    }
  } catch (error) {
    console.error('Complete upload error:', error)
    throw error
  }
}

export async function deleteImageFromSupabase(path: string): Promise<void> {
  try {
    const { error } = await supabase.storage
      .from('images')
      .remove([path])

    if (error) {
      console.error('Delete error:', error)
      throw new Error(`Failed to delete image: ${error.message}`)
    }

    console.log('Image deleted successfully from Supabase:', path)
  } catch (error) {
    console.error('Complete delete error:', error)
    throw error
  }
}

export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
