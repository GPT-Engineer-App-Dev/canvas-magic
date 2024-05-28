import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from "react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();

export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// hooks

export const useFoo = () => useQuery({
    queryKey: ['foo'],
    queryFn: () => fromSupabase(supabase.from('foo').select('*,bars(*)')),
    onError: (error) => {
        console.error('Error fetching foo:', error);
    },
    onSuccess: (data) => {
        console.log('Fetched foo:', data);
    }
});

export const useAddFoo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFoo) => fromSupabase(supabase.from('foo').insert([{ title: newFoo.title }])),
        onSuccess: () => {
            queryClient.invalidateQueries('foo');
        },
        onError: (error) => {
            console.error('Error adding foo:', error);
        }
    });
};

export { supabase };