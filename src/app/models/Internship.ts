
export interface Internship {
    title: string;
    comment?: string;
    weekCount: number;
    years: number;
    type: string;
}
export interface InternshipStudent {
    id: number | null;
    lastName: string;
    firstName: string;
    promo: string;
    group: string;
    numEtu: string;
    notes: string | null;
    internships: Internship[];
}