# Supabase Setup Guide for Azi Accessories E-Commerce

Follow these steps to set up Supabase for your Azi Accessories e-commerce application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Fill in the project details:
   - **Name**: `azi-accessories` (or your preferred name)
   - **Database Password**: Choose a strong password (save it securely)
   - **Region**: Choose the closest region to your users (e.g., `Asia Pacific (Mumbai)` for India)
5. Click "Create new project" and wait for it to be ready (2-3 minutes)

## Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values (you'll need them for Step 8):
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys" → "anon public")

## Step 3: Run the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Open the file `supabase/schema.sql` from your project
4. Copy the entire contents of `schema.sql`
5. Paste it into the SQL Editor in Supabase
6. Click "Run" (or press Ctrl+Enter)
7. Wait for all commands to execute successfully
8. You should see messages confirming:
   - Tables created
   - Indexes created
   - Triggers created
   - Policies created

**Verify the setup:**
- Go to **Table Editor** in Supabase
- You should see these tables:
  - `categories`
  - `products`
  - `user_profiles`
  - `cart_items`
  - `orders`
  - `order_items`

## Step 4: Set Up Storage Bucket for Product Images

1. In Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Configure the bucket:
   - **Name**: `product-images`
   - **Public bucket**: ✅ **Check this** (so images are publicly accessible)
4. Click "Create bucket"

5. **Set up Storage Policies** (in Storage → Policies):
   
   Click on `product-images` bucket → Policies → New Policy
   
   **Policy 1: Allow public read access**
   ```sql
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING (bucket_id = 'product-images');
   ```

   **Policy 2: Allow authenticated users to upload** (for admin product management)
   ```sql
   CREATE POLICY "Authenticated users can upload"
   ON storage.objects FOR INSERT
   WITH CHECK (
     bucket_id = 'product-images' 
     AND auth.role() = 'authenticated'
   );
   ```

   **Policy 3: Allow authenticated users to update**
   ```sql
   CREATE POLICY "Authenticated users can update"
   ON storage.objects FOR UPDATE
   USING (
     bucket_id = 'product-images' 
     AND auth.role() = 'authenticated'
   );
   ```

   **Policy 4: Allow authenticated users to delete**
   ```sql
   CREATE POLICY "Authenticated users can delete"
   ON storage.objects FOR DELETE
   USING (
     bucket_id = 'product-images' 
     AND auth.role() = 'authenticated'
   );
   ```

## Step 5: Configure Authentication

1. Go to **Authentication** → **Providers** in Supabase
2. Ensure **Email** provider is enabled (it's enabled by default)
3. (Optional) Configure email templates:
   - Go to **Authentication** → **Email Templates**
   - Customize the confirmation email, reset password email, etc.

4. **Enable Email Confirmation** (recommended for production):
   - Go to **Authentication** → **Settings**
   - Under "Auth Providers" → "Email Auth"
   - Toggle "Confirm email" ON (or OFF for development/testing)

## Step 6: Create Your First Admin User

### Method 1: Through Supabase Dashboard (Quick Test)

1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Enter:
   - **Email**: your admin email (e.g., `admin@aziaccessories.com`)
   - **Password**: a strong password
4. Click "Create user"
5. Note the **User ID** (UUID) that was created

6. Go to **Table Editor** → `user_profiles`
7. Click "Insert" → "Insert row"
8. Fill in:
   - **id**: Paste the User ID from step 5
   - **full_name**: Your admin name
   - **role**: `admin`
9. Click "Save"

### Method 2: Through SQL (Recommended)

1. Go to **SQL Editor** in Supabase
2. Run this SQL (replace with your email and password):

```sql
-- Create admin user
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@aziaccessories.com',  -- Change this email
  crypt('YourPasswordHere', gen_salt('bf')),  -- Change this password
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
) RETURNING id;

-- Then use the returned ID to create the profile
-- (Copy the ID from the result and run this with that ID)
INSERT INTO user_profiles (id, full_name, role)
VALUES ('PASTE_USER_ID_HERE', 'Admin User', 'admin');
```

**Better Method - Using Supabase Auth API:**

1. Sign up through your app first (create a regular user account)
2. Then run this SQL to promote them to admin:

```sql
-- Replace 'user-email@example.com' with the email of the user you want to make admin
UPDATE user_profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'user-email@example.com'
);
```

## Step 7: Add Sample Data (Optional)

To test your application, you can add some sample categories and products:

### Sample Categories

Go to **SQL Editor** and run:

```sql
-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
('Helmets', 'helmets', 'Safety helmets for bikers'),
('Accessories', 'accessories', 'Bike accessories and add-ons'),
('Safety Gear', 'safety-gear', 'Protective gear for riders'),
('Spare Parts', 'spare-parts', 'Bike spare parts and components');

-- Insert subcategories (example)
INSERT INTO categories (name, slug, parent_id, description) VALUES
('Full Face Helmets', 'full-face-helmets', 
  (SELECT id FROM categories WHERE slug = 'helmets'), 
  'Full face protection helmets'),
('Half Face Helmets', 'half-face-helmets', 
  (SELECT id FROM categories WHERE slug = 'helmets'), 
  'Half face helmets');
```

### Sample Products

```sql
-- Insert sample products (replace category_id with actual IDs from categories table)
INSERT INTO products (name, description, price, stock, category_id, brand, sku, image_url) VALUES
('Premium Bike Helmet', 'High-quality full face helmet with ventilation', 2999.00, 50, 
  (SELECT id FROM categories WHERE slug = 'full-face-helmets'), 
  'Azi Pro', 'AZI-HELM-001', 
  'https://images.unsplash.com/photo-1556808018-4c1d1f17d729?w=400&h=400&fit=crop'),
('Bike Gloves', 'Comfortable and durable riding gloves', 899.00, 100, 
  (SELECT id FROM categories WHERE slug = 'safety-gear'), 
  'Azi Gear', 'AZI-GLV-001', 
  'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop');
```

## Step 8: Configure Environment Variables

1. In your project root, create a `.env` file (if it doesn't exist)
2. Add the following variables:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace:
- `your_project_url_here` with your **Project URL** from Step 2
- `your_anon_key_here` with your **anon public** key from Step 2

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Important**: Restart your development server after adding environment variables:
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

## Step 9: Verify the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the following:
   - ✅ Sign up a new user account
   - ✅ Sign in with your account
   - ✅ View products page (should load)
   - ✅ Sign in as admin and access `/admin` dashboard
   - ✅ Create a product in admin panel
   - ✅ Add product to cart
   - ✅ Complete checkout

## Step 10: Production Considerations

Before deploying to production:

1. **Enable Row Level Security (RLS)**: Already enabled in the schema ✅

2. **Set up Custom Domain** (optional):
   - Go to **Settings** → **API** → **Project URL**
   - Configure custom domain if needed

3. **Configure Email Service**:
   - Go to **Settings** → **Auth** → **SMTP Settings**
   - Set up SMTP for transactional emails (or use Supabase's default)

4. **Set up Database Backups**:
   - Go to **Settings** → **Database**
   - Configure automated backups

5. **Review API Keys**:
   - Keep your `service_role` key secret (never expose in frontend)
   - Only use `anon` key in your React app (already configured)

6. **Monitor Usage**:
   - Keep an eye on **Dashboard** → **Usage** for API calls, storage, etc.

## Troubleshooting

### Issue: "Row Level Security" errors
- **Solution**: Make sure you ran the complete `schema.sql` file including all RLS policies

### Issue: Can't upload images
- **Solution**: Verify storage bucket policies are set correctly (Step 4)

### Issue: Admin access denied
- **Solution**: Verify user profile has `role = 'admin'` in `user_profiles` table

### Issue: Environment variables not working
- **Solution**: 
  - Restart dev server after adding `.env` file
  - Ensure `.env` file is in project root (not in `src/`)
  - Variables must start with `VITE_` for Vite to expose them

### Issue: Database connection errors
- **Solution**: 
  - Verify Project URL and Anon Key are correct
  - Check Supabase project is active (not paused)
  - Verify internet connection

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase SQL Editor Guide](https://supabase.com/docs/guides/database/overview)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Setup Guide](https://supabase.com/docs/guides/storage)

---

**Need Help?** Check the Supabase documentation or the project's README for more information.

