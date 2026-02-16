## 2026-02-16

## Kanban Board & Task Management Refactor (State Centralization & Backend Integration)

This update significantly refactors how Kanban board and list data are managed and passed through components, moving towards a more centralized state management approach using `useBoardStore` (Zustand). Crucially, task creation is now integrated with a backend API, with a robust fallback mechanism for a smoother user experience.

### Core Intent & Direction:

The primary intent behind these changes is to:
1.  **Reduce Prop Drilling:** Instead of passing entire `Board` and `List` objects down multiple levels, components now receive unique IDs and fetch their specific data directly from the central `boardStore`.
2.  **Centralize State Logic:** Promote `boardStore` as the single source of truth for Kanban data, making components "smarter" and less reliant on parent components for data.
3.  **Integrate with Backend:** Lay the groundwork for persistent storage of Kanban tasks by connecting the `addTask` action to a backend API.
4.  **Enhance Robustness:** Implement a local state fallback for API operations to ensure a continuous user experience even if backend calls fail.

### Key Changes & Modified Components:

#### 1. `src/components/app/objects/project-components/KanbanBoard.tsx`
*   **Prop Changes:** The component no longer accepts `title: string` and `cards: Cards[]` props. It now receives a `list: string` prop, which represents the `listId`.
*   **State Integration:** `KanbanBoard` now internally uses `useBoardStore` to find its `activeList` based on the `listId` received.
*   **Data Source Shift:**
    *   The board's title (`<h2>`) now renders `activeList.title`.
    *   The `Droppable` component's `droppableId` is now `activeList.id`.
    *   The cards displayed (`activeList.cards.map`) are now directly sourced from the `activeList` object fetched from the store.
*   **`onAddCard` Callback Update:** The `onAddCard` prop now expects a `listId` instead of a `boardTitle`, aligning with the new data flow.

#### 2. `src/components/app/objects/project-components/KanbanContainer.tsx`
*   **Prop Changes:** The component now accepts `boardId: string` instead of the full `board: Board` object.
*   **State Integration:** `KanbanContainer` uses `useBoardStore` to fetch its `currentBoard` based on the `boardId` prop.
*   **`KanbanBoard` Prop Updates:** When rendering individual `KanbanBoard` components, it now passes `list={list.id}` instead of `title={list.title}` and `cards={list.cards}`, reflecting the `KanbanBoard`'s updated prop requirements.

#### 3. `src/pages/app/project/ProjectDetail.tsx`
*   **Prop Update:** The `KanbanContainer` component is now instantiated with `boardId={board?.id || ""}`, aligning with the new prop requirement.

#### 4. `src/store/boardStore.ts`
*   **`addTask` Function Overhaul:**
    *   **Asynchronous Operation:** The `addTask` function is now `async` and returns a `Promise<any>`.
    *   **Backend Integration:** It attempts to create the new task by making an `api.post` request to the `/boards/add-task/` endpoint.
    *   **Robust Local Fallback:**
        *   If the API call is successful, the local state is updated with the `createdTask` data returned from the server.
        *   If the API call fails (caught in the `catch` block), an error is logged, and the task is *still added to the local state*. This local update includes generating a temporary ID using `crypto.randomUUID()` or `Date.now()` if the task doesn't already have one, ensuring a smooth user experience even without immediate server confirmation.

### Benefits & Impact:

*   **Cleaner Component Interfaces:** Components like `KanbanBoard` and `KanbanContainer` are now less coupled to the exact structure of their parent's data, receiving only necessary IDs.
*   **Improved Data Flow:** Data for boards and lists is consistently managed through the `boardStore`, reducing complexity and making state changes easier to track.
*   **Foundation for Persistence:** The `addTask` integration is the first step towards making Kanban tasks persistent across sessions, leveraging a backend.
*   **Enhanced User Experience:** The local state fallback for `addTask` prevents UI blocks or data loss from being immediately visible to the user during temporary network issues or backend errors.

---

## 2026-01-22

### Project Update Summary: Sidebar UI Refactor & Board Creation Enhancements

This update brings significant improvements to the application's layout, specifically a new collapsible sidebar, and refines the board creation process to better align with backend data structures.

**Key Highlights:**

1.  **Collapsible Side Navigation:** The main application layout now features a dynamic, collapsible sidebar, allowing users to hide or show the navigation panel for improved screen real estate and focus.
2.  **Streamlined Board Creation:** The board creation flow has been updated to rely more heavily on server-generated data, introducing `slug` and `color` fields for boards and simplifying client-side ID handling.

---

### Detailed Changes:

#### 📂 **New/Untracked Files:**

*   `CHANGELOG.md`: A new file indicating the start of formal change logging.
*   `amnesiac.config.js`: A new configuration file, likely for a new tool or build process.

#### 🔄 **Modified Files:**

*   **`src/components/app/layout/Layout.tsx`**:
    *   **Intent:** Implement a collapsible side navigation system.
    *   **Changes:**
        *   **Added Icon:** Imported `PiArrowsLeftRight` from `react-icons/pi` for the toggle button.
        *   **State Management:** Introduced a new `showNav` state (boolean) to control the visibility of the sidebar.
        *   **Structural Refactor:**
            *   The `SideNav` and `Header` components are now wrapped within a new `div` that applies the styling (`border`, `bg`, `rounded-lg`) and handles the `translate-x` transformation for the collapse/expand effect.
            *   An `absolute` positioned toggle button with the `PiArrowsLeftRight` icon was added, linked to `setShowNav`, allowing users to toggle the sidebar's visibility.
        *   **Layout Adjustment:** The main content area's `padding-left` now dynamically adjusts based on the `showNav` state, pushing content over when the nav is visible.
        *   **Styling:** Removed `border-r` and `bg` classes from the main sidebar container, shifting them to the inner sliding container for better visual control during transitions.

*   **`src/components/app/layout/SideNav.tsx`**:
    *   **Intent:** Adapt to the new collapsible layout structure defined in `Layout.tsx`.
    *   **Changes:**
        *   **Removed Layout Styling:** Removed `min-h-screen max-h-screen` and `bg` classes from the main `SideNav` div. These styling responsibilities (height, background) are now handled by its parent container in `Layout.tsx`.

*   **`src/components/app/projects/main/BoardList.tsx`**:
    *   **Intent:** Align client-side board creation with backend API changes.
    *   **Changes:**
        *   **Function Call Update:** In the `addBoards` function, the call to `createBoard` was changed from `createBoard(newBoards.id, newBoards.name)` to `createBoard("", newBoards.name)`.
            *   **Note:** This indicates that the `id` for new boards is likely no longer generated client-side or passed as the first argument, or it's a placeholder while the `boardStore` handles ID generation.
        *   **Debugging Addition:** Added a `console.log(newBoards)` before calling `addBoards`, possibly for debugging the `newBoards` object's content.

*   **`src/store/boardStore.ts`**:
    *   **Intent:** Enhance the `Board` data model and refine the `createBoard` action for better backend integration.
    *   **Changes:**
        *   **`Board` Interface Update:** Added `slug?: string` to the `Board` interface, indicating that boards can now have a URL-friendly slug.
        *   **`createBoard` Action Refactor:**
            *   **Signature Change:** The `createBoard` action signature was updated from `(name, description)` to `(id, name)`.
            *   **API Request:** The `api.post("/boards/create-board/", { name })` request now sends only the `name`.
            *   **Server Data Integration:** The `response.data.board` is now expected to return `id`, `name`, `description`, `favorite`, `slug`, and `color`. The store now correctly captures `slug` and `color` fields from the server response for a newly created board.
            *   **Data Refresh:** Added `useBoardStore.getState().getBoards()` after successful board creation, ensuring the board list is immediately refreshed to show the new board.
            *   **Debugging:** Added `console.log` statements for debugging `id` and `name` during creation.

*   **`src/themeConfig.ts`**:
    *   **Intent:** Minor aesthetic adjustment to the dark theme.
    *   **Changes:**
        *   **Dark Theme Border Color:** Updated the global `border` color for the `dark` theme from `border-zinc-800` to `border-zinc-700`, making the borders slightly lighter.


