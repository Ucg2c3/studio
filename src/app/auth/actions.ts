
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { admin, getFirebaseAdminApp, adminAuth } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Note: The login action is handled by the client-side form and /api/auth/login route
// to follow the standard Firebase Auth flow (client signs in, gets ID token, sends to server).
// This file is for other auth-related server actions.

const registerFormSchema = z.object({
  fullName: z.string().min(3, { message: 'Full name must be at least 3 characters.'}),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export async function registerAction(prevState: any, formData: FormData) {
  const validatedFields = registerFormSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const auth = adminAuth(); // Get auth instance after ensuring app is initialized.
  const { email, password, fullName } = validatedFields.data;

  try {
    await auth.createUser({
      email,
      password,
      displayName: fullName,
    });
    
    // On successful creation, we will not automatically log them in.
    // We will return a success message and the client will redirect to the login page.
    return { success: true, message: `Welcome, ${fullName}! Your account has been created. Please log in.` };

  } catch (error: any) {
    console.error("Registration Error:", error);
    let errorMessage = 'An unexpected error occurred during registration.';
    if (error.code === 'auth/email-already-exists') {
        errorMessage = 'This email address is already in use.';
    } else if (error.code === 'auth/invalid-password') {
        errorMessage = 'The password must be at least 8 characters long.';
    } else {
        errorMessage = error.message || 'Failed to register. Please try again.';
    }
    return { error: { form: [errorMessage] } };
  }
}

export async function logoutAction() {
    cookies().delete('session');
    revalidatePath('/');
    redirect('/login');
}
