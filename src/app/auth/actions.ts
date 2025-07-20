
'use server';

import { z } from 'zod';
import { cookies } from 'next/headers';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCustomToken } from 'firebase/auth';
import { admin, getFirebaseAdminApp } from '@/lib/firebase-admin';
import { revalidatePath } from 'next/cache';

const loginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export async function loginAction(prevState: any, formData: FormData) {
  const validatedFields = loginFormSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const auth = getAuth(getFirebaseAdminApp());
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    
    cookies().set('session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn,
      path: '/',
    });
    
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error("Login Error:", error);
    let errorMessage = 'An unexpected error occurred.';
    if (error.code) {
        switch (error.code) {
            case 'auth/invalid-credential':
                errorMessage = 'Invalid email or password. Please try again.';
                break;
            case 'auth/user-not-found':
                errorMessage = 'No user found with this email.';
                break;
            default:
                errorMessage = 'Failed to sign in. Please check your credentials.';
        }
    }
    return { error: { form: [errorMessage] } };
  }
}

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
  getFirebaseAdminApp();
  const validatedFields = registerFormSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password, fullName } = validatedFields.data;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: fullName,
    });

    // Automatically sign the user in by creating a session cookie
    const customToken = await admin.auth().createCustomToken(userRecord.uid);
    
    // Now sign in with the custom token on the client-side auth instance to get an ID token
    const auth = getAuth(getFirebaseAdminApp());
    const userCredential = await signInWithCustomToken(auth, customToken);
    const idToken = await userCredential.user.getIdToken();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    cookies().set('session', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expiresIn,
      path: '/',
    });

    revalidatePath('/');
    return { success: true, message: `Welcome, ${fullName}! Your account has been created.` };
  } catch (error: any) {
    console.error("Registration Error:", error);
     let errorMessage = 'An unexpected error occurred during registration.';
    if (error.code) {
        switch (error.code) {
            case 'auth/email-already-exists':
                errorMessage = 'This email address is already in use.';
                break;
            case 'auth/invalid-password':
                errorMessage = 'The password must be at least 8 characters long.';
                break;
            default:
                errorMessage = 'Failed to register. Please try again.';
        }
    }
    return { error: { form: [errorMessage] } };
  }
}

export async function logoutAction() {
    cookies().delete('session');
    revalidatePath('/');
}
