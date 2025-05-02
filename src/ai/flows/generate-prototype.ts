'use server';

/**
 * @fileOverview A flow that generates a Next.js prototype application based on user input using Claude AI.
 *
 * - generatePrototype - A function that handles the prototype generation process.
 * - GeneratePrototypeInput - The input type for the generatePrototype function.
 * - GeneratePrototypeOutput - The return type for the generatePrototype function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GeneratePrototypeInputSchema = z.object({
  appDescription: z.string().describe('A detailed description of the desired Next.js application, including layout, components, and functionality.'),
});
export type GeneratePrototypeInput = z.infer<typeof GeneratePrototypeInputSchema>;

const GeneratePrototypeOutputSchema = z.object({
  prototypeCode: z.string().describe('The generated Next.js application code as a string.'),
  layoutDescription: z.string().describe('A description of the generated layout, components, and features.'),
});
export type GeneratePrototypeOutput = z.infer<typeof GeneratePrototypeOutputSchema>;

export async function generatePrototype(input: GeneratePrototypeInput): Promise<GeneratePrototypeOutput> {
  return generatePrototypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePrototypePrompt',
  input: {
    schema: z.object({
      appDescription: z.string().describe('A detailed description of the desired Next.js application, including layout, components, and functionality.'),
    }),
  },
  output: {
    schema: z.object({
      prototypeCode: z.string().describe('The generated Next.js application code as a string.'),
      layoutDescription: z.string().describe('A description of the generated layout, components, and features.'),
    }),
  },
  prompt: `You are an AI that can generate Next.js prototype applications based on user descriptions.

  Based on the following description, generate a Next.js application with a basic layout and functionality:

  Description: {{{appDescription}}}

  Ensure the generated code is complete and ready to be exported as a Next.js project.
  Also, include a description of the generated layout, components, and features.
  `,
});

const generatePrototypeFlow = ai.defineFlow<
  typeof GeneratePrototypeInputSchema,
  typeof GeneratePrototypeOutputSchema
>({
  name: 'generatePrototypeFlow',
  inputSchema: GeneratePrototypeInputSchema,
  outputSchema: GeneratePrototypeOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
}
);
