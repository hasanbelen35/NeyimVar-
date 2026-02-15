export interface UpdateProfilePayload {
    username?: string;
    university?: string;
    department?: string;
    avatarUrl?: string;
    bio?: string;
};

export 
interface ProfileState {
    username: string | null;
    university: string | null;
    department: string | null;
    avatarUrl: string | null;
    bio: string | null;
    loading: boolean;
    error: string | null;
};
