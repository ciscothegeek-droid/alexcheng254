-- ============================================================
-- Infinite Insight — Complete Database Schema
-- Run this in the Supabase SQL Editor
-- ============================================================

-- 1. ENUM: app_role
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- 2. TABLE: user_roles
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 3. TABLE: profiles
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name text,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. TABLE: job_listings
CREATE TABLE public.job_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'Other',
  location text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'Full-time',
  description text NOT NULL DEFAULT '',
  requirements text[] DEFAULT '{}',
  deadline date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;

-- 5. TABLE: applications
CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_listing_id text NOT NULL,
  job_title text NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  id_number text NOT NULL,
  gender text,
  date_of_birth date,
  country text NOT NULL DEFAULT '',
  county text,
  constituency text,
  ward text,
  education text,
  experience text,
  cover_letter text,
  status text NOT NULL DEFAULT 'pending',
  admin_feedback text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- 6. TABLE: invitation_tokens
CREATE TABLE public.invitation_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  token uuid DEFAULT gen_random_uuid() NOT NULL UNIQUE,
  email text NOT NULL,
  webinar_link text,
  webinar_date timestamptz,
  webinar_description text,
  payment_completed boolean DEFAULT false,
  cv_uploaded boolean DEFAULT false,
  expires_at timestamptz DEFAULT (now() + interval '30 days'),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.invitation_tokens ENABLE ROW LEVEL SECURITY;

-- 7. TABLE: invitation_payments
CREATE TABLE public.invitation_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_token_id uuid REFERENCES public.invitation_tokens(id) ON DELETE CASCADE NOT NULL,
  pesapal_merchant_reference text,
  pesapal_order_tracking_id text,
  amount numeric NOT NULL DEFAULT 92,
  currency text NOT NULL DEFAULT 'KES',
  status text NOT NULL DEFAULT 'pending',
  payment_method text,
  paid_at timestamptz,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.invitation_payments ENABLE ROW LEVEL SECURITY;

-- 8. TABLE: contact_messages
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- 9. TABLE: blog_posts
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  image_url text,
  date text,
  excerpt text,
  content text,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- SECURITY DEFINER FUNCTIONS
-- ============================================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(), 'admin')
$$;

-- ============================================================
-- TRIGGERS
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), NEW.email);
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER job_listings_updated_at BEFORE UPDATE ON public.job_listings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- RLS POLICIES
-- ============================================================

-- user_roles
CREATE POLICY "Admins can read user_roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_admin());

-- profiles
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- job_listings
CREATE POLICY "Anyone can read job_listings" ON public.job_listings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert job_listings" ON public.job_listings FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update job_listings" ON public.job_listings FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete job_listings" ON public.job_listings FOR DELETE TO authenticated USING (public.is_admin());

-- applications
CREATE POLICY "Anyone can submit application" ON public.applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read applications" ON public.applications FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can update applications" ON public.applications FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

-- invitation_tokens
CREATE POLICY "Anyone can read invitation by token" ON public.invitation_tokens FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins can insert invitation_tokens" ON public.invitation_tokens FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Anyone can update invitation_tokens" ON public.invitation_tokens FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- invitation_payments
CREATE POLICY "Anyone can read invitation_payments" ON public.invitation_payments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Anyone can insert invitation_payments" ON public.invitation_payments FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone can update invitation_payments" ON public.invitation_payments FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- contact_messages
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read contact_messages" ON public.contact_messages FOR SELECT TO authenticated USING (public.is_admin());

-- blog_posts
CREATE POLICY "Anyone can read published blog posts" ON public.blog_posts FOR SELECT TO anon, authenticated USING (published = true OR public.is_admin());
CREATE POLICY "Admins can insert blog_posts" ON public.blog_posts FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update blog_posts" ON public.blog_posts FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete blog_posts" ON public.blog_posts FOR DELETE TO authenticated USING (public.is_admin());

-- ============================================================
-- STORAGE
-- ============================================================

INSERT INTO storage.buckets (id, name, public) VALUES ('cv-uploads', 'cv-uploads', false) ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Anyone can upload CVs" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'cv-uploads');
CREATE POLICY "Admins can read CVs" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'cv-uploads' AND public.is_admin());

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO public.blog_posts (slug, title, date, excerpt, content, published) VALUES
  ('conducting-social-research-in-rwanda', 'Conducting Social Research in Rwanda', 'February 2026', 'Rwanda is a beautiful country, known for its rolling hills. Its cities and rural family homesteads are well kept and clean. The research landscape is growing rapidly with increased demand for social and market research across the region.', 'Rwanda is a beautiful country, known for its rolling hills. Its cities and rural family homesteads are well kept and clean. The research landscape is growing rapidly with increased demand for social and market research across the region.

This is a detailed article covering our experiences and insights from this project. Our team of dedicated researchers worked closely with local communities to gather authentic data and deliver actionable insights to our clients.

At Infinite Insight, we believe in combining rigorous methodology with deep local understanding. This approach has helped us successfully deliver projects across 30 African markets since our founding in 2010.', true),
  ('esomar-2026-conference-nairobi', 'Update from ESOMAR 2026 Conference in Nairobi', 'February 2026', 'Africa 2026 was a powerful moment for our industry — bringing together researchers from across the continent to share insights, methodologies, and visions for the future of market research in Africa.', 'Africa 2026 was a powerful moment for our industry — bringing together researchers from across the continent to share insights, methodologies, and visions for the future of market research in Africa.

This is a detailed article covering our experiences and insights from this project. Our team of dedicated researchers worked closely with local communities to gather authentic data and deliver actionable insights to our clients.

At Infinite Insight, we believe in combining rigorous methodology with deep local understanding. This approach has helped us successfully deliver projects across 30 African markets since our founding in 2010.', true),
  ('quantitative-field-work-uganda', 'Performing Quantitative Field Work in Uganda', 'September 2025', 'Greetings from Uganda — also known as the "Pearl of Africa". As one of the top destinations in East Africa, Uganda presents unique opportunities and challenges for field researchers.', 'Greetings from Uganda — also known as the "Pearl of Africa". As one of the top destinations in East Africa, Uganda presents unique opportunities and challenges for field researchers.

This is a detailed article covering our experiences and insights from this project. Our team of dedicated researchers worked closely with local communities to gather authentic data and deliver actionable insights to our clients.

At Infinite Insight, we believe in combining rigorous methodology with deep local understanding. This approach has helped us successfully deliver projects across 30 African markets since our founding in 2010.', true),
  ('msra-ethics-webinar', 'Upcoming MSRA Ethics Webinar', 'October 2025', 'This post is a reminder for all Infinite Insight staff as well as our field interviewers who are registered MSRA members about the upcoming ethics webinar.', 'This post is a reminder for all Infinite Insight staff as well as our field interviewers who are registered MSRA members about the upcoming ethics webinar.

This is a detailed article covering our experiences and insights from this project. Our team of dedicated researchers worked closely with local communities to gather authentic data and deliver actionable insights to our clients.

At Infinite Insight, we believe in combining rigorous methodology with deep local understanding. This approach has helped us successfully deliver projects across 30 African markets since our founding in 2010.', true),
  ('data-analysis-training-whatsapp', 'Data Analysis & Analytics Training via WhatsApp', 'September 2025', 'This valuable training info was posted to our private group chat by Naftali, our Research Director (Quant). The course covers practical data analysis techniques.', 'This valuable training info was posted to our private group chat by Naftali, our Research Director (Quant). The course covers practical data analysis techniques.

This is a detailed article covering our experiences and insights from this project. Our team of dedicated researchers worked closely with local communities to gather authentic data and deliver actionable insights to our clients.

At Infinite Insight, we believe in combining rigorous methodology with deep local understanding. This approach has helped us successfully deliver projects across 30 African markets since our founding in 2010.', true);

INSERT INTO public.job_listings (title, category, location, type, description, requirements, deadline) VALUES
  ('Field Data Collection Enumerator', 'Field Data Collection', 'Nairobi, Kenya', 'Contract', 'We are seeking experienced enumerators for an upcoming household survey across multiple counties in Kenya. The role involves conducting face-to-face interviews using mobile data collection tools.', ARRAY['Minimum 2 years experience in field data collection', 'Proficiency in ODK/SurveyCTO or similar platforms', 'Fluency in English and Kiswahili', 'Willingness to travel to rural areas', 'Valid national ID'], '2026-04-15'),
  ('Research Analyst', 'Research', 'Nairobi, Kenya', 'Full-time', 'Join our analytics team to support quantitative and qualitative research projects across Sub-Saharan Africa. You will be responsible for data analysis, report writing, and client presentations.', ARRAY['Degree in Statistics, Economics, Social Sciences or related field', '3+ years experience in market or social research', 'Proficiency in SPSS, Stata, or R', 'Strong report writing skills', 'Experience with survey design'], '2026-04-30'),
  ('Data Sorting & Cleaning Specialist', 'Sorting', 'Remote / Nairobi', 'Part-time', 'We need detail-oriented professionals to assist with data cleaning, coding, and sorting for large-scale survey datasets.', ARRAY['Experience with data cleaning and validation', 'Proficiency in Excel and/or Python', 'Attention to detail', 'Ability to meet tight deadlines'], '2026-03-31');
