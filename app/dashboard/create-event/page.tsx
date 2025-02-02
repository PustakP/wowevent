'use client';

import { useEffect, useState } from 'react';
import { createClient } from "../../utils/supabase/clients";
import { 
  CalendarDays, 
  MapPin, 
  Image as ImageIcon, 
  FileText, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Send, 
  Plus, 
  X 
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from "../../lib/utils";

interface Field {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
}

interface Step {
  id: string;
  title: string;
  subtitle: string;
  fields: Field[];
  icon: React.ElementType;
}

interface FormData {
  [key: string]: string | string[];
}

const steps: Step[] = [
  {
    id: 'basic',
    title: "Let's start with the basics",
    subtitle: "Tell us about your event",
    icon: FileText,
    fields: [
      { 
        id: 'name', 
        label: 'Event Name', 
        type: 'text', 
        placeholder: 'Tech Conference 2025', 
        required: true 
      },
      { 
        id: 'description', 
        label: 'Description', 
        type: 'textarea', 
        placeholder: 'Tell people what your event is about...', 
        required: false 
      }
    ]
  },
  {
    id: 'location',
    title: "Where and when?",
    subtitle: "Location and timing details",
    icon: MapPin,
    fields: [
      { 
        id: 'location', 
        label: 'Venue', 
        type: 'text', 
        placeholder: 'Convention Center', 
        required: true 
      },
      { 
        id: 'date', 
        label: 'Event Date & Time', 
        type: 'datetime-local', 
        required: true 
      },
      { 
        id: 'registrationEndDate', 
        label: 'Registration Deadline', 
        type: 'datetime-local', 
        required: true 
      }
    ]
  },
  {
    id: 'extra',
    title: "Additional Details",
    subtitle: "Add requirements & subdomain",
    icon: Clock,
    fields: [
      { 
        id: 'requirements', 
        label: 'Requirements', 
        type: 'array', 
        placeholder: 'E.g., Laptop, ID card' 
      },
      { 
        id: 'subdomain', 
        label: 'Event Subdomain', 
        type: 'text', 
        placeholder: 'example-event', 
        required: true 
      }
    ]
  },
  {
    id: 'media',
    title: "Make it visual",
    subtitle: "Add images for your event",
    icon: ImageIcon,
    fields: [
      { 
        id: 'images', 
        label: 'Event Images', 
        type: 'file', 
        multiple: true, 
        accept: 'image/*', 
        required: false 
      }
    ]
  }
];

export default function EventCreationFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [requirements, setRequirements] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const [userProfileId, setUserProfileId] = useState<string | null>(null);
  const [isSubdomainAvailable, setIsSubdomainAvailable] = useState(true);
  const [isRegisteringSubdomain, setIsRegisteringSubdomain] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          console.error('Error fetching user:', authError);
          router.push('/login');
          return;
        }

        const { data: profileData, error: profileError } = await supabase
          .from('user_profile')
          .select('user_id')
          .eq('user_id', user.id)
          .single();

        if (profileError || !profileData) {
          console.error('Error fetching user profile:', profileError);
          setErrors({ submit: 'User profile not found. Please complete your profile first.' });
          return;
        }

        setUserProfileId(profileData.user_id);
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        setErrors({ submit: 'Failed to fetch user profile.' });
      }
    };

    fetchUserProfile();
  }, []);
  const checkSubdomainAvailability = async (subdomain: string) => {
    if (!subdomain) return false;
  
    try {
      const cleanedSubdomain = subdomain
        .replace('.catalystiq.fun', '')
        .trim()
        .toLowerCase();
  
      const { data: existingEvent } = await supabase
        .from('events')
        .select('subdomain')
        .eq('subdomain', cleanedSubdomain)
        .single();
  
      return !existingEvent;
    } catch (error) {
      console.error('Subdomain check error:', error);
      return false;
    }
  };

  const validateStep = () => {
    const currentFields = steps[currentStep].fields;
    const newErrors: Record<string, string> = {};
    let isValid = true;

    currentFields.forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = async () => {
    if (validateStep()) {
      if (currentStep === steps.length - 1) {
        await handleSubmit();
      } else {
        setCurrentStep(current => current + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const files = Array.from(e.target.files);
    const newImageFiles = [...imageFiles, ...files];
    setImageFiles(newImageFiles);

    const newUrls = files.map(file => URL.createObjectURL(file));
    setImageUrls(prev => [...prev, ...newUrls]);
  };

  const uploadImages = async () => {
    if (!imageFiles.length) return [];
  
    const uploadPromises = imageFiles.map(async (file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('event-images')
        .upload(fileName, file);
  
      if (error) throw error;
  
      const { data: { publicUrl } } = supabase.storage
        .from('event-images')
        .getPublicUrl(data.path);
  
      return publicUrl;
    });
  
    try {
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error('Error uploading images:', error);
      throw new Error('Failed to upload images');
    }
  };

 // Updated handleSubmit function
const handleSubmit = async () => {
    if (!validateStep()) return;
    if (!userProfileId) {
      setErrors({ submit: 'User profile not found. Please complete your profile first.' });
      return;
    }
  
    setLoading(true);
    try {
      const subdomain = (formData.subdomain as string)
        .replace('.catalystiq.fun', '')
        .trim()
        .toLowerCase();
  
      // Final availability check
      const { data: existingEvent } = await supabase
        .from('events')
        .select('subdomain')
        .eq('subdomain', subdomain)
        .single();
  
      if (existingEvent) {
        throw new Error('Subdomain is no longer available. Please choose another.');
      }
  
      // Upload images and create event
      const uploadedImageUrls = await uploadImages();
  
      // Prepare event data
      const eventData = {
        name: formData.name as string,
        organizer_id: userProfileId,
        date: formData.date ? new Date(formData.date as string).toISOString() : null,
        location: formData.location as string,
        description: formData.description as string,
        requirements: requirements, // Array of strings
        status: 'open', // Default status
        subdomain: subdomain,
        images: uploadedImageUrls, // Array of image URLs
        created_at: new Date().toISOString(), // Current timestamp
        updated_at: new Date().toISOString(), // Current timestamp
      
      };
  
      // Insert event into the database
      const { error: eventError } = await supabase
        .from('events')
        .insert([eventData]);
      
  
      if (eventError) {
        throw new Error(eventError.message || 'Failed to create event.');
      }
  
      // Cleanup image URLs
      imageUrls.forEach(url => URL.revokeObjectURL(url));
      setImageUrls([]);
      setImageFiles([]);
  
      // Redirect to the new subdomain
      window.location.href = `http://${subdomain}.catalystiq.fun`;
  
    } catch (error) {
      console.error('Error creating event:', error);
      setErrors({
        submit: error instanceof Error ? error.message : 'Failed to create event. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };


  const handleInputChange = async (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  
    if (errors[fieldId]) {
      setErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  
    // Check subdomain availability when subdomain field changes
    if (fieldId === 'subdomain') {
      if (value) {
        // Remove special characters and spaces, convert to lowercase
        const sanitizedValue = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
  
        if (value !== sanitizedValue) {
          setErrors(prev => ({
            ...prev,
            subdomain: 'Only lowercase letters, numbers, and hyphens are allowed',
          }));
          return;
        }
  
        const isAvailable = await checkSubdomainAvailability(sanitizedValue);
        setIsSubdomainAvailable(isAvailable);
  
        if (!isAvailable) {
          setErrors(prev => ({
            ...prev,
            subdomain: 'This subdomain is already taken',
          }));
        }
      } else {
        // Clear availability state if input is empty
        setIsSubdomainAvailable(true);
      }
    }
  };
    
    
      const registerSubdomain = async (subdomain: string) => {
        setIsRegisteringSubdomain(true);
        try {
          // Clean the subdomain first
          const cleanedSubdomain = subdomain.replace('.catalystiq.fun', '').trim();
          
          // Call the API endpoint
          const response = await fetch('/api/register-subdomain', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ subdomain: cleanedSubdomain }),
          });
      
          const data = await response.json();
      
          if (!response.ok) {
            throw new Error(data.message || 'Failed to register subdomain');
          }
      
          return true;
        } catch (error) {
          console.error('Error registering subdomain:', error);
          throw error instanceof Error ? error : new Error('Failed to register subdomain');
        } finally {
          setIsRegisteringSubdomain(false);
        }
      };
      

      const handleAddRequirement = () => {
        const requirement = formData.requirement as string;
        if (requirement && !requirements.includes(requirement)) {
          setRequirements(prev => [...prev, requirement]);
          setFormData(prev => ({ ...prev, requirement: '' }));
        }
      };
      
      const handleRemoveRequirement = (index: number) => {
        setRequirements(prev => prev.filter((_, i) => i !== index));
      };

      const handleRemoveImage = (index: number) => {
        const newImageFiles = imageFiles.filter((_, i) => i !== index);
        const newImageUrls = imageUrls.filter((_, i) => i !== index);
        setImageFiles(newImageFiles);
        setImageUrls(newImageUrls);
      };
  

  return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-2xl w-full space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                index <= currentStep 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}
            >
              <step.icon className="w-5 h-5" />
            </div>
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "h-1 flex-1 mx-2",
                  index < currentStep 
                    ? "bg-blue-600" 
                    : "bg-gray-200 dark:bg-gray-700"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-500">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {steps[currentStep].title}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {steps[currentStep].subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {steps[currentStep].fields.map((field) => (
            <div key={field.id}>
              <label 
                htmlFor={field.id}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {field.type === 'array' ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id={field.id}
                      value={formData.requirement || ''}
                      onChange={(e) => handleInputChange('requirement', e.target.value)}
                      className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder={field.placeholder}
                    />
                    <button
                      type="button"
                      onClick={handleAddRequirement}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {requirements.map((req, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <span className="text-gray-700 dark:text-gray-300">{req}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRequirement(index)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : field.type === 'file' ? (
                <div className="space-y-4">
                  <input
                    type="file"
                    id={field.id}
                    multiple={field.multiple}
                    accept={field.accept}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor={field.id}
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Click to upload images
                    </span>
                  </label>
                  
                  {imageUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-4">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                          <img
                            src={url}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.id}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-colors min-h-[100px]",
                    "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                    errors[field.id] && "border-red-500 focus:ring-red-500"
                  )}
                  placeholder={field.placeholder}
                />
              ) : (
                <div className="space-y-1">
                  <input
                    type={field.type}
                    id={field.id}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className={cn(
                      "w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500 transition-colors",
                      "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white",
                      errors[field.id] && "border-red-500 focus:ring-red-500"
                    )}
                    placeholder={field.placeholder}
                  />
                  {field.id === 'subdomain' && formData[field.id] && (
                    <p className={cn(
                      "text-sm mt-1",
                      isSubdomainAvailable ? "text-green-500" : "text-red-500"
                    )}>
                      {isSubdomainAvailable 
                        ? 'Subdomain is available' 
                        : 'Subdomain is already taken'}
                    </p>
                  )}
                </div>
              )}
              
              {errors[field.id] && (
                <p className="mt-1 text-sm text-red-500">{errors[field.id]}</p>
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={cn(
              "px-6 py-2 rounded-lg flex items-center gap-2 transition-colors",
              currentStep === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            )}
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            disabled={loading || isRegisteringSubdomain}
            className={cn(
              "px-6 py-2 rounded-lg flex items-center gap-2 transition-colors",
              "bg-blue-600 text-white hover:bg-blue-700",
              (loading || isRegisteringSubdomain) && "opacity-50 cursor-not-allowed"
            )}
          >
            {loading || isRegisteringSubdomain ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {currentStep === steps.length - 1 ? 'Create Event' : 'Next'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Error Message */}
        {errors.submit && (
          <p className="mt-4 text-center text-sm text-red-500">{errors.submit}</p>
        )}
      </div>
    </div>
  </div>
);
}