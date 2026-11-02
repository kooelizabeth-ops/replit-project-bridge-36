import { supabase } from '@/integrations/supabase/client';
import type { EnquiryInput } from '@/lib/enquiryValidation';

export async function submitEnquiry(input: EnquiryInput): Promise<void> {
  const comment = input.comment.trim();
  const { error } = await supabase.from('enquiries').insert({
    name: input.name.trim(),
    contact: input.phone.trim(),
    comment: comment || null,
  });

  if (error) throw error;
}
