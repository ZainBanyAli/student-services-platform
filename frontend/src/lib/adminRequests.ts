import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  orderBy,
  query,
  type Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export type RequestStatus = 'new' | 'in-progress' | 'completed' | 'cancelled';

export type AdminServiceRequest = {
  id: string;
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
  status: RequestStatus;
  contacted: boolean;
  submittedAt: Timestamp | null;
};

export async function getAllRequests(): Promise<AdminServiceRequest[]> {
  const q = query(
    collection(db, 'serviceRequests'),
    orderBy('submittedAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<AdminServiceRequest, 'id'>),
    submittedAt: d.data().submittedAt ?? null,
  }));
}

export async function getRequestById(id: string): Promise<AdminServiceRequest | null> {
  const snap = await getDoc(doc(db, 'serviceRequests', id));
  if (!snap.exists()) return null;
  return {
    id: snap.id,
    ...(snap.data() as Omit<AdminServiceRequest, 'id'>),
    submittedAt: snap.data().submittedAt ?? null,
  };
}

export async function updateRequestStatus(id: string, status: RequestStatus): Promise<void> {
  await updateDoc(doc(db, 'serviceRequests', id), { status });
}

export async function updateRequestContacted(id: string, contacted: boolean): Promise<void> {
  await updateDoc(doc(db, 'serviceRequests', id), { contacted });
}
