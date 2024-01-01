export type IconProps = {
    color?: string;
    size?: string | number;
} & React.SVGAttributes<SVGElement>;


// User
export interface UserType {
    userId: number
    name: string
    role: {
        roleId: number
        roleName: "admin" | "user"
    }
    username: string
    avatarUrl: string | null
    candy: number
    description: string | null
    email: string
    rank: number
    createdAt: Date
    updatedAt: Date
}