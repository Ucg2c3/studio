
'use server';

import { generatePrototype, type GeneratePrototypeInput, type GeneratePrototypeOutput } from '@/ai/flows/generate-prototype';
import { generateImage, type GenerateImageInput, type GenerateImageOutput } from '@/ai/flows/generate-image-flow';
import { z } from 'zod';

const PrototypeActionInputSchema = z.object({
  appDescription: z.string().min(10, 'Description must be at least 10 characters long.'),
});

export async function generateAppPrototypeAction(
  prevState: any,
  formData: FormData
): Promise<{ message?: string; data?: GeneratePrototypeOutput; error?: string }> {
  const validatedFields = PrototypeActionInputSchema.safeParse({
    appDescription: formData.get('appDescription'),
  });

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


const ImageActionInputSchema = z.object({
  promptText: z.string().min(3, 'Prompt must be at least 3 characters long.'),
});

export async function generateImageAction(
  prevState: any,
  formData: FormData
): Promise<{ data?: GenerateImageOutput; error?: string; message?: string }> {
  const validatedFields = ImageActionInputSchema.safeParse({
    promptText: formData.get('promptText'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.promptText?.[0] || 'Invalid prompt.',
    };
  }

  const inputData: GenerateImageInput = {
    promptText: validatedFields.data.promptText,
  };

  try {
    console.log("Calling generateImage with input:", inputData);
    const result = await generateImage(inputData);
    console.log("Received result from generateImage:", result);
    if (result.errorMessage) {
      return { error: result.errorMessage };
    }
    return { message: 'Image generated successfully!', data: result };
  } catch (error) {
    console.error('Error generating image:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to generate image: ${errorMessage}` };
  }
}
