export interface User {
  id: string;
  name: string;
  attending?: boolean | null;
  overnightStay?: boolean | null;
  count: number;
  message?: string;
  email?: string;
  phone?: string;
  activity?: Date | null;
  countryCode: string;
}
