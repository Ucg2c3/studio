
'use server';
/**
 * @fileOverview A flow that generates an image based on a user's text prompt.
 *
 * - generateImage - A function that handles the image generation process.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImageOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {geminiProVision} from '@genkit-ai/googleai';

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
  async (input) => {
    try {
      const llmResponse = await ai.generate({
        model: geminiProVision,
        prompt: `Generate an image of: ${input.promptText}. Do not add any text to the image.`,
      });

      const media = llmResponse.media;
      if (media) {
        return { imageDataUri: media.url };
      } else {
        console.error('Image generation failed or no media URL was returned.');
        return { errorMessage: `Image generation failed: No media was returned from the model.` };
      }
    } catch (error) {
      console.error('Error in generateImageFlow:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during image generation.';
      return { errorMessage };
    }
  }
);
