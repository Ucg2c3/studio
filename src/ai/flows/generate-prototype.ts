'use server';

/**
 * @fileOverview A flow that generates a Next.js prototype application based on user input.
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
  prototypeCode: z.string().describe('The generated Next.js application code as a string (e.g., content for a page.tsx or component.tsx file).'),
  layoutDescription: z.string().describe('A description of the generated layout, components, and features.'),
});
export type GeneratePrototypeOutput = z.infer<typeof GeneratePrototypeOutputSchema>;

export async function generatePrototype(input: GeneratePrototypeInput): Promise<GeneratePrototypeOutput> {
  return generatePrototypeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePrototypePrompt',
  input: { schema: GeneratePrototypeInputSchema },
  output: { schema: GeneratePrototypeOutputSchema },
  prompt: `You are an AI that can generate Next.js prototype applications based on user descriptions.

Based on the following description, generate a Next.js application with a basic layout and functionality:

Description: {{{appDescription}}}

When generating the prototype, adhere to the following style guidelines:
- Primary color: Deep sky blue (#007BFF) for a modern and clean feel.
- Secondary color: Light gray (#F8F9FA) for backgrounds and subtle contrasts.
- Accent color: Emerald green (#28A745) for success states and primary actions.
- Typography: Use clean and modern typography for readability and a professional look.
- Layout: Implement a grid-based layout for a structured and organized presentation.
- Iconography: Use simple and intuitive icons to represent different components and actions. Prefer Lucide React icons if appropriate for Next.js/React.

Ensure the generated code is complete and ready to be exported as a Next.js project. This includes generating full, runnable Next.js files (e.g., content for page.tsx or component.tsx files, suitable for the App Router structure).
The prototype should include necessary Tailwind CSS classes for styling according to the guidelines above.
Also, include a detailed description of the generated layout, components, and features.
If the appDescription mentions security, emphasize security features in the user interface, such as visual cues for encryption, secure connections, and network isolation. If a security report is requested, include a section for it in the UI.
The generated 'prototypeCode' should be the content of a single React component or page file (e.g., page.tsx). Do not try to generate multiple files or a full project structure in 'prototypeCode'.
`,
});

const generatePrototypeFlow = ai.defineFlow(
  {
    name: 'generatePrototypeFlow',
    inputSchema: GeneratePrototypeInputSchema,
    outputSchema: GeneratePrototypeOutputSchema,
  },
  async (input: GeneratePrototypeInput) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate prototype. Output was null.');
    }
    return output;
  }
);

