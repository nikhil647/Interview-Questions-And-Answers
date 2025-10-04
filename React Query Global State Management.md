# React Query Global State Management

A practical guide to using React Query for global state management with server data synchronization.

---

## Table of Contents
1. [Setup](#setup)
2. [Global State Hook](#global-state-hook)
3. [User Profile Hook](#user-profile-hook)
4. [Complete Example](#complete-example)

---

## Setup

First, wrap your application with the QueryClientProvider:

```jsx
// App.jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProfile />
      <Settings />
      <Dashboard />
    </QueryClientProvider>
  );
}
```

---

## Global State Hook

A reusable hook for managing global state across components:

```typescript
// hooks/useGlobalState.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';

const GLOBAL_STATE_KEY_PREFIX = 'globalState';

export function useGlobalState<T>(key: string | string[], initialState?: T) {
  const queryClient = useQueryClient();
  const stateKey = [GLOBAL_STATE_KEY_PREFIX, key];
  
  const { data } = useQuery(stateKey, () => initialState, {
    initialData: initialState,
    staleTime: Infinity,
  });
  
  const setData = (newState: T) => {
    queryClient.setQueryData(stateKey, newState);
  };
  
  return [data ?? initialState, setData] as const;
}
```

---

## User Profile Hook

Fetches initial data from the server and allows local updates with server synchronization:

```typescript
// hooks/useUserProfile.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchUser = async () => {
  const res = await fetch('/api/user');
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};

export function useUserProfile() {
  const queryClient = useQueryClient();
  
  // Fetch initial user data
  const userQuery = useQuery(['user'], fetchUser);
  
  // Mutation for updating user data
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to update user');
      return res.json();
    },
    onSuccess: (data) => {
      // Update the global cache with server response
      queryClient.setQueryData(['user'], data);
    },
  });
  
  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,
    error: userQuery.error,
    updateUser: mutation.mutate,
    isUpdating: mutation.isLoading,
  };
}
```

---

## Complete Example

### Component 1: User Profile Editor

This component fetches initial user data and allows editing:

```jsx
// components/UserProfile.jsx
import { useState, useEffect } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';

export function UserProfile() {
  const { user, isLoading, updateUser, isUpdating } = useUserProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: ''
  });

  // Initialize form with fetched user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
  };

  if (isLoading) return <div>Loading user data...</div>;

  return (
    <div className="profile-editor">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <textarea
          placeholder="Bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
        />
        <button type="submit" disabled={isUpdating}>
          {isUpdating ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
```

### Component 2: User Display (Auto-synced)

This component automatically displays the updated user data:

```jsx
// components/UserDisplay.jsx
import { useUserProfile } from '../hooks/useUserProfile';

export function UserDisplay() {
  const { user, isLoading } = useUserProfile();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>No user data</div>;

  return (
    <div className="user-display">
      <h3>Current User Info</h3>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>
    </div>
  );
}
```

### Component 3: Using Global State

For client-only state that doesn't need server synchronization:

```jsx
// components/Settings.jsx
import { useGlobalState } from '../hooks/useGlobalState';

export function Settings() {
  const [theme, setTheme] = useGlobalState('theme', 'light');
  const [notifications, setNotifications] = useGlobalState('notifications', true);

  return (
    <div className="settings">
      <h3>Settings</h3>
      <label>
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
        />
        Dark Mode
      </label>
      <label>
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
        />
        Enable Notifications
      </label>
    </div>
  );
}
```

---

## How It Works

### Data Flow

1. **Initial Load**: `useUserProfile` fetches data from `/api/user`
2. **Local State**: User edits form fields (local component state)
3. **Submit**: `updateUser()` sends changes to server
4. **Global Update**: On success, React Query cache updates automatically
5. **Auto-Sync**: All components using `useUserProfile` re-render with new data

### Key Benefits

- ✅ **Single Source of Truth**: All components share the same user data
- ✅ **Automatic Synchronization**: Changes propagate instantly
- ✅ **Server-Client Sync**: Updates persist to server and refresh cache
- ✅ **No Prop Drilling**: Access state from any component
- ✅ **Built-in Loading States**: Handle async operations gracefully

### When to Use Each Hook

| Hook | Use Case |
|------|----------|
| `useUserProfile` | Server data that needs synchronization (user profile, settings) |
| `useGlobalState` | Client-only state shared across components (theme, UI preferences) |

---

## Advanced: Optimistic Updates

For instant UI feedback, use optimistic updates:

```typescript
const mutation = useMutation({
  mutationFn: async (data: any) => {
    const res = await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['user']);
    
    // Snapshot previous value
    const previousUser = queryClient.getQueryData(['user']);
    
    // Optimistically update
    queryClient.setQueryData(['user'], (old) => ({ ...old, ...newData }));
    
    return { previousUser };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(['user'], context.previousUser);
  },
  onSuccess: (data) => {
    // Confirm with server response
    queryClient.setQueryData(['user'], data);
  },
});
```

---

## API Reference

### `useGlobalState<T>(key, initialState?)`

**Parameters:**
- `key`: Unique identifier for the state
- `initialState`: Optional initial value

**Returns:**
- `[data, setData]`: Current state and setter function

### `useUserProfile()`

**Returns:**
- `user`: User data object
- `isLoading`: Loading state
- `error`: Error object if fetch failed
- `updateUser`: Function to update user data
- `isUpdating`: Mutation loading state
