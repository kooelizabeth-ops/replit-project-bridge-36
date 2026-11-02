CREATE TABLE public.enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  contact text NOT NULL CHECK (char_length(contact) BETWEEN 3 AND 200),
  event_date date,
  event_format text CHECK (event_format IS NULL OR char_length(event_format) <= 80),
  comment text CHECK (comment IS NULL OR char_length(comment) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.enquiries TO anon, authenticated;
GRANT ALL ON public.enquiries TO service_role;

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert_enquiries" ON public.enquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);