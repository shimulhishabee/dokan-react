'use server'
import { AuthError } from "next-auth";
import { signIn } from "../auth";
import { api } from "./api";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
  
  
  export const login = async (payload: any) => {
    const res =  await api.post(`/login?mobile_number=${payload?.mobile_number}&pin=${payload?.pin}`, payload)
    const data = await res.json();
    console.log(data)
    if (res.ok) {
      return { success: true, status: data.code, data: data };
    }
    if (!res.ok) {
      return { success: false, error: data };
    }
  };