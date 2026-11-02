import { supabase } from '@/integrations/supabase/client';
import type { EnquiryInput } from '@/lib/enquiryValidation';

export async function submitEnquiry(input: EnquiryInput): Promise<void> {
  const { error } = await supabase.from('enquiries').insert({
    name: input.name.trim(),
    contact: input.contact.trim(),
    event_date: input.eventDate || null,
    event_format: input.eventFormat,
  });

  if (error) throw error;
}
