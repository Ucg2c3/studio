
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
import {defineFlow, run} from 'genkit/flow';
import {geminiProVision} from '@genkit-ai/googleai';
import {generate} from 'genkit/ai';

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
  return run('generateImageFlow', () => generateImageFlow(input));
}

export const generateImageFlow = defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input: GenerateImageInput) => {
    try {
      const llmResponse = await generate({
        model: geminiProVision,
        prompt: `Generate an image of: ${input.promptText}. Do not add any text to the image.`,
      });

      const imagePart = llmResponse.media();
      if (imagePart) {
        return { imageDataUri: imagePart.url };
      } else {
        const errorText = llmResponse.text();
        console.error('Image generation failed or no media URL:', errorText);
        return { errorMessage: `Image generation failed: ${errorText}` };
      }
    } catch (error) {
      console.error('Error in generateImageFlow:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during image generation.';
      return { errorMessage };
    }
  }
);
