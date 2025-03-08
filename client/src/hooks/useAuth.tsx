import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserData } from '@/apis/auth';
import { User } from '../types/User';

const useAuth = () => {
    const queryClient = useQueryClient();
    const query = useQuery({
        queryKey: ['user'],
        queryFn: getUserData,
        enabled: document.cookie.includes('x-auth-cookie'),
        retry: false,
    });
    const { data, error, isLoading, isError, isFetching } = query;

    function invalidateUser() {
        queryClient.invalidateQueries({ queryKey: ['user'] });
    }

    return {
        user: data as User,
        error,
        isLoading,
        isError,
        isFetching,
        invalidate: invalidateUser,
    };
};

export default useAuth;
