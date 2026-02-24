'use server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { user, userProfile } from '@/lib/db/schema';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
  const { data, error } = await auth.signIn.email({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) return { error: error.message };
  redirect('/');
}

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string;
  const { data, error } = await auth.signUp.email({
    name,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) return { error: error.message };

  // Create a user row first (Neon Auth doesn't sync to the local user table),
  // then create the user_profile row.
  if (data?.user?.id) {
    await db.insert(user).values({
      id: data.user.id,
      name,
      email: formData.get('email') as string,
    }).onConflictDoNothing();

    await db.insert(userProfile).values({
      userId: data.user.id,
      fullName: name,
    }).onConflictDoNothing();
  }

  redirect('/');
}

export async function signOut() {
  await auth.signOut();
  redirect('/login');
}