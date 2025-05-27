
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
  prompt: `You are an AI that can generate Next.js prototype application files based on user descriptions.

Based on the following description, generate the content for a single Next.js App Router file (e.g., page.tsx or a component.tsx):

Description: {{{appDescription}}}

The generated 'prototypeCode' for this single file should be of **production quality**, complete, and runnable. It must strictly follow these guidelines:
- **Next.js App Router:** Adhere to App Router conventions.
- **Server Components:** Utilize Server Components by default where appropriate.
- **TypeScript:** Write clean, type-safe TypeScript code.
- **ShadCN UI & Tailwind CSS:** Employ ShadCN UI components (from /components/ui) extensively for a polished and professional interface. Use Tailwind CSS for all styling, adhering to the specified theme colors. Do not use inline styles or other CSS methods.
- **Lucide Icons:** Use icons from 'lucide-react' where appropriate.
- **Images:** Use the 'next/image' component for all images. For placeholders, use 'https://placehold.co/<width>x<height>.png' (e.g., https://placehold.co/600x400.png) and always include a 'data-ai-hint' attribute with one or two relevant keywords for image search (e.g., data-ai-hint="abstract landscape").
- **Accessibility:** Implement ARIA attributes and ensure semantic HTML for good accessibility.
- **Error Handling:** For pages, if applicable, consider where error.js boundaries might be used, though you are only generating one file.
- **No Comments:** Do not add any comments to the generated code.

When generating the prototype, adhere to the following style guidelines (these are theme variables in globals.css, so use Tailwind classes that respect them, e.g. bg-primary, text-accent):
- Primary color: Deep sky blue (hsl(211 100% 50%)) for interactive elements.
- Secondary color: Light gray (hsl(210 17% 95%)) for backgrounds and subtle contrasts.
- Accent color: Emerald green (hsl(145 63% 42%)) for primary actions or highlights.
- Typography: Use clean and modern typography (Tailwind's default sans-serif font is appropriate).
- Layout: If the description implies a page, implement a responsive grid-based or flexbox layout for structured presentation.

The 'prototypeCode' output MUST be the content of a single React component or page file (e.g., a page.tsx or component.tsx). Do NOT generate multiple files, a full project structure, or helper utilities in 'prototypeCode'.

Also, provide a 'layoutDescription' detailing the generated layout, key components used, and notable features implemented in the code.

If the appDescription mentions security, emphasize security features in the user interface, such as visual cues for encryption (e.g., lock icons using Lucide), secure connections (e.g., shield icons, indicators for HTTPS), and network isolation concepts if they can be visually represented. If a security report is requested, include a dedicated section or card in the UI for displaying this report, styled appropriately.
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

