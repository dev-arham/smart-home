'use server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { userProfile } from '@/lib/db/schema';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
  const { data, error } = await auth.signIn.email({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) return { error: error.message };
  redirect('/dashboard');
}

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string;
  const { data, error } = await auth.signUp.email({
    name,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) return { error: error.message };

  // Create a user_profile row for the new user
  if (data?.user?.id) {
    await db.insert(userProfile).values({
      userId: data.user.id,
      fullName: name,
    }).onConflictDoNothing();
  }

  redirect('/dashboard');
}

export async function signOut() {
  await auth.signOut();
  redirect('/login');
}