export type Role = "user" | "manager" | "admin";

type User = { id: string; role: Role };
type Todo = { id: string; userId: string; status: "draft" | "in_progress" | "completed" };

export const canViewTodo = (user: User, todo: Todo) => {
  // Requirement: Manager and Admin can see everything
  if (user.role === "admin" || user.role === "manager") return true;
  // Requirement: User can only see their own
  return todo.userId === user.id; 
};

export const canCreateTodo = (user: User) => {
  // Requirement: Only User role can create
  return user.role === "user"; 
};

/**
 * NEW: Update Logic
 * Required for Step 2 of your fixes
 */
export const canUpdateTodo = (user: User, todo: Todo) => {
  // Requirement: User can update their own todos
  if (user.role === "user") {
    return todo.userId === user.id;
  }
  // Requirement: Manager and Admin cannot update
  return false;
};

export const canDeleteTodo = (user: User, todo: Todo) => {
  // Requirement: Admin can delete any todo
  if (user.role === "admin") return true; 
  
  if (user.role === "user") {
    // Requirement: User can only delete own todos in 'draft' state
    return todo.userId === user.id && todo.status === "draft"; 
  }
  
  // Requirement: Managers cannot delete
  return false; 
};