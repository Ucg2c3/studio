
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

The generated 'prototypeCode' for this single file should be of **EXEMPLARY PRODUCTION QUALITY**, complete, robust, and immediately runnable within a Next.js App Router environment. It must strictly follow these guidelines:
- **Architectural Soundness:** Even for a single file, if the description implies distinct, reusable UI sections, structure the code with well-defined functional components to promote reusability and clarity.
- **Next.js App Router Mastery:** Adhere meticulously to App Router conventions. Utilize Server Components by default unless client-side interactivity is explicitly required and cannot be achieved otherwise.
- **TypeScript Excellence:** Write clean, type-safe, and well-documented (with JSDoc if appropriate for complex props) TypeScript code. Strictly avoid 'any' types; define clear interfaces or types for all props and complex data structures.
- **ShadCN UI & Tailwind CSS Exclusively:** Employ ShadCN UI components (from /components/ui) extensively and exclusively for building the interface. All styling MUST use Tailwind CSS utility classes, respecting the application's theme (see globals.css variables). DO NOT use inline styles, CSS modules, or any other CSS-in-JS solutions.
- **Iconography:** Use icons ONLY from 'lucide-react'. Verify icon existence.
- **Image Handling:** Use the 'next/image' component for ALL images. For placeholder images, use 'https://placehold.co/<width>x<height>.png' (e.g., https://placehold.co/600x400.png). Crucially, always include a 'data-ai-hint' attribute with one or two relevant keywords for image search (e.g., data-ai-hint="modern workspace").
- **Accessibility (A11Y):** Prioritize accessibility. Implement ARIA attributes correctly (e.g., aria-label, aria-labelledby, role) and use semantic HTML elements to ensure the UI is usable by everyone.
- **Error Handling (Conceptual):** While only generating one file, if the component is a page or a significant UI section, the code should be structured in a way that error.js boundaries could easily wrap parts of it in a larger application.
- **No Code Comments:** Do not add any comments (e.g., // or /* */) to the generated 'prototypeCode'.
- **Code Readability & Maintainability:** The code must be exceptionally clean, readable, well-organized, and maintainable, following standard React best practices (functional components, hooks).
- **Single Root Element:** Ensure every React component returns a single root JSX element.

When generating the prototype, adhere to the following style guidelines (these are theme variables in globals.css, so use Tailwind classes that respect them, e.g. bg-primary, text-accent):
- Primary color: Deep sky blue (hsl(211 100% 50%)) for interactive elements.
- Secondary color: Light gray (hsl(210 17% 95%)) for backgrounds and subtle contrasts.
- Accent color: Emerald green (hsl(145 63% 42%)) for primary actions or highlights.
- Typography: Use clean and modern typography (Tailwind's default sans-serif font is appropriate).
- Layout: If the description implies a page, implement a responsive grid-based or flexbox layout for structured presentation.

The 'prototypeCode' output MUST be the content of a single React component or page file (e.g., a page.tsx or component.tsx). Do NOT generate multiple files, a full project structure, or helper utilities in 'prototypeCode'.

Also, provide a 'layoutDescription' detailing the generated layout, key components used, and notable features implemented in the code, emphasizing how production-quality standards were met.

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
