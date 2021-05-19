using System;
using System.Collections.Generic;

#nullable disable

namespace RSS_backend.Database
{
    public partial class Kupac
    {
        public Kupac()
        {
            Racuns = new HashSet<Racun>();
        }

        public int KupacId { get; set; }
        public string Naziv { get; set; }
        public string Adresa { get; set; }
        public string Email { get; set; }
        public string Sifra { get; set; }
        public string Telefon { get; set; }
        public string Pdvbroj { get; set; }
        public int? GradId { get; set; }
        public int? KlijentId { get; set; }
        public bool? Obrisan { get; set; }
        public string Idbroj { get; set; }

        public virtual Grad Grad { get; set; }
        public virtual Klijent Klijent { get; set; }
        public virtual ICollection<Racun> Racuns { get; set; }
    }
}
