
-- Add write protection policies to user_roles table
CREATE POLICY "Only admins can assign roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Add validation trigger for reviews table (length limits)
CREATE OR REPLACE FUNCTION public.validate_review_input()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF char_length(NEW.name) < 2 OR char_length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  IF char_length(NEW.title) < 3 OR char_length(NEW.title) > 200 THEN
    RAISE EXCEPTION 'Title must be between 3 and 200 characters';
  END IF;
  IF char_length(NEW.review) < 10 OR char_length(NEW.review) > 2000 THEN
    RAISE EXCEPTION 'Review must be between 10 and 2000 characters';
  END IF;
  IF NEW.role IS NOT NULL AND char_length(NEW.role) > 100 THEN
    RAISE EXCEPTION 'Role must be under 100 characters';
  END IF;
  IF NEW.location IS NOT NULL AND char_length(NEW.location) > 100 THEN
    RAISE EXCEPTION 'Location must be under 100 characters';
  END IF;
  IF NEW.rating < 1 OR NEW.rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_review_before_insert
  BEFORE INSERT ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_review_input();

-- Add validation trigger for contact_messages
CREATE OR REPLACE FUNCTION public.validate_contact_message()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF char_length(NEW.name) < 2 OR char_length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be between 2 and 100 characters';
  END IF;
  IF char_length(NEW.email) < 5 OR char_length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Email must be between 5 and 255 characters';
  END IF;
  IF char_length(NEW.message) < 10 OR char_length(NEW.message) > 2000 THEN
    RAISE EXCEPTION 'Message must be between 10 and 2000 characters';
  END IF;
  IF char_length(NEW.subject) < 3 OR char_length(NEW.subject) > 200 THEN
    RAISE EXCEPTION 'Subject must be between 3 and 200 characters';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_contact_before_insert
  BEFORE INSERT ON public.contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_contact_message();
