// types/booking.ts
export interface Plan {
  id: number;
  name: string;
  duration: string;
  maxPeople: string;
  amenity: string;
  price: number;
  popular: boolean;
}

export interface BookingTicket {
  ticketNumber: string;
  planName: string;
  date: string;
  timeSlot: string;
  numberOfPeople: number;
  totalPrice: number;
  qrCode: string;
}

export interface BookingFormData {
  name:string;
  mobile:string
  date: Date | null;
  timeSlot: string;
  people: number | null;
}