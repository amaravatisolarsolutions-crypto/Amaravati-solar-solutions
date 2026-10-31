CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL, phone text NOT NULL, email text NOT NULL,
  customer_type text NOT NULL, service text NOT NULL, city text NOT NULL,
  message text, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.demo_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE DEFAULT ('ASS-' || upper(substr(md5(random()::text),1,8))),
  full_name text NOT NULL, phone text NOT NULL, email text NOT NULL,
  customer_type text NOT NULL, solution text NOT NULL, property_type text NOT NULL,
  city text NOT NULL, preferred_date date NOT NULL, preferred_time text NOT NULL,
  requirements text, status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.enquiries TO service_role;
GRANT ALL ON public.demo_bookings TO service_role;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.demo_bookings ENABLE ROW LEVEL SECURITY;