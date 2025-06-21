# Supabase Storage Setup Guide

## Prerequisites
- Supabase account and project created
- Environment variables configured in `.env.local`

## Storage Bucket Setup

1. **Create Storage Bucket**:
   - Go to your Supabase dashboard
   - Navigate to Storage section
   - Click "Create Bucket"
   - Name: `images`
   - Set as Public bucket (if you want direct image access)

2. **Set Bucket Policies** (Optional - for public access):
   ```sql
   -- Allow public read access to images
   CREATE POLICY "Public Access" ON storage.objects
   FOR SELECT USING (bucket_id = 'images');

   -- Allow authenticated users to upload
   CREATE POLICY "Authenticated Upload" ON storage.objects
   FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

   -- Allow users to delete their own uploads (optional)
   CREATE POLICY "User Delete Own" ON storage.objects
   FOR DELETE USING (bucket_id = 'images' AND auth.uid()::text = (storage.foldername(name))[1]);
   ```

3. **Environment Variables**:
   Create `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Features Implemented

✅ **Real Blob Storage**: Images uploaded to Supabase Storage instead of Base64
✅ **Automatic Cleanup**: Images deleted from storage when removed from nodes
✅ **Public URLs**: Direct access to uploaded images
✅ **Error Handling**: Graceful fallbacks if upload/delete fails
✅ **File Validation**: Size and type checking before upload

## File Structure

- `src/lib/supabase.ts` - Supabase client configuration
- `src/lib/blob-storage.ts` - Storage utilities (upload/delete)
- Image + Description Node now uses real blob storage

## Benefits Over Base64

- ✅ **Smaller JSON payloads** (URLs instead of large Base64 strings)
- ✅ **Better performance** (no large strings in memory)
- ✅ **Persistent storage** (images survive page refreshes)
- ✅ **Scalable** (can handle large images without browser limits)
- ✅ **CDN support** (Supabase provides fast global delivery)
