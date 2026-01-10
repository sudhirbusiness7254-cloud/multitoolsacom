-- Create reviews table for real-time user reviews
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  location TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT NOT NULL,
  review TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view reviews (public)
CREATE POLICY "Reviews are publicly viewable" 
ON public.reviews 
FOR SELECT 
USING (true);

-- Allow anyone to insert reviews (no auth required for simplicity)
CREATE POLICY "Anyone can submit a review" 
ON public.reviews 
FOR INSERT 
WITH CHECK (true);

-- Enable realtime for reviews table
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;

-- Insert some initial reviews
INSERT INTO public.reviews (name, role, location, rating, title, review) VALUES
('David Chen', 'Professional Photographer', 'San Francisco, CA', 5, 'Best free image tools I''ve found', 'I''ve tried dozens of online image tools, and MultiToolsA is hands down the best. The compression quality is amazing - I reduced my portfolio images by 70% with no visible quality loss.'),
('Maria Rodriguez', 'E-commerce Store Owner', 'Miami, FL', 5, 'Saved me hundreds on software', 'I was paying $20/month for image editing software before I found MultiToolsA. Now I process all my product images for free. The batch processing saves me hours every week.'),
('James Wilson', 'Web Developer', 'London, UK', 5, 'Perfect for web optimization', 'As a developer, I appreciate how well these tools work. WebP conversion improved my clients'' PageSpeed scores significantly. Browser-based processing is genius for privacy.'),
('Sophie Martin', 'Social Media Manager', 'Paris, France', 5, 'Use it daily for my work', 'I manage social media for 5 different brands and use MultiToolsA every single day. Resizing for different platforms, adding watermarks - it handles everything.'),
('Ahmed Hassan', 'Graphic Designer', 'Dubai, UAE', 4, 'Great tools, very useful', 'Really solid tool collection. I use the format converters and compressors daily. The privacy aspect is a huge plus for client work.'),
('Lisa Thompson', 'Blogger & Content Creator', 'Sydney, Australia', 5, 'My go-to for blog images', 'I''ve been using MultiToolsA for 6 months now and it''s become essential for my blog workflow. Image compression cut my blog loading time in half.');