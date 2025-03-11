import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define types for our booking state
export interface BookingState {
  selectedPackage: {
    id: number | null;
    title: string | null;
    price: string | null;
  };
  bookingDetails: {
    name: string;
    email: string;
    phone: string;
    tourDate: string;
    packageType: string;
    message: string;
  };
  bookingHistory: Array<{
    id: string;
    packageId: number;
    packageTitle: string;
    bookingDate: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  }>;
  isLoading: boolean;
  error: string | null;
}

// Define the initial state
const initialState: BookingState = {
  selectedPackage: {
    id: null,
    title: null,
    price: null,
  },
  bookingDetails: {
    name: '',
    email: '',
    phone: '',
    tourDate: '',
    packageType: 'standard',
    message: '',
  },
  bookingHistory: [],
  isLoading: false,
  error: null,
};

// Define action types
type ActionType =
  | { type: 'SELECT_PACKAGE'; payload: { id: number; title: string; price: string } }
  | { type: 'UPDATE_BOOKING_DETAILS'; payload: Partial<BookingState['bookingDetails']> }
  | { type: 'RESET_BOOKING_DETAILS' }
  | { type: 'SUBMIT_BOOKING_REQUEST'; payload: { id: string; packageId: number; packageTitle: string; bookingDate: string } }
  | { type: 'UPDATE_BOOKING_STATUS'; payload: { id: string; status: 'pending' | 'confirmed' | 'completed' | 'cancelled' } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

// Create the reducer function
const bookingReducer = (state: BookingState, action: ActionType): BookingState => {
  switch (action.type) {
    case 'SELECT_PACKAGE':
      return {
        ...state,
        selectedPackage: {
          id: action.payload.id,
          title: action.payload.title,
          price: action.payload.price,
        },
      };
    case 'UPDATE_BOOKING_DETAILS':
      return {
        ...state,
        bookingDetails: {
          ...state.bookingDetails,
          ...action.payload,
        },
      };
    case 'RESET_BOOKING_DETAILS':
      return {
        ...state,
        bookingDetails: initialState.bookingDetails,
      };
    case 'SUBMIT_BOOKING_REQUEST':
      return {
        ...state,
        bookingHistory: [
          ...state.bookingHistory,
          {
            id: action.payload.id,
            packageId: action.payload.packageId,
            packageTitle: action.payload.packageTitle,
            bookingDate: action.payload.bookingDate,
            status: 'pending',
          },
        ],
      };
    case 'UPDATE_BOOKING_STATUS':
      return {
        ...state,
        bookingHistory: state.bookingHistory.map(booking =>
          booking.id === action.payload.id
            ? { ...booking, status: action.payload.status }
            : booking
        ),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// Create the context
interface BookingContextType {
  state: BookingState;
  selectPackage: (id: number, title: string, price: string) => void;
  updateBookingDetails: (details: Partial<BookingState['bookingDetails']>) => void;
  resetBookingDetails: () => void;
  submitBookingRequest: (packageId: number, packageTitle: string) => void;
  updateBookingStatus: (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Create a provider component
interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Define the context actions
  const selectPackage = (id: number, title: string, price: string) => {
    dispatch({ type: 'SELECT_PACKAGE', payload: { id, title, price } });
  };

  const updateBookingDetails = (details: Partial<BookingState['bookingDetails']>) => {
    dispatch({ type: 'UPDATE_BOOKING_DETAILS', payload: details });
  };

  const resetBookingDetails = () => {
    dispatch({ type: 'RESET_BOOKING_DETAILS' });
  };

  const submitBookingRequest = (packageId: number, packageTitle: string) => {
    // In a real app, you would make an API call here
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    setTimeout(() => {
      const bookingId = `booking-${Date.now()}`;
      const bookingDate = new Date().toISOString();
      
      dispatch({
        type: 'SUBMIT_BOOKING_REQUEST',
        payload: {
          id: bookingId,
          packageId,
          packageTitle,
          bookingDate,
        },
      });
      
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  };

  const updateBookingStatus = (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    dispatch({
      type: 'UPDATE_BOOKING_STATUS',
      payload: { id, status },
    });
  };

  const value = {
    state,
    selectPackage,
    updateBookingDetails,
    resetBookingDetails,
    submitBookingRequest,
    updateBookingStatus,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

// Create a custom hook to use the booking context
export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}; 