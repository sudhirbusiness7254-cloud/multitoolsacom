
-- Fix search_path on validation functions
ALTER FUNCTION public.validate_review_input() SET search_path = public;
ALTER FUNCTION public.validate_contact_message() SET search_path = public;
