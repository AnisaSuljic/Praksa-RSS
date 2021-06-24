export class IKlijent {
    public klijentId!: number;
    public naziv!: string;
    public adresa!: string;
    public mjesto!: string;
    public pdvbroj!: string;
    public idbroj!: string;
    public telefon!: string;
    public odgovornaOsoba!: string;
    public email!: string;
<<<<<<< Updated upstream
    public brojBankovnogRacuna?: string = '';
=======
    public bankRacun!: string;
>>>>>>> Stashed changes
    public potvrdjenMail!: boolean;
}