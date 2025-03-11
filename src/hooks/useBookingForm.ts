import { useBooking, BookingState } from '@/context/BookingContext';
import { useState, FormEvent, ChangeEvent } from 'react';
import { useToast } from '@/components/ui/use-toast';

interface UseBookingFormProps {
  onSuccess?: () => void;
}

export const useBookingForm = ({ onSuccess }: UseBookingFormProps = {}) => {
  const { state, updateBookingDetails, resetBookingDetails, submitBookingRequest } = useBooking();
  const { toast } = useToast();
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof BookingState['bookingDetails'], string>>>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateBookingDetails({ [name]: value } as any);
    
    // Clear error when user types
    if (formErrors[name as keyof BookingState['bookingDetails']]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof BookingState['bookingDetails'], string>> = {};
    const { name, email, phone, tourDate } = state.bookingDetails;

    if (!name.trim()) {
      errors.name = 'Name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      errors.phone = 'Phone number should be 10 digits';
    }

    if (!tourDate) {
      errors.tourDate = 'Tour date is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Please fix the errors in the form',
        variant: 'destructive',
      });
      return;
    }

    if (state.selectedPackage.id === null) {
      toast({
        title: 'No package selected',
        description: 'Please select a package before booking',
        variant: 'destructive',
      });
      return;
    }

    submitBookingRequest(
      state.selectedPackage.id,
      state.selectedPackage.title || 'Unknown Package'
    );

    toast({
      title: 'Booking Request Received!',
      description: `We've received your request for ${state.selectedPackage.title}. Our team will contact you shortly!`,
      duration: 5000,
    });

    resetBookingDetails();
    
    if (onSuccess) {
      onSuccess();
    }
  };

  return {
    bookingDetails: state.bookingDetails,
    selectedPackage: state.selectedPackage,
    isLoading: state.isLoading,
    formErrors,
    handleInputChange,
    handleSubmit,
    resetForm: resetBookingDetails,
  };
}; 