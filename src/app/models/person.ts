import { Address } from './address';
import { Timestamp } from '@firebase/firestore-types';

export interface Person {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  address: Address;
  phone: string;
  DOB: Timestamp;
  DOI: Timestamp;
}
