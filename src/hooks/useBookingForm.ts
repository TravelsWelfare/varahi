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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touchedFields, setTouchedFields] = useState<Set<keyof BookingState['bookingDetails']>>(new Set());

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateBookingDetails({ [name]: value } as any);
    
    // Mark field as touched
    setTouchedFields(prev => new Set(prev).add(name as keyof BookingState['bookingDetails']));
    
    // Only validate if field was previously touched or has error
    if (touchedFields.has(name as keyof BookingState['bookingDetails']) || formErrors[name as keyof BookingState['bookingDetails']]) {
      validateField(name as keyof BookingState['bookingDetails'], value);
    }
  };

  const validateField = (field: keyof BookingState['bookingDetails'], value: string): boolean => {
    let error = '';

    switch (field) {
      case 'name':
        if (!value.trim()) {
          error = 'Name is required';
        } else if (value.trim().length < 2) {
          error = 'Name must be at least 2 characters';
        }
        break;

      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
          error = 'Please enter a valid 10-digit phone number';
        }
        break;

      case 'tourDate':
        if (!value) {
          error = 'Tour date is required';
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          if (selectedDate < today) {
            error = 'Tour date cannot be in the past';
          }
        }
        break;

      case 'packageType':
        if (!value) {
          error = 'Please select a package type';
        }
        break;
    }

    setFormErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return !error;
  };

  const validateForm = (): boolean => {
    const fields = Object.keys(state.bookingDetails) as Array<keyof BookingState['bookingDetails']>;
    let isValid = true;

    fields.forEach(field => {
      const value = state.bookingDetails[field];
      if (!validateField(field, value)) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    const allFields = Object.keys(state.bookingDetails) as Array<keyof BookingState['bookingDetails']>;
    setTouchedFields(new Set(allFields));
    
    if (!validateForm()) {
      setIsSubmitting(false);
      toast({
        title: 'Please fix the errors in the form',
        description: 'Some fields need your attention',
        variant: 'destructive',
      });
      return;
    }

    if (state.selectedPackage.id === null) {
      setIsSubmitting(false);
      toast({
        title: 'No package selected',
        description: 'Please select a package before booking',
        variant: 'destructive',
      });
      return;
    }

    try {
      await submitBookingRequest(
        state.selectedPackage.id,
        state.selectedPackage.title || 'Unknown Package'
      );

      toast({
        title: 'Booking Request Received!',
        description: `We've received your request for ${state.selectedPackage.title}. Our team will contact you shortly!`,
        duration: 5000,
      });

      resetBookingDetails();
      setTouchedFields(new Set());
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'Please try again later',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldState = (field: keyof BookingState['bookingDetails']) => {
    const isTouched = touchedFields.has(field);
    const error = formErrors[field];
    const value = state.bookingDetails[field];
    
    return {
      isTouched,
      error,
      value,
      isValid: isTouched && !error && value,
    };
  };

  return {
    bookingDetails: state.bookingDetails,
    selectedPackage: state.selectedPackage,
    isLoading: state.isLoading,
    isSubmitting,
    formErrors,
    touchedFields,
    handleInputChange,
    handleSubmit,
    resetForm: resetBookingDetails,
    getFieldState,
  };
};