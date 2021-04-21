using System;
using System.Collections.Generic;

#nullable disable

namespace RSS_backend.Database
{
    public partial class Artikl
    {
        public Artikl()
        {
            Stavkes = new HashSet<Stavke>();
        }

        public int ArtiklId { get; set; }
        public string Sifra { get; set; }
        public string Naziv { get; set; }
        public int? GrupaId { get; set; }
        public string KataloskiBroj { get; set; }
        public int? Fisbroj { get; set; }
        public decimal? Nc { get; set; }
        public decimal? Marza { get; set; }
        public decimal? MarzaIznos { get; set; }
        public decimal? Vpc { get; set; }
        public decimal? Mpc { get; set; }
        public int? ProizvodjacId { get; set; }
        public int? KlijentId { get; set; }
        public int? JedinicaMjereId { get; set; }
        public decimal? CijenaHh { get; set; }
        public decimal? MinKolNaSkladistu { get; set; }
        public string Opis { get; set; }
        public bool? Obrisan { get; set; }

        public virtual Grupa Grupa { get; set; }
        public virtual JedinicaMjere JedinicaMjere { get; set; }
        public virtual Klijent Klijent { get; set; }
        public virtual Proizvodjac Proizvodjac { get; set; }
        public virtual ICollection<Stavke> Stavkes { get; set; }
    }
}
