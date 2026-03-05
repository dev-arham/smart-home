'use server';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
  const response = await auth.api.signInEmail({
    body: {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
  });
  redirect('/');
}

export async function signUp(formData: FormData) {
  const name = formData.get('name') as string;
  const response = await auth.api.signUpEmail({
    body: {
      name,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      phone: formData.get('phone') as string
    }
  });
  redirect('/');
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers()
  });
  redirect('/login');
}