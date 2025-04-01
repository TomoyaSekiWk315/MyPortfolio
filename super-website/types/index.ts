// types/index.ts
export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    category: string;
    technologies: string[];
    color: string;
    url?: string;
}