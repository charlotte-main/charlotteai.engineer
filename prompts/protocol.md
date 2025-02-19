# Frontend Component Development Protocol

// ... existing rules ...

## LLM Execution Guide

When refactoring or creating components, follow these steps in order:

1. Analysis Phase

```
Input: [folder_path] or [file_path]
Action: Analyze current state
- Component locations vs clean architecture
- State management patterns
- Data fetching patterns
- Import patterns
- Test coverage
```

2. Planning Phase

```
Output: Refactoring/Creation Plan
- Layer separation needed:
  ├── UI Layer: apps/web/components/[feature]/ui/
  ├── Feature Layer: apps/web/features/[feature]/components/
  ├── Application Layer: apps/web/hooks/[feature]/
  └── Infrastructure: apps/web/api/[feature]/
```

3. Execution Sequence
   For each component:

```
1. Location
   - Move to correct layer
   - Split if over 50 lines
   - Ensure proper directory structure

2. Dependencies
   - Update imports to use @workspace/ui
   - Remove any direct api/hooks imports
   - Fix import paths after moves

3. State Cleanup
   - Extract business logic to hooks
   - Move state to URL parameters
   - Remove local state

4. Tests
   - Move/create .test.tsx next to component
   - Ensure all states are covered
   - Add missing test cases
```

4. Example Transformation:

```typescript
// BEFORE: Mixed concerns in one file
// old/users/user-list.tsx
export function UserList() {
  const [users, setUsers] = useState([])
  const { data } = useFetch('/api/users')
  return <div>{users.map(...)}</div>
}

// AFTER: Clean separation
// 1. UI Layer: components/users/ui/user-list.tsx
export function UserList({ users, onAction }) {
  return <div>{users.map(...)}</div>
}

// 2. Feature Layer: features/users/components/user-view.tsx
export function UserView() {
  const { users, handleAction } = useUsers()
  return <UserList users={users} onAction={handleAction} />
}

// 3. Application Layer: hooks/users/use-users.ts
export function useUsers() {
  const { data } = useUrlState()
  return { users: data, handleAction: ... }
}

// 4. Test: components/users/ui/user-list.test.tsx
describe('UserList', () => {
  it('renders users correctly', () => {
    render(<UserList users={mockUsers} />)
    expect(screen.getByTestId('user-list')).toBeInTheDocument()
  })
})
```

5. Verification Checklist

```
Component Requirements:
[ ] Under 50 lines
[ ] Pure UI only
[ ] Props for data
[ ] Events via callbacks
[ ] No direct imports from api/hooks
[ ] Co-located test file

State Requirements:
[ ] URL parameters for UI state
[ ] Hooks for business logic
[ ] No local state
[ ] Page-level providers

Architecture Requirements:
[ ] Correct layer placement
[ ] Clean import paths
[ ] Proper shadcn usage
[ ] Feature separation
```

When executing this guide:

1. Start with the deepest components first
2. Move up the component tree
3. Fix imports as you go
4. Verify each component before moving to the next
5. Run tests after each component change
