-- Add status column to reviews table
ALTER TABLE public.reviews 
ADD COLUMN status TEXT NOT NULL DEFAULT 'pending' 
CHECK (status IN ('pending', 'approved', 'rejected'));

-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Drop existing policies on reviews
DROP POLICY IF EXISTS "Reviews are publicly viewable" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can submit a review" ON public.reviews;

-- Create new policies for reviews
-- Public can only see approved reviews
CREATE POLICY "Public can view approved reviews" 
ON public.reviews 
FOR SELECT 
USING (status = 'approved');

-- Admins can view all reviews
CREATE POLICY "Admins can view all reviews" 
ON public.reviews 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Anyone can submit reviews (they go to pending)
CREATE POLICY "Anyone can submit a review" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);

-- Only admins can update reviews (for approval/rejection)
CREATE POLICY "Admins can update reviews" 
ON public.reviews 
FOR UPDATE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete reviews
CREATE POLICY "Admins can delete reviews" 
ON public.reviews 
FOR DELETE 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policy for user_roles - only admins can view
CREATE POLICY "Admins can view roles" 
ON public.user_roles 
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());