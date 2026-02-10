'use server';
import { auth } from '@/lib/auth';
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
  const { data, error } = await auth.signUp.email({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) return { error: error.message };
  redirect('/dashboard');
}

export async function signOut() {
  await auth.signOut();
  redirect('/login');
}