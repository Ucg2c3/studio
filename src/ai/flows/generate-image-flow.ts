
'use server';
/**
 * @fileOverview A flow that generates an image based on a user's text prompt.
 *
 * - generateImage - A function that handles the image generation process.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  promptText: z.string().describe('A text prompt describing the image to be generated.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z.string().optional().describe("The generated image as a data URI (e.g., 'data:image/png;base64,...'). Optional in case of generation failure."),
  errorMessage: z.string().optional().describe("An error message if image generation failed."),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input: GenerateImageInput) => {
    try {
      const {media, finishReason, status} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-exp', // IMPORTANT: Use the specified model for image generation
        prompt: input.promptText,
        config: {
          responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE
        },
      });

      if (status === 'success' && media?.url) {
        return { imageDataUri: media.url };
      } else {
        console.error('Image generation failed or no media URL:', {finishReason, status, media});
        return { errorMessage: `Image generation failed. Status: ${status}, Reason: ${finishReason}` };
      }
    } catch (error) {
      console.error('Error in generateImageFlow:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during image generation.';
      return { errorMessage };
    }
  }
);
