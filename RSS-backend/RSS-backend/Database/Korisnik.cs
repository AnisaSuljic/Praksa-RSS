using System;
using System.Collections.Generic;

#nullable disable

namespace RSS_backend.Database
{
    public partial class Korisnik
    {
        public Korisnik()
        {
            Racuns = new HashSet<Racun>();
        }

        public int KorisnikId { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
        public string KorisnickoIme { get; set; }
        public string Lozinka { get; set; }
        public int? KlijentId { get; set; }
        public bool? Obrisan { get; set; }
        public bool? IsAdmin { get; set; }

        public virtual Klijent Klijent { get; set; }
        public virtual ICollection<Racun> Racuns { get; set; }
    }
}
