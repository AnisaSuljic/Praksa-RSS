using System;
using System.Collections.Generic;

#nullable disable

namespace RSS_backend.Database
{
    public partial class Porez
    {
        public Porez()
        {
            Grupas = new HashSet<Grupa>();
            Stavkes = new HashSet<Stavke>();
        }

        public int PorezId { get; set; }
        public int? KlijentId { get; set; }
        public string NazivPoreza { get; set; }
        public decimal? Stopa { get; set; }
        public bool? Obrisan { get; set; }

        public virtual Klijent Klijent { get; set; }
        public virtual ICollection<Grupa> Grupas { get; set; }
        public virtual ICollection<Stavke> Stavkes { get; set; }
    }
}
