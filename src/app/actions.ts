'use server';

import { generatePrototype, type GeneratePrototypeInput, type GeneratePrototypeOutput } from '@/ai/flows/generate-prototype';
import { z } from 'zod';

const ActionInputSchema = z.object({
  appDescription: z.string().min(10, 'Description must be at least 10 characters long.'),
});

export async function generateAppPrototypeAction(
  prevState: any, // Required for useFormState, can be any type
  formData: FormData
): Promise<{ message?: string; data?: GeneratePrototypeOutput; error?: string }> {
  const validatedFields = ActionInputSchema.safeParse({
    appDescription: formData.get('appDescription'),
  });

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.appDescription?.[0] || 'Invalid input.',
    };
  }

  const inputData: GeneratePrototypeInput = {
    appDescription: validatedFields.data.appDescription,
  };

  try {
    console.log("Calling generatePrototype with input:", inputData);
    const result = await generatePrototype(inputData);
    console.log("Received result from generatePrototype:", result);
    return { message: 'Prototype generated successfully!', data: result };
  } catch (error) {
    console.error('Error generating prototype:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to generate prototype: ${errorMessage}` };
  }
}
