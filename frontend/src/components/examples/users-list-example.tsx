"use client";

import { useUsers, useCreateUser, useDeleteUser } from '@/lib/hooks/users';
import { Button } from '@/components/ui/button';
import { Loader2, UserPlus, Trash2 } from 'lucide-react';
import { useState } from 'react';

/**
 * Example component demonstrating how to use the users API hooks
 * You can use this as a reference for implementing similar functionality in your existing components
 */
export function UsersListExample() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Fetch all users
  const { data: usersResponse, isLoading, error, refetch } = useUsers();
  
  // Create user mutation
  const createUserMutation = useCreateUser();
  
  // Delete user mutation
  const deleteUserMutation = useDeleteUser();

  // Handle create user
  const handleCreateUser = async () => {
    try {
      await createUserMutation.mutateAsync({
        role: 'doctor',
        email: 'new.doctor@example.com',
        passwordHash: 'hashedpassword123', // In real app, hash this on frontend or backend
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('1990-01-01'),
        sex: 'Male',
        telephone: '+1234567890',
        specialty: 'Cardiology',
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  // Handle delete user
  const handleDeleteUser = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUserMutation.mutateAsync(userId);
      } catch (error) {
        console.error('Failed to delete user:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="size-6 animate-spin" />
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-50 border border-red-200 rounded-md">
        <p>Error loading users: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-2">
          Try Again
        </Button>
      </div>
    );
  }

  const users = usersResponse?.result || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Users</h2>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
          <UserPlus className="size-4" />
          Add User
        </Button>
      </div>

      {/* Simple create form */}
      {showCreateForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Create New User</h3>
          <p className="text-sm text-gray-600 mb-4">
            This is a simplified example. In a real application, you'd have a proper form here.
          </p>
          <div className="flex gap-2">
            <Button 
              onClick={handleCreateUser}
              disabled={createUserMutation.isPending}
              className="flex items-center gap-2"
            >
              {createUserMutation.isPending && <Loader2 className="size-4 animate-spin" />}
              Create Sample User
            </Button>
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Users list */}
      <div className="space-y-4">
        {users.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No users found</p>
        ) : (
          users.map((user: any) => (
            <div key={user._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div>
                <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Role: {user.role} | Matricule: {user.matricule}</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteUser(user._id)}
                disabled={deleteUserMutation.isPending}
                className="flex items-center gap-2"
              >
                {deleteUserMutation.isPending ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
                Delete
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
