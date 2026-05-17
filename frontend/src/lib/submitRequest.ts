import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export type ServiceRequestPayload = {
  fullName: string;
  whatsapp: string;
  email: string;
  university: string;
  degreeLevel: string;
  category: string;
  service: string;
  preferredLang: string;
  details: string;
  howHeard: string;
  lang: 'ar' | 'en';
};

type SubmitResult =
  | { success: true; id: string }
  | { success: false; error: string };

export async function submitServiceRequest(payload: ServiceRequestPayload): Promise<SubmitResult> {
  try {
    const docRef = await addDoc(collection(db, 'serviceRequests'), {
      ...payload,
      status: 'new',
      contacted: false,
      submittedAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { success: false, error: message };
  }
}
