"use client";

import { useState, useEffect } from "react";
import { validateEmail, validatePhone, validatePassword } from "@/utils/validation";

interface FormField {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
}

interface FormSchema {
  fields: FormField[];
}

export function useFormHandler(activeSchema: FormSchema, onSubmitSuccess: (data: Record<string, string>) => void) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shakeId, setShakeId] = useState<number | null>(null);

  // Initialize fields on schema swap
  useEffect(() => {
    const initialData: Record<string, string> = {};
    const initialShowPassword: Record<string, boolean> = {};

    activeSchema.fields.forEach((field) => {
      initialData[field.id] = "";
      if (field.type === "password") {
        initialShowPassword[field.id] = false;
      }
    });

    setFormData(initialData);
    setErrors({});
    setShowPassword(initialShowPassword);
    setShakeId(null);
  }, [activeSchema]);

  const handleChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
    if (errors[fieldId]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  };

  const togglePasswordVisibility = (fieldId: string) => {
    setShowPassword((prev) => ({ ...prev, [fieldId]: !prev[fieldId] }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    activeSchema.fields.forEach((field) => {
      const val = formData[field.id] || "";

      if (field.required && !val.trim()) {
        newErrors[field.id] = `${field.label} is required.`;
        return;
      }

      if (field.type === "email" && val && !validateEmail(val)) {
        newErrors[field.id] = "Please enter a valid email address.";
      }

      if (field.type === "password" && val && !validatePassword(val)) {
        newErrors[field.id] = "Password must be at least 6 characters.";
      }

      if (field.id === "confirmPassword" && val) {
        if (val !== formData["password"]) {
          newErrors[field.id] = "Passwords do not match.";
        }
      }

      if (field.type === "tel" && val && !validatePhone(val)) {
        newErrors[field.id] = "Please enter a valid phone number.";
      }
    });

    setErrors(newErrors);
    
    // Trigger form shake if validation fails
    if (Object.keys(newErrors).length > 0) {
      setShakeId(Date.now());
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsSubmitting(false);
      onSubmitSuccess(formData);
    }
  };

  return {
    formData,
    errors,
    showPassword,
    isSubmitting,
    shakeId,
    handleChange,
    togglePasswordVisibility,
    handleSubmit,
  };
}
