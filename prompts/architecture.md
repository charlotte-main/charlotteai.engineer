# AI Chat Application Architecture Protocol

## Core Structure

1. Project Structure

   ```
   apps/web/              # Main Application
   ├── app/              # Next.js App Router
   │   ├── (chat)/      # Chat Route Group
   │   │   ├── page.tsx # Chat Interface
   │   │   └── layout.tsx # Chat Layout
   │   └── api/         # API Routes
   │       └── chat/    # Chat API Endpoints
   │
   ├── components/      # UI Components
   │   ├── chat/       # Chat-specific Components
   │   │   ├── ui/    # Pure UI Components
   │   │   └── index.ts # Public API
   │   └── shared/    # Shared Components
   │
   ├── features/       # Feature Layer
   │   └── chat/      # Chat Feature
   │       ├── components/ # Smart Components
   │       └── index.ts   # Public API
   │
   ├── hooks/         # Application Logic
   │   ├── chat/     # Chat-specific Hooks
   │   └── shared/   # Shared Hooks
   │
   ├── lib/          # Core Libraries
   │   ├── ai/      # AI Integration
   │   │   ├── models.ts    # AI Models
   │   │   └── prompts.ts   # System Prompts
   │   ├── types/   # TypeScript Types
   │   └── utils/   # Utilities
   │
   └── styles/      # Global Styles
   ```

2. Component Organization

   Chat UI Components:

   ```
   components/chat/ui/
   ├── message-list.tsx    # Chat Messages Display
   ├── message-input.tsx   # Message Input Interface
   ├── chat-header.tsx     # Chat Header
   └── index.ts           # Public Exports
   ```

   Feature Components:

   ```
   features/chat/
   ├── components/
   │   ├── chat-interface.tsx   # Main Chat Interface
   │   └── chat-settings.tsx    # Settings Panel
   └── index.ts                # Public Exports
   ```

3. State Management

   - Chat state MUST use URL parameters for:

     - Current model selection
     - Chat visibility settings
     - UI preferences

   - Message state MUST be managed through hooks:
     ```typescript
     // hooks/chat/use-chat.ts
     export function useChat() {
       // Message handling
       // AI interaction
       // State management
     }
     ```

4. AI Integration Layer

   ```typescript
   // lib/ai/models.ts
   interface AIModel {
     id: string;
     name: string;
     capabilities: string[];
     maxTokens: number;
   }

   // lib/ai/prompts.ts
   interface SystemPrompt {
     role: "system";
     content: string;
     model: string;
   }
   ```

## Implementation Rules

1. Component Requirements

   ```typescript
   // ✅ CORRECT: Pure UI Component
   // components/chat/ui/message-item.tsx
   interface MessageProps {
     content: string;
     role: "user" | "assistant";
     timestamp: string;
   }

   export function MessageItem({ content, role, timestamp }: MessageProps) {
     return (
       <div className="message" data-role={role}>
         {content}
       </div>
     );
   }

   // ❌ WRONG: Mixed Concerns
   export function MessageItem() {
     const { messages } = useChat(); // NO hooks in UI components
     return <div>{messages}</div>;
   }
   ```

2. AI Integration Pattern

   ```typescript
   // ✅ CORRECT: Separated Concerns
   // hooks/chat/use-ai-chat.ts
   export function useAIChat() {
     const { model, systemPrompt } = useAIConfig();
     const { messages, addMessage } = useChatState();

     const sendMessage = async (content: string) => {
       // AI interaction logic
     };

     return { messages, sendMessage };
   }

   // features/chat/components/chat-interface.tsx
   export function ChatInterface() {
     const { messages, sendMessage } = useAIChat();
     return (
       <div>
         <MessageList messages={messages} />
         <MessageInput onSend={sendMessage} />
       </div>
     );
   }
   ```

3. Error Handling

   ```typescript
   // ✅ CORRECT: Error Boundaries
   // components/chat/error-boundary.tsx
   export function ChatErrorBoundary({ children }: PropsWithChildren) {
     return (
       <ErrorBoundary fallback={<ChatErrorDisplay />} onError={logError}>
         {children}
       </ErrorBoundary>
     );
   }
   ```

4. Testing Requirements

   ```typescript
   // components/chat/ui/message-list.test.tsx
   describe("MessageList", () => {
     it("renders messages correctly", () => {
       const messages = mockMessages;
       render(<MessageList messages={messages} />);
       expect(screen.getByTestId("message-list")).toBeInTheDocument();
     });

     it("handles empty state", () => {
       render(<MessageList messages={[]} />);
       expect(screen.getByText(/no messages/i)).toBeInTheDocument();
     });
   });
   ```

## State Management Guidelines

1. URL State Parameters:

   ```typescript
   interface ChatURLParams {
     model: string;
     thread?: string;
     view: "chat" | "settings";
   }
   ```

2. Message State:
   ```typescript
   interface ChatState {
     messages: Message[];
     status: "idle" | "loading" | "error";
     error?: Error;
   }
   ```

## Documentation Requirements

1. Component Documentation:

   ```typescript
   /**
    * ChatInterface Component
    *
    * Main chat interface that handles message display and input.
    *
    * @param {Object} props
    * @param {string} props.modelId - Selected AI model
    * @param {boolean} props.streaming - Enable/disable streaming
    */
   ```

2. Hook Documentation:
   ```typescript
   /**
    * useChat Hook
    *
    * Manages chat state and AI interaction.
    *
    * @param {ChatConfig} config - Chat configuration
    * @returns {ChatHookResult} Chat state and methods
    */
   ```

## Implementation Checklist

✓ Component Structure

- [ ] Pure UI components in components/chat/ui
- [ ] Smart components in features/chat
- [ ] Proper error boundaries
- [ ] Loading states

✓ State Management

- [ ] URL parameters for UI state
- [ ] Message state in hooks
- [ ] Proper error handling
- [ ] Loading indicators

✓ AI Integration

- [ ] Clean model separation
- [ ] Proper prompt management
- [ ] Error handling
- [ ] Rate limiting

✓ Testing

- [ ] Component tests
- [ ] Hook tests
- [ ] Integration tests
- [ ] Error scenarios

## Testing Protocol

1. Test File Structure

   ```
   components/chat/ui/
   ├── message-list.tsx
   ├── message-list.unit.test.tsx    # Unit tests
   ├── message-list.e2e.test.tsx     # Integration tests
   ├── message-input.tsx
   ├── message-input.unit.test.tsx
   └── message-input.e2e.test.tsx
   ```

2. Test File Naming Convention

   - Unit Tests: `[component-name].unit.test.tsx`
   - Integration Tests: `[component-name].e2e.test.tsx`
   - Test Utils: `[name].test-utils.ts`

3. TDD Implementation Rules

   ```typescript
   // ✅ CORRECT: Test-First Development
   // components/chat/ui/message-input.test.tsx

   describe("MessageInput", () => {
     // 1. Setup test requirements
     const defaultProps = {
       onSend: vi.fn(),
       disabled: false,
       placeholder: "Type a message",
     };

     // 2. Define expected behavior
     it("should handle message submission", async () => {
       const onSend = vi.fn();
       render(<MessageInput {...defaultProps} onSend={onSend} />);

       // 3. Implement test before component
       const input = screen.getByRole("textbox");
       await userEvent.type(input, "Hello AI{Enter}");

       expect(onSend).toHaveBeenCalledWith("Hello AI");
       expect(input).toHaveValue("");
     });
   });

   // 4. Implement component to pass test
   // components/chat/ui/message-input.tsx
   export function MessageInput({ onSend, disabled, placeholder }: Props) {
     // Implementation follows test requirements
   }
   ```

4. Vitest Unit Testing Requirements

   ```typescript
   // components/chat/ui/chat-message.test.tsx
   import { describe, it, expect, vi } from "vitest";
   import { render, screen } from "@testing-library/react";
   import userEvent from "@testing-library/user-event";

   describe("ChatMessage", () => {
     // 1. Component Rendering
     it("renders message content correctly", () => {
       render(<ChatMessage content="Test message" role="user" />);
       expect(screen.getByText("Test message")).toBeInTheDocument();
     });

     // 2. User Interactions
     it("handles message actions", async () => {
       const onAction = vi.fn();
       render(<ChatMessage onAction={onAction} />);
       await userEvent.click(screen.getByRole("button"));
       expect(onAction).toHaveBeenCalled();
     });

     // 3. Loading States
     it("shows loading state", () => {
       render(<ChatMessage isLoading />);
       expect(screen.getByTestId("message-skeleton")).toBeInTheDocument();
     });

     // 4. Error States
     it("displays error state", () => {
       render(<ChatMessage error="Failed to send" />);
       expect(screen.getByRole("alert")).toBeInTheDocument();
     });
   });
   ```

5. Playwright Integration Testing

   ```typescript
   // components/chat/ui/chat-interface.e2e.test.ts
   import { test, expect } from "@playwright/test";

   test.describe("Chat Interface", () => {
     test.beforeEach(async ({ page }) => {
       await page.goto("/chat");
     });

     test("complete message exchange flow", async ({ page }) => {
       // 1. Send Message
       await page.fill('[data-testid="message-input"]', "Hello AI");
       await page.press('[data-testid="message-input"]', "Enter");

       // 2. Verify Message Display
       await expect(page.locator('[data-testid="message-list"]')).toContainText(
         "Hello AI"
       );

       // 3. Wait for AI Response
       await expect(page.locator('[data-testid="ai-response"]')).toBeVisible({
         timeout: 10000,
       });

       // 4. Verify Response
       const response = await page
         .locator('[data-testid="ai-response"]')
         .first();
       await expect(response).toBeVisible();
       await expect(response).not.toBeEmpty();
     });

     test("error handling", async ({ page }) => {
       // Network error simulation
       await page.route("**/api/chat", (route) => route.abort());

       await page.fill('[data-testid="message-input"]', "Test message");
       await page.press('[data-testid="message-input"]', "Enter");

       await expect(page.locator('[role="alert"]')).toBeVisible();
     });
   });
   ```

6. Test Coverage Requirements

   ```typescript
   // vitest.config.ts
   export default defineConfig({
     test: {
       coverage: {
         reporter: ["text", "json", "html"],
         branches: 80,
         functions: 80,
         lines: 80,
         statements: 80,
       },
     },
   });
   ```

7. Test Utils Organization

   ```typescript
   // lib/test/setup-tests.ts
   import "@testing-library/jest-dom";
   import { cleanup } from "@testing-library/react";
   import { afterEach } from "vitest";

   afterEach(() => {
     cleanup();
     vi.clearAllMocks();
   });

   // lib/test/test-utils.ts
   export function createMockMessage(override = {}) {
     return {
       id: "test-id",
       content: "Test message",
       role: "user",
       timestamp: new Date().toISOString(),
       ...override,
     };
   }
   ```

## Test Implementation Checklist

✓ Unit Tests (Vitest)

- [ ] Component rendering tests
- [ ] User interaction tests
- [ ] State management tests
- [ ] Error handling tests
- [ ] Loading state tests
- [ ] Accessibility tests

✓ Integration Tests (Playwright)

- [ ] End-to-end chat flow
- [ ] Error scenarios
- [ ] Network conditions
- [ ] UI responsiveness
- [ ] Cross-browser compatibility

✓ Test Organization

- [ ] Co-located test files
- [ ] Shared test utilities
- [ ] Mock data factories
- [ ] Test coverage reports

✓ TDD Workflow

- [ ] Write failing test first
- [ ] Implement minimum code to pass
- [ ] Refactor while maintaining tests
- [ ] Document test scenarios
